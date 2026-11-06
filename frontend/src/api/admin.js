import { candidates, faculty, works, candidateCommittees, cohort } from '../mock/data';
import { clone, delay } from './client';
import { clearSession } from '../utils/auth';

export async function getDashboardStats() {
  await delay();
  return clone({
    totalCandidates: candidates.length,
    totalFaculty: faculty.length,
    activeWorks: works.filter(w => w.status !== 'approved' && w.status !== 'not_started').length,
    completedWorks: works.filter(w => w.status === 'approved').length,
    deadline: cohort.deadline
  });
}

export async function getAllCandidates() {
  await delay();
  const populated = candidates.map(c => {
    const committee = candidateCommittees[c.id];
    return {
      ...c,
      committeeDetails: committee ? {
        advisor: faculty.find(f => f.id === committee.advisor)?.name || 'Unassigned',
        reader1: faculty.find(f => f.id === committee.reader1)?.name || 'Unassigned',
        reader2: faculty.find(f => f.id === committee.reader2)?.name || 'Unassigned',
        methodologist: faculty.find(f => f.id === committee.methodologist)?.name || 'Unassigned',
        stylist: faculty.find(f => f.id === committee.stylist)?.name || 'Unassigned',
      } : null
    };
  });
  return clone(populated);
}

export async function addCandidate(data) {
  await delay(600);
  const newCandidate = {
    id: `cand-${Date.now()}`,
    name: `${data.firstName} ${data.lastName}`,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    candidateNumber: data.candidateNumber,
    cohortName: data.cohortName,
    primaryEmail: data.email,
    // Defaults
    avatar: '/avatar-placeholder.png',
    programSeeking: 'Doctor of Education',
    preferredLocation: 'Searcy, AR',
    semesterEnroll: 'Fall 2024',
    mustComplete: 'Fall 2028',
    status: 'On-Going',
    dateGraduated: '',
    middleName: '',
    maidenName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    otherEmail: '',
    homePhone: '',
    mobilePhone: '',
    dob: '',
    churchAffiliation: '',
    schoolEmployer: '',
    workPhone: '',
    hasLicence: false,
    documentsCount: 0,
  };
  
  candidates.push(newCandidate);
  
  // Create an empty committee slot for them
  candidateCommittees[newCandidate.id] = { advisor: '', reader1: '', reader2: '', methodologist: '', stylist: '' };
  
  return clone(newCandidate);
}

export async function getAllFaculty() {
  await delay();
  return clone(faculty);
}

export async function addFaculty(data) {
  await delay(600);
  const newFaculty = {
    id: `fac-${Date.now()}`,
    name: data.name,
    email: data.email,
    department: data.department,
  };
  faculty.push(newFaculty);
  return clone(newFaculty);
}

export async function getAllWorks() {
  await delay();
  const populated = works.map(w => {
    const candidate = candidates.find(c => c.id === w.candidateId);
    return { ...w, candidateName: candidate ? candidate.name : 'Unknown Candidate' };
  });
  return clone(populated);
}

export async function assignCommittee({ candidateId, roles }) {
  await delay(600);
  candidateCommittees[candidateId] = roles;
  return { ok: true };
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