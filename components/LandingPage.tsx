
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
    <div className="w-full flex flex-col">
      {/* SECTION: HERO */}
      <section className="butter-yellow pt-32 md:pt-48 pb-12 px-6 flex flex-col items-center text-center relative">
        <div className="max-w-[1280px] w-full flex flex-col items-center animate-butter">
          <h1 className="max-w-[1045px] font-[900] text-[32px] sm:text-[50px] md:text-[71px] leading-[1.1] butter-dark tracking-tighter mb-6 md:mb-8">
            Try on anything.<br/>Look your absolute best.
          </h1>
          <p className="max-w-[690px] text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] font-[300] butter-dark mb-8 md:mb-10 opacity-90">
            TryOnYourself is the all-in-one AI platform to effortlessly plan, visualize, and save your perfect outfits using built-in garment extraction and hyper-realistic virtual try-ons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-20 md:mb-32 w-full sm:w-auto">
            <button 
              onClick={handleStartClick}
              className="btn-white butter-dark px-10 py-4 md:py-5 rounded-2xl text-[14px] md:text-[16px] font-medium hover:scale-105 transition-all"
            >
              {user ? 'Your Room' : 'Start Dressing Now'}
            </button>
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="w-full max-w-[1272px] aspect-[16/9] butter-yellow video-shadow rounded-xl md:rounded-[24px] overflow-hidden relative border-none -mb-24 sm:-mb-40 md:-mb-64 z-10">
            <img src="https://picsum.photos/seed/tryonyourself-hero/1272/716" className="w-full h-full object-cover" alt="TryOnYourself interface" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-transparent transition-all">
              <div className="bg-white h-[60px] md:h-[126px] px-6 md:px-12 rounded-full md:rounded-[50px] flex items-center gap-3 md:gap-5 shadow-xl cursor-pointer hover:scale-110 transition-transform active:scale-95">
                <div className="w-8 h-8 md:w-[54px] md:h-[54px] butter-yellow rounded-full flex items-center justify-center border md:border-2 border-black">
                  <div className="w-0 h-0 border-t-[4px] md:border-t-[8px] border-t-transparent border-l-[8px] md:border-l-[14px] border-l-black border-b-[4px] md:border-b-[8px] border-b-transparent ml-0.5 md:ml-1" />
                </div>
                <span className="text-sm md:text-[31px] font-[700] butter-dark tracking-tight">Watch AI Magic</span>
              </div>
            </div>
        </div>
      </section>

      {/* SECTION: BRANDING / ALL IN ONE PLACE */}
      <section className="bg-white pt-32 sm:pt-48 md:pt-[300px] pb-16 md:pb-32 px-6 flex flex-col items-center">
        <div className="max-w-[1280px] w-full text-left mb-16 md:mb-32">
          <h2 className="text-[28px] sm:text-[40px] md:text-[53px] font-[700] leading-[1.3] butter-dark max-w-[1370px]">
            All your style tools in one place. Stop second-guessing your mirror. Start styling effectively. TryOnYourself brings <span className="butter-yellow px-2">energy, clarity, and joy</span> to your wardrobe management and outfit planning.
          </h2>
        </div>

        {/* PLAN SECTION */}
        <div className="max-w-[1280px] w-full relative mb-24 md:mb-48">
           <div className="absolute -top-[30px] sm:-top-[60px] md:-top-[120px] left-0 rotate-neg-12 z-20">
              <h2 className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[179px] font-[900] butter-dark leading-none tracking-tighter">Plan.</h2>
           </div>
           <div className="bg-[#C7D0FF] curved-80 p-6 sm:p-12 md:p-20 flex flex-col lg:flex-row items-center gap-10 md:gap-20 border-2 border-black relative overflow-hidden">
              <div className="w-full lg:flex-1 z-10">
                 <img src="https://picsum.photos/seed/try-plan/520/480" className="w-full h-auto rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]" alt="Plan Your Outfit" />
              </div>
              <div className="flex-1 space-y-6 md:space-y-8 z-10">
                 <h3 className="text-2xl md:text-[39px] font-bold leading-tight md:leading-[48px] butter-dark">Prepare outfits that practically wear themselves</h3>
                 <p className="text-base md:text-[19px] leading-normal md:leading-[31px] font-[300] opacity-80">Better style starts with better planning. Set up the perfect wardrobe flow with a time-boxed agenda, pre-loaded items, and a reusable team library.</p>
                 <button className="bg-transparent border-2 border-black px-6 py-3 md:px-8 md:py-4 rounded-2xl text-[14px] font-medium hover:bg-black hover:text-white transition-all">Learn more</button>
              </div>
           </div>
        </div>

        {/* TRY SECTION */}
        <div className="max-w-[1280px] w-full relative mb-24 md:mb-56">
           <div className="absolute -top-[30px] sm:-top-[60px] md:-top-[120px] right-0 rotate-pos-12 z-20 text-right">
              <h2 className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[173px] font-[900] butter-dark leading-none tracking-tighter">Try.</h2>
           </div>
           <div className="bg-[#BFF9EA] curved-80 p-6 sm:p-12 md:p-20 flex flex-col lg:flex-row-reverse items-center gap-10 md:gap-20 border-2 border-black relative overflow-hidden">
              <div className="w-full lg:flex-1 z-10">
                 <img src="https://picsum.photos/seed/try-run/520/480" className="w-full h-auto rounded-2xl border-2 border-black shadow-[-6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[-10px_10px_0px_0px_rgba(0,0,0,1)]" alt="Run Try-On Session" />
              </div>
              <div className="flex-1 space-y-6 md:space-y-8 z-10">
                 <h3 className="text-2xl md:text-[40px] font-bold leading-tight md:leading-[48px] butter-dark">Bump up the style energy</h3>
                 <p className="text-base md:text-[19px] leading-normal md:leading-[31px] font-[300] opacity-80">Say goodbye to fashion fatigue. Say hello to participation. Keep everyone engaged with interactive overlays, style effects, a style queue, and instant AI-generated results.</p>
                 <button className="bg-transparent border-2 border-black px-8 py-3 md:py-4 rounded-2xl text-[14px] font-medium hover:bg-black hover:text-white transition-all">Show me the energy</button>
              </div>
           </div>
        </div>

        {/* RECAP SECTION (Matching provided image) */}
        <div className="max-w-[1280px] w-full relative mb-24 md:mb-56">
           <div className="absolute -top-[30px] sm:-top-[60px] md:-top-[130px] left-0 rotate-neg-12 z-20">
              <h2 className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[194px] font-[900] butter-dark leading-none tracking-tighter">Recap.</h2>
           </div>
           <div className="bg-[#FFD8AA] curved-80 p-6 sm:p-12 md:p-20 flex flex-col lg:flex-row items-center gap-10 md:gap-20 border-2 border-black relative overflow-hidden">
              <div className="flex-1 space-y-6 md:space-y-8 z-10">
                 <h3 className="text-2xl md:text-[40px] font-bold leading-tight md:leading-[48px] butter-dark">Don’t forget your takeaways</h3>
                 <p className="text-base md:text-[19px] leading-normal md:leading-[31px] font-[300] opacity-80">Summarize your sessions and capture outcomes in seconds. Access and share your recordings, personal notes, chat logs, and poll results from any session—all from one dashboard.</p>
                 <button className="bg-transparent border-2 border-black px-8 py-2 md:px-10 md:py-3 rounded-xl text-[12px] font-medium hover:bg-black hover:text-white transition-all">Take a look</button>
              </div>
              <div className="w-full lg:flex-1 z-10 flex justify-center lg:justify-end">
                 {/* Illustration mimicking the 'REC' pencil circle graphic */}
                 <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full border-4 border-black flex items-center justify-center shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
                    <span className="text-5xl md:text-7xl font-[900] tracking-tighter">REC</span>
                    <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-[#FFFD63] border-4 border-black rounded-lg rotate-12 flex items-center justify-center">✏️</div>
                    <div className="absolute -bottom-4 left-1/4 flex gap-2">
                       <div className="w-4 h-12 bg-blue-400 border-2 border-black"></div>
                       <div className="w-4 h-16 bg-blue-500 border-2 border-black"></div>
                       <div className="w-4 h-10 bg-blue-300 border-2 border-black"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* COLLABORATE SECTION (Matching provided image) */}
        <div className="max-w-[1280px] w-full relative mb-24 md:mb-56">
           <div className="absolute -top-[30px] sm:-top-[60px] md:-top-[130px] right-0 rotate-pos-12 z-20 text-right">
              <h2 className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[198px] font-[900] butter-dark leading-none tracking-tighter">Collaborate.</h2>
           </div>
           <div className="bg-[#FFD5D5] curved-80 p-6 sm:p-12 md:p-20 flex flex-col lg:flex-row-reverse items-center gap-10 md:gap-20 border-2 border-black relative overflow-hidden">
              <div className="flex-1 space-y-6 md:space-y-8 z-10">
                 <h3 className="text-2xl md:text-[40px] font-bold leading-tight md:leading-[48px] butter-dark">One workspace for all your team’s sessions</h3>
                 <p className="text-base md:text-[19px] leading-normal md:leading-[31px] font-[300] opacity-80">Your Butter workspace gives your team one place to create rooms, share templates, and access recaps. Save on session setup time, create team-wide consistency, and keep tabs on your team’s sessions.</p>
                 <button className="bg-transparent border-2 border-black px-8 py-2 md:px-10 md:py-3 rounded-xl text-[12px] font-medium hover:bg-black hover:text-white transition-all">Create workspace</button>
              </div>
              <div className="w-full lg:flex-1 z-10 flex justify-center lg:justify-start">
                 {/* Illustration mimicking the tablet with Acme Inc and profile icons */}
                 <div className="relative w-full max-w-sm aspect-[4/3] bg-white border-4 border-black rounded-3xl p-6 flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                       <div className="text-2xl font-black italic">Acme Inc.</div>
                       <div className="text-4xl">👆</div>
                    </div>
                    {/* Floating Profile Icons */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 border-2 border-black rounded-full overflow-hidden"><img src="https://i.pravatar.cc/100?u=1" /></div>
                    <div className="absolute top-20 -right-4 w-12 h-12 bg-blue-400 border-2 border-black rounded-full overflow-hidden"><img src="https://i.pravatar.cc/100?u=2" /></div>
                    <div className="absolute -bottom-4 right-20 w-12 h-12 bg-red-400 border-2 border-black rounded-full overflow-hidden"><img src="https://i.pravatar.cc/100?u=3" /></div>
                    <div className="absolute bottom-10 -left-6 w-12 h-12 bg-green-400 border-2 border-black rounded-full overflow-hidden"><img src="https://i.pravatar.cc/100?u=4" /></div>
                 </div>
              </div>
           </div>
        </div>
        
        <Pricing user={user} onStart={onStart} />

      </section>

      {/* SECTION: FAQ */}
      <section className="bg-white py-24 md:py-48 px-6 flex flex-col items-center">
         <div className="max-w-[1280px] w-full">
            <div className="mb-16 md:mb-24 flex flex-col gap-0 leading-tight">
               <div className="flex items-baseline gap-2 md:gap-4">
                  <h2 className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[196px] font-[900] butter-dark tracking-tighter leading-none">What</h2>
                  <span className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[200px] font-[900] leading-none">.</span>
               </div>
               <div className="flex items-baseline gap-2 md:gap-4 -mt-2 sm:-mt-4 md:-mt-10">
                  <h2 className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[169px] font-[900] butter-dark tracking-tighter leading-none">The</h2>
                  <span className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[200px] font-[900] leading-none">.</span>
               </div>
               <div className="flex items-baseline gap-2 md:gap-4 -mt-2 sm:-mt-4 md:-mt-10">
                  <h2 className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[192px] font-[900] butter-dark tracking-tighter leading-none">FAQ</h2>
                  <span className="text-[48px] sm:text-[80px] md:text-[140px] lg:text-[195px] font-[900] leading-none">?</span>
               </div>
            </div>
            
            <div className="space-y-4 max-w-[1280px]">
               {[
                 "How accurate is TryOnYourself?", 
                 "What types of clothing can I upload?", 
                 "Is my personal photo secure?", 
                 "Can I share my results?",
                 "Do I need to sign up?"
               ].map((q, i) => (
                 <div key={i} className="bg-white border-none p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[30px] flex items-center justify-between shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 group">
                    <span className="text-lg sm:text-xl md:text-[28px] font-[700] butter-dark tracking-tight group-hover:text-blue-600 transition-colors">{q}</span>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black flex items-center justify-center font-bold text-xl md:text-2xl group-hover:bg-black group-hover:text-white transition-all">+</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <Footer user={user} onStart={onStart} />
    </div>
  );
};

export default LandingPage;
