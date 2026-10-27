import { people, sideReviews, works } from '../mock/data';
import { clone, delay } from './client';

const DOC_SIZE = '1.2 MB';

export async function getWorks() {
  await delay();
  return clone(works);
}

export async function getWork(id) {
  await delay();
  const work = works.find((item) => item.id === id);
  if (!work) {
    throw new Error('That work could not be found.');
  }
  return {
    ...clone(work),
    sideReviews: clone(sideReviews.filter((review) => review.workId === id)),
  };
}

export async function submitWork({ fileName, comment }) {
  await delay(600);
  const next = works.find((work) => work.status === 'not_started');
  if (!next) {
    throw new Error('There is no work left to submit.');
  }
  const now = new Date().toISOString();
  next.status = 'with_reader_1';
  next.version = 'v1';
  next.submittedAt = now;
  next.currentHolder = people.reader1;
  next.files = [
    { id: `file-${Date.now()}`, name: fileName, size: DOC_SIZE, uploadedAt: now },
  ];
  next.movements = [
    {
      id: `mv-${Date.now()}`,
      from: people.candidate,
      to: people.reader1,
      action: 'submitted',
      comment: comment || 'Submitting this work for review.',
      arrivedAt: now,
      durationMs: 0,
    },
  ];
  return clone(next);
}

export async function resubmitWork({ workId, fileName, comment }) {
  await delay(600);
  const work = works.find((item) => item.id === workId);
  if (!work) {
    throw new Error('That work could not be found.');
  }
  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;
  work.status = 'with_reader_1';
  work.currentHolder = people.reader1;
  work.version = 'v2';
  work.files.push({
    id: `file-${Date.now()}`,
    name: fileName,
    size: DOC_SIZE,
    uploadedAt: now,
  });
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: people.candidate,
    to: people.reader1,
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
  if (!work) {
    throw new Error('That work could not be found.');
  }
  sideReviews.push({
    id: `sr-${Date.now()}`,
    workId,
    reviewer: people.methodologist,
    status: 'requested',
    requestedAt: new Date().toISOString(),
    completedAt: null,
    durationMs: null,
    comment: '',
  });
  return { ok: true, reviewer: clone(people.methodologist) };
}