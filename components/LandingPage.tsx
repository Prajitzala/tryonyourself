
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
      <section className="section-container flex flex-col items-center justify-center pt-12 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-10 animate-butter">
          {/* Headline and Subhead */}
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl md:text-[5.5rem] font-serif leading-[1.1] tracking-tight text-black italic">
              Style yourself in seconds while you yap
            </h1>
            <p className="text-lg md:text-xl text-black/60 font-medium max-w-2xl mx-auto leading-relaxed">
              Mix and match tops and bottoms on your own photo. FitCheck is an AI app that transforms 
              your spoken thoughts and rambles into perfect outfit combinations.
            </p>
          </div>

          {/* Main CTA */}
          <div className="flex flex-col items-center gap-6 w-full">
            <button 
              onClick={handleStartClick}
              className="playful-btn text-2xl px-14 py-6 border-4"
            >
              Get started for free
            </button>
            <div className="flex items-center gap-4 text-xs font-bold text-black/40 uppercase tracking-widest">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>No credit card required</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>10 Free generations</span>
              </div>
            </div>
          </div>

          {/* Hero Asset Container */}
          <div className="relative w-full max-w-5xl mt-12 group">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-[12px] border-black bg-black shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
              {/* Main App UI Screen */}
              <div className="absolute inset-0 bg-[#f0f0f0] flex flex-col">
                <div className="h-12 bg-white border-b border-black/5 flex items-center px-4 gap-2">
                   <div className="flex gap-1.5">
                     <div className="size-2.5 rounded-full bg-red-400"></div>
                     <div className="size-2.5 rounded-full bg-yellow-400"></div>
                     <div className="size-2.5 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex-1 max-w-md mx-auto h-7 bg-black/5 rounded-md"></div>
                </div>
                <div className="flex-1 p-8 text-left space-y-4">
                  <div className="w-1/3 h-6 bg-black/10 rounded"></div>
                  <div className="w-full h-4 bg-black/5 rounded"></div>
                  <div className="w-5/6 h-4 bg-black/5 rounded"></div>
                  <div className="w-4/6 h-4 bg-black/5 rounded"></div>
                  <div className="aspect-video w-full bg-white rounded-2xl border-2 border-black/5 mt-8 flex items-center justify-center">
                    <div className="size-16 rounded-full bg-black/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-4xl text-black/40">play_arrow</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Inset Video (Face) */}
              <div className="absolute bottom-6 right-6 w-1/4 aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                 <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
              </div>

              {/* Just want to show you guys some text overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg text-white text-xs font-medium">
                just want to show you guys some
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section className="section-container py-24" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black">
                How It Works
              </h2>
              <p className="text-xl text-black font-medium opacity-70">
                Experience the future of fashion with our simple 4-step process.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Upload", icon: "upload", color: "bg-primary", desc: "Snap a pic of your clothes and upload them to your digital wardrobe instantly." },
                { step: "2", title: "Select Model", icon: "person", color: "bg-mint", desc: "Choose a body type that matches yours or use your own photo." },
                { step: "3", title: "Generate", icon: "auto_fix_high", color: "bg-lavender", desc: "Let our AI mix and match items to create the perfect outfit combination." },
                { step: "4", title: "Save", icon: "download", color: "bg-pink-200", desc: "Save your favorite looks to your profile or download high-res images to share." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-6 p-8 rounded-[2rem] border-2 border-black bg-white/60 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
                  <div className={`size-14 rounded-2xl ${item.color} border-2 border-black flex items-center justify-center text-black`}>
                    <span className="material-symbols-outlined text-3xl font-bold">{item.icon}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-black">{item.step}. {item.title}</h3>
                    <p className="text-sm font-bold text-black/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Pricing user={user} onStart={onStart} />

      {/* SECTION: COMMUNITY */}
      <section className="section-container py-24 px-6">
        <div className="max-w-7xl mx-auto w-full border-4 border-black bg-white/20 backdrop-blur-xl rounded-[4rem] overflow-hidden min-h-[600px] flex items-center justify-center relative shadow-2xl">
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-8 py-20">
            <h2 className="text-5xl md:text-7xl font-black text-black leading-tight tracking-tight mb-8">
              Join our Fashion Community
            </h2>
            <p className="text-xl md:text-2xl text-black/80 font-bold mb-12 max-w-2xl leading-relaxed">
              Connect with 10,000+ fashionistas, share your generated looks, and participate in style challenges.
            </p>
            <button className="playful-btn text-xl px-12 py-6 flex items-center gap-4 border-4">
              <svg className="size-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.32 4.37a19.8 19.8 0 0 0-4.92-1.52.82.82 0 0 0-.07.36c-.2.74-.43 1.5-.6 2a18.3 18.3 0 0 0-5.46 0 13.06 13.06 0 0 0-.62-2 .85.85 0 0 0-.08-.34 19.85 19.85 0 0 0-4.93 1.53.69.69 0 0 0-.3.26C1.07 9.87.16 15.21.73 20.48a.71.71 0 0 0 .28.46 19.9 19.9 0 0 0 6 3 .8.8 0 0 0 .84-.28 14 14 0 0 0 1.23-2 .8.8 0 0 0-.43-1.09 13.06 13.06 0 0 1-1.92-.91.79.79 0 0 1-.1-1.32c.13-.1.27-.2.4-.31a.78.78 0 0 1 .83-.15 16.48 16.48 0 0 0 8.24 0 .78.78 0 0 1 .83.15c.13.11.27.21.4.31a.79.79 0 0 1-.1 1.32 13.06 13.06 0 0 1-1.92.91.8.8 0 0 0-.44 1.09 13.9 13.9 0 0 0 1.23 2 .8.8 0 0 0 .84.28 19.9 19.9 0 0 0 6-3 .72.72 0 0 0 .28-.46c.72-6.52-.77-11.39-2.9-15.85a.73.73 0 0 0-.29-.26zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42S6.81 10.5 8.02 10.5s2.17 1.08 2.17 2.42-1 2.41-2.17 2.41zm7.96 0c-1.18 0-2.16-1.08-2.16-2.42s.98-2.42 2.16-2.42 2.17 1.08 2.17 2.42-1 2.41-2.17 2.41z"></path></svg>
              Join Discord Community
            </button>
            <p className="mt-12 text-sm text-black/50 font-bold uppercase tracking-widest">
              *Available to 18+ users globally.
            </p>
          </div>
        </div>
      </section>

      <Footer user={user} onStart={onStart} />
    </div>
  );
};

export default LandingPage;
