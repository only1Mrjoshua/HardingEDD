import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { changePassword, deleteAccount } from '../../api/reader1';
import { clearSession } from '../../utils/auth';

export default function Reader1Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    setFormError('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError('Fill in all three password fields.');
      return;
    }
    if (newPassword.length < 8) {
      setFormError('Your new password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError('The new passwords do not match.');
      return;
    }
    setSaving(true);
    try {
      await changePassword({ currentPassword, newPassword });
      showToast('Your password was updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setFormError(err.message || 'We could not update your password.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      await deleteAccount();
      clearSession();
      navigate('/login', { replace: true });
      showToast('Your account has been deleted.', 'error');
    } catch (err) {
      showToast(err.message || 'Could not delete account.', 'error');
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <Link
          to="/reader1/profile"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-navy-700 hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Profile
        </Link>
        <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Account Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your password and account status.</p>
      </div>

      <Card title="Change password">
        <form className="space-y-4 max-w-md" onSubmit={handlePasswordSubmit} noValidate>
          <Input
            label="Current password"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
          <Input
            label="New password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            hint="At least 8 characters."
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <Input
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {formError && <p className="text-sm text-danger">{formError}</p>}
          <Button type="submit" loading={saving}>
            Update password
          </Button>
        </form>
      </Card>

      <Card title="Danger Zone" className="border-danger/30 bg-danger/5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-danger">
            <ShieldAlert className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-navy-900">Delete Account</h3>
            <p className="mt-1 text-sm text-ink max-w-lg">
              Once you delete your account, there is no going back. All of your assigned works and data will be permanently removed.
            </p>
            <Button 
              variant="danger" 
              className="mt-4"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete my account
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        open={deleteModalOpen}
        title="Delete Account"
        onClose={() => !deleting && setDeleteModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount} loading={deleting}>
              Yes, delete my account
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink">
          Are you absolutely sure you want to delete your account? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}