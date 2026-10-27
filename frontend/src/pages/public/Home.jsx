import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileSearch, Users } from 'lucide-react';
import Button from '../../components/Button';

const FEATURES = [
  {
    icon: FileSearch,
    title: 'Track every stage',
    text: 'Follow your proposal through every chapter to the final document, from first submission to advisor approval.',
  },
  {
    icon: Users,
    title: 'See who has your work',
    text: 'Know exactly which committee member is reading your work and how long it has been sitting with them.',
  },
  {
    icon: Clock,
    title: 'Never miss a deadline',
    text: 'Clear countdowns and warnings at six, three and one month before your cohort deadline.',
  },
];

const STEPS = [
  { title: 'Submit your work', text: 'Upload a chapter with a short note for your committee.' },
  {
    title: 'Readers review',
    text: 'Reader 1 and Reader 2 read, comment, and pass it on or send it back.',
  },
  {
    title: 'Advisor approves',
    text: 'Your advisor gives final approval and the work is locked.',
  },
  {
    title: 'Track every move',
    text: 'Each hand-off is saved with dates, comments and durations.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 bg-navy-900">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" aria-label="Harding EDD home">
            <img src="/logo.svg" alt="Harding EDD" className="h-6 w-auto" />
          </Link>
          <Button as={Link} to="/login" size="sm">
            Login
          </Button>
        </div>
      </header>

      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <span className="block h-0.5 w-10 bg-gold-500" aria-hidden="true" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Dissertation tracking
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-tight text-white sm:text-5xl">
            Know exactly where your dissertation stands, every single day.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-navy-100 sm:text-lg">
            Harding EDD follows every chapter as it moves from you to your readers, to your advisor.
            See who has your work, what they said, and how long it has been there, all in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button as={Link} to="/login" size="lg">
              Open the candidate portal
            </Button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-white hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              See how it works
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-md border border-navy-100 bg-navy-50 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-navy-700">
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-serif text-lg text-navy-900">{feature.title}</h2>
              <p className="mt-2 text-sm text-ink">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl text-navy-900 sm:text-3xl">How it works</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink">
            Four simple steps from submission to approval, with a full history of every hand-off.
          </p>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-md border border-navy-100 bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy-700 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-serif text-base text-navy-900">{step.title}</h3>
                <p className="mt-1 text-sm text-ink">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="bg-navy-900">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <img src="/logo.svg" alt="Harding EDD" className="h-6 w-auto" />
              <p className="mt-3 max-w-md text-sm text-navy-100">
                Dissertation tracking for Ed.D. candidates at Harding.
              </p>
            </div>
            <nav className="flex flex-wrap gap-4 text-sm text-navy-100">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Use
              </a>
              <a href="#" className="hover:text-white">
                Accessibility
              </a>
            </nav>
          </div>
          <p className="mt-8 border-t border-navy-800 pt-4 text-xs text-navy-100">
            © {new Date().getFullYear()} Harding EDD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}