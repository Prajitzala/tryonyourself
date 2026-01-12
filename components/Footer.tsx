
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
    <footer className="section-container border-t-2 border-black/10 bg-white/40 backdrop-blur-xl pt-10 sm:pt-12 md:pt-16 pb-8 sm:pb-10 md:pb-12 mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-black">
              <div className="size-7 sm:size-8 text-black">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"></path>
                </svg>
              </div>
              <h3 className="font-black text-lg sm:text-xl">Tryonyourself</h3>
            </div>
            <p className="text-xs sm:text-sm font-bold text-black/60 max-w-xs leading-relaxed">
              Revolutionizing how you decide what to wear. Your virtual fitting room, available 24/7.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="font-black text-black text-sm sm:text-base">Product</h4>
            <a className="text-xs sm:text-sm font-bold text-black/60 hover:text-black transition-colors" href="#">Features</a>
            <a className="text-xs sm:text-sm font-bold text-black/60 hover:text-black transition-colors" href="#pricing">Pricing</a>
            <a className="text-xs sm:text-sm font-bold text-black/60 hover:text-black transition-colors" href="#">For Brands</a>
            <a className="text-xs sm:text-sm font-bold text-black/60 hover:text-black transition-colors" href="#">API</a>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="font-black text-black text-sm sm:text-base">Company</h4>
            <a className="text-xs sm:text-sm font-bold text-black/60 hover:text-black transition-colors" href="#">About Us</a>
            <a className="text-xs sm:text-sm font-bold text-black/60 hover:text-black transition-colors" href="#">Blog</a>
            <a className="text-xs sm:text-sm font-bold text-black/60 hover:text-black transition-colors" href="#">Careers</a>
            <a className="text-xs sm:text-sm font-bold text-black/60 hover:text-black transition-colors" href="#">Contact</a>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6">
            <h4 className="font-black text-black text-sm sm:text-base">Follow Us</h4>
            <div className="flex gap-3 sm:gap-4">
              <a className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white border-2 border-black flex items-center justify-center hover:bg-primary transition-all shadow-playful" href="#">
                <svg className="size-5 sm:size-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0 1.27 5.48 4.09 4.09 0 0 1-1.87-.52v.05a4.1 4.1 0 0 0 3.3 4 4.09 4.09 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 20.08 11.58 11.58 0 0 0 8.29 21.75c7.55 0 11.67-6.26 11.67-11.67v-.53a8.33 8.33 0 0 0 2.04-2.12z"></path></svg>
              </a>
              <a className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white border-2 border-black flex items-center justify-center hover:bg-primary transition-all shadow-playful" href="#">
                <svg className="size-5 sm:size-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23c1.27-.06 1.64-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.27.2-6.78 2.71-6.98 6.98C.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.27 2.71 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07 3.26 0 3.67-.01 4.95-.07 4.27-.2 6.78-2.71 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.27-2.71-6.78-6.98-6.98C15.67.01 15.26 0 12 0z"></path><path d="M12 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path><circle cx="18.41" cy="5.59" r="1.44"></circle></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 sm:pt-8 border-t-2 border-black/5 gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm font-bold text-black/40 text-center md:text-left">© 2026 Tryonyourself. All rights reserved.</p>
          <div className="flex gap-6 sm:gap-8">
            <a className="text-xs sm:text-sm font-bold text-black/40 hover:text-black" href="#">Privacy Policy</a>
            <a className="text-xs sm:text-sm font-bold text-black/40 hover:text-black" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
