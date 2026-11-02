import { useCallback, useEffect, useState } from 'react';
import { Mail, Users } from 'lucide-react';
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
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">My Committees</h1>
        <p className="mt-1 text-sm text-muted">
          The candidates you are assigned to, and the other members of their committees.
        </p>
      </div>

      {candidates.length === 0 ? (
        <EmptyState title="No candidates assigned" description="You currently have no candidates assigned to you." />
      ) : (
        <div className="grid gap-5">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="rounded-md border border-navy-100 bg-navy-50 p-5">
              <div className="flex flex-col gap-4 border-b border-navy-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-700 text-sm font-semibold text-white">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  <div>
                    <p className="font-serif text-lg text-navy-900">{candidate.name}</p>
                    <p className="text-xs text-muted">{candidate.programSeeking} · Cohort {candidate.cohortName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <span className="inline-flex rounded-md bg-gold-500/10 px-2 py-0.5 text-xs font-semibold text-gold-500">
                    Your Role: {candidate.myRole}
                  </span>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <Mail className="h-3 w-3" />
                    {candidate.email}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="flex items-center gap-2 text-sm font-medium text-navy-900 mb-3">
                  <Users className="h-4 w-4 text-navy-700" />
                  Committee Members
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {candidate.committee.map((member) => (
                    <div key={member.id} className="rounded-md border border-navy-100 bg-white p-3">
                      <p className="text-sm font-medium text-navy-900">{member.name}</p>
                      <p className="text-xs text-muted">{member.role}</p>
                      <p className="text-xs text-muted mt-1">{member.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}