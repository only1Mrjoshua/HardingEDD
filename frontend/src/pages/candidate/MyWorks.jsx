import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import Button from '../../components/Button';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import FileUpload from '../../components/FileUpload';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import { useToast } from '../../components/Toast';
import { getWorks, submitWork } from '../../api/works';
import { daysSince } from '../../utils/date';

function daysWithHolder(work) {
  if (!work.currentHolder || work.movements.length === 0) return null;
  return daysSince(work.movements[work.movements.length - 1].arrivedAt);
}

export default function MyWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const items = await getWorks();
      setWorks(items);
    } catch (err) {
      setError(err.message || 'We could not load your works.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const nextWork = works.find((work) => work.status === 'not_started');

  function closeModal() {
    setModalOpen(false);
    setFile(null);
    setComment('');
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      setFormError('Please attach your Word document.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      await submitWork({ fileName: file.name, comment });
      showToast(`${nextWork ? nextWork.type : 'Work'} submitted to Reader 1.`);
      closeModal();
      await load();
    } catch (err) {
      setFormError(err.message || 'We could not submit this work.');
    } finally {
      setSubmitting(false);
    }
  }

  const columns = [
    {
      key: 'type',
      header: 'Work',
      render: (work) => <span className="font-medium text-navy-900">{work.type}</span>,
    },
    { key: 'version', header: 'Version', render: (work) => work.version || '—' },
    { key: 'status', header: 'Status', render: (work) => <StatusBadge status={work.status} /> },
    {
      key: 'holder',
      header: 'Current holder',
      render: (work) => (work.currentHolder ? work.currentHolder.name : '—'),
    },
    {
      key: 'days',
      header: 'Days with holder',
      render: (work) => {
        const days = daysWithHolder(work);
        return days === null ? '—' : `${days} ${days === 1 ? 'day' : 'days'}`;
      },
    },
    {
      key: 'actions',
      header: '',
      render: (work) => (
        <Button as={Link} to={`/candidate/works/${work.id}`} variant="secondary" size="sm">
          Open
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">My Works</h1>
          <p className="mt-1 text-sm text-muted">
            Every chapter, its current holder, and how long it has been there.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} disabled={!nextWork}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Submit new work
        </Button>
      </div>

      {loading && <LoadingSkeleton rows={3} label="Loading your works" />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && works.length === 0 && (
        <EmptyState
          title="No works yet"
          description="Your proposal and chapters will appear here once you submit them."
        />
      )}
      {!loading && !error && works.length > 0 && (
        <DataTable columns={columns} rows={works} getRowKey={(work) => work.id} />
      )}

      <Modal
        open={modalOpen}
        title="Submit new work"
        onClose={closeModal}
        footer={
          <>
            <Button variant="secondary" onClick={closeModal} type="button">
              Cancel
            </Button>
            <Button type="submit" form="submit-work-form" loading={submitting}>
              Submit
            </Button>
          </>
        }
      >
        <form id="submit-work-form" className="space-y-4" onSubmit={handleSubmit} noValidate>
          {nextWork && (
            <p className="rounded-md border border-navy-100 bg-navy-50 px-3 py-2 text-sm text-ink">
              This will submit <span className="font-medium text-navy-900">{nextWork.type}</span> to
              Reader 1.
            </p>
          )}
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Word document</p>
            <FileUpload file={file} onChange={setFile} />
          </div>
          <div>
            <label htmlFor="submit-comment" className="mb-1.5 block text-sm font-medium text-ink">
              Comment for your committee
            </label>
            <textarea
              id="submit-comment"
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Add a short note about this submission."
              className="w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy-600"
            />
          </div>
          {formError && <p className="text-sm text-danger">{formError}</p>}
        </form>
      </Modal>
    </div>
  );
}