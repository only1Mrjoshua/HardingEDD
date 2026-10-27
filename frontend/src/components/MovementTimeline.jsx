import { ArrowRight, CheckCircle2, RotateCcw, Send } from 'lucide-react';
import DateTimeText from './DateTimeText';
import DurationText from './DurationText';

const ACTION_LABEL = {
  submitted: 'Submitted',
  forwarded: 'Forwarded',
  returned: 'Returned',
  approved: 'Approved',
};

function ActionIcon({ action }) {
  if (action === 'approved') return <CheckCircle2 className="h-4 w-4" aria-hidden="true" />;
  if (action === 'returned') return <RotateCcw className="h-4 w-4" aria-hidden="true" />;
  return <Send className="h-4 w-4" aria-hidden="true" />;
}

export default function MovementTimeline({ movements }) {
  if (!movements || movements.length === 0) {
    return <p className="text-sm text-muted">No movements have been recorded for this work yet.</p>;
  }

  return (
    <ol>
      {movements.map((movement, index) => (
        <li key={movement.id} className="relative flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white ${
                movement.action === 'approved'
                  ? 'bg-success'
                  : movement.action === 'returned'
                    ? 'bg-warning'
                    : 'bg-navy-700'
              }`}
            >
              <ActionIcon action={movement.action} />
            </span>
            {index < movements.length - 1 && <span className="mt-1 w-px flex-1 bg-navy-100" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="font-medium text-navy-900">{movement.from.name}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              <span className="font-medium text-navy-900">{movement.to.name}</span>
              <span className="rounded-md bg-navy-100 px-1.5 py-0.5 text-[11px] font-medium text-navy-700">
                {ACTION_LABEL[movement.action] || movement.action}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">
              Arrived <DateTimeText value={movement.arrivedAt} /> · stayed{' '}
              <DurationText ms={movement.durationMs} />
            </p>
            {movement.comment && (
              <p className="mt-2 rounded-md border border-navy-100 bg-white p-3 text-sm text-ink">
                {movement.comment}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}