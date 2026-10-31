import { candidate, cohort, candidateCommittees, faculty, notifications } from '../mock/data';
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
  
  // Get the committee roles for this specific candidate (candidate.id is 'cand-1')
  const roles = candidateCommittees[candidate.id];
  if (!roles) return [];

  // Map the roles to the actual faculty members
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
  // If you have a degrees array in mock data, return it. Otherwise, return a placeholder.
  // This assumes degrees are still in the mock data.
  const { degrees } = await import('../mock/data'); 
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