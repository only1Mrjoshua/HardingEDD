import { works, people, candidates, committee, assignments } from '../mock/data';
import { clone, delay } from './client';
import { clearSession } from '../utils/auth';

export async function getCandidates() {
  await delay();
  const assignedIds = assignments[people.methodologist.id] || [];
  return clone(candidates.filter((c) => assignedIds.includes(c.id)));
}

export async function getAssignedWorks() {
  await delay();
  const assigned = works
    .filter((work) => work.currentHolder?.id === people.methodologist.id)
    .map((work) => {
      const candidate = candidates.find((c) => c.id === work.candidateId);
      return { ...work, candidateName: candidate ? candidate.name : 'Unknown Candidate' };
    });
  return clone(assigned);
}

export async function getWorkDetails(id) {
  await delay();
  const work = works.find((item) => item.id === id);
  if (!work) throw new Error('Work not found.');
  if (work.currentHolder?.id !== people.methodologist.id) {
    throw new Error('This work is not assigned to you.');
  }
  const candidate = candidates.find((c) => c.id === work.candidateId);
  return clone({ ...work, candidateName: candidate ? candidate.name : 'Unknown Candidate' });
}

export async function getCommitteeMembers() {
  await delay();
  return clone(committee.filter((m) => m.id !== people.methodologist.id));
}

export async function returnWork({ workId, comment, file }) {
  await delay(600);
  const work = works.find((item) => item.id === workId);
  if (!work) throw new Error('Work not found.');

  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;

  work.status = 'returned';
  work.currentHolder = people.candidate;
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: people.methodologist,
    to: people.candidate,
    action: 'returned',
    comment: comment || '',
    file: file ? { id: `file-${Date.now()}`, name: file.name, size: `${Math.max(1, Math.round(file.size / 1024))} KB`, uploadedAt: now } : null,
    arrivedAt: now,
    durationMs: lastArrival ? Date.now() - new Date(lastArrival).getTime() : 0,
  });
  return clone(work);
}

export async function forwardWork({ workId, toMemberId, comment, file }) {
  await delay(600);
  const work = works.find((item) => item.id === workId);
  if (!work) throw new Error('Work not found.');

  const toMember = committee.find((m) => m.id === toMemberId);
  if (!toMember) throw new Error('Committee member not found.');

  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;

  work.status = `with_${toMember.role.toLowerCase().replace(' ', '_')}`;
  work.currentHolder = toMember;
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: people.methodologist,
    to: toMember,
    action: 'forwarded',
    comment: comment || '',
    file: file ? { id: `file-${Date.now()}`, name: file.name, size: `${Math.max(1, Math.round(file.size / 1024))} KB`, uploadedAt: now } : null,
    arrivedAt: now,
    durationMs: lastArrival ? Date.now() - new Date(lastArrival).getTime() : 0,
  });
  return clone(work);
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