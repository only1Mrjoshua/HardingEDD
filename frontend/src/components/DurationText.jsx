import { formatDuration } from '../utils/date';

export default function DurationText({ ms, className = '' }) {
  return <span className={className}>{formatDuration(ms)}</span>;
}