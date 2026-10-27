import { candidate } from '../mock/data';
import { clearSession, setSession } from '../utils/auth';
import { delay } from './client';

const EMAIL = 'candidate@harding.test';
const PASSWORD = 'Password123!';

export async function login({ email, password }) {
  await delay(500);
  if (email.trim().toLowerCase() !== EMAIL || password !== PASSWORD) {
    throw new Error('Invalid email or password.');
  }
  const session = {
    token: 'fake-session-token',
    user: {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      role: 'candidate',
    },
  };
  setSession(session);
  return session;
}

export async function logout() {
  await delay(150);
  clearSession();
}

export async function requestPasswordReset(email) {
  await delay(500);
  if (!email.trim()) {
    throw new Error('Enter the email address on your account.');
  }
  return { ok: true };
}