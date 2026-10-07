/**
 * PLACEHOLDER auth calls used by the login / register / password-reset pages.
 * They only simulate network latency so the UI states (loading, success, error) can be reviewed.
 * Replace each body with a real request to your auth API.
 */

export type AuthResult = { ok: true } | { ok: false; error: string };

const wait = (ms = 900) => new Promise((r) => setTimeout(r, ms));

export async function signIn(email: string, password: string, remember: boolean): Promise<AuthResult> {
  void email; void password; void remember;
  await wait();
  return { ok: true };
}

export async function signInWithGoogle(): Promise<AuthResult> {
  await wait(700);
  return { ok: true };
}

/** Business Owner sign-up (spec 3.1): Name, Email, Password. Email must not already be registered. */
export async function signUp(name: string, email: string, password: string): Promise<AuthResult> {
  void name; void password;
  await wait();
  if (email.toLowerCase() === "taken@example.com") return { ok: false, error: "This email is already registered." };
  return { ok: true };
}

/** Sends a 6-digit verification code to a registered email. */
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  void email;
  await wait();
  return { ok: true };
}

/** Demo: any 6 digits except 000000 are accepted. */
export async function verifyResetCode(email: string, code: string): Promise<AuthResult> {
  void email;
  await wait(800);
  if (code === "000000") return { ok: false, error: "That code is incorrect or has expired." };
  return { ok: true };
}

export async function resetPassword(email: string, code: string, password: string): Promise<AuthResult> {
  void email; void code; void password;
  await wait();
  return { ok: true };
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** 0–4 score: length ≥ 8, mixed case, number, symbol. */
export function passwordScore(p: string) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
