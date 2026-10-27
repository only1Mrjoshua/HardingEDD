import { Check } from 'lucide-react';

export default function ProgressStepper({ works }) {
  return (
    <ol className="flex items-start gap-1 overflow-x-auto pb-1">
      {works.map((work, index) => {
        const done = work.status === 'approved';
        const current = !done && work.status !== 'not_started';
        return (
          <li key={work.id} className="flex min-w-[78px] flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              <span
                className={`h-0.5 flex-1 ${
                  index === 0 ? 'invisible' : done || current ? 'bg-navy-600' : 'bg-navy-100'
                }`}
              />
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold ${
                  done
                    ? 'border-navy-700 bg-navy-700 text-white'
                    : current
                      ? 'border-navy-700 bg-white text-navy-800 ring-2 ring-gold-500'
                      : 'border-navy-100 bg-white text-muted'
                }`}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={`h-0.5 flex-1 ${
                  index === works.length - 1
                    ? 'invisible'
                    : done
                      ? 'bg-navy-600'
                      : 'bg-navy-100'
                }`}
              />
            </div>
            <span
              className={`text-center text-[11px] leading-tight ${
                current ? 'font-semibold text-navy-900' : 'text-muted'
              }`}
            >
              {work.type}
            </span>
          </li>
        );
      })}
    </ol>
  );
}