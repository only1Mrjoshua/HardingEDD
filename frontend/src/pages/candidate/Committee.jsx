import { useCallback, useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import { getCommittee } from '../../api/candidate';

function initials(name) {
  return name
    .replace(/^Dr\.\s*/, '')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

export default function Committee() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setMembers(await getCommittee());
    } catch (err) {
      setError(err.message || 'We could not load your committee.');
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
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">My Committee</h1>
        <p className="mt-1 text-sm text-muted">
          The five members who review your work from proposal to final document.
        </p>
      </div>

      {loading && <LoadingSkeleton rows={3} label="Loading your committee" />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && members.length === 0 && (
        <EmptyState
          title="No committee members"
          description="Your committee will appear here once it is assigned."
        />
      )}
      {!loading && !error && members.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <li key={member.id} className="rounded-md border border-navy-100 bg-navy-50 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-700 text-sm font-semibold text-white">
                  {initials(member.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy-900">{member.name}</p>
                  <p className="text-xs text-muted">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink">{member.department}</p>
              <a
                href={`mailto:${member.email}`}
                className="mt-2 inline-flex items-center gap-2 rounded-md text-sm font-medium text-navy-700 hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {member.email}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}