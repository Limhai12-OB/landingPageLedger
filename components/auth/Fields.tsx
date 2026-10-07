"use client";

import { useId, useState } from "react";
import s from "@/app/auth.module.css";
import Icon from "@/components/Icon";
import { passwordScore } from "@/lib/auth";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & { label: string; error?: string };

export function TextField({ label, error, ...rest }: InputProps) {
  const id = useId();
  return (
    <div className={s.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`${s.input} ${error ? s.inputError : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className={s.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordField({ label, error, ...rest }: InputProps) {
  const id = useId();
  const [show, setShow] = useState(false);
  return (
    <div className={s.field}>
      <label htmlFor={id}>{label}</label>
      <div className={s.inputWrap}>
        <input
          id={id}
          type={show ? "text" : "password"}
          className={`${s.input} ${error ? s.inputError : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          {...rest}
        />
        <button
          type="button"
          className={s.eye}
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
        >
          <Icon name={show ? "eye" : "eyeOff"} size={18} />
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} className={s.error}>
          {error}
        </p>
      )}
    </div>
  );
}

const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"];

export function PasswordStrength({ value }: { value: string }) {
  if (!value) return null;
  const score = passwordScore(value);
  return (
    <div className={s.strength} data-score={score} aria-live="polite">
      <span className={s.strengthBars}>
        {[1, 2, 3, 4].map((n) => (
          <i key={n} className={n <= score ? s.barOn : undefined} />
        ))}
      </span>
      <small>{strengthLabel[score]}</small>
    </div>
  );
}

export function Checkbox({ label, ...rest }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { label: React.ReactNode }) {
  return (
    <label className={s.check}>
      <input type="checkbox" {...rest} />
      <span className={s.box} aria-hidden="true">
        <Icon name="check" size={12} />
      </span>
      <span>{label}</span>
    </label>
  );
}

export function SubmitButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" className={s.primary} disabled={loading} aria-busy={loading}>
      {loading ? <span className={s.spinner} aria-hidden="true" /> : null}
      <span>{loading ? "Please wait…" : children}</span>
    </button>
  );
}

export function Alert({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  return (
    <div className={`${s.alert} ${tone === "error" ? s.alertError : s.alertSuccess}`} role={tone === "error" ? "alert" : "status"}>
      <Icon name={tone === "error" ? "lock" : "checkCircle"} size={16} />
      <span>{children}</span>
    </div>
  );
}

/** "Continue with Google" — uses Google's standard multicolor G mark per their sign-in branding guidelines. */
export function GoogleButton({ onClick, loading }: { onClick: () => void; loading?: boolean }) {
  return (
    <button type="button" className={s.google} onClick={onClick} disabled={loading} aria-busy={loading}>
      {loading ? (
        <span className={`${s.spinner} ${s.spinnerDark}`} aria-hidden="true" />
      ) : (
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
          <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
        </svg>
      )}
      <span>Google</span>
    </button>
  );
}

export function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.divider}>
      <span>{children}</span>
    </div>
  );
}
