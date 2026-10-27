export default function Input({ label, id, error, hint, className = '', ...props }) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy-600 ${
          error ? 'border-danger' : 'border-navy-100'
        } ${className}`}
        {...props}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}