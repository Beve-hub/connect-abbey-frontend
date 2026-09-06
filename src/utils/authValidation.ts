// Mirrors src/validators/auth.validators.ts on the backend, so the form
// rejects bad input with the same rules the API would enforce — before
// a real request is ever wired up.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface FieldErrors {
  email?: string;
  password?: string;
  name?: string;
}

export function validateEmail(email: string): string | undefined {
  if (!EMAIL_RE.test(email.trim())) return "Enter a valid email address";
  return undefined;
}

// loginSchema: password just needs to be non-empty (real check happens server-side).
export function validateLoginPassword(password: string): string | undefined {
  if (password.length < 1) return "Enter your password";
  return undefined;
}

// signupSchema: password.min(8, "Password must be at least 8 characters")
export function validateSignupPassword(password: string): string | undefined {
  if (password.length < 8) return "Password must be at least 8 characters";
  return undefined;
}

// signupSchema: name.min(1, "Name is required")
export function validateName(name: string): string | undefined {
  if (name.trim().length < 1) return "Name is required";
  return undefined;
}

export function validateLoginForm(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailError = validateEmail(email);
  const passwordError = validateLoginPassword(password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function validateSignupForm(email: string, password: string, name: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailError = validateEmail(email);
  const passwordError = validateSignupPassword(password);
  const nameError = validateName(name);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (nameError) errors.name = nameError;
  return errors;
}
