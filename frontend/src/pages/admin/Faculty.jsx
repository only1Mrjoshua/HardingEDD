import { useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/Button';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import { useToast } from '../../components/Toast';
import { getAllFaculty, addFaculty } from '../../api/admin';

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  const [savingNew, setSavingNew] = useState(false);
  
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setFaculty(await getAllFaculty());
    } catch (err) {
      setError(err.message || 'We could not load faculty.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAddFaculty(e) {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Please enter a name and email.', 'error');
      return;
    }
    setSavingNew(true);
    try {
      await addFaculty(formData);
      showToast('Faculty added successfully. Login created.');
      setAddModalOpen(false);
      setFormData({ name: '', email: '', department: '' });
      load();
    } catch (err) {
      showToast(err.message || 'Failed to add faculty.', 'error');
    } finally {
      setSavingNew(false);
    }
  }

  const columns = [
    { key: 'name', header: 'Faculty Name', render: (f) => <span className="font-medium text-navy-900">{f.name}</span> },
    { key: 'email', header: 'Email' },
    { key: 'department', header: 'Department' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Faculty Members</h1>
          <p className="mt-1 text-sm text-muted">All registered faculty members available for committee assignment.</p>
        </div>
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Faculty
        </Button>
      </div>

      {loading && <LoadingSkeleton rows={4} label="Loading faculty" />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && (
        <DataTable columns={columns} rows={faculty} getRowKey={(f) => f.id} />
      )}

      {/* Add Faculty Modal */}
      <Modal open={addModalOpen} title="Add New Faculty Member" onClose={() => !savingNew && setAddModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddModalOpen(false)} disabled={savingNew}>Cancel</Button>
            <Button type="submit" form="add-faculty-form" loading={savingNew}>Create Faculty</Button>
          </>
        }
      >
        <form id="add-faculty-form" onSubmit={handleAddFaculty} className="space-y-4">
          <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <Input label="Email Address (Login)" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <Input label="Department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
          <p className="text-xs text-muted mt-2">Default password for new faculty is <strong>Password123!</strong></p>
        </form>
      </Modal>
    </div>
  );
}