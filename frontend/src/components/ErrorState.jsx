import { AlertCircle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-danger/30 bg-danger/5 px-6 py-12 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-danger">
        <AlertCircle className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif text-lg text-navy-900">We could not load this page</h3>
      <p className="mt-1 max-w-md text-sm text-muted">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}