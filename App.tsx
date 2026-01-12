
import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import { supabase } from './services/supabaseClient';
import { User } from '@supabase/supabase-js';

// Lazy load components for code splitting
const LandingPage = lazy(() => import('./components/LandingPage'));
const GeneratorPage = lazy(() => import('./components/GeneratorPage'));
const WardrobePage = lazy(() => import('./components/WardrobePage'));
const PricingPage = lazy(() => import('./components/PricingPage'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-16 h-16 border-[6px] border-black border-t-[#FFFD63] rounded-full animate-spin" />
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; user: User | null }> = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Main App Content (needs to be inside Router)
const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [persistedPerson, setPersistedPerson] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setUser(session?.user ?? null);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      
      const newUser = session?.user ?? null;
      setUser(newUser);
      
      // If user just signed in (event is SIGNED_IN)
      if (newUser && event === 'SIGNED_IN') {
        if (location.state?.from) {
          navigate(location.state.from, { replace: true });
        } else if (location.pathname === '/') {
          // Only redirect from home to generator if they just signed in
          navigate('/generator', { replace: true });
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  const handleStartGenerator = useCallback(() => {
    if (!user) {
      // Store intended destination in location state
      navigate('/', { state: { from: '/generator' } });
      // Trigger sign-in (this will be handled by LandingPage)
    } else {
      navigate('/generator');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <Navigation user={user} />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage onStart={handleStartGenerator} user={user} />} 
          />
          <Route 
            path="/generator" 
            element={
              <ProtectedRoute user={user}>
                <GeneratorPage 
                  user={user} 
                  persistedPerson={persistedPerson}
                  setPersistedPerson={setPersistedPerson}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wardrobe" 
            element={
              <ProtectedRoute user={user}>
                <WardrobePage user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pricing" 
            element={<PricingPage user={user} onStart={handleStartGenerator} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
