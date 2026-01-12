
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { signInWithGoogle } from '../services/supabaseClient';
import Pricing from './Pricing';
import Footer from './Footer';

interface LandingPageProps {
  onStart: () => void;
  user: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, user }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!user) {
      // Store intended destination in location state
      navigate('/', { state: { from: '/generator' } });
      signInWithGoogle();
    } else {
      // If user is signed in, proceed to generator
      onStart();
    }
  };
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* SECTION: HERO */}
      <section className="section-container flex flex-col items-center justify-center pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-6 sm:gap-8 md:gap-10 animate-butter">
          {/* Headline and Subhead */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-display font-black leading-[0.95] tracking-[-0.02em] text-black px-2">
              Style yourself in seconds<br className="hidden sm:block" />
              <span className="font-serif italic">with AI-powered</span> virtual try-on
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-black/70 font-medium max-w-2xl mx-auto leading-[1.6] tracking-[-0.01em] px-4">
              Skip the fitting room. See how any outfit looks on you in seconds. Upload your clothes, choose your photo, and let AI show you the perfect combinations.
            </p>
          </div>

          {/* Main CTA */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full px-4">
            <button 
              onClick={handleStartClick}
              className="playful-btn text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 border-2 sm:border-3 md:border-4 w-full sm:w-auto"
            >
              Start styling free
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-black/40 uppercase tracking-widest">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">check_circle</span>
                <span>No credit card required</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">check_circle</span>
                <span>10 Free generations</span>
              </div>
            </div>
          </div>

          {/* Hero Asset Container */}
          <div className="relative w-full max-w-5xl mt-8 sm:mt-12 group px-4 sm:px-0">
            <div className="relative aspect-video rounded-xl sm:rounded-2xl md:rounded-[2.5rem] overflow-hidden border-4 sm:border-8 md:border-[12px] border-black bg-black shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
              {/* Main App UI Screen */}
              <div className="absolute inset-0 bg-[#f0f0f0] flex flex-col">
                <div className="h-8 sm:h-10 md:h-12 bg-white border-b border-black/5 flex items-center px-2 sm:px-3 md:px-4 gap-1 sm:gap-2">
                   <div className="flex gap-1 sm:gap-1.5">
                     <div className="size-1.5 sm:size-2 md:size-2.5 rounded-full bg-red-400"></div>
                     <div className="size-1.5 sm:size-2 md:size-2.5 rounded-full bg-yellow-400"></div>
                     <div className="size-1.5 sm:size-2 md:size-2.5 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex-1 max-w-md mx-auto h-5 sm:h-6 md:h-7 bg-black/5 rounded-md"></div>
                </div>
                <div className="flex-1 p-4 sm:p-6 md:p-8 text-left space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="w-1/3 h-4 sm:h-5 md:h-6 bg-black/10 rounded"></div>
                  <div className="w-full h-3 sm:h-3.5 md:h-4 bg-black/5 rounded"></div>
                  <div className="w-5/6 h-3 sm:h-3.5 md:h-4 bg-black/5 rounded"></div>
                  <div className="w-4/6 h-3 sm:h-3.5 md:h-4 bg-black/5 rounded"></div>
                  <div className="aspect-video w-full bg-white rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/5 mt-4 sm:mt-6 md:mt-8 flex items-center justify-center">
                    <div className="size-10 sm:size-12 md:size-16 rounded-full bg-black/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl text-black/40">play_arrow</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Inset Video (Face) */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 w-1/5 sm:w-1/4 aspect-square rounded-lg sm:rounded-xl md:rounded-3xl overflow-hidden border-2 sm:border-3 md:border-4 border-white shadow-lg sm:shadow-xl md:shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                 <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
              </div>

              {/* Just want to show you guys some text overlay */}
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg text-white text-[10px] sm:text-xs font-medium whitespace-nowrap">
                just want to show you guys some
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section className="section-container py-12 sm:py-16 md:py-24" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16">
            <div className="flex flex-col gap-3 sm:gap-4 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black px-2">
                How It Works
              </h2>
              <p className="text-lg sm:text-xl text-black font-medium opacity-70 px-2">
                Experience the future of fashion with our simple 4-step process.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { step: "1", title: "Upload", icon: "upload", color: "bg-primary", desc: "Take photos of your clothes or upload existing images. Our AI automatically detects and organizes your items into a digital wardrobe." },
                { step: "2", title: "Select Model", icon: "person", color: "bg-mint", desc: "Upload a photo of yourself. Our AI ensures perfect fit and realistic results every time." },
                { step: "3", title: "Generate", icon: "auto_fix_high", color: "bg-lavender", desc: "Watch as our advanced AI creates realistic outfit combinations. Mix tops, bottoms to see unlimited style possibilities." },
                { step: "4", title: "Save", icon: "download", color: "bg-pink-200", desc: "Download high-quality images of your favorite looks, save them to your profile." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 sm:gap-6 p-6 sm:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] border-2 border-black bg-white/60 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
                  <div className={`size-12 sm:size-14 rounded-xl sm:rounded-2xl ${item.color} border-2 border-black flex items-center justify-center text-black`}>
                    <span className="material-symbols-outlined text-2xl sm:text-3xl font-bold">{item.icon}</span>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <h3 className="text-lg sm:text-xl font-black">{item.step}. {item.title}</h3>
                    <p className="text-xs sm:text-sm font-bold text-black/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Pricing user={user} onStart={onStart} />

      <Footer user={user} onStart={onStart} />
    </div>
  );
};

export default LandingPage;
