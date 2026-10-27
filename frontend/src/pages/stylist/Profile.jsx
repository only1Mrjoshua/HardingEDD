import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { getSession } from '../../utils/auth';

export default function StylistProfile() {
  const session = getSession();

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Profile</h1>
          <p className="mt-1 text-sm text-muted">Your stylist account details.</p>
        </div>
        <div>
          <Button as={Link} to="/stylist/settings" variant="secondary">
            <Settings className="h-4 w-4" aria-hidden="true" />
            Settings
          </Button>
        </div>
      </div>

      <Card title="Stylist Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-b border-navy-100 py-2">
            <p className="text-xs uppercase tracking-wide text-muted">Full name</p>
            <p className="mt-1 text-sm text-ink">{session?.user?.name}</p>
          </div>
          <div className="border-b border-navy-100 py-2">
            <p className="text-xs uppercase tracking-wide text-muted">Email address</p>
            <p className="mt-1 text-sm text-ink">{session?.user?.email}</p>
          </div>
          <div className="border-b border-navy-100 py-2">
            <p className="text-xs uppercase tracking-wide text-muted">Role</p>
            <p className="mt-1 text-sm text-ink">Committee Stylist</p>
          </div>
          <div className="border-b border-navy-100 py-2">
            <p className="text-xs uppercase tracking-wide text-muted">Department</p>
            <p className="mt-1 text-sm text-ink">Academic Writing Center</p>
          </div>
        </div>
      </Card>
    </div>
  );
}