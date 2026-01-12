
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
    { name: "Free", price: "$0", color: "#bdf6e4", features: ["10 AI Try-Ons / month", "Standard Quality", "Basic Wardrobe"], cta: "Sign up free" },
    { name: "Starter", price: "$19", color: "#fffc61", features: ["100 AI Try-Ons / month", "HD Quality", "Pose Normalization", "Ad-free Experience"], cta: "Get Started", popular: true },
    { name: "Pro", price: "$49", color: "#c7d2fe", features: ["Unlimited AI Try-Ons", "4K Ultra-HD Quality", "Pose Normalization", "Priority Processing", "Personal Style Assistant"], cta: "Go Pro" }
  ];

  return (
    <section id="pricing" className="section-container py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight text-black px-2">
            Pricing built for <br className="hidden md:block"/>
            <span className="bg-[#c2d2ff] px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 inline-block -rotate-1 border-2 sm:border-3 md:border-4 border-black shadow-playful">every wardrobe</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          <div className="pricing-card">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black">$0</span>
                <span className="text-black/60 font-bold text-sm sm:text-base">/mo</span>
              </div>
            </div>
            <div className="h-0.5 bg-black w-full opacity-10"></div>
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                10 AI Try-Ons / month
              </li>
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                Standard Quality
              </li>
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                Basic Wardrobe
              </li>
            </ul>
            <div className="mt-auto">
              <button onClick={handleStartClick} className="pricing-btn bg-mint">Sign up free.</button>
            </div>
          </div>
          
          <div className="pricing-card relative md:scale-105 z-20">
            <div className="absolute -top-3 right-4 sm:-top-4 sm:right-8 bg-black text-white text-[10px] sm:text-[12px] font-black uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full -rotate-12 border-2 border-white shadow-playful">
              Popular
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black">$19</span>
                <span className="text-black/60 font-bold text-sm sm:text-base">/mo</span>
              </div>
            </div>
            <div className="h-0.5 bg-black w-full opacity-10"></div>
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                100 AI Try-Ons / month
              </li>
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                HD Quality
              </li>
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                Pose Normalization
              </li>
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                Ad-free Experience
              </li>
            </ul>
            <div className="mt-auto">
              <button onClick={handleStartClick} className="pricing-btn bg-primary">Get Started.</button>
            </div>
          </div>

          <div className="pricing-card">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black">$49</span>
                <span className="text-black/60 font-bold text-sm sm:text-base">/mo</span>
              </div>
            </div>
            <div className="h-0.5 bg-black w-full opacity-10"></div>
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                Unlimited AI Try-Ons
              </li>
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                4K Ultra-HD Quality
              </li>
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                Pose Normalization
              </li>
              <li className="flex items-center gap-2 sm:gap-3 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-[10px] sm:text-xs shrink-0">check</span>
                Priority Processing
              </li>
            </ul>
            <div className="mt-auto">
              <button onClick={handleStartClick} className="pricing-btn bg-lavender">Go Pro.</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
