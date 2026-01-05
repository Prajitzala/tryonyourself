
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
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1328px] h-14 md:h-16 z-[60] bg-white/95 backdrop-blur-sm rounded-xl md:rounded-[20px] nav-shadow flex items-center justify-between px-4 md:px-6 border border-gray-100/50">
        <div 
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 butter-yellow rounded-md border-2 border-black group-hover:rotate-12 transition-transform"></div>
          <span className="font-black text-lg md:text-[20px] tracking-tighter butter-dark whitespace-nowrap">tryonyourself</span>
        </div>

        {/* Desktop Navigation - Center removed, items moved to right */}
        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={handlePricingClick}
            className="hidden md:block text-[12px] font-medium butter-dark px-3 py-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            Pricing
          </button>

          {user && (
            <button 
              onClick={handleWardrobeClick}
              className={`hidden md:block text-[12px] font-medium px-3 py-2 rounded-xl transition-all ${location.pathname === '/wardrobe' ? 'bg-[#FFFD63] border-2 border-black' : 'butter-dark hover:bg-gray-100'}`}
            >
              Wardrobe
            </button>
          )}
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                {user.user_metadata.avatar_url ? (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="w-7 h-7 rounded-full border border-gray-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full butter-yellow flex items-center justify-center text-[10px] font-bold border border-black">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden xl:block text-[11px] font-medium butter-dark max-w-[100px] truncate">
                  {user.user_metadata.full_name || user.email}
                </span>
              </div>
              <button 
                onClick={() => signOut()}
                className="hidden md:block text-[12px] font-medium text-red-500 px-3 py-2 hover:bg-red-50 rounded-xl transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signInWithGoogle()}
              className="hidden md:block text-[12px] font-medium butter-dark px-3 py-2 hover:bg-gray-100 rounded-xl transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in
            </button>
          )}

          <button 
            onClick={handleTryFreeClick}
            className="bg-[rgba(10,11,30,0.1)] text-[#0A0B1E] px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[11px] md:text-[12px] font-bold hover:bg-[rgba(10,11,30,0.15)] transition-all"
          >
            Try Free
          </button>
          <button 
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`w-5 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-black transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-white pt-24 px-6 flex flex-col gap-6 animate-butter md:hidden">
          <button 
            className="text-3xl font-black text-left butter-dark tracking-tighter"
            onClick={handlePricingClick}
          >
            Pricing.
          </button>
          {user && (
            <button 
              className={`text-3xl font-black text-left tracking-tighter ${location.pathname === '/wardrobe' ? 'text-[#FFFD63] [-webkit-text-stroke:2px_black]' : 'butter-dark'}`}
              onClick={handleWardrobeClick}
            >
              Wardrobe.
            </button>
          )}
          <div className="mt-auto pb-10 flex flex-col gap-4">
             {user ? (
               <>
                 <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-xl">
                   {user.user_metadata.avatar_url ? (
                     <img 
                       src={user.user_metadata.avatar_url} 
                       alt="Profile" 
                       className="w-10 h-10 rounded-full border border-gray-200"
                     />
                   ) : (
                     <div className="w-10 h-10 rounded-full butter-yellow flex items-center justify-center text-lg font-bold border border-black">
                       {user.email?.charAt(0).toUpperCase()}
                     </div>
                   )}
                   <div className="flex flex-col">
                     <span className="font-bold text-[14px]">{user.user_metadata.full_name || 'User'}</span>
                     <span className="text-[12px] text-gray-500">{user.email}</span>
                   </div>
                 </div>
                 <button 
                   onClick={() => { signOut(); setMobileMenuOpen(false); }}
                   className="w-full py-4 rounded-xl border-2 border-red-500 text-red-500 font-bold"
                 >
                   Logout
                 </button>
               </>
             ) : (
               <button 
                 onClick={() => { signInWithGoogle(); setMobileMenuOpen(false); }}
                 className="w-full py-4 rounded-xl border-2 border-black font-bold flex items-center justify-center gap-2"
               >
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                   <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                 </svg>
                 Sign in with Google
               </button>
             )}
             <button 
               className="w-full py-4 rounded-xl butter-yellow border-2 border-black font-bold"
               onClick={handleTryFreeClick}
             >
               {user ? 'Your Room' : 'Start Dressing Now'}
             </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
