import { sideReviews, works } from '../mock/data';
import { clone, delay } from './client';

const REVIEWER_ROLES = ['Reader 1', 'Reader 2', 'Advisor'];

export async function getReviewHistory() {
  await delay();
  const reviews = [];

  works.forEach((work) => {
    work.movements.forEach((movement) => {
      if (!REVIEWER_ROLES.includes(movement.from.role)) return;
      reviews.push({
        id: movement.id,
        workId: work.id,
        workType: work.type,
        reviewer: movement.from,
        to: movement.to,
        action: movement.action,
        date: movement.arrivedAt,
        durationMs: movement.durationMs,
        comment: movement.comment,
        kind: 'main',
      });
    });
  });

  sideReviews.forEach((review) => {
    if (review.status !== 'completed') return;
    const work = works.find((item) => item.id === review.workId);
    reviews.push({
      id: review.id,
      workId: review.workId,
      workType: work ? work.type : 'Work',
      reviewer: review.reviewer,
      to: null,
      action: 'side_review',
      date: review.completedAt,
      durationMs: review.durationMs,
      comment: review.comment,
      kind: 'side',
    });
  });

  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  return clone(reviews);
}