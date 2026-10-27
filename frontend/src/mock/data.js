const NOW = new Date();
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function daysAgo(days, hour, minute) {
  const d = new Date(NOW.getTime() - days * DAY);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const people = {
  candidate: { id: 'cand-1', name: 'Amara Okafor', role: 'Candidate' },
  candidate2: { id: 'cand-2', name: 'Michael Smith', role: 'Candidate' },
  candidate3: { id: 'cand-3', name: 'Sarah Jenkins', role: 'Candidate' },
  candidate4: { id: 'cand-4', name: 'David Chen', role: 'Candidate' },
  advisor: { id: 'cm-advisor', name: 'Dr. Elaine Whitfield', role: 'Advisor' },
  reader1: { id: 'cm-reader1', name: 'Dr. Marcus Bell', role: 'Reader 1' },
  reader2: { id: 'cm-reader2', name: 'Dr. Priya Raman', role: 'Reader 2' },
  methodologist: { id: 'cm-methodologist', name: 'Dr. Samuel Osei', role: 'Methodologist' },
  stylist: { id: 'cm-stylist', name: 'Dr. Hannah Kline', role: 'Stylist' },
};

// Every committee member is assigned to all 4 candidates
export const assignments = {
  'cm-advisor': ['cand-1', 'cand-2', 'cand-3', 'cand-4'],
  'cm-reader1': ['cand-1', 'cand-2', 'cand-3', 'cand-4'],
  'cm-reader2': ['cand-1', 'cand-2', 'cand-3', 'cand-4'],
  'cm-methodologist': ['cand-1', 'cand-2', 'cand-3', 'cand-4'],
  'cm-stylist': ['cand-1', 'cand-2', 'cand-3', 'cand-4'],
};

const deadline = new Date(NOW.getTime() + 68 * DAY);
deadline.setHours(17, 0, 0, 0);

export const cohort = {
  id: 'cohort-2026',
  name: 'Ed.D. Cohort 2026',
  deadline: deadline.toISOString(),
};

const baseCandidate = {
  avatar: '/avatar-placeholder.png',
  programSeeking: 'Doctor of Education',
  preferredLocation: 'Searcy, AR',
  cohortName: 'Fall 2014',
  semesterEnroll: 'Fall 2014',
  mustComplete: 'Fall 2021',
  status: 'On-Going',
  dateGraduated: '',
  middleName: '',
  maidenName: '',
  address: '226 Harding Drive',
  city: 'Ann Arbor',
  state: 'MI',
  zip: '48197',
  otherEmail: '',
  homePhone: '0909009',
  mobilePhone: '009000',
  churchAffiliation: 'COC',
  schoolEmployer: 'Obong',
  workPhone: 'NA',
  hasLicence: true,
  documentsCount: 3,
};

export const candidate = {
  ...baseCandidate,
  id: 'cand-1',
  name: 'Amara Okafor',
  email: 'candidate@harding.test',
  candidateNumber: 'C-2014-084',
  firstName: 'Amara',
  lastName: 'Okafor',
  preferredName: 'Amara',
  primaryEmail: 'candidate@harding.test',
  dob: '1989-03-12',
};

export const candidate2 = {
  ...baseCandidate,
  id: 'cand-2',
  name: 'Michael Smith',
  email: 'michael@harding.test',
  candidateNumber: 'C-2014-112',
  firstName: 'Michael',
  lastName: 'Smith',
  preferredName: 'Mike',
  primaryEmail: 'michael@harding.test',
  dob: '1990-07-22',
};

export const candidate3 = {
  ...baseCandidate,
  id: 'cand-3',
  name: 'Sarah Jenkins',
  email: 'sarah@harding.test',
  candidateNumber: 'C-2014-145',
  firstName: 'Sarah',
  lastName: 'Jenkins',
  preferredName: 'Sarah',
  primaryEmail: 'sarah@harding.test',
  dob: '1985-11-05',
};

export const candidate4 = {
  ...baseCandidate,
  id: 'cand-4',
  name: 'David Chen',
  email: 'david@harding.test',
  candidateNumber: 'C-2014-156',
  firstName: 'David',
  lastName: 'Chen',
  preferredName: 'Dave',
  primaryEmail: 'david@harding.test',
  dob: '1992-02-18',
};

export const candidates = [candidate, candidate2, candidate3, candidate4];

export const degrees = [
  { id: 'deg-1', degree: 'B.Sc Economics', institution: 'Obong University', graduationDate: '2020-01-09' },
  { id: 'deg-2', degree: 'OND Business Management', institution: 'ACM', graduationDate: '1999-01-12' },
];

export const committee = [
  { id: 'cm-advisor', role: 'Advisor', name: 'Dr. Elaine Whitfield', email: 'e.whitfield@harding.test', department: 'Graduate School of Education' },
  { id: 'cm-reader1', role: 'Reader 1', name: 'Dr. Marcus Bell', email: 'm.bell@harding.test', department: 'Department of Leadership Studies' },
  { id: 'cm-reader2', role: 'Reader 2', name: 'Dr. Priya Raman', email: 'p.raman@harding.test', department: 'Department of Curriculum and Instruction' },
  { id: 'cm-methodologist', role: 'Methodologist', name: 'Dr. Samuel Osei', email: 's.osei@harding.test', department: 'Office of Research Methods' },
  { id: 'cm-stylist', role: 'Stylist', name: 'Dr. Hannah Kline', email: 'h.kline@harding.test', department: 'Academic Writing Center' },
];

export const works = [
  {
    id: 'work-proposal',
    candidateId: 'cand-1',
    type: 'Proposal',
    order: 1,
    version: 'v1',
    status: 'approved',
    submittedAt: daysAgo(141, 9, 12),
    currentHolder: null,
    files: [{ id: 'file-proposal-1', name: 'Proposal_Amara_Okafor_v1.docx', size: '248 KB', uploadedAt: daysAgo(141, 9, 12) }],
    movements: [
      { id: 'mv-p1', from: people.candidate, to: people.reader1, action: 'submitted', comment: 'Submitting my proposal for committee review.', arrivedAt: daysAgo(141, 9, 12), durationMs: 3 * DAY + 2 * HOUR },
      { id: 'mv-p2', from: people.reader1, to: people.reader2, action: 'forwarded', comment: 'Clear problem statement. Forwarding to Reader 2.', arrivedAt: daysAgo(132, 14, 30), durationMs: 9 * DAY + 5 * HOUR },
      { id: 'mv-p3', from: people.reader2, to: people.advisor, action: 'forwarded', comment: 'The research questions are well aligned. Ready for the advisor.', arrivedAt: daysAgo(126, 11, 5), durationMs: 6 * DAY + 20 * HOUR },
      { id: 'mv-p4', from: people.advisor, to: people.candidate, action: 'approved', comment: 'Approved. You may proceed to Chapter 1.', arrivedAt: daysAgo(121, 16, 45), durationMs: 4 * DAY + 5 * HOUR },
    ],
  },
  {
    id: 'work-ch1',
    candidateId: 'cand-1',
    type: 'Chapter 1',
    order: 2,
    version: 'v2',
    status: 'approved',
    submittedAt: daysAgo(118, 10, 0),
    currentHolder: null,
    files: [
      { id: 'file-ch1-1', name: 'Chapter1_Amara_Okafor_v1.docx', size: '412 KB', uploadedAt: daysAgo(118, 10, 0) },
      { id: 'file-ch1-2', name: 'Chapter1_Amara_Okafor_v2.docx', size: '468 KB', uploadedAt: daysAgo(104, 9, 40) },
    ],
    movements: [
      { id: 'mv-c1-1', from: people.candidate, to: people.reader1, action: 'submitted', comment: 'Submitting Chapter 1 for review.', arrivedAt: daysAgo(118, 10, 0), durationMs: 12 * DAY + 3 * HOUR },
      { id: 'mv-c1-2', from: people.reader1, to: people.candidate, action: 'returned', comment: 'The literature review covers the major thinkers, but the gap statement is thin. Please add at least five recent studies (2022–2025) and rewrite section 1.4.', arrivedAt: daysAgo(111, 15, 20), durationMs: 6 * DAY + 5 * HOUR },
      { id: 'mv-c1-3', from: people.candidate, to: people.reader1, action: 'submitted', comment: 'Added five recent studies and rewrote section 1.4.', arrivedAt: daysAgo(104, 9, 40), durationMs: 7 * DAY + 6 * HOUR },
      { id: 'mv-c1-4', from: people.reader1, to: people.reader2, action: 'forwarded', comment: 'The gap statement is much stronger now. Forwarding to Reader 2.', arrivedAt: daysAgo(99, 13, 10), durationMs: 5 * DAY + 3 * HOUR },
      { id: 'mv-c1-5', from: people.reader2, to: people.advisor, action: 'forwarded', comment: 'Chapter 1 reads well. Minor APA fixes noted in the margin.', arrivedAt: daysAgo(94, 10, 25), durationMs: 5 * DAY + 21 * HOUR },
      { id: 'mv-c1-6', from: people.advisor, to: people.candidate, action: 'approved', comment: 'Approved. Move on to Chapter 2.', arrivedAt: daysAgo(89, 17, 0), durationMs: 5 * DAY + 7 * HOUR },
    ],
  },
  {
    id: 'work-ch2',
    candidateId: 'cand-1',
    type: 'Chapter 2',
    order: 3,
    version: 'v1',
    status: 'with_methodologist',
    submittedAt: daysAgo(16, 9, 30),
    currentHolder: people.methodologist,
    files: [{ id: 'file-ch2-1', name: 'Chapter2_Amara_Okafor_v1.docx', size: '536 KB', uploadedAt: daysAgo(16, 9, 30) }],
    movements: [
      { id: 'mv-c2-1', from: people.candidate, to: people.reader1, action: 'submitted', comment: 'Submitting Chapter 2 on the new leadership framework.', arrivedAt: daysAgo(16, 9, 30), durationMs: 10 * DAY + 4 * HOUR },
      { id: 'mv-c2-2', from: people.reader1, to: people.reader2, action: 'forwarded', comment: 'Framework is solid. Reader 2 should check the coding section.', arrivedAt: daysAgo(8, 14, 5), durationMs: 7 * DAY + 4 * HOUR },
      { id: 'mv-c2-3', from: people.reader2, to: people.methodologist, action: 'forwarded', comment: 'Sent for methodology review.', arrivedAt: daysAgo(2, 10, 0), durationMs: 6 * DAY + 20 * HOUR },
    ],
  },
  {
    id: 'work-c2-ch1',
    candidateId: 'cand-2',
    type: 'Chapter 1',
    order: 2,
    version: 'v1',
    status: 'with_advisor',
    submittedAt: daysAgo(20, 14, 0),
    currentHolder: people.advisor,
    files: [{ id: 'file-c2ch1-1', name: 'Chapter1_Michael_Smith_v1.docx', size: '380 KB', uploadedAt: daysAgo(20, 14, 0) }],
    movements: [
      { id: 'mv-c2ch1-1', from: people.candidate2, to: people.reader1, action: 'submitted', comment: 'Submitting my first chapter.', arrivedAt: daysAgo(20, 14, 0), durationMs: 10 * DAY },
      { id: 'mv-c2ch1-2', from: people.reader1, to: people.reader2, action: 'forwarded', comment: 'Looks good.', arrivedAt: daysAgo(10, 9, 0), durationMs: 5 * DAY },
      { id: 'mv-c2ch1-3', from: people.reader2, to: people.advisor, action: 'forwarded', comment: 'Ready for your review.', arrivedAt: daysAgo(5, 11, 30), durationMs: 5 * DAY },
    ],
  },
  {
    id: 'work-c2-ch3',
    candidateId: 'cand-2',
    type: 'Chapter 3',
    order: 4,
    version: 'v1',
    status: 'with_methodologist',
    submittedAt: daysAgo(6, 11, 0),
    currentHolder: people.methodologist,
    files: [{ id: 'file-c2ch3-1', name: 'Chapter3_Michael_Smith_v1.docx', size: '410 KB', uploadedAt: daysAgo(6, 11, 0) }],
    movements: [
      { id: 'mv-c2ch3-1', from: people.candidate2, to: people.reader1, action: 'submitted', comment: 'Submitting Chapter 3.', arrivedAt: daysAgo(6, 11, 0), durationMs: 2 * DAY },
      { id: 'mv-c2ch3-2', from: people.reader1, to: people.reader2, action: 'forwarded', comment: 'Looks ready for the second read.', arrivedAt: daysAgo(4, 15, 30), durationMs: 2 * DAY },
      { id: 'mv-c2ch3-3', from: people.reader2, to: people.methodologist, action: 'forwarded', comment: 'Please check the sampling frame.', arrivedAt: daysAgo(1, 9, 0), durationMs: 3 * DAY + 17 * HOUR },
    ],
  },
  {
    id: 'work-ch3',
    candidateId: 'cand-1',
    type: 'Chapter 3',
    order: 4,
    version: 'v1',
    status: 'returned',
    submittedAt: daysAgo(41, 11, 10),
    currentHolder: people.candidate,
    files: [{ id: 'file-ch3-1', name: 'Chapter3_Amara_Okafor_v1.docx', size: '604 KB', uploadedAt: daysAgo(41, 11, 10) }],
    movements: [
      { id: 'mv-c3-1', from: people.candidate, to: people.reader1, action: 'submitted', comment: 'Submitting Chapter 3 on research methodology.', arrivedAt: daysAgo(41, 11, 10), durationMs: 14 * DAY + 2 * HOUR },
      { id: 'mv-c3-2', from: people.reader1, to: people.reader2, action: 'forwarded', comment: 'Methods chapter is detailed. Forwarding for a second read.', arrivedAt: daysAgo(33, 9, 45), durationMs: 7 * DAY + 22 * HOUR },
      { id: 'mv-c3-3', from: people.reader2, to: people.candidate, action: 'returned', comment: 'The sampling frame is not justified and the consent procedure is unclear. Please revise sections 3.3 and 3.6 and resubmit.', arrivedAt: daysAgo(12, 16, 30), durationMs: 20 * DAY + 6 * HOUR },
    ],
  },
  {
    id: 'work-c2-ch4',
    candidateId: 'cand-2',
    type: 'Chapter 4',
    order: 5,
    version: 'v1',
    status: 'with_stylist',
    submittedAt: daysAgo(3, 9, 0),
    currentHolder: people.stylist,
    files: [{ id: 'file-c2ch4-1', name: 'Chapter4_Michael_Smith_v1.docx', size: '420 KB', uploadedAt: daysAgo(3, 9, 0) }],
    movements: [
      { id: 'mv-c2ch4-1', from: people.candidate2, to: people.reader1, action: 'submitted', comment: 'Submitting Chapter 4.', arrivedAt: daysAgo(3, 9, 0), durationMs: 2 * DAY },
      { id: 'mv-c2ch4-2', from: people.reader1, to: people.stylist, action: 'forwarded', comment: 'Sent for style review.', arrivedAt: daysAgo(1, 14, 0), durationMs: 2 * DAY + 5 * HOUR },
    ],
  },
  // New work for Reader 1
  {
    id: 'work-c3-ch1',
    candidateId: 'cand-3',
    type: 'Chapter 1',
    order: 2,
    version: 'v1',
    status: 'with_reader_1',
    submittedAt: daysAgo(4, 10, 0),
    currentHolder: people.reader1,
    files: [{ id: 'file-c3ch1-1', name: 'Chapter1_Sarah_Jenkins_v1.docx', size: '390 KB', uploadedAt: daysAgo(4, 10, 0) }],
    movements: [
      { id: 'mv-c3ch1-1', from: people.candidate3, to: people.reader1, action: 'submitted', comment: 'Here is my first chapter for review.', arrivedAt: daysAgo(4, 10, 0), durationMs: 0 },
    ],
  },
  // New work for Reader 2
  {
    id: 'work-c4-ch2',
    candidateId: 'cand-4',
    type: 'Chapter 2',
    order: 3,
    version: 'v1',
    status: 'with_reader_2',
    submittedAt: daysAgo(5, 15, 0),
    currentHolder: people.reader2,
    files: [{ id: 'file-c4ch2-1', name: 'Chapter2_David_Chen_v1.docx', size: '520 KB', uploadedAt: daysAgo(5, 15, 0) }],
    movements: [
      { id: 'mv-c4ch2-1', from: people.candidate4, to: people.reader1, action: 'submitted', comment: 'Submitting Chapter 2.', arrivedAt: daysAgo(5, 15, 0), durationMs: 1 * DAY },
      { id: 'mv-c4ch2-2', from: people.reader1, to: people.reader2, action: 'forwarded', comment: 'Ready for your review.', arrivedAt: daysAgo(4, 9, 0), durationMs: 1 * DAY },
    ],
  },
  // New work for Advisor (so they have more than 1)
  {
    id: 'work-c1-ch4',
    candidateId: 'cand-1',
    type: 'Chapter 4',
    order: 5,
    version: 'v1',
    status: 'with_advisor',
    submittedAt: daysAgo(7, 9, 0),
    currentHolder: people.advisor,
    files: [{ id: 'file-c1ch4-1', name: 'Chapter4_Amara_Okafor_v1.docx', size: '610 KB', uploadedAt: daysAgo(7, 9, 0) }],
    movements: [
      { id: 'mv-c1ch4-1', from: people.candidate, to: people.reader1, action: 'submitted', comment: 'Submitting Chapter 4.', arrivedAt: daysAgo(7, 9, 0), durationMs: 2 * DAY },
      { id: 'mv-c1ch4-2', from: people.reader1, to: people.reader2, action: 'forwarded', comment: 'Looking good.', arrivedAt: daysAgo(5, 9, 0), durationMs: 2 * DAY },
      { id: 'mv-c1ch4-3', from: people.reader2, to: people.advisor, action: 'forwarded', comment: 'Ready for final approval.', arrivedAt: daysAgo(2, 14, 0), durationMs: 2 * DAY + 5 * HOUR },
    ],
  },
];

export const sideReviews = [];

export const notifications = [
  { id: 'n-1', title: 'Chapter 2 is with the Methodologist', message: 'Dr. Samuel Osei is currently reviewing Chapter 2.', date: daysAgo(2, 10, 0), read: false, workId: 'work-ch2' },
  { id: 'n-2', title: 'Chapter 3 returned to you', message: 'Reader 2 returned Chapter 3 with comments on sections 3.3 and 3.6.', date: daysAgo(12, 16, 30), read: false, workId: 'work-ch3' },
];