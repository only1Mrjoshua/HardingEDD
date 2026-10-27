import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <img src="/logo-dark.svg" alt="Harding EDD" className="h-10 w-auto" />
      <h1 className="mt-8 font-serif text-3xl text-navy-900">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-6">
        <Button as={Link} to="/">
          Back to the home page
        </Button>
      </div>
    </div>
  );
}