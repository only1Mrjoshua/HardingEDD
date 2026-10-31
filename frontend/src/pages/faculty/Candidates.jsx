import { useCallback, useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import Card from '../../components/Card';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import { getMyCandidates } from '../../api/faculty';

export default function FacultyCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setCandidates(await getMyCandidates());
    } catch (err) {
      setError(err.message || 'We could not load your candidates.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingSkeleton rows={3} label="Loading candidates" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">My Candidates</h1>
        <p className="mt-1 text-sm text-muted">Candidates you are serving on the committee.</p>
      </div>

      {candidates.length === 0 ? (
        <EmptyState title="No candidates assigned" description="You currently have no candidates assigned to you." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-700 text-sm font-semibold text-white">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  <div>
                    <p className="font-medium text-navy-900">{candidate.name}</p>
                    <p className="text-xs text-muted">Cohort {candidate.cohortName}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-ink">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted" />
                    {candidate.email}
                  </p>
                  <p>ID: {candidate.candidateNumber}</p>
                  <p className="text-xs font-medium text-gold-500 mt-2">Your Role: {candidate.myRole}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}