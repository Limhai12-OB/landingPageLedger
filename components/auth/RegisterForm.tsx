"use client";

import Link from "next/link";
import { useState } from "react";
import s from "@/app/auth.module.css";
import { isEmail, passwordScore, signInWithGoogle, signUp } from "@/lib/auth";
import { Alert, Checkbox, Divider, GoogleButton, PasswordField, PasswordStrength, SubmitButton, TextField } from "./Fields";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "agree", string>>;

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [status, setStatus] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    else if (passwordScore(password) < 2) next.password = "Add upper and lower case letters, a number or a symbol.";
    if (confirm !== password) next.confirm = "Passwords don't match.";
    if (!agree) next.agree = "Please accept the terms to continue.";
    setErrors(next);
    setStatus(null);
    if (Object.keys(next).length) return;

    setLoading(true);
    const res = await signUp(name, email, password);
    setLoading(false);
    // TODO: continue to Business Setup (spec 3.1) once that page exists.
    if (res.ok) setStatus({ tone: "success", text: "Account created. Next, set up your business and first branch." });
    else setErrors({ email: res.error });
  }

  async function onGoogle() {
    setGoogleLoading(true);
    const res = await signInWithGoogle();
    setGoogleLoading(false);
    setStatus(res.ok ? { tone: "success", text: "Signed up with Google." } : { tone: "error", text: res.error });
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <header className={s.head}>
        <h1>Create your account</h1>
        <p>Sign up as a Business Owner. Branch Managers join from the invitation email.</p>
      </header>

      {status && <Alert tone={status.tone}>{status.text}</Alert>}

      <TextField
        label="Full name"
        name="name"
        autoComplete="name"
        placeholder="Sokha Chan"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@business.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <div className={s.pair}>
        <div>
          <PasswordField
            label="Password"
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
          label="Confirm password"
          name="confirm"
          autoComplete="new-password"
          placeholder="Repeat password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
        />
      </div>

      <div>
        <Checkbox
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          label={
            <>
              I agree to the <Link href="/" className={s.link}>Terms</Link> and{" "}
              <Link href="/" className={s.link}>Privacy Policy</Link>
            </>
          }
        />
        {errors.agree && <p className={s.error}>{errors.agree}</p>}
      </div>

      <SubmitButton loading={loading}>Create Account</SubmitButton>
      <Divider>Or sign up with</Divider>
      <GoogleButton onClick={onGoogle} loading={googleLoading} />

      <p className={s.switch}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </form>
  );
}
