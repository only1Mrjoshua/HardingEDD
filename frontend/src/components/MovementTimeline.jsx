import { ArrowRight, CheckCircle2, RotateCcw, Send, Download, FileText } from 'lucide-react';
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

            {movement.file && (
              <div className="mt-2 flex items-center gap-3 rounded-md border border-navy-100 bg-white p-3">
                <FileText className="h-4 w-4 shrink-0 text-navy-700" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-navy-900">{movement.file.name}</p>
                  <p className="text-[10px] text-muted">{movement.file.size}</p>
                </div>
                <button
                  type="button"
                  className="rounded-md p-1 text-navy-700 hover:bg-navy-50"
                  aria-label={`Download ${movement.file.name}`}
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}