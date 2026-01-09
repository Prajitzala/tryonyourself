
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { signInWithGoogle, signOut } from '../services/supabaseClient';

interface NavigationProps {
  user: User | null;
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePricingClick = () => {
    setMobileMenuOpen(false);
    if (user) {
      navigate('/pricing');
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTryFreeClick = () => {
    if (!user) {
      // Store intended destination
      navigate('/', { state: { from: '/generator' } });
      signInWithGoogle();
    } else {
      navigate('/generator');
    }
    setMobileMenuOpen(false);
  };

  const handleWardrobeClick = () => {
    if (!user) {
      navigate('/', { state: { from: '/wardrobe' } });
      signInWithGoogle();
    } else {
      navigate('/wardrobe');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/40 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
          >
            <div className="size-8 text-black">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold tracking-tight">AI Outfit Generator</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/')} className="text-sm font-semibold hover:text-purple-600 transition-colors">Features</button>
            <button onClick={handlePricingClick} className="text-sm font-semibold hover:text-purple-600 transition-colors">Pricing</button>
            {user && (
              <button onClick={handleWardrobeClick} className="text-sm font-semibold hover:text-purple-600 transition-colors">Wardrobe</button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {user.user_metadata.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-black"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold border-2 border-black">
                      {user.email?.charAt(0)}
                    </div>
                  )}
                  <span className="hidden xl:block text-xs font-bold max-w-[100px] truncate">
                    {user.user_metadata.full_name || user.email}
                  </span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="text-xs font-bold text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signInWithGoogle()}
                className="text-sm font-semibold hover:text-purple-600 transition-colors"
              >
                Sign In
              </button>
            )}

            <button 
              onClick={handleTryFreeClick}
              className="playful-btn text-sm px-5 py-2"
            >
              {user ? 'Go to Room' : 'Sign Up'}
            </button>

            <button 
              className="md:hidden size-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-background-light pt-24 px-6 flex flex-col gap-8 animate-butter md:hidden">
          <button 
            className="text-4xl font-black text-left uppercase italic tracking-tighter"
            onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
          >
            Home.
          </button>
          <button 
            className="text-4xl font-black text-left uppercase italic tracking-tighter"
            onClick={handlePricingClick}
          >
            Pricing.
          </button>
          {user && (
            <button 
              className="text-4xl font-black text-left uppercase italic tracking-tighter"
              onClick={handleWardrobeClick}
            >
              Wardrobe.
            </button>
          )}
          <div className="mt-auto pb-12 flex flex-col gap-6">
             {user ? (
               <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 p-4 bg-white border-2 border-black rounded-2xl">
                   {user.user_metadata.avatar_url ? (
                     <img src={user.user_metadata.avatar_url} alt="Profile" className="w-12 h-12 rounded-full border-2 border-black" />
                   ) : (
                     <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl font-black border-2 border-black">
                       {user.email?.charAt(0).toUpperCase()}
                     </div>
                   )}
                   <div className="flex flex-col">
                     <span className="font-black uppercase italic text-sm">{user.user_metadata.full_name || 'User'}</span>
                     <span className="text-xs text-text-muted font-bold truncate max-w-[180px]">{user.email}</span>
                   </div>
                 </div>
                 <button 
                   onClick={() => { signOut(); setMobileMenuOpen(false); }}
                   className="w-full py-4 rounded-xl border-2 border-red-500 text-red-500 font-black uppercase italic"
                 >
                   Logout
                 </button>
               </div>
             ) : (
               <button 
                 onClick={() => { signInWithGoogle(); setMobileMenuOpen(false); }}
                 className="w-full py-4 rounded-2xl bg-white border-2 border-black font-black uppercase italic flex items-center justify-center gap-3 shadow-playful"
               >
                 Sign in with Google
               </button>
             )}
             <button 
               className="w-full py-5 rounded-2xl bg-primary border-2 border-black font-black uppercase italic shadow-playful"
               onClick={handleTryFreeClick}
             >
               {user ? 'Go to Room' : 'Start Dressing Now'}
             </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
