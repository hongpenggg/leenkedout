import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { TopNavBar } from '@/components/navigation/TopNavBar';
import { SideNavBar } from '@/components/navigation/SideNavBar';
import { BottomNavBar } from '@/components/navigation/BottomNavBar';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Translator } from '@/pages/Translator';
import { Feed } from '@/pages/Feed';
import { HumbleBrag } from '@/pages/HumbleBrag';
import { Saved } from '@/pages/Saved';
import { Toaster } from '@/components/ui/sonner';
import { Decoder } from '@/pages/Decoder';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl animate-spin">refresh</span>
          <span className="text-on-surface font-headline font-bold">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl animate-spin">refresh</span>
          <span className="text-on-surface font-headline font-bold">Loading...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <TopNavBar />
      <div className="flex">
        <SideNavBar />
        <div className="flex-1">
          {children}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Translator />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Feed />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/humble-brag"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HumbleBrag />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Saved />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/decode"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Decoder />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
