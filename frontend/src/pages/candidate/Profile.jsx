import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Edit2, Save, X, FileText } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import DataTable from '../../components/DataTable';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ErrorState from '../../components/ErrorState';
import { useToast } from '../../components/Toast';
import { getCandidate, getDegrees, updateProfile } from '../../api/candidate';
import { formatDate } from '../../utils/date';

function ReadOnlyField({ label, value }) {
  return (
    <div className="border-b border-navy-100 py-2">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-sm text-ink break-words">{value || '—'}</p>
    </div>
  );
}

export default function Profile() {
  const [candidate, setCandidate] = useState(null);
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [profile, degreeList] = await Promise.all([getCandidate(), getDegrees()]);
      setCandidate(profile);
      setFormData(profile);
      setDegrees(degreeList);
    } catch (err) {
      setError(err.message || 'We could not load your profile.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await updateProfile(formData);
      setCandidate(updated);
      setIsEditing(false);
      showToast('Profile updated successfully.');
    } catch (err) {
      showToast(err.message || 'Failed to update profile.', 'error');
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setFormData(candidate);
    setIsEditing(false);
  }

  if (loading) return <LoadingSkeleton rows={5} label="Loading your profile" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  const degreeColumns = [
    { key: 'degree', header: 'Earned degree' },
    { key: 'institution', header: 'College/University' },
    { key: 'graduationDate', header: 'Graduation date', render: (d) => formatDate(d.graduationDate) },
  ];

  return (
    <div className="space-y-5">
      {/* Header section with wrap for mobile */}
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-navy-900 sm:text-3xl">Profile</h1>
          <p className="mt-1 text-sm text-muted">Your candidate record and account details.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button as={Link} to="/candidate/settings" variant="secondary">
            <Settings className="h-4 w-4" aria-hidden="true" />
            Settings
          </Button>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4" aria-hidden="true" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleCancel} disabled={saving}>
                <X className="h-4 w-4" aria-hidden="true" />
                Cancel
              </Button>
              <Button onClick={handleSave} loading={saving}>
                <Save className="h-4 w-4" aria-hidden="true" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Added min-w-0 to prevent grid blowing out on mobile */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="min-w-0 space-y-5 lg:col-span-2">
          <Card title="Program Information">
            <div className="grid gap-4 sm:grid-cols-2">
              {isEditing ? (
                <>
                  <Input label="Candidate number" name="candidateNumber" value={formData.candidateNumber} onChange={handleChange} />
                  <Input label="Program seeking" name="programSeeking" value={formData.programSeeking} onChange={handleChange} />
                  <Input label="Preferred location" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} />
                  <Input label="Cohort" name="cohortName" value={formData.cohortName} onChange={handleChange} />
                  <Input label="Semester to enroll" name="semesterEnroll" value={formData.semesterEnroll} onChange={handleChange} />
                  <Input label="Must complete semester" name="mustComplete" value={formData.mustComplete} onChange={handleChange} />
                  <Input label="Status" name="status" value={formData.status} onChange={handleChange} />
                  <Input label="Date Graduated" name="dateGraduated" value={formData.dateGraduated} onChange={handleChange} disabled={formData.status !== 'Graduated'} />
                </>
              ) : (
                <>
                  <ReadOnlyField label="Candidate number" value={candidate.candidateNumber} />
                  <ReadOnlyField label="Program seeking" value={candidate.programSeeking} />
                  <ReadOnlyField label="Preferred location" value={candidate.preferredLocation} />
                  <ReadOnlyField label="Cohort" value={candidate.cohortName} />
                  <ReadOnlyField label="Semester to enroll" value={candidate.semesterEnroll} />
                  <ReadOnlyField label="Must complete semester" value={candidate.mustComplete} />
                  <ReadOnlyField label="Status" value={candidate.status} />
                  <ReadOnlyField label="Date Graduated" value={candidate.dateGraduated} />
                </>
              )}
            </div>
          </Card>

          <Card title="Candidate Information">
            <div className="grid gap-4 sm:grid-cols-2">
              {isEditing ? (
                <>
                  <Input label="First name" name="firstName" value={formData.firstName} onChange={handleChange} />
                  <Input label="Middle name" name="middleName" value={formData.middleName} onChange={handleChange} />
                  <Input label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} />
                  <Input label="Preferred name" name="preferredName" value={formData.preferredName} onChange={handleChange} />
                  <Input label="Maiden name" name="maidenName" value={formData.maidenName} onChange={handleChange} />
                  <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
                  <Input label="City" name="city" value={formData.city} onChange={handleChange} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="State" name="state" value={formData.state} onChange={handleChange} />
                    <Input label="Zip" name="zip" value={formData.zip} onChange={handleChange} />
                  </div>
                  <Input label="Primary email" name="primaryEmail" value={formData.primaryEmail} onChange={handleChange} type="email" />
                  <Input label="Other email" name="otherEmail" value={formData.otherEmail} onChange={handleChange} type="email" />
                  <Input label="Home phone" name="homePhone" value={formData.homePhone} onChange={handleChange} />
                  <Input label="Mobile phone" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} />
                  <Input label="Date of birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                  <Input label="Church affiliation" name="churchAffiliation" value={formData.churchAffiliation} onChange={handleChange} />
                  <Input label="School/Employer" name="schoolEmployer" value={formData.schoolEmployer} onChange={handleChange} />
                  <Input label="Work phone" name="workPhone" value={formData.workPhone} onChange={handleChange} />
                  <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="hasLicence"
                      name="hasLicence"
                      checked={formData.hasLicence}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-navy-100 text-navy-700 focus:ring-navy-600"
                    />
                    <label htmlFor="hasLicence" className="text-sm text-ink">
                      I currently hold an educator licence
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <ReadOnlyField label="First name" value={candidate.firstName} />
                  <ReadOnlyField label="Middle name" value={candidate.middleName} />
                  <ReadOnlyField label="Last name" value={candidate.lastName} />
                  <ReadOnlyField label="Preferred name" value={candidate.preferredName} />
                  <ReadOnlyField label="Maiden name" value={candidate.maidenName} />
                  <ReadOnlyField label="Address" value={candidate.address} />
                  <ReadOnlyField label="City" value={candidate.city} />
                  <ReadOnlyField label="State" value={candidate.state} />
                  <ReadOnlyField label="Zip" value={candidate.zip} />
                  <ReadOnlyField label="Primary email" value={candidate.primaryEmail} />
                  <ReadOnlyField label="Other email" value={candidate.otherEmail} />
                  <ReadOnlyField label="Home phone" value={candidate.homePhone} />
                  <ReadOnlyField label="Mobile phone" value={candidate.mobilePhone} />
                  <ReadOnlyField label="Date of birth" value={formatDate(candidate.dob)} />
                  <ReadOnlyField label="Church affiliation" value={candidate.churchAffiliation} />
                  <ReadOnlyField label="School/Employer" value={candidate.schoolEmployer} />
                  <ReadOnlyField label="Work phone" value={candidate.workPhone} />
                  <ReadOnlyField label="Educator licence" value={candidate.hasLicence ? 'Yes' : 'No'} />
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Added min-w-0 here as well to contain the table */}
        <div className="min-w-0 space-y-5">
          <Card title="Photo & Documents">
            <div className="flex flex-col items-center justify-center border border-navy-100 bg-white p-4 rounded-md">
              <img
                src={candidate.avatar}
                alt="Candidate portrait"
                className="h-40 w-32 rounded-md object-cover"
              />
              {isEditing && (
                <Button variant="secondary" size="sm" className="mt-4">
                  Change Photo
                </Button>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-ink">
              <FileText className="h-5 w-5 text-navy-700" />
              <span>Documents ({candidate.documentsCount})</span>
            </div>
          </Card>

          <Card title="Candidate Degrees">
            <DataTable columns={degreeColumns} rows={degrees} getRowKey={(d) => d.id} />
          </Card>
        </div>
      </div>
    </div>
  );
}