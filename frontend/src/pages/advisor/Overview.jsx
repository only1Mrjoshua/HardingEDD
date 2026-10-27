import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileText, CheckCircle2 } from 'lucide-react';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import DateTimeText from '../../components/DateTimeText';
import { getAssignedWorks } from '../../api/advisor';
import { daysSince } from '../../utils/date';

export default function AdvisorOverview() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setWorks(await getAssignedWorks());
    } catch (err) {
      setError(err.message || 'We could not load your overview.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingSkeleton rows={3} label="Loading advisor overview" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Advisor Overview</h1>
        <p className="mt-1 text-sm text-muted">
          Review your assigned dissertations and provide feedback.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex items-center gap-4 bg-navy-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-700 text-white">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted">Pending your review</p>
            <p className="font-serif text-2xl text-navy-900">{works.length}</p>
          </div>
        </Card>
      </div>

      <Card title="Works awaiting your review">
        {works.length === 0 ? (
          <EmptyState
            title="No pending works"
            description="You have reviewed all assigned work. Great job!"
            icon={CheckCircle2}
          />
        ) : (
          <div className="space-y-4">
            {works.map((work) => {
              const lastMovement = work.movements[work.movements.length - 1];
              const days = lastMovement ? daysSince(lastMovement.arrivedAt) : 0;
              return (
                <div
                  key={work.id}
                  className="flex flex-col gap-4 rounded-md border border-navy-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-navy-900">{work.type}</p>
                      <StatusBadge status={work.status} />
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      From: {lastMovement.from.name} • Arrived{' '}
                      <DateTimeText value={lastMovement.arrivedAt} />
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-warning">
                      {days} {days === 1 ? 'day' : 'days'} waiting
                    </span>
                    <Link
                      to={`/advisor/works/${work.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-navy-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-navy-600"
                    >
                      Review <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}