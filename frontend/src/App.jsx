import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { isAuthenticated } from './utils/auth';
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

function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
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
        <Route
          path="/candidate"
          element={
            <RequireAuth>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}