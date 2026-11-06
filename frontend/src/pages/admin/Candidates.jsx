import { useCallback, useEffect, useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import Button from '../../components/Button';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import { useToast } from '../../components/Toast';
import { getAllCandidates, getAllFaculty, assignCommittee, addCandidate } from '../../api/admin';

export default function AdminCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Assign Committee Modal
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [savingAssign, setSavingAssign] = useState(false);

  // Add Candidate Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', candidateNumber: '', cohortName: '' });
  const [savingNew, setSavingNew] = useState(false);
  
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [cands, fac] = await Promise.all([getAllCandidates(), getAllFaculty()]);
      setCandidates(cands);
      setFaculty(fac);
    } catch (err) {
      setError(err.message || 'We could not load candidates.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAssignModal(candidate) {
    setSelectedCandidate(candidate);
    setAssignments({ advisor: '', reader1: '', reader2: '', methodologist: '', stylist: '' });
    setAssignModalOpen(true);
  }

  async function handleAssign() {
    if (Object.values(assignments).some(val => !val)) {
      showToast('Please select a faculty member for all 5 roles.', 'error');
      return;
    }
    setSavingAssign(true);
    try {
      await assignCommittee({ candidateId: selectedCandidate.id, roles: assignments });
      showToast('Committee assigned successfully.');
      setAssignModalOpen(false);
      load();
    } catch (err) {
      showToast(err.message || 'Failed to assign committee.', 'error');
    } finally {
      setSavingAssign(false);
    }
  }

  async function handleAddCandidate(e) {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.candidateNumber) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setSavingNew(true);
    try {
      await addCandidate(formData);
      showToast('Candidate added successfully. Login created.');
      setAddModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', candidateNumber: '', cohortName: '' });
      load();
    } catch (err) {
      showToast(err.message || 'Failed to add candidate.', 'error');
    } finally {
      setSavingNew(false);
    }
  }

  const columns = [
    { key: 'name', header: 'Candidate', render: (c) => <span className="font-medium text-navy-900">{c.name}</span> },
    { key: 'candidateNumber', header: 'ID' },
    { key: 'cohortName', header: 'Cohort' },
    { key: 'advisor', header: 'Advisor', render: (c) => c.committeeDetails?.advisor || 'Unassigned' },
    { key: 'actions', header: '', render: (c) => (
        <Button variant="secondary" size="sm" onClick={() => openAssignModal(c)}>
          <Settings className="h-4 w-4" /> Assign Committee
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Candidates</h1>
          <p className="mt-1 text-sm text-muted">Manage all candidates and their committees.</p>
        </div>
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Candidate
        </Button>
      </div>

      {loading && <LoadingSkeleton rows={4} label="Loading candidates" />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && (
        <DataTable columns={columns} rows={candidates} getRowKey={(c) => c.id} />
      )}

      {/* Assign Committee Modal */}
      <Modal open={assignModalOpen} title={`Assign Committee: ${selectedCandidate?.name}`} onClose={() => !savingAssign && setAssignModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setAssignModalOpen(false)} disabled={savingAssign}>Cancel</Button>
            <Button onClick={handleAssign} loading={savingAssign}>Save Assignments</Button>
          </>
        }
      >
        <div className="space-y-4">
          {['advisor', 'reader1', 'reader2', 'methodologist', 'stylist'].map(role => (
            <div key={role}>
              <label className="block text-sm font-medium text-ink mb-1.5 capitalize">
                {role === 'reader1' ? 'Reader 1' : role === 'reader2' ? 'Reader 2' : role}
              </label>
              <select 
                value={assignments[role]} 
                onChange={(e) => setAssignments(prev => ({ ...prev, [role]: e.target.value }))}
                className="w-full rounded-md border border-navy-100 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-navy-600"
              >
                <option value="">Select Faculty...</option>
                {faculty.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </Modal>

      {/* Add Candidate Modal */}
      <Modal open={addModalOpen} title="Add New Candidate" onClose={() => !savingNew && setAddModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddModalOpen(false)} disabled={savingNew}>Cancel</Button>
            <Button type="submit" form="add-candidate-form" loading={savingNew}>Create Candidate</Button>
          </>
        }
      >
        <form id="add-candidate-form" onSubmit={handleAddCandidate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
            <Input label="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
          </div>
          <Input label="Email Address (Login)" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <Input label="Candidate Number" value={formData.candidateNumber} onChange={(e) => setFormData({...formData, candidateNumber: e.target.value})} required />
          <Input label="Cohort (e.g. Fall 2024)" value={formData.cohortName} onChange={(e) => setFormData({...formData, cohortName: e.target.value})} />
          <p className="text-xs text-muted mt-2">Default password for new candidates is <strong>Password123!</strong></p>
        </form>
      </Modal>
    </div>
  );
}