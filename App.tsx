
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GeneratorPage from './components/GeneratorPage';
import WardrobePage from './components/WardrobePage';
import Navigation from './components/Navigation';
import PricingPage from './components/PricingPage';
import { supabase } from './services/supabaseClient';
import { User } from '@supabase/supabase-js';

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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const handleStartGenerator = () => {
    if (!user) {
      // Store intended destination in location state
      navigate('/', { state: { from: '/generator' } });
      // Trigger sign-in (this will be handled by LandingPage)
    } else {
      navigate('/generator');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation user={user} />
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
