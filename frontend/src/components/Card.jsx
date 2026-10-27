export default function Card({ title, action, className = '', children }) {
  return (
    <section className={`rounded-md border border-navy-100 bg-navy-50 p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="font-serif text-lg text-navy-900">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}