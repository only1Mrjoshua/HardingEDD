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
  advisor: { id: 'cm-advisor', name: 'Dr. Elaine Whitfield', role: 'Advisor' },
  reader1: { id: 'cm-reader1', name: 'Dr. Marcus Bell', role: 'Reader 1' },
  reader2: { id: 'cm-reader2', name: 'Dr. Priya Raman', role: 'Reader 2' },
  methodologist: { id: 'cm-methodologist', name: 'Dr. Samuel Osei', role: 'Methodologist' },
  stylist: { id: 'cm-stylist', name: 'Dr. Hannah Kline', role: 'Stylist' },
};

const deadline = new Date(NOW.getTime() + 68 * DAY);
deadline.setHours(17, 0, 0, 0);

export const cohort = {
  id: 'cohort-2026',
  name: 'Ed.D. Cohort 2026',
  deadline: deadline.toISOString(),
};

export const candidate = {
  id: 'cand-1',
  name: 'Amara Okafor',
  email: 'candidate@harding.test',
  avatar: '/avatar-placeholder.png',
  
  // Program Information
  candidateNumber: 'C-2014-084',
  programSeeking: 'Doctor of Education',
  preferredLocation: 'Searcy, AR',
  cohortName: 'Fall 2014',
  semesterEnroll: 'Fall 2014',
  mustComplete: 'Fall 2021',
  status: 'On-Going',
  dateGraduated: '',
  
  // Candidate Information
  firstName: 'Amara',
  middleName: '',
  lastName: 'Okafor',
  preferredName: 'Amara',
  maidenName: '',
  address: '226 Harding Drive',
  city: 'Ann Arbor',
  state: 'MI',
  zip: '48197',
  primaryEmail: 'candidate@harding.test',
  otherEmail: '',
  homePhone: '0909009',
  mobilePhone: '009000',
  dob: '1989-03-12',
  churchAffiliation: 'COC',
  schoolEmployer: 'Obong',
  workPhone: 'NA',
  hasLicence: true,
  
  // Documents
  documentsCount: 3,
};

export const degrees = [
  {
    id: 'deg-1',
    degree: 'B.Sc Economics',
    institution: 'Obong University',
    graduationDate: '2020-01-09',
  },
  {
    id: 'deg-2',
    degree: 'OND Business Management',
    institution: 'ACM',
    graduationDate: '1999-01-12',
  },
];

export const committee = [
  {
    id: 'cm-advisor',
    role: 'Advisor',
    name: 'Dr. Elaine Whitfield',
    email: 'e.whitfield@harding.test',
    department: 'Graduate School of Education',
  },
  {
    id: 'cm-reader1',
    role: 'Reader 1',
    name: 'Dr. Marcus Bell',
    email: 'm.bell@harding.test',
    department: 'Department of Leadership Studies',
  },
  {
    id: 'cm-reader2',
    role: 'Reader 2',
    name: 'Dr. Priya Raman',
    email: 'p.raman@harding.test',
    department: 'Department of Curriculum and Instruction',
  },
  {
    id: 'cm-methodologist',
    role: 'Methodologist',
    name: 'Dr. Samuel Osei',
    email: 's.osei@harding.test',
    department: 'Office of Research Methods',
  },
  {
    id: 'cm-stylist',
    role: 'Stylist',
    name: 'Dr. Hannah Kline',
    email: 'h.kline@harding.test',
    department: 'Academic Writing Center',
  },
];

