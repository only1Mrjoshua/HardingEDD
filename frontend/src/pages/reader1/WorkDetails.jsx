import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, FileText, RotateCcw, Send } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import MovementTimeline from '../../components/MovementTimeline';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import DateTimeText from '../../components/DateTimeText';
import FileUpload from '../../components/FileUpload';
import { useToast } from '../../components/Toast';
import { getWorkDetails, getCommitteeMembers, returnWork, forwardWork } from '../../api/reader1';
import { daysSince } from '../../utils/date';

export default function Reader1WorkDetails() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [actionError, setActionError] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const [actionType, setActionType] = useState('forward');
  const [forwardTarget, setForwardTarget] = useState('');
  
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [workData, memberData] = await Promise.all([
        getWorkDetails(id),
        getCommitteeMembers()
      ]);
      setWork(workData);
      setMembers(memberData);
      if (memberData.length > 0) setForwardTarget(memberData[0].id);
    } catch (err) {
      setError(err.message || 'We could not load this work.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAction() {
    setProcessing(true);
    setActionError('');
    
    try {
      if (actionType === 'return') {
        await returnWork({ workId: id, comment, file });
        showToast('Work returned to the candidate.');
      } else if (actionType === 'forward') {
        await forwardWork({ workId: id, toMemberId: forwardTarget, comment, file });
        showToast('Work forwarded successfully.');
      }
      await load();
      setComment('');
      setFile(null);
    } catch (err) {
      setActionError(err.message || 'We could not process this action.');
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
        to="/reader1"
        className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-navy-700 hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Assigned Works
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">{work.type}</h1>
          <p className="text-sm text-muted mt-1">
            Candidate: <span className="font-medium text-navy-900">{work.candidateName}</span>
          </p>
        </div>
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
              This work has been with you for <strong>{daysWithYou} {daysWithYou === 1 ? 'day' : 'days'}</strong>.
            </p>
            
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-ink cursor-pointer">
                <input 
                  type="radio" 
                  checked={actionType === 'forward'} 
                  onChange={() => setActionType('forward')} 
                  className="h-4 w-4 text-navy-700 focus:ring-navy-600" 
                />
                Forward to Committee Member
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-ink cursor-pointer">
                <input 
                  type="radio" 
                  checked={actionType === 'return'} 
                  onChange={() => setActionType('return')} 
                  className="h-4 w-4 text-navy-700 focus:ring-navy-600" 
                />
                Return to Candidate
              </label>
            </div>

            {actionType === 'forward' && (
              <div className="mb-4">
                <label htmlFor="forward-target" className="block text-sm font-medium text-ink mb-1.5">
                  Select Recipient
                </label>
                <select
                  id="forward-target"
                  value={forwardTarget}
                  onChange={(e) => setForwardTarget(e.target.value)}
                  className="w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-navy-600"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <p className="block text-sm font-medium text-ink mb-1.5">
                Upload Reviewed Document
              </p>
              <FileUpload file={file} onChange={setFile} />
            </div>
            
            <label htmlFor="comment" className="block text-sm font-medium text-ink mb-1.5">
              Feedback (Optional)
            </label>
            <textarea
              id="comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add any additional comments here..."
              className="w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy-600 mb-4"
            />
            
            {actionError && <p className="text-sm text-danger mb-4">{actionError}</p>}

            <Button 
              variant={actionType === 'forward' ? 'primary' : 'secondary'}
              onClick={handleAction}
              loading={processing}
              className="w-full"
            >
              {actionType === 'return' && <><RotateCcw className="h-4 w-4" /> Return to Candidate</>}
              {actionType === 'forward' && <><Send className="h-4 w-4" /> Forward Work</>}
            </Button>
          </Card>

          <Card title="Original Files">
            {work.files.length === 0 ? (
              <p className="text-sm text-muted">No original files attached.</p>
            ) : (
              <ul className="space-y-2">
                {work.files.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 rounded-md border border-navy-100 bg-white p-3">
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
        </div>
      </div>
    </div>
  );
}