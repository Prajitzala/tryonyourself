import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { getOutfits, deleteOutfit } from '../services/supabaseClient';

interface WardrobePageProps {
  user: User | null;
}

const WardrobePage: React.FC<WardrobePageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfits = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getOutfits(user.id);
        setOutfits(data || []);
      } catch (error) {
        console.error('Error fetching outfits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOutfits();
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDownload = (imageUrl: string, id: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `fitcheck-outfit-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (outfitId: string) => {
    if (!window.confirm('Are you sure you want to delete this outfit?')) return;
    
    try {
      await deleteOutfit(outfitId);
      setOutfits(outfits.filter(o => o.id !== outfitId));
    } catch (error) {
      alert('Failed to delete outfit.');
    }
  };

  const colors = ['#C7D0FF', '#BFF9EA', '#FFD8AA', '#FFD5D5', '#FFFD63', '#FFFFFF'];

  if (loading) {
    return (
      <div className="pt-28 md:pt-40 pb-20 px-4 md:px-6 min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-[6px] border-black border-t-[#FFFD63] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-28 md:pt-40 pb-20 px-4 md:px-6 min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl font-bold">Please sign in to view your wardrobe.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-40 pb-20 px-4 md:px-6 min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto space-y-8 md:space-y-16">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
          <div className="space-y-2 md:space-y-4 text-center lg:text-left">
             <h1 className="text-4xl md:text-[72px] font-[900] butter-dark leading-none tracking-tighter">Your Wardrobe.</h1>
             <p className="text-base md:text-[20px] font-[300] opacity-60">Manage your saved session outcomes and wardrobe extracts.</p>
          </div>
          <div className="flex flex-wrap flex-col sm:flex-row gap-4 w-full sm:w-auto">
             <button 
               onClick={() => navigate('/generator')}
               className="flex-1 sm:flex-none bg-white border-[2px] md:border-[3px] border-black px-8 py-3 md:py-4 rounded-xl md:rounded-[20px] font-[900] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 md:hover:translate-x-1 md:hover:translate-y-1 transition-all"
             >
               Your Room
             </button>
          </div>
        </header>

        {outfits.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold opacity-60">No saved outfits yet. Generate and save your first outfit!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {outfits.map((outfit, index) => (
              <div key={outfit.id} className="group relative bg-white border-[2px] md:border-[3px] border-black rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 md:hover:-translate-y-2 md:hover:translate-x-1 transition-all">
                <div className="aspect-[4/5] overflow-hidden bg-gray-50 border-b-[2px] md:border-b-[3px] border-black">
                    <img src={outfit.image_url} alt="Saved outfit" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 md:p-8 space-y-3 md:space-y-4" style={{ backgroundColor: colors[index % colors.length] + '40' }}>
                    <div className="flex justify-between items-start">
                       <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] bg-white px-2 md:px-3 py-0.5 md:py-1 border-[1.5px] md:border-2 border-black rounded-full shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] uppercase">OUTCOME</span>
                       <span className="text-[10px] md:text-[12px] font-medium opacity-40">{formatDate(outfit.created_at)}</span>
                    </div>
                    <h4 className="font-[900] text-xl md:text-[26px] butter-dark tracking-tighter leading-tight">Saved Outfit</h4>
                    <div className="flex gap-2 pt-2 md:pt-4">
                        <button 
                          onClick={() => handleDownload(outfit.image_url, outfit.id)}
                          className="flex-1 bg-white border-2 border-black py-2 rounded-lg md:rounded-xl text-[10px] md:text-[12px] font-bold hover:bg-black hover:text-white transition-all uppercase tracking-wider"
                        >
                          Download
                        </button>
                        <button 
                          onClick={() => handleDelete(outfit.id)}
                          className="w-9 h-9 md:w-10 md:h-10 bg-white border-2 border-black rounded-lg md:rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors text-sm shrink-0"
                        >
                          🗑️
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WardrobePage;