export const works = [
  {
    id: 'work-proposal',
    type: 'Proposal',
    order: 1,
    version: 'v1',
    status: 'approved',
    submittedAt: daysAgo(141, 9, 12),
    currentHolder: null,
    files: [
      {
        id: 'file-proposal-1',
        name: 'Proposal_Amara_Okafor_v1.docx',
        size: '248 KB',
        uploadedAt: daysAgo(141, 9, 12),
      },
    ],
    movements: [
      {
        id: 'mv-p1',
        from: people.candidate,
        to: people.reader1,
        action: 'submitted',
        comment: 'Submitting my proposal for committee review.',
        arrivedAt: daysAgo(141, 9, 12),
        durationMs: 3 * DAY + 2 * HOUR,
      },
      {
        id: 'mv-p2',
        from: people.reader1,
        to: people.reader2,
        action: 'forwarded',
        comment: 'Clear problem statement. Forwarding to Reader 2.',
        arrivedAt: daysAgo(132, 14, 30),
        durationMs: 9 * DAY + 5 * HOUR,
      },
      {
        id: 'mv-p3',
        from: people.reader2,
        to: people.advisor,
        action: 'forwarded',
        comment: 'The research questions are well aligned. Ready for the advisor.',
        arrivedAt: daysAgo(126, 11, 5),
        durationMs: 6 * DAY + 20 * HOUR,
      },
      {
        id: 'mv-p4',
        from: people.advisor,
        to: people.candidate,
        action: 'approved',
        comment: 'Approved. You may proceed to Chapter 1.',
        arrivedAt: daysAgo(121, 16, 45),
        durationMs: 4 * DAY + 5 * HOUR,
      },
    ],
  },
  {
    id: 'work-ch1',
    type: 'Chapter 1',
    order: 2,
    version: 'v2',
    status: 'approved',
    submittedAt: daysAgo(118, 10, 0),
    currentHolder: null,
    files: [
      {
        id: 'file-ch1-1',
        name: 'Chapter1_Amara_Okafor_v1.docx',
        size: '412 KB',
        uploadedAt: daysAgo(118, 10, 0),
      },
      {
        id: 'file-ch1-2',
        name: 'Chapter1_Amara_Okafor_v2.docx',
        size: '468 KB',
        uploadedAt: daysAgo(104, 9, 40),
      },
    ],
    movements: [
      {
        id: 'mv-c1-1',
        from: people.candidate,
        to: people.reader1,
        action: 'submitted',
        comment: 'Submitting Chapter 1 for review.',
        arrivedAt: daysAgo(118, 10, 0),
        durationMs: 12 * DAY + 3 * HOUR,
      },
      {
        id: 'mv-c1-2',
        from: people.reader1,
        to: people.candidate,
        action: 'returned',
        comment:
          'The literature review covers the major thinkers, but the gap statement is thin. Please add at least five recent studies (2022–2025) and rewrite section 1.4.',
        arrivedAt: daysAgo(111, 15, 20),
        durationMs: 6 * DAY + 5 * HOUR,
      },
      {
        id: 'mv-c1-3',
        from: people.candidate,
        to: people.reader1,
        action: 'submitted',
        comment: 'Added five recent studies and rewrote section 1.4.',
        arrivedAt: daysAgo(104, 9, 40),
        durationMs: 7 * DAY + 6 * HOUR,
      },
      {
        id: 'mv-c1-4',
        from: people.reader1,
        to: people.reader2,
        action: 'forwarded',
        comment: 'The gap statement is much stronger now. Forwarding to Reader 2.',
        arrivedAt: daysAgo(99, 13, 10),
        durationMs: 5 * DAY + 3 * HOUR,
      },
      {
        id: 'mv-c1-5',
        from: people.reader2,
        to: people.advisor,
        action: 'forwarded',
        comment: 'Chapter 1 reads well. Minor APA fixes noted in the margin.',
        arrivedAt: daysAgo(94, 10, 25),
        durationMs: 5 * DAY + 21 * HOUR,
      },
      {
        id: 'mv-c1-6',
        from: people.advisor,
        to: people.candidate,
        action: 'approved',
        comment: 'Approved. Move on to Chapter 2.',
        arrivedAt: daysAgo(89, 17, 0),
        durationMs: 5 * DAY + 7 * HOUR,
      },
    ],
  },
  {
    id: 'work-ch2',
    type: 'Chapter 2',
    order: 3,
    version: 'v1',
    status: 'with_advisor',
    submittedAt: daysAgo(16, 9, 30),
    currentHolder: people.advisor,
    files: [
      {
        id: 'file-ch2-1',
        name: 'Chapter2_Amara_Okafor_v1.docx',
        size: '536 KB',
        uploadedAt: daysAgo(16, 9, 30),
      },
    ],
    movements: [
      {
        id: 'mv-c2-1',
        from: people.candidate,
        to: people.reader1,
        action: 'submitted',
        comment: 'Submitting Chapter 2 on the new leadership framework.',
        arrivedAt: daysAgo(16, 9, 30),
        durationMs: 10 * DAY + 4 * HOUR,
      },
      {
        id: 'mv-c2-2',
        from: people.reader1,
        to: people.reader2,
        action: 'forwarded',
        comment: 'Framework is solid. Reader 2 should check the coding section.',
        arrivedAt: daysAgo(8, 14, 5),
        durationMs: 7 * DAY + 4 * HOUR,
      },
      {
        id: 'mv-c2-3',
        from: people.reader2,
        to: people.advisor,
        action: 'forwarded',
        comment: 'Methodology is sound. Passing to the advisor for final review.',
        arrivedAt: daysAgo(4, 10, 15),
        durationMs: 4 * DAY + 3 * HOUR,
      },
    ],
  },
  {
    id: 'work-ch3',
    type: 'Chapter 3',
    order: 4,
    version: 'v1',
    status: 'returned',
    submittedAt: daysAgo(41, 11, 10),
    currentHolder: people.candidate,
    files: [
      {
        id: 'file-ch3-1',
        name: 'Chapter3_Amara_Okafor_v1.docx',
        size: '604 KB',
        uploadedAt: daysAgo(41, 11, 10),
      },
    ],
    movements: [
      {
        id: 'mv-c3-1',
        from: people.candidate,
        to: people.reader1,
        action: 'submitted',
        comment: 'Submitting Chapter 3 on research methodology.',
        arrivedAt: daysAgo(41, 11, 10),
        durationMs: 14 * DAY + 2 * HOUR,
      },
      {
        id: 'mv-c3-2',
        from: people.reader1,
        to: people.reader2,
        action: 'forwarded',
        comment: 'Methods chapter is detailed. Forwarding for a second read.',
        arrivedAt: daysAgo(33, 9, 45),
        durationMs: 7 * DAY + 22 * HOUR,
      },
      {
        id: 'mv-c3-3',
        from: people.reader2,
        to: people.candidate,
        action: 'returned',
        comment:
          'The sampling frame is not justified and the consent procedure is unclear. Please revise sections 3.3 and 3.6 and resubmit.',
        arrivedAt: daysAgo(12, 16, 30),
        durationMs: 20 * DAY + 6 * HOUR,
      },
    ],
  },
  {
    id: 'work-ch4',
    type: 'Chapter 4',
    order: 5,
    version: null,
    status: 'not_started',
    submittedAt: null,
    currentHolder: null,
    files: [],
    movements: [],
  },
  {
    id: 'work-ch5',
    type: 'Chapter 5',
    order: 6,
    version: null,
    status: 'not_started',
    submittedAt: null,
    currentHolder: null,
    files: [],
    movements: [],
  },
  {
    id: 'work-final',
    type: 'Final Document',
    order: 7,
    version: null,
    status: 'not_started',
    submittedAt: null,
    currentHolder: null,
    files: [],
    movements: [],
  },
];

