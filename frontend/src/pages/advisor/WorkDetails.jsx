import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, FileText, RotateCcw } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import MovementTimeline from '../../components/MovementTimeline';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import DateTimeText from '../../components/DateTimeText';
import { useToast } from '../../components/Toast';
import { getWorkDetails, approveWork, returnWork } from '../../api/advisor';
import { daysSince } from '../../utils/date';

export default function AdvisorWorkDetails() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [comment, setComment] = useState('');
  const [actionError, setActionError] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setWork(await getWorkDetails(id));
    } catch (err) {
      setError(err.message || 'We could not load this work.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAction(action) {
    if (action === 'return' && !comment.trim()) {
      setActionError('Please provide a comment explaining what needs to be changed.');
      return;
    }
    
    setProcessing(true);
    setActionError('');
    
    try {
      if (action === 'approve') {
        await approveWork({ workId: id, comment });
        showToast('Work approved successfully.');
      } else {
        await returnWork({ workId: id, comment });
        showToast('Work returned to the candidate.');
      }
      await load();
      setComment('');
    } catch (err) {
      setActionError(err.message || `We could not ${action} this work.`);
    } finally {
      setProcessing(false);
    }
  }

  if (loading) return <LoadingSkeleton rows={4} label="Loading work details" />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!work) return null;

  const lastMovement = work.movements[work.movements.length - 1];
  const daysWithYou = lastMovement ? daysSince(lastMovement.arrivedAt) : 0;

  return (
    <div className="space-y-5">
      <Link
        to="/advisor/works"
        className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-navy-700 hover:text-navy-600"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Assigned Works
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">{work.type}</h1>
        <StatusBadge status={work.status} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="min-w-0 space-y-5 lg:col-span-2">
          <Card title="Movement history">
            <MovementTimeline movements={work.movements} />
          </Card>
        </div>

        <div className="min-w-0 space-y-5">
          <Card title="Action required" className="border-warning/30 bg-warning/5">
            <p className="text-sm text-ink mb-4">
              This work has been with you for <strong>{daysWithYou} {daysWithYou === 1 ? 'day' : 'days'}</strong>. Please review and take action.
            </p>
            
            <label htmlFor="comment" className="block text-sm font-medium text-ink mb-1.5">
              Your feedback
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comments here..."
              className="w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy-600 mb-4"
            />
            
            {actionError && <p className="text-sm text-danger mb-4">{actionError}</p>}

            <div className="flex flex-col gap-2">
              <Button 
                variant="primary" 
                onClick={() => handleAction('approve')}
                loading={processing}
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve Work
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => handleAction('return')}
                loading={processing}
              >
                <RotateCcw className="h-4 w-4" />
                Return to Candidate
              </Button>
            </div>
          </Card>

          <Card title="Files to review">
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
                    className="rounded-md p-1 text-navy-700 hover:bg-navy-50"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}