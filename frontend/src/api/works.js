import { candidates, candidateCommittees, faculty, sideReviews, works } from '../mock/data';
import { clone, delay } from './client';
import { getSession } from '../utils/auth';

const DOC_SIZE = '1.2 MB';

export async function getWorks() {
  await delay();
  const userId = getSession()?.user?.id;
  return clone(works.filter((work) => work.candidateId === userId));
}

export async function getWork(id) {
  await delay();
  const work = works.find((item) => item.id === id);
  if (!work) throw new Error('That work could not be found.');
  return {
    ...clone(work),
    sideReviews: clone(sideReviews.filter((review) => review.workId === id)),
  };
}

export async function submitWork({ fileName, comment }) {
  await delay(600);
  const userId = getSession()?.user?.id;
  const next = works.find((work) => work.candidateId === userId && work.status === 'not_started');
  if (!next) throw new Error('There is no work left to submit.');
  
  const reader1Id = candidateCommittees[userId]?.reader1;
  const reader1Base = faculty.find(f => f.id === reader1Id);
  if (!reader1Base) throw new Error('You do not have a Reader 1 assigned yet. Please contact the admin.');
  const reader1 = { ...reader1Base, role: 'Reader 1' };

  const now = new Date().toISOString();
  next.status = 'with_reader_1';
  next.version = 'v1';
  next.submittedAt = now;
  next.currentHolder = reader1;
  next.files = [{ id: `file-${Date.now()}`, name: fileName, size: DOC_SIZE, uploadedAt: now }];
  next.movements = [{
    id: `mv-${Date.now()}`,
    from: candidates.find(c => c.id === userId),
    to: reader1,
    action: 'submitted',
    comment: comment || 'Submitting this work for review.',
    arrivedAt: now,
    durationMs: 0,
  }];
  return clone(next);
}

export async function resubmitWork({ workId, fileName, comment }) {
  await delay(600);
  const work = works.find((item) => item.id === workId);
  if (!work) throw new Error('That work could not be found.');
  
  const userId = getSession()?.user?.id;
  const reader1Id = candidateCommittees[userId]?.reader1;
  const reader1Base = faculty.find(f => f.id === reader1Id);
  if (!reader1Base) throw new Error('You do not have a Reader 1 assigned.');
  const reader1 = { ...reader1Base, role: 'Reader 1' };

  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;
  
  work.status = 'with_reader_1';
  work.currentHolder = reader1;
  work.version = 'v2';
  work.files.push({ id: `file-${Date.now()}`, name: fileName, size: DOC_SIZE, uploadedAt: now });
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: candidates.find(c => c.id === userId),
    to: reader1,
    action: 'submitted',
    comment: comment || 'Resubmitting with the requested revisions.',
    arrivedAt: now,
    durationMs: lastArrival ? Date.now() - new Date(lastArrival).getTime() : 0,
  });
  return clone(work);
}

export async function requestSideReview({ workId }) {
  await delay(500);
  const work = works.find((item) => item.id === workId);
  if (!work) throw new Error('That work could not be found.');
  
  const userId = getSession()?.user?.id;
  const methodologistId = candidateCommittees[userId]?.methodologist;
  const methodologistBase = faculty.find(f => f.id === methodologistId);
  if (!methodologistBase) throw new Error('You do not have a Methodologist assigned.');
  const methodologist = { ...methodologistBase, role: 'Methodologist' };

  sideReviews.push({
    id: `sr-${Date.now()}`,
    workId,
    reviewer: methodologist,
    status: 'requested',
    requestedAt: new Date().toISOString(),
    completedAt: null,
    durationMs: null,
    comment: '',
  });
  return { ok: true, reviewer: clone(methodologist) };
}