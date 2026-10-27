import { candidate, people } from '../mock/data';
import { clearSession, setSession } from '../utils/auth';
import { delay } from './client';

const CANDIDATE_EMAIL = 'candidate@harding.test';
const ADVISOR_EMAIL = 'advisor@harding.test';
const READER1_EMAIL = 'reader1@harding.test';
const PASSWORD = 'Password123!';

export async function login({ email, password }) {
  await delay(500);
  
  const normalizedEmail = email.trim().toLowerCase();

  if (password !== PASSWORD) {
    throw new Error('Invalid email or password.');
  }

  if (normalizedEmail === CANDIDATE_EMAIL) {
    const session = {
      token: 'fake-session-token-candidate',
      user: { id: candidate.id, name: candidate.name, email: candidate.email, role: 'candidate' },
    };
    setSession(session);
    return session;
  }

  if (normalizedEmail === ADVISOR_EMAIL) {
    const session = {
      token: 'fake-session-token-advisor',
      user: { id: people.advisor.id, name: people.advisor.name, email: ADVISOR_EMAIL, role: 'advisor' },
    };
    setSession(session);
    return session;
  }

  if (normalizedEmail === READER1_EMAIL) {
    const session = {
      token: 'fake-session-token-reader1',
      user: { id: people.reader1.id, name: people.reader1.name, email: READER1_EMAIL, role: 'reader1' },
    };
    setSession(session);
    return session;
  }

  throw new Error('Invalid email or password.');
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