export const sideReviews = [
  {
    id: 'sr-1',
    workId: 'work-ch3',
    reviewer: people.methodologist,
    status: 'completed',
    requestedAt: daysAgo(20, 10, 0),
    completedAt: daysAgo(17, 14, 20),
    durationMs: 3 * DAY + 4 * HOUR,
    comment:
      'Methodology is sound, but the sampling frame needs to be justified more explicitly and the consent timeline should match the recruitment window.',
  },
];

export const notifications = [
  {
    id: 'n-1',
    title: 'Chapter 2 is with the Advisor',
    message: 'Dr. Elaine Whitfield is currently reviewing Chapter 2.',
    date: daysAgo(4, 10, 15),
    read: false,
    workId: 'work-ch2',
  },
  {
    id: 'n-2',
    title: 'Chapter 3 returned to you',
    message: 'Reader 2 returned Chapter 3 with comments on sections 3.3 and 3.6.',
    date: daysAgo(12, 16, 30),
    read: false,
    workId: 'work-ch3',
  },
  {
    id: 'n-3',
    title: 'Methodology review completed',
    message: 'The methodologist completed a side review on Chapter 3.',
    date: daysAgo(17, 14, 20),
    read: true,
    workId: 'work-ch3',
  },
  {
    id: 'n-4',
    title: 'Chapter 1 approved',
    message: 'Dr. Elaine Whitfield approved Chapter 1.',
    date: daysAgo(89, 17, 0),
    read: true,
    workId: 'work-ch1',
  },
];