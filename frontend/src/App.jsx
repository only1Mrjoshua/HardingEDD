import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { isAuthenticated, getSession } from './utils/auth';
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import CandidateLayout from './layouts/CandidateLayout';
import Overview from './pages/candidate/Overview';
import MyWorks from './pages/candidate/MyWorks';
import WorkDetails from './pages/candidate/WorkDetails';
import ReviewHistory from './pages/candidate/ReviewHistory';
import Committee from './pages/candidate/Committee';
import Profile from './pages/candidate/Profile';
import Settings from './pages/candidate/Settings';
import NotFound from './pages/NotFound';

// Advisor imports
import AdvisorLayout from './layouts/AdvisorLayout';
import AdvisorCandidates from './pages/advisor/Candidates';
import AssignedWorks from './pages/advisor/AssignedWorks';
import AdvisorWorkDetails from './pages/advisor/WorkDetails';
import AdvisorProfile from './pages/advisor/Profile';
import AdvisorSettings from './pages/advisor/Settings';

// Reader 1 imports
import Reader1Layout from './layouts/Reader1Layout';
import Reader1AssignedWorks from './pages/reader1/AssignedWorks';
import Reader1Candidates from './pages/reader1/Candidates';
import Reader1WorkDetails from './pages/reader1/WorkDetails';
import Reader1Profile from './pages/reader1/Profile';
import Reader1Settings from './pages/reader1/Settings';

// Reader 2 imports
import Reader2Layout from './layouts/Reader2Layout';
import Reader2AssignedWorks from './pages/reader2/AssignedWorks';
import Reader2Candidates from './pages/reader2/Candidates';
import Reader2WorkDetails from './pages/reader2/WorkDetails';
import Reader2Profile from './pages/reader2/Profile';
import Reader2Settings from './pages/reader2/Settings';

// Methodologist imports
import MethodologistLayout from './layouts/MethodologistLayout';
import MethodologistAssignedReviews from './pages/methodologist/AssignedReviews';
import MethodologistCandidates from './pages/methodologist/Candidates';
import MethodologistWorkDetails from './pages/methodologist/WorkDetails';
import MethodologistProfile from './pages/methodologist/Profile';
import MethodologistSettings from './pages/methodologist/Settings';

function RequireAuth({ children, allowedRole }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  const session = getSession();
  if (allowedRole && session.user.role !== allowedRole) {
    return <Navigate to={`/${session.user.role}`} replace />;
  }
  return children;
}

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Candidate Routes */}
        <Route
          path="/candidate"
          element={
            <RequireAuth allowedRole="candidate">
              <CandidateLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Overview />} />
          <Route path="works" element={<MyWorks />} />
          <Route path="works/:id" element={<WorkDetails />} />
          <Route path="reviews" element={<ReviewHistory />} />
          <Route path="committee" element={<Committee />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Advisor Routes */}
        <Route
          path="/advisor"
          element={
            <RequireAuth allowedRole="advisor">
              <AdvisorLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AssignedWorks />} />
          <Route path="candidates" element={<AdvisorCandidates />} />
          <Route path="works/:id" element={<AdvisorWorkDetails />} />
          <Route path="profile" element={<AdvisorProfile />} />
          <Route path="settings" element={<AdvisorSettings />} />
        </Route>

        {/* Reader 1 Routes */}
        <Route
          path="/reader1"
          element={
            <RequireAuth allowedRole="reader1">
              <Reader1Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Reader1AssignedWorks />} />
          <Route path="candidates" element={<Reader1Candidates />} />
          <Route path="works/:id" element={<Reader1WorkDetails />} />
          <Route path="profile" element={<Reader1Profile />} />
          <Route path="settings" element={<Reader1Settings />} />
        </Route>

        {/* Reader 2 Routes */}
        <Route
          path="/reader2"
          element={
            <RequireAuth allowedRole="reader2">
              <Reader2Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Reader2AssignedWorks />} />
          <Route path="candidates" element={<Reader2Candidates />} />
          <Route path="works/:id" element={<Reader2WorkDetails />} />
          <Route path="profile" element={<Reader2Profile />} />
          <Route path="settings" element={<Reader2Settings />} />
        </Route>

        {/* Methodologist Routes */}
        <Route
          path="/methodologist"
          element={
            <RequireAuth allowedRole="methodologist">
              <MethodologistLayout />
            </RequireAuth>
          }
        >
          <Route index element={<MethodologistAssignedReviews />} />
          <Route path="candidates" element={<MethodologistCandidates />} />
          <Route path="reviews/:id" element={<MethodologistWorkDetails />} />
          <Route path="profile" element={<MethodologistProfile />} />
          <Route path="settings" element={<MethodologistSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}