import { formatDateTime } from '../utils/date';

export default function DateTimeText({ value, className = '' }) {
  if (!value) return <span className={className}>—</span>;
  return (
    <time dateTime={value} className={className}>
      {formatDateTime(value)}
    </time>
  );
}