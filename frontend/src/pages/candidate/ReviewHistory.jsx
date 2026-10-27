import { useCallback, useEffect, useState } from 'react';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import DateTimeText from '../../components/DateTimeText';
import DurationText from '../../components/DurationText';
import { getReviewHistory } from '../../api/reviews';

const ACTION_LABEL = {
  forwarded: 'Forwarded',
  returned: 'Returned',
  approved: 'Approved',
  side_review: 'Side review',
};

export default function ReviewHistory() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setReviews(await getReviewHistory());
    } catch (err) {
      setError(err.message || 'We could not load your review history.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Review History</h1>
        <p className="mt-1 text-sm text-muted">
          Every reader and advisor review, with how long it took and what they said.
        </p>
      </div>

      {loading && <LoadingSkeleton rows={4} label="Loading review history" />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && reviews.length === 0 && (
        <EmptyState
          title="No reviews yet"
          description="Reviews will appear here once a committee member responds to your work."
        />
      )}
      {!loading && !error && reviews.length > 0 && (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-md border border-navy-100 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-navy-900">{review.reviewer.name}</p>
                  <p className="text-xs text-muted">
                    {review.reviewer.role} · {review.workType}
                  </p>
                </div>
                <span className="rounded-md bg-navy-100 px-2 py-0.5 text-xs font-medium text-navy-700">
                  {ACTION_LABEL[review.action] || review.action}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">
                Arrived <DateTimeText value={review.date} /> · took{' '}
                <DurationText ms={review.durationMs} />
                {review.to ? ` · sent to ${review.to.name}` : ''}
              </p>
              {review.comment && (
                <p className="mt-2 rounded-md border border-navy-100 bg-navy-50 p-3 text-sm text-ink">
                  {review.comment}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}