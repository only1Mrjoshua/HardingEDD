import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/Button';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import { getAssignedWorks } from '../../api/reader1';
import { daysSince } from '../../utils/date';

export default function Reader1AssignedWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const candidateFilter = searchParams.get('candidate');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setWorks(await getAssignedWorks());
    } catch (err) {
      setError(err.message || 'We could not load your assigned works.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredWorks = candidateFilter 
    ? works.filter(w => w.candidateId === candidateFilter)
    : works;

  const columns = [
    {
      key: 'candidate',
      header: 'Candidate',
      render: (work) => <span className="font-medium text-navy-900">{work.candidateName}</span>,
    },
    { key: 'type', header: 'Work', render: (work) => work.type },
    { key: 'version', header: 'Version', render: (work) => work.version || '—' },
    { key: 'status', header: 'Status', render: (work) => <StatusBadge status={work.status} /> },
    {
      key: 'days',
      header: 'Days waiting',
      render: (work) => {
        if (work.movements.length === 0) return '—';
        const days = daysSince(work.movements[work.movements.length - 1].arrivedAt);
        return `${days} ${days === 1 ? 'day' : 'days'}`;
      },
    },
    {
      key: 'actions',
      header: '',
      render: (work) => (
        <Button as={Link} to={`/reader1/works/${work.id}`} variant="secondary" size="sm">
          Review <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Assigned Works</h1>
        <p className="mt-1 text-sm text-muted">
          {candidateFilter ? 'Filtered by candidate.' : 'All dissertations currently waiting for your review.'}
        </p>
      </div>

      {loading && <LoadingSkeleton rows={3} label="Loading assigned works" />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && filteredWorks.length === 0 && (
        <EmptyState title="No works found" description="There are no works matching this view." />
      )}
      {!loading && !error && filteredWorks.length > 0 && (
        <DataTable columns={columns} rows={filteredWorks} getRowKey={(work) => work.id} />
      )}
    </div>
  );
}