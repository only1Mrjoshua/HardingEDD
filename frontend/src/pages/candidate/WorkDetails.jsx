import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Send } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import MovementTimeline from '../../components/MovementTimeline';
import Modal from '../../components/Modal';
import FileUpload from '../../components/FileUpload';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import DateTimeText from '../../components/DateTimeText';
import DurationText from '../../components/DurationText';
import { useToast } from '../../components/Toast';
import { getWork, requestSideReview, resubmitWork } from '../../api/works';
import { daysSince } from '../../utils/date';

function InfoRow({ label, children }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-2 border-b border-navy-100 py-2 last:border-0">
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="text-sm text-ink">{children}</dd>
    </div>
  );
}

export default function WorkDetails() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resubmitOpen, setResubmitOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [sideLoading, setSideLoading] = useState(false);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const item = await getWork(id);
      setWork(item);
    } catch (err) {
      setError(err.message || 'We could not load this work.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  function closeResubmit() {
    setResubmitOpen(false);
    setFile(null);
    setComment('');
    setFormError('');
  }

  async function handleResubmit(event) {
    event.preventDefault();
    if (!file) {
      setFormError('Please attach the revised Word document.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      await resubmitWork({ workId: id, fileName: file.name, comment });
      showToast('Your revision was sent to Reader 1.');
      closeResubmit();
      await load();
    } catch (err) {
      setFormError(err.message || 'We could not resubmit this work.');
    } finally {
      setSaving(false);
    }
  }

  async function handleSideReview() {
    setSideLoading(true);
    try {
      const result = await requestSideReview({ workId: id });
      showToast(`Sent to ${result.reviewer.name} for a methodology check.`);
      await load();
    } catch (err) {
      showToast(err.message || 'We could not send this request.', 'error');
    } finally {
      setSideLoading(false);
    }
  }

  if (loading) return <LoadingSkeleton rows={4} label="Loading work details" />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!work) return <EmptyState title="Work not found" />;

  const lastMovement = work.movements[work.movements.length - 1];
  const daysWithHolder = lastMovement ? daysSince(lastMovement.arrivedAt) : null;
  const canResubmit = work.status === 'returned';
  const canRequestSideReview = work.status !== 'approved' && work.status !== 'not_started';

  return (
    <div className="space-y-5">
      <Link
        to="/candidate/works"
        className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-navy-700 hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to My Works
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">{work.type}</h1>
        <StatusBadge status={work.status} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card title="Movement history">
            <MovementTimeline movements={work.movements} />
          </Card>

          {work.sideReviews.length > 0 && (
            <Card title="Methodology and style reviews">
              <ul className="space-y-3">
                {work.sideReviews.map((review) => (
                  <li key={review.id} className="rounded-md border border-navy-100 bg-white p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-navy-900">{review.reviewer.name}</p>
                      <span className="rounded-md bg-navy-100 px-1.5 py-0.5 text-[11px] font-medium text-navy-700">
                        {review.status === 'completed' ? 'Completed' : 'Requested'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {review.reviewer.role} · requested <DateTimeText value={review.requestedAt} />
                      {review.completedAt && (
                        <>
                          {' '}
                          · completed <DateTimeText value={review.completedAt} /> · took{' '}
                          <DurationText ms={review.durationMs} />
                        </>
                      )}
                    </p>
                    {review.comment && <p className="mt-2 text-sm text-ink">{review.comment}</p>}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <div className="space-y-5">
          <Card title="Work information">
            <dl>
              <InfoRow label="Status">
                <StatusBadge status={work.status} />
              </InfoRow>
              <InfoRow label="Version">{work.version || '—'}</InfoRow>
              <InfoRow label="Submitted">
                <DateTimeText value={work.submittedAt} />
              </InfoRow>
              <InfoRow label="Holder">
                {work.currentHolder
                  ? `${work.currentHolder.name} (${work.currentHolder.role})`
                  : 'No one — this work is closed'}
              </InfoRow>
              <InfoRow label="With holder">
                {daysWithHolder === null
                  ? '—'
                  : `${daysWithHolder} ${daysWithHolder === 1 ? 'day' : 'days'}`}
              </InfoRow>
            </dl>
          </Card>

          <Card title="Files">
            {work.files.length === 0 ? (
              <p className="text-sm text-muted">No files have been uploaded for this work.</p>
            ) : (
              <ul className="space-y-2">
                {work.files.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 rounded-md border border-navy-100 bg-white p-3"
                  >
                    <FileText className="h-5 w-5 shrink-0 text-navy-700" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-navy-900">{item.name}</p>
                      <p className="text-xs text-muted">
                        {item.size} · <DateTimeText value={item.uploadedAt} />
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast(`Preparing ${item.name} for download.`)}
                      className="rounded-md p-1 text-navy-700 hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                      aria-label={`Download ${item.name}`}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {(canResubmit || canRequestSideReview) && (
            <Card title="Actions">
              <div className="flex flex-col gap-2">
                {canResubmit && (
                  <Button onClick={() => setResubmitOpen(true)}>Resubmit work</Button>
                )}
                {canRequestSideReview && (
                  <Button variant="secondary" onClick={handleSideReview} loading={sideLoading}>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send for methodology or style check
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      <Modal
        open={resubmitOpen}
        title={`Resubmit ${work.type}`}
        onClose={closeResubmit}
        footer={
          <>
            <Button variant="secondary" type="button" onClick={closeResubmit}>
              Cancel
            </Button>
            <Button type="submit" form="resubmit-form" loading={saving}>
              Resubmit
            </Button>
          </>
        }
      >
        <form id="resubmit-form" className="space-y-4" onSubmit={handleResubmit} noValidate>
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Revised Word document</p>
            <FileUpload file={file} onChange={setFile} />
          </div>
          <div>
            <label htmlFor="resubmit-comment" className="mb-1.5 block text-sm font-medium text-ink">
              What did you change?
            </label>
            <textarea
              id="resubmit-comment"
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Summarise the revisions you made."
              className="w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy-600"
            />
          </div>
          {formError && <p className="text-sm text-danger">{formError}</p>}
        </form>
      </Modal>
    </div>
  );
}