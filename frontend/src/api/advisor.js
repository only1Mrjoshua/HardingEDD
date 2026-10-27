import { works, people } from '../mock/data';
import { clone, delay } from './client';

export async function getAssignedWorks() {
  await delay();
  return clone(works.filter((work) => work.currentHolder?.id === people.advisor.id));
}

export async function getWorkDetails(id) {
  await delay();
  const work = works.find((item) => item.id === id);
  if (!work) throw new Error('Work not found.');
  if (work.currentHolder?.id !== people.advisor.id) {
    throw new Error('This work is not assigned to you.');
  }
  return clone(work);
}

export async function approveWork({ workId, comment }) {
  await delay(600);
  const work = works.find((item) => item.id === workId);
  if (!work) throw new Error('Work not found.');

  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;

  work.status = 'approved';
  work.currentHolder = null;
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: people.advisor,
    to: people.candidate,
    action: 'approved',
    comment: comment || 'Approved.',
    arrivedAt: now,
    durationMs: lastArrival ? Date.now() - new Date(lastArrival).getTime() : 0,
  });
  return clone(work);
}

export async function returnWork({ workId, comment }) {
  await delay(600);
  const work = works.find((item) => item.id === workId);
  if (!work) throw new Error('Work not found.');

  if (!comment.trim()) {
    throw new Error('You must provide a comment when returning work.');
  }

  const now = new Date().toISOString();
  const lastArrival = work.movements[work.movements.length - 1]?.arrivedAt;

  work.status = 'returned';
  work.currentHolder = people.candidate;
  work.movements.push({
    id: `mv-${Date.now()}`,
    from: people.advisor,
    to: people.candidate,
    action: 'returned',
    comment,
    arrivedAt: now,
    durationMs: lastArrival ? Date.now() - new Date(lastArrival).getTime() : 0,
  });
  return clone(work);
}