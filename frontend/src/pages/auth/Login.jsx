import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { login } from '../../api/auth';
import { isAuthenticated } from '../../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/candidate" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Enter your email address and password.');
      return;
    }
    setLoading(true);
    try {
      const session = await login({ email, password });
      
      // Redirect based on role
      if (session.user.role === 'advisor') {
        navigate('/advisor', { replace: true });
      } else if (session.user.role === 'reader1') {
        navigate('/reader1', { replace: true });
      } else if (session.user.role === 'reader2') {
        navigate('/reader2', { replace: true });
      } else if (session.user.role === 'methodologist') {
        navigate('/methodologist', { replace: true });
      } else if (session.user.role === 'stylist') {
        navigate('/stylist', { replace: true });
      } else {
        navigate('/candidate', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div
        className="relative hidden flex-col justify-between bg-navy-950 p-10 lg:flex"
        style={{
          backgroundImage: "url('/login-background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-navy-950/85" aria-hidden="true" />
        <div className="relative">
          <img src="/logo.svg" alt="Harding EDD" className="h-8 w-auto" />
        </div>
        <div className="relative">
          <span className="block h-0.5 w-10 bg-gold-500" aria-hidden="true" />
          <h1 className="mt-4 font-serif text-4xl leading-tight text-white">Harding EDD</h1>
          <p className="mt-4 max-w-md text-base text-navy-100">
            Follow your dissertation through every reader, every comment and every approval, from
            the proposal to the final document.
          </p>
        </div>
        <p className="relative text-xs text-navy-100">
          © {new Date().getFullYear()} Harding EDD. All rights reserved.
        </p>
      </div>

      <div className="flex items-center justify-center bg-white px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <img src="/logo-dark.svg" alt="Harding EDD" className="h-8 w-auto" />
          </div>
          <h2 className="mt-6 font-serif text-2xl text-navy-900 lg:mt-0">Sign in to your portal</h2>
          <p className="mt-1 text-sm text-muted">
            Use the email address on your candidate or committee record.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@harding.test"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-10 w-full rounded-md border border-navy-100 bg-white pl-3 pr-10 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-md text-muted hover:text-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="rounded-md text-sm font-medium text-navy-700 hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p
                className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger"
                role="alert"
              >
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              Login
            </Button>
          </form>

          <div className="mt-6 space-y-1 text-xs text-muted">
            <p className="font-medium text-ink mb-2">Demo Credentials</p>
            <p>Candidate: candidate@harding.test / Password123!</p>
            <p>Advisor: advisor@harding.test / Password123!</p>
            <p>Reader 1: reader1@harding.test / Password123!</p>
            <p>Reader 2: reader2@harding.test / Password123!</p>
            <p>Methodologist: methodologist@harding.test / Password123!</p>
            <p>Stylist: stylist@harding.test / Password123!</p>
          </div>
        </div>
      </div>
    </div>
  );
}