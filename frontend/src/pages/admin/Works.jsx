import { useCallback, useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import { getAllWorks } from '../../api/admin';
import { daysSince } from '../../utils/date';

export default function AdminWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setWorks(await getAllWorks());
    } catch (err) {
      setError(err.message || 'We could not load works.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const columns = [
    { key: 'candidateName', header: 'Candidate', render: (w) => <span className="font-medium text-navy-900">{w.candidateName}</span> },
    { key: 'type', header: 'Work' },
    { key: 'version', header: 'Version', render: (w) => w.version || '—' },
    { key: 'status', header: 'Status', render: (w) => <StatusBadge status={w.status} /> },
    { 
      key: 'holder', 
      header: 'Current Holder', 
      render: (w) => w.currentHolder ? `${w.currentHolder.name} (${w.currentHolder.role})` : 'None' 
    },
    { 
      key: 'days', 
      header: 'Days with Holder', 
      render: (w) => {
        if (!w.currentHolder) return '—';
        const days = daysSince(w.movements[w.movements.length - 1]?.arrivedAt);
        return `${days} ${days === 1 ? 'day' : 'days'}`;
      }
    }
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">All Works</h1>
        <p className="mt-1 text-sm text-muted">System-wide view of every dissertation work.</p>
      </div>

      {loading && <LoadingSkeleton rows={4} label="Loading works" />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && (
        <DataTable columns={columns} rows={works} getRowKey={(w) => w.id} />
      )}
    </div>
  );
}