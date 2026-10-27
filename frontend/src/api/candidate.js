import { candidate, cohort, committee, degrees, notifications } from '../mock/data';
import { clone, delay } from './client';
import { clearSession } from '../utils/auth';

export async function getCandidate() {
  await delay();
  return clone(candidate);
}

export async function getCohort() {
  await delay();
  return clone(cohort);
}

export async function getCommittee() {
  await delay();
  return clone(committee);
}

export async function getDegrees() {
  await delay();
  return clone(degrees);
}

export async function getNotifications() {
  await delay();
  return clone(notifications);
}

export async function updateProfile(patch) {
  await delay(600);
  Object.assign(candidate, patch);
  return clone(candidate);
}

export async function changePassword({ currentPassword, newPassword }) {
  await delay(400);
  if (currentPassword !== 'Password123!') {
    throw new Error('Your current password is not correct.');
  }
  if (!newPassword || newPassword.length < 8) {
    throw new Error('Your new password must be at least 8 characters.');
  }
  return { ok: true };
}

export async function deleteAccount() {
  await delay(800);
  clearSession();
  return { ok: true };
}