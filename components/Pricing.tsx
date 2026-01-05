
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { signInWithGoogle } from '../services/supabaseClient';

interface PricingProps {
  user: User | null;
  onStart?: () => void;
}

const Pricing: React.FC<PricingProps> = ({ user, onStart }) => {
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

  const pricingTiers = [
    { name: "Free", price: "$0", color: "#BFF9EA", features: ["10 AI Try-Ons / month", "Standard Quality", "Basic Wardrobe"], cta: "Sign up free" },
    { name: "Starter", price: "$19", color: "#FFFD63", features: ["100 AI Try-Ons / month", "HD Quality", "Pose Normalization", "Ad-free Experience"], cta: "Get Started", popular: true },
    { name: "Pro", price: "$49", color: "#C7D0FF", features: ["Unlimited AI Try-Ons", "4K Ultra-HD Quality", "Pose Normalization", "Priority Processing", "Personal Style Assistant"], cta: "Go Pro" }
  ];

  return (
    <section id="pricing" className="max-w-[1280px] w-full flex flex-col items-center mb-24 md:mb-48 mx-auto px-6">
        <h2 className="text-4xl sm:text-5xl md:text-[72px] font-[900] butter-dark leading-[1.1] tracking-tighter text-center mb-16 md:mb-24 px-4">Pricing built for <br/><span className="bg-[#C7D0FF] px-2 md:px-4">every wardrobe</span>.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
           {pricingTiers.map((tier, i) => (
             <div key={i} className={`p-8 md:p-10 rounded-[40px] border-[3px] border-black flex flex-col gap-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all relative overflow-hidden bg-white`}>
                {tier.popular && <div className="absolute top-4 right-4 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full rotate-12">POPULAR</div>}
                <div className="space-y-2">
                   <h3 className="text-2xl md:text-[32px] font-[900] tracking-tighter leading-none">{tier.name}</h3>
                   <div className="flex items-baseline gap-1">
                      <span className="text-[40px] md:text-[48px] font-black">{tier.price}</span>
                      <span className="text-sm opacity-50 font-bold">/mo</span>
                   </div>
                </div>
                <div className="h-[2px] w-full bg-black/10" />
                <ul className="space-y-4 flex-1">
                   {tier.features.map(f => (
                     <li key={f} className="flex items-center gap-3 text-sm font-medium leading-tight">
                        <div className="w-5 h-5 rounded-full bg-black shrink-0 flex items-center justify-center">
                           <svg className="w-3 h-3 text-white" viewBox="0 0 10 7" fill="none"><path d="M1 3L4 6L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        {f}
                     </li>
                   ))}
                </ul>
                <button 
                  className="w-full py-4 rounded-[20px] border-[3px] border-black font-black text-sm tracking-tighter hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  style={{ backgroundColor: tier.color }}
                  onClick={handleStartClick}
                >
                   {tier.cta}.
                </button>
             </div>
           ))}
        </div>
    </section>
  );
};

export default Pricing;
