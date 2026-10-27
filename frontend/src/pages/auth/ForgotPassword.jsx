import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { requestPasswordReset } from '../../api/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Enter the email address on your account.');
      return;
    }
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Unable to send the reset link.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 px-4 py-12">
      <div className="w-full max-w-md rounded-md border border-navy-100 bg-white p-6 sm:p-8">
        <img src="/logo-dark.svg" alt="Harding EDD" className="h-10 w-auto" />
        <h1 className="mt-6 font-serif text-2xl text-navy-900">Reset your password</h1>
        <p className="mt-1 text-sm text-muted">
          Enter your email address and we will send you a link to reset your password.
        </p>

        {sent ? (
          <div className="mt-6 rounded-md border border-success/30 bg-success/5 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-medium text-success">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Check your inbox
            </p>
            <p className="mt-1 text-sm text-ink">
              If an account exists for {email}, a reset link is on its way.
            </p>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@harding.test"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={error}
            />
            <Button type="submit" className="w-full" loading={loading}>
              Send reset link
            </Button>
          </form>
        )}

        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-md text-sm font-medium text-navy-700 hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to login
        </Link>
      </div>
    </div>
  );
}