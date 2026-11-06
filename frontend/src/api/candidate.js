import { candidates, cohort, candidateCommittees, faculty, notifications, degrees } from '../mock/data';
import { clone, delay } from './client';
import { clearSession, getSession } from '../utils/auth';

export async function getCandidate() {
  await delay();
  const userId = getSession()?.user?.id;
  const user = candidates.find(c => c.id === userId) || candidates[0];
  return clone(user);
}

export async function getCohort() {
  await delay();
  return clone(cohort);
}

export async function getCommittee() {
  await delay();
  const userId = getSession()?.user?.id;
  const roles = candidateCommittees[userId];
  if (!roles) return [];

  const members = [];
  if (roles.advisor) {
    const f = faculty.find(x => x.id === roles.advisor);
    if (f) members.push({ ...f, role: 'Advisor' });
  }
  if (roles.reader1) {
    const f = faculty.find(x => x.id === roles.reader1);
    if (f) members.push({ ...f, role: 'Reader 1' });
  }
  if (roles.reader2) {
    const f = faculty.find(x => x.id === roles.reader2);
    if (f) members.push({ ...f, role: 'Reader 2' });
  }
  if (roles.methodologist) {
    const f = faculty.find(x => x.id === roles.methodologist);
    if (f) members.push({ ...f, role: 'Methodologist' });
  }
  if (roles.stylist) {
    const f = faculty.find(x => x.id === roles.stylist);
    if (f) members.push({ ...f, role: 'Stylist' });
  }

  return clone(members);
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
  const userId = getSession()?.user?.id;
  const index = candidates.findIndex(c => c.id === userId);
  if (index !== -1) {
    Object.assign(candidates[index], patch);
    return clone(candidates[index]);
  }
  return null;
}

export async function changePassword({ currentPassword, newPassword }) {
  await delay(400);
  if (currentPassword !== 'Password123!') throw new Error('Your current password is not correct.');
  if (!newPassword || newPassword.length < 8) throw new Error('Your new password must be at least 8 characters.');
  return { ok: true };
}

export async function deleteAccount() {
  await delay(800);
  clearSession();
  return { ok: true };
}