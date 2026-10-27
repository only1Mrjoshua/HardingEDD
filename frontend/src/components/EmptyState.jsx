import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'Nothing here yet', description, action, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-navy-100 bg-navy-50 px-6 py-12 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-navy-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif text-lg text-navy-900">{title}</h3>
      {description && <p className="mt-1 max-w-md text-sm text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}