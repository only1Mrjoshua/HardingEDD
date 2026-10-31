import { candidate, faculty } from '../mock/data';
import { clearSession, setSession } from '../utils/auth';
import { delay } from './client';

const CANDIDATE_EMAIL = 'candidate@harding.test';
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

  // Check if the email belongs to a faculty member
  const facultyMember = faculty.find(f => f.email.toLowerCase() === normalizedEmail);
  if (facultyMember) {
    const session = {
      token: `fake-session-token-${facultyMember.id}`,
      user: { id: facultyMember.id, name: facultyMember.name, email: facultyMember.email, role: 'faculty' },
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