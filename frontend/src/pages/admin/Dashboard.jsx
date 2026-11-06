import { useCallback, useEffect, useState } from 'react';
import { Users, User, FileText, CheckCircle2 } from 'lucide-react';
import Card from '../../components/Card';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import { getDashboardStats } from '../../api/admin';
import { formatDate } from '../../utils/date';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setStats(await getDashboardStats());
    } catch (err) {
      setError(err.message || 'We could not load the dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingSkeleton rows={4} label="Loading dashboard" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of all candidates, faculty, and dissertation progress.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-700 text-white">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted">Total Candidates</p>
            <p className="font-serif text-2xl text-navy-900">{stats.totalCandidates}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-700 text-white">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted">Faculty Members</p>
            <p className="font-serif text-2xl text-navy-900">{stats.totalFaculty}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-warning text-white">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted">Active Works</p>
            <p className="font-serif text-2xl text-navy-900">{stats.activeWorks}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-success text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted">Completed Works</p>
            <p className="font-serif text-2xl text-navy-900">{stats.completedWorks}</p>
          </div>
        </Card>
      </div>

      <Card title="Cohort Deadline">
        <p className="text-sm text-ink">
          The current cohort deadline for all candidates is <strong>{formatDate(stats.deadline)}</strong>.
        </p>
      </Card>
    </div>
  );
}