export default function LoadingSkeleton({ rows = 3, label = 'Loading' }) {
  return (
    <div className="animate-pulse space-y-4" role="status" aria-label={label}>
      <div className="h-5 w-1/3 rounded-md bg-navy-100" />
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="space-y-2 rounded-md border border-navy-100 bg-navy-50 p-4">
          <div className="h-4 w-2/3 rounded-md bg-navy-100" />
          <div className="h-3 w-1/2 rounded-md bg-navy-100" />
          <div className="h-3 w-1/4 rounded-md bg-navy-100" />
        </div>
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}