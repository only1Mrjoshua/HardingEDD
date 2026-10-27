const STATUS_MAP = {
  approved: { label: 'Approved', className: 'bg-success/10 text-success' },
  with_reader_1: { label: 'With Reader 1', className: 'bg-navy-100 text-navy-700' },
  with_reader_2: { label: 'With Reader 2', className: 'bg-navy-100 text-navy-700' },
  with_advisor: { label: 'With Advisor', className: 'bg-navy-100 text-navy-700' },
  returned: { label: 'Returned to you', className: 'bg-warning/10 text-warning' },
  not_started: { label: 'Not started', className: 'bg-navy-100 text-muted' },
};

export default function StatusBadge({ status }) {
  const entry = STATUS_MAP[status] || { label: status, className: 'bg-navy-100 text-muted' };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${entry.className}`}
    >
      {entry.label}
    </span>
  );
}