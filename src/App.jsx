import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import VehiclesPage from './pages/VehiclesPage';
import TripsPage from './pages/TripsPage';
import MaintenancePage from './pages/MaintenancePage';
import ExpensesPage from './pages/ExpensesPage';
import DriversPage from './pages/DriversPage';
import AnalyticsPage from './pages/AnalyticsPage';
import './App.css';

function ProtectedRoute({ children, allowedRoles }) {
  const { state } = useApp();
  if (!state.auth.isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(state.auth.user?.role)) return <Navigate to="/" replace />;
  return children;
}

function AppLayout() {
  const { state } = useApp();
  if (!state.auth.isAuthenticated) return <LoginPage />;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/vehicles" element={<ProtectedRoute allowedRoles={['Manager', 'Dispatcher']}><VehiclesPage /></ProtectedRoute>} />
          <Route path="/trips" element={<ProtectedRoute allowedRoles={['Manager', 'Dispatcher']}><TripsPage /></ProtectedRoute>} />
          <Route path="/maintenance" element={<ProtectedRoute allowedRoles={['Manager']}><MaintenancePage /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute allowedRoles={['Manager', 'Financial Analyst']}><ExpensesPage /></ProtectedRoute>} />
          <Route path="/drivers" element={<ProtectedRoute allowedRoles={['Manager', 'Dispatcher', 'Safety Officer']}><DriversPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute allowedRoles={['Manager', 'Financial Analyst']}><AnalyticsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
