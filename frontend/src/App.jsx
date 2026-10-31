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

// Faculty imports
import FacultyLayout from './layouts/FacultyLayout';
import FacultyAssignedWorks from './pages/faculty/AssignedWorks';
import FacultyCandidates from './pages/faculty/Candidates';
import FacultyWorkDetails from './pages/faculty/WorkDetails';
import FacultyProfile from './pages/faculty/Profile';
import FacultySettings from './pages/faculty/Settings';

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

        {/* Faculty Routes */}
        <Route
          path="/faculty"
          element={
            <RequireAuth allowedRole="faculty">
              <FacultyLayout />
            </RequireAuth>
          }
        >
          <Route index element={<FacultyAssignedWorks />} />
          <Route path="candidates" element={<FacultyCandidates />} />
          <Route path="works/:id" element={<FacultyWorkDetails />} />
          <Route path="profile" element={<FacultyProfile />} />
          <Route path="settings" element={<FacultySettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}