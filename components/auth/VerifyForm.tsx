"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import s from "@/app/auth.module.css";
import Icon from "@/components/Icon";
import { passwordScore, requestPasswordReset, resetPassword, verifyResetCode } from "@/lib/auth";
import { Alert, PasswordField, PasswordStrength, SubmitButton } from "./Fields";

const LENGTH = 6;
const RESEND_SECONDS = 60;

/** Password reset, steps 2–3 (spec 3.1): enter the emailed code, then set and confirm a new password. */
export default function VerifyForm() {
  const email = useSearchParams().get("email") ?? "";
  const [step, setStep] = useState<"code" | "reset" | "done">("code");
  const [code, setCode] = useState("");

  return (
    <div className={s.form} key={step}>
      {step === "code" && <CodeStep email={email} onVerified={(c) => { setCode(c); setStep("reset"); }} />}
      {step === "reset" && <ResetStep email={email} code={code} onDone={() => setStep("done")} />}
      {step === "done" && (
        <>
          <span className={`${s.iconBadge} ${s.iconBadgeOk}`} aria-hidden="true">
            <Icon name="checkCircle" size={24} />
          </span>
          <header className={s.head}>
            <h1>Password updated</h1>
            <p>Your password has been reset. You can now log in with your new password.</p>
          </header>
          <Link href="/login" className={s.primary}>
            <span>Back to Log In</span>
          </Link>
        </>
      )}
    </div>
  );
}

function CodeStep({ email, onVerified }: { email: string; onVerified: (code: string) => void }) {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  useEffect(() => refs.current[0]?.focus(), []);

  const setAt = (i: number, v: string) => setDigits((d) => d.map((x, n) => (n === i ? v : x)));

  function onChange(i: number, value: string) {
    const v = value.replace(/\D/g, "");
    if (!v) return setAt(i, "");
    if (v.length > 1) return fill(v, i);
    setAt(i, v);
    setError(undefined);
    if (i < LENGTH - 1) refs.current[i + 1]?.focus();
  }

  function fill(v: string, from = 0) {
    const chars = v.slice(0, LENGTH - from).split("");
    setDigits((d) => d.map((x, n) => (n >= from && n - from < chars.length ? chars[n - from] : x)));
    refs.current[Math.min(from + chars.length, LENGTH - 1)]?.focus();
    setError(undefined);
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < LENGTH - 1) refs.current[i + 1]?.focus();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = digits.join("");
    if (value.length < LENGTH) return setError("Enter all 6 digits.");
    setLoading(true);
    const res = await verifyResetCode(email, value);
    setLoading(false);
    if (res.ok) onVerified(value);
    else setError(res.error);
  }

  async function resend() {
    setNotice(undefined);
    await requestPasswordReset(email);
    setSeconds(RESEND_SECONDS);
    setDigits(Array(LENGTH).fill(""));
    refs.current[0]?.focus();
    setNotice("A new code is on its way.");
  }

  return (
    <form onSubmit={onSubmit} noValidate className={s.formInner}>
      <span className={s.iconBadge} aria-hidden="true">
        <Icon name="mail" size={22} />
      </span>
      <header className={s.head}>
        <h1>Check your email</h1>
        <p>
          We sent a 6-digit code to <b>{email || "your email"}</b>. Enter it below to continue.
        </p>
      </header>

      {notice && <Alert tone="success">{notice}</Alert>}

      <div className={s.field}>
        <div className={`${s.otp} ${error ? s.otpError : ""}`} role="group" aria-label="Verification code">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={LENGTH}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              onPaste={(e) => {
                e.preventDefault();
                fill(e.clipboardData.getData("text").replace(/\D/g, ""));
              }}
              className={d ? s.otpFilled : undefined}
            />
          ))}
        </div>
        {error && <p className={s.error}>{error}</p>}
      </div>

      <SubmitButton loading={loading}>Verify Code</SubmitButton>

      <p className={s.switch}>
        Didn&apos;t get it?{" "}
        {seconds > 0 ? (
          <span className={s.muted}>Resend in 0:{String(seconds).padStart(2, "0")}</span>
        ) : (
          <button type="button" className={s.textBtn} onClick={resend}>
            Resend code
          </button>
        )}
      </p>

      <Link href="/forgot-password" className={s.back}>
        <Icon name="arrowLeft" size={15} /> Use a different email
      </Link>
    </form>
  );
}

function ResetStep({ email, code, onDone }: { email: string; code: string; onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (password.length < 8) next.password = "Use at least 8 characters.";
    else if (passwordScore(password) < 2) next.password = "Add upper and lower case letters, a number or a symbol.";
    if (confirm !== password) next.confirm = "Passwords don't match.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    const res = await resetPassword(email, code, password);
    setLoading(false);
    if (res.ok) onDone();
  }

  return (
    <form onSubmit={onSubmit} noValidate className={s.formInner}>
      <span className={s.iconBadge} aria-hidden="true">
        <Icon name="lock" size={22} />
      </span>
      <header className={s.head}>
        <h1>Set a new password</h1>
        <p>Code verified. Choose a new password for your account.</p>
      </header>

      <div>
        <PasswordField
          label="New password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <PasswordStrength value={password} />
      </div>
      <PasswordField
        label="Confirm new password"
        name="confirm"
        autoComplete="new-password"
        placeholder="Repeat password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm}
      />

      <SubmitButton loading={loading}>Reset Password</SubmitButton>
    </form>
  );
}
