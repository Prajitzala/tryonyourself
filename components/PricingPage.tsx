
import React, { useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import Pricing from './Pricing';
import Footer from './Footer';

interface PricingPageProps {
  user: User | null;
  onStart?: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ user, onStart }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full pt-20 sm:pt-24 md:pt-32 flex flex-col items-center">
      <Pricing user={user} onStart={onStart} />
      <Footer user={user} onStart={onStart} />
    </div>
  );
};

export default PricingPage;
