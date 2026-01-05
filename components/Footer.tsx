
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { signInWithGoogle } from '../services/supabaseClient';

interface FooterProps {
  user: User | null;
  onStart?: () => void;
}

const Footer: React.FC<FooterProps> = ({ user, onStart }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!user) {
      // Store intended destination in location state
      navigate('/', { state: { from: '/generator' } });
      signInWithGoogle();
    } else {
      // If user is signed in, proceed to generator
      if (onStart) {
        onStart();
      } else {
        navigate('/generator');
      }
    }
  };

  return (
    <div className="w-full">
      {/* SECTION: FOOTER CTA */}
      <section className="bg-[#0A0B1E] py-24 md:py-40 px-6 text-center">
         <div className="max-w-[1280px] mx-auto">
            <h2 className="text-white text-3xl sm:text-4xl md:text-[58px] font-[700] leading-tight md:leading-[69px] mb-4">Ready to try on your perfect look?</h2>
            <p className="text-white text-3xl sm:text-4xl md:text-[58px] font-[300] leading-tight md:leading-[69px] mb-12 md:mb-20 opacity-80">It’s time to experience TryOnYourself today!</p>
            <button 
              onClick={handleStartClick}
              className="bg-white text-[#0A0B1E] text-2xl md:text-[38px] font-[700] px-12 md:px-24 py-6 md:py-10 rounded-[30px] md:rounded-[56px] hover:scale-105 transition-all shadow-2xl active:scale-95 w-full sm:w-auto"
            >
              Get started free
            </button>
         </div>
      </section>

      {/* ACTUAL FOOTER */}
      <footer className="bg-[#0A0B1E] pt-16 md:pt-24 pb-12 md:pb-16 px-6">
         <div className="max-w-[1253px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-16">
            <div className="col-span-2 lg:col-span-2 space-y-4 md:space-y-6">
               <div className="flex items-center gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 butter-yellow rounded border border-white"></div>
                  <span className="text-white font-black text-xl md:text-2xl tracking-tighter">tryonyourself</span>
               </div>
               <p className="text-[#E6E7E8] opacity-60 text-[10px] md:text-[12px] font-[300] tracking-wider uppercase">© 2024 TryOnYourself</p>
            </div>
            {["Site", "Support", "Social"].map((cat) => (
               <div key={cat} className="space-y-4 md:space-y-6">
                  <h4 className="text-white text-[10px] md:text-[11px] font-[400] uppercase tracking-wider">{cat}</h4>
                  <ul className="space-y-3 md:space-y-4">
                     {cat === "Site" && ["Frontpage", "Style app", "Wardrobe", "Pricing", "Lookbook"].map(link => <li key={link} className="text-white/70 hover:text-white cursor-pointer text-[12px] transition-colors">{link}</li>)}
                     {cat === "Support" && ["Help Pages", "Terms", "Privacy", "GDPR", "Security"].map(link => <li key={link} className="text-white/70 hover:text-white cursor-pointer text-[12px] transition-colors">{link}</li>)}
                     {cat === "Social" && ["Twitter", "Facebook", "Linkedin", "Instagram"].map(link => <li key={link} className="text-white/70 hover:text-white cursor-pointer text-[12px] transition-colors">{link}</li>)}
                  </ul>
               </div>
            ))}
         </div>
      </footer>
    </div>
  );
};

export default Footer;
