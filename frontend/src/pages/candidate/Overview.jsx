import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck } from 'lucide-react';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import ProgressStepper from '../../components/ProgressStepper';
import DeadlineBanner, { DeadlineCountdown } from '../../components/DeadlineBanner';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import { getCandidate, getCohort } from '../../api/candidate';
import { getWorks } from '../../api/works';
import { daysSince } from '../../utils/date';

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [candidate, cohort, works] = await Promise.all([
        getCandidate(),
        getCohort(),
        getWorks(),
      ]);
      setData({ candidate, cohort, works });
    } catch (err) {
      setError(err.message || 'We could not load your overview.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingSkeleton rows={4} label="Loading your overview" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  const { candidate, cohort, works } = data;
  const activeWork = [...works]
    .reverse()
    .find((work) => work.status !== 'approved' && work.status !== 'not_started');
  const lastMovement = activeWork?.movements[activeWork.movements.length - 1];
  const daysWithHolder = lastMovement ? daysSince(lastMovement.arrivedAt) : 0;
  const firstName = candidate.name.split(' ')[0];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Welcome back, {firstName}</h1>
        <p className="mt-1 text-sm text-muted">
          Here is where your dissertation stands today.
        </p>
      </div>

      <DeadlineBanner deadline={cohort.deadline} />

      <Card title="Dissertation progress">
        <ProgressStepper works={works} />
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Current stage">
          {activeWork ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-serif text-xl text-navy-900">{activeWork.type}</p>
                <StatusBadge status={activeWork.status} />
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-navy-700">
                  <UserCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    {activeWork.currentHolder?.name || 'No holder'}
                  </p>
                  <p className="text-xs text-muted">
                    {activeWork.currentHolder?.role} · has had it for {daysWithHolder}{' '}
                    {daysWithHolder === 1 ? 'day' : 'days'}
                  </p>
                </div>
              </div>
              <Link
                to={`/candidate/works/${activeWork.id}`}
                className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-navy-700 hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
              >
                Open {activeWork.type}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <EmptyState
              title="No work in progress"
              description="Submit your next chapter to start the review cycle."
            />
          )}
        </Card>

        <Card title="Deadline countdown">
          <DeadlineCountdown deadline={cohort.deadline} />
          <p className="mt-4 text-sm text-ink">
            Cohort deadline: {cohort.name}. Keep chapters moving so your committee has time to read.
          </p>
        </Card>
      </div>
    </div>
  );
}