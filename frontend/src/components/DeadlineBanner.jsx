import { AlertTriangle, CalendarClock, Clock } from 'lucide-react';
import { daysUntil, formatDate } from '../utils/date';

export function getDeadlineStatus(deadline) {
  const days = daysUntil(deadline);
  if (days < 0) return { level: 'passed', days, label: 'Deadline passed' };
  if (days <= 31) return { level: '1 month', days, label: 'Less than 1 month left' };
  if (days <= 92) return { level: '3 months', days, label: 'Less than 3 months left' };
  if (days <= 183) return { level: '6 months', days, label: 'Less than 6 months left' };
  return { level: 'ok', days, label: '' };
}

export default function DeadlineBanner({ deadline }) {
  const status = getDeadlineStatus(deadline);
  if (status.level === 'ok') return null;

  const urgent = status.level === 'passed' || status.level === '1 month';
  const Icon = status.level === 'passed' ? CalendarClock : AlertTriangle;

  return (
    <div
      className={`flex items-start gap-3 rounded-md border px-4 py-3 ${
        urgent ? 'border-danger/30 bg-danger/5' : 'border-warning/30 bg-warning/5'
      }`}
      role="status"
    >
      <Icon
        className={`mt-0.5 h-5 w-5 shrink-0 ${urgent ? 'text-danger' : 'text-warning'}`}
        aria-hidden="true"
      />
      <div>
        <p className={`text-sm font-medium ${urgent ? 'text-danger' : 'text-warning'}`}>
          {status.label}
        </p>
        <p className="mt-0.5 text-sm text-ink">
          Your cohort deadline is {formatDate(deadline)}. That is {status.days}{' '}
          {status.days === 1 ? 'day' : 'days'} from today.
        </p>
      </div>
    </div>
  );
}

export function DeadlineCountdown({ deadline }) {
  const status = getDeadlineStatus(deadline);
  const Icon = status.level === 'ok' ? Clock : CalendarClock;
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-navy-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="font-serif text-2xl text-navy-900">
          {status.days >= 0 ? status.days : 0}{' '}
          <span className="font-sans text-sm font-medium text-muted">days left</span>
        </p>
        <p className="text-sm text-muted">Deadline {formatDate(deadline)}</p>
      </div>
    </div>
  );
}