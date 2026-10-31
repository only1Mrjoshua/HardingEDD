import { works, candidates, faculty, candidateCommittees, candidate as cand1 } from '../mock/data';
import { clone, delay } from './client';
import { clearSession, getSession } from '../utils/auth';

function getRoleForCandidate(facultyId, candidateId) {
  const committee = candidateCommittees[candidateId];
  if (!committee) return 'Committee Member';
  if (committee.advisor === facultyId) return 'Advisor';
  if (committee.reader1 === facultyId) return 'Reader 1';
  if (committee.reader2 === facultyId) return 'Reader 2';
  if (committee.methodologist === facultyId) return 'Methodologist';
  if (committee.stylist === facultyId) return 'Stylist';
  return 'Committee Member';
}

export async function getAssignedWorks() {
  await delay();
  const currentUser = getSession().user;
  
  const assigned = works
    .filter((work) => work.currentHolder?.id === currentUser.id)
    .map((work) => {
      const candidate = candidates.find((c) => c.id === work.candidateId);
      return { 
        ...work, 
        candidateName: candidate ? candidate.name : 'Unknown Candidate',
        myRole: getRoleForCandidate(currentUser.id, work.candidateId)
      };
    });
  return clone(assigned);
}

export async function getWorkDetails(id) {
  await delay();
  const currentUser = getSession().user;
  const work = works.find((item) => item.id === id);
  
  if (!work) throw new Error('Work not found.');
  if (work.currentHolder?.id !== currentUser.id) {
    throw new Error('This work is not assigned to you.');
  }
  
  const candidate = candidates.find((c) => c.id === work.candidateId);
  const myRole = getRoleForCandidate(currentUser.id, work.candidateId);
  
  return clone({ ...work, candidateName: candidate ? candidate.name : 'Unknown Candidate', myRole });
}

export async function getCommitteeForCandidate(candidateId) {
  await delay();
  const committee = candidateCommittees[candidateId];
  if (!committee) return [];

  const members = [];
  const roles = ['advisor', 'reader1', 'reader2', 'methodologist', 'stylist'];
  
  roles.forEach(roleKey => {
    const facId = committee[roleKey];
    const member = faculty.find(f => f.id === facId);
    if (member) {
      const roleName = roleKey === 'reader1' ? 'Reader 1' : roleKey === 'reader2' ? 'Reader 2' : roleKey.charAt(0).toUpperCase() + roleKey.slice(1);
      members.push({ ...member, role: roleName });
    }
  });

  return clone(members);
}

export async function getMyCandidates() {
  await delay();
  const currentUser = getSession().user;
  
  const myCandidates = candidates.filter(c => {
    const committee = candidateCommittees[c.id];
    return committee && Object.values(committee).includes(currentUser.id);
  }).map(c => {
    return { ...c, myRole: getRoleForCandidate(currentUser.id, c.id) };
  });

  return clone(myCandidates);
}

export async function approveWork({ workId, comment, file }) {
  await delay(600);
  const work = works.find((item) => item.id === workId);
  if (!work) throw new Error('Work not found.');

  const currentUser = getSession().user;
  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;
  const candidate = candidates.find(c => c.id === work.candidateId);
  const myRole = getRoleForCandidate(currentUser.id, work.candidateId);

  work.status = 'approved';
  work.currentHolder = null;
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: { id: currentUser.id, name: currentUser.name, role: myRole },
    to: candidate,
    action: 'approved',
    comment: comment || '',
    file: file ? { id: `file-${Date.now()}`, name: file.name, size: `${Math.max(1, Math.round(file.size / 1024))} KB`, uploadedAt: now } : null,
    arrivedAt: now,
    durationMs: lastArrival ? Date.now() - new Date(lastArrival).getTime() : 0,
  });
  return clone(work);
}

export async function returnWork({ workId, comment, file }) {
  await delay(600);
  const work = works.find((item) => item.id === workId);
  if (!work) throw new Error('Work not found.');

  const currentUser = getSession().user;
  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;
  const candidate = candidates.find(c => c.id === work.candidateId);
  const myRole = getRoleForCandidate(currentUser.id, work.candidateId);

  work.status = 'returned';
  work.currentHolder = candidate;
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: { id: currentUser.id, name: currentUser.name, role: myRole },
    to: candidate,
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

  const currentUser = getSession().user;
  const toMemberBase = faculty.find(f => f.id === toMemberId);
  if (!toMemberBase) throw new Error('Faculty member not found.');

  const toMemberRole = getRoleForCandidate(toMemberId, work.candidateId);
  const toMember = { ...toMemberBase, role: toMemberRole };

  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;
  const myRole = getRoleForCandidate(currentUser.id, work.candidateId);

  work.status = `with_${toMemberRole.toLowerCase().replace(' ', '_')}`;
  work.currentHolder = toMember;
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: { id: currentUser.id, name: currentUser.name, role: myRole },
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
  if (currentPassword !== 'Password123!') throw new Error('Your current password is not correct.');
  if (!newPassword || newPassword.length < 8) throw new Error('Your new password must be at least 8 characters.');
  return { ok: true };
}

export async function deleteAccount() {
  await delay(800);
  clearSession();
  return { ok: true };
}