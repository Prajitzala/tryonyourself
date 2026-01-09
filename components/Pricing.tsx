
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
    <section id="pricing" className="section-container py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-black">
            Pricing built for <br className="hidden md:block"/>
            <span className="bg-[#c2d2ff] px-6 py-2 inline-block -rotate-1 border-4 border-black shadow-playful">every wardrobe</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="pricing-card">
            <div>
              <h3 className="text-3xl font-black mb-4">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">$0</span>
                <span className="text-black/60 font-bold">/mo</span>
              </div>
            </div>
            <div className="h-0.5 bg-black w-full opacity-10"></div>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                10 AI Try-Ons / month
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                Standard Quality
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                Basic Wardrobe
              </li>
            </ul>
            <div className="mt-auto">
              <button onClick={handleStartClick} className="pricing-btn bg-mint">Sign up free.</button>
            </div>
          </div>
          
          <div className="pricing-card relative scale-105 z-20">
            <div className="absolute -top-4 right-8 bg-black text-white text-[12px] font-black uppercase px-4 py-1.5 rounded-full -rotate-12 border-2 border-white shadow-playful">
              Popular
            </div>
            <div>
              <h3 className="text-3xl font-black mb-4">Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">$19</span>
                <span className="text-black/60 font-bold">/mo</span>
              </div>
            </div>
            <div className="h-0.5 bg-black w-full opacity-10"></div>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                100 AI Try-Ons / month
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                HD Quality
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                Pose Normalization
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                Ad-free Experience
              </li>
            </ul>
            <div className="mt-auto">
              <button onClick={handleStartClick} className="pricing-btn bg-primary">Get Started.</button>
            </div>
          </div>

          <div className="pricing-card">
            <div>
              <h3 className="text-3xl font-black mb-4">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">$49</span>
                <span className="text-black/60 font-bold">/mo</span>
              </div>
            </div>
            <div className="h-0.5 bg-black w-full opacity-10"></div>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                Unlimited AI Try-Ons
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                4K Ultra-HD Quality
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
                Pose Normalization
              </li>
              <li className="flex items-center gap-3 font-bold text-sm">
                <span className="material-symbols-outlined bg-black text-white rounded-full p-0.5 text-xs">check</span>
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
