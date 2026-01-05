
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  processOutfit,
  extractGarment,
  normalizePose
} from '../services/geminiService';
import { saveOutfit } from '../services/supabaseClient';
import { User } from '@supabase/supabase-js';

interface GeneratorPageProps {
  user: User | null;
  persistedPerson: string | null;
  setPersistedPerson: (image: string | null) => void;
}

const GeneratorPage: React.FC<GeneratorPageProps> = ({ user, persistedPerson, setPersistedPerson }) => {
  const navigate = useNavigate();
  const [top, setTop] = useState<string | null>(null);
  const [bottom, setBottom] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [extractingTop, setExtractingTop] = useState(false);
  const [extractingBottom, setExtractingBottom] = useState(false);
  const [topCleaned, setTopCleaned] = useState(false);
  const [bottomCleaned, setBottomCleaned] = useState(false);
  const [subjectProcessing, setSubjectProcessing] = useState(false);
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'top' | 'bottom' | 'person') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        if (type === 'top') {
          setTop(res);
          setTopCleaned(false);
        }
        if (type === 'bottom') {
          setBottom(res);
          setBottomCleaned(false);
        }
        if (type === 'person') {
          setPersistedPerson(res);
          handleSubjectNormalization(res);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset the value so the same file can be uploaded again if removed
    e.target.value = '';
  };

  const handleGenerate = async () => {
    if (!top || !bottom || !persistedPerson) {
      alert("Please upload top, bottom, and subject images.");
      return;
    }
    setLoading(true);
    try {
      const img = await processOutfit(top, bottom, persistedPerson);
      setResult(img);
    } catch (err) {
      alert("Error generating outfit.");
    } finally {
      setLoading(false);
    }
  };

  async function handleSubjectNormalization(image: string) {
    setSubjectError(null);
    setSubjectProcessing(true);
    try {
      const normalized = await normalizePose(image);
      if (normalized) {
        setPersistedPerson(normalized);
      }
    } catch (err) {
      console.error(err);
      setSubjectError('Pose normalization failed. Please try again.');
    } finally {
      setSubjectProcessing(false);
    }
  }

  const handleGarmentClick = async (type: 'top' | 'bottom') => {
    const currentImage = type === 'top' ? top : bottom;
    if (!currentImage) return;

    type === 'top' ? setExtractingTop(true) : setExtractingBottom(true);
    try {
      const extracted = await extractGarment(currentImage, type);
      if (extracted) {
        if (type === 'top') {
          setTop(extracted);
          setTopCleaned(true);
        }
        else {
          setBottom(extracted);
          setBottomCleaned(true);
        }
      }
    } catch (err) {
      alert("Extraction failed. Please try again.");
    } finally {
      type === 'top' ? setExtractingTop(false) : setExtractingBottom(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `fitcheck-outfit-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveOutfit = async () => {
    if (!result) {
      alert("No outfit to save. Please generate an outfit first.");
      return;
    }

    if (!user) {
      alert("Please sign in to save outfits.");
      return;
    }

    setSaveLoading(true);
    setSaveSuccess(false);
    try {
      await saveOutfit(result, user.id);
      setSaveSuccess(true);
      // Remove redirect
      // navigate('/wardrobe');
    } catch (error) {
      console.error('Error saving outfit:', error);
      alert("Failed to save outfit. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleStartOver = () => {
    setTop(null);
    setBottom(null);
    setResult(null);
    setTopCleaned(false);
    setBottomCleaned(false);
    setSaveSuccess(false);
  };

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        
        {/* LEFT: WORKSPACE INPUTS */}
        <div className="space-y-6 md:space-y-8 animate-butter">
           <div className="bg-[#FFD5D5] border-[2px] md:border-[3px] border-black rounded-[30px] md:rounded-[40px] p-6 md:p-10 space-y-6 md:space-y-8 relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute -top-4 -left-2 md:-top-6 md:-left-6 rotate-neg-12 bg-white px-3 py-1 md:px-5 md:py-2 border-[2px] md:border-[3px] border-black font-black text-[10px] md:text-sm tracking-widest uppercase">The Wardrobe.</div>
              <h2 className="text-3xl md:text-[42px] font-[900] butter-dark leading-tight tracking-tighter">Prepare your look.</h2>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                 <div className="space-y-2 md:space-y-3">
                    <label className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] butter-dark">01. Top Garment</label>
                    <div className="relative aspect-square rounded-2xl md:rounded-[30px] bg-white border-[2px] md:border-[3px] border-black flex items-center justify-center overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer group">
                       {top ? (
                         <>
                           <img src={top} className={`w-full h-full object-cover ${extractingTop ? 'opacity-60' : ''}`} />
                           {!topCleaned && (
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleGarmentClick('top');
                               }}
                               className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs md:text-sm font-black uppercase tracking-widest text-white"
                             >
                               <span className="text-2xl md:text-3xl">✨</span>
                               Clean Top
                             </button>
                           )}
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               setTop(null);
                             }}
                             className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 bg-white border-2 border-black rounded-full flex items-center justify-center text-sm md:text-base font-black hover:bg-red-50 z-20 transition-colors shadow-sm"
                             title="Remove Image"
                           >
                             ×
                           </button>
                         </>
                       ) : (
                         <div className="text-center group-hover:scale-110 transition-transform"><span className="text-2xl md:text-4xl">👕</span><p className="text-[10px] md:text-[12px] font-bold uppercase mt-1 md:mt-2 opacity-30">Upload Top</p></div>
                       )}
                       <input
                         type="file"
                         className="absolute inset-0 opacity-0 cursor-pointer"
                         onChange={(e) => handleFileUpload(e, 'top')}
                         style={{ pointerEvents: top ? 'none' : 'auto' }}
                       />
                       {extractingTop && (
                         <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                           <div className="w-8 h-8 border-[6px] border-black border-t-transparent rounded-full animate-spin" />
                         </div>
                       )}
                    </div>
                 </div>
                 <div className="space-y-2 md:space-y-3">
                    <label className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] butter-dark">02. Bottom Garment</label>
                    <div className="relative aspect-square rounded-2xl md:rounded-[30px] bg-white border-[2px] md:border-[3px] border-black flex items-center justify-center overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer group">
                       {bottom ? (
                         <>
                           <img src={bottom} className={`w-full h-full object-cover ${extractingBottom ? 'opacity-60' : ''}`} />
                           {!bottomCleaned && (
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleGarmentClick('bottom');
                               }}
                               className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs md:text-sm font-black uppercase tracking-widest text-white"
                             >
                               <span className="text-2xl md:text-3xl">✨</span>
                               Clean Bottom
                             </button>
                           )}
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               setBottom(null);
                             }}
                             className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 bg-white border-2 border-black rounded-full flex items-center justify-center text-sm md:text-base font-black hover:bg-red-50 z-20 transition-colors shadow-sm"
                             title="Remove Image"
                           >
                             ×
                           </button>
                         </>
                       ) : (
                         <div className="text-center group-hover:scale-110 transition-transform"><span className="text-2xl md:text-4xl">👖</span><p className="text-[10px] md:text-[12px] font-bold uppercase mt-1 md:mt-2 opacity-30">Upload Bottom</p></div>
                       )}
                       <input
                         type="file"
                         className="absolute inset-0 opacity-0 cursor-pointer"
                         onChange={(e) => handleFileUpload(e, 'bottom')}
                         style={{ pointerEvents: bottom ? 'none' : 'auto' }}
                       />
                       {extractingBottom && (
                         <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                           <div className="w-8 h-8 border-[6px] border-black border-t-transparent rounded-full animate-spin" />
                         </div>
                       )}
                    </div>
                 </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                 <label className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] butter-dark">03. The Subject (You)</label>
                 <div className="relative aspect-[3/4] rounded-2xl md:rounded-[30px] bg-white border-[2px] md:border-[3px] border-black flex items-center justify-center overflow-hidden hover:scale-[1.01] transition-transform cursor-pointer group">
                    {persistedPerson ? (
                      <>
                        <img src={persistedPerson} className={`w-full h-full object-contain p-4 ${subjectProcessing ? 'opacity-40' : ''}`} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPersistedPerson(null);
                            setSubjectError(null);
                          }}
                          className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-black rounded-full flex items-center justify-center text-base md:text-xl font-black hover:bg-red-50 z-20 transition-colors shadow-md"
                          title="Remove Image"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="text-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl md:text-4xl">👤</span>
                        <p className="text-[10px] md:text-[12px] font-bold uppercase mt-1 md:mt-2 opacity-30">Upload Pose Image</p>
                      </div>
                    )}
                    
                    {subjectProcessing && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px]">
                        <div className="w-8 h-8 border-[4px] border-black border-t-transparent rounded-full animate-spin mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Normalizing Pose...</p>
                      </div>
                    )}

                    <input
                       type="file"
                       className="absolute inset-0 opacity-0 cursor-pointer"
                       onChange={(e) => handleFileUpload(e, 'person')}
                       disabled={subjectProcessing}
                       style={{ pointerEvents: persistedPerson ? 'none' : 'auto' }}
                    />
                 </div>
                 {subjectError && (
                   <p className="text-[10px] text-red-500 font-bold uppercase mt-1">{subjectError}</p>
                 )}
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full py-4 md:py-6 rounded-2xl md:rounded-[30px] text-lg md:text-[24px] font-[900] tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 md:hover:translate-x-1 md:hover:translate-y-1 hover:shadow-none transition-all border-[2px] md:border-[3px] border-black ${loading ? 'bg-gray-200 text-gray-400' : 'butter-yellow butter-dark'}`}
              >
                {loading ? 'Synthesizing...' : 'Generate New Look.'}
              </button>
           </div>
        </div>

        {/* RIGHT: THE OUTCOME */}
        <div className="lg:sticky lg:top-32 animate-butter" style={{animationDelay: '0.2s'}}>
           <div className="bg-white border-[2px] md:border-[3px] border-black rounded-[30px] md:rounded-[50px] overflow-hidden aspect-[3/4] shadow-2xl relative group">
              {result ? (
                <img src={result} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-20 text-center space-y-6 md:space-y-10">
                   <div className="w-24 h-24 md:w-40 md:h-40 bg-[#FFFD63] border-[2px] md:border-[3px] border-black rounded-full flex items-center justify-center text-3xl md:text-6xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform">✨</div>
                   <div className="space-y-2 md:space-y-4">
                      <h3 className="text-2xl md:text-[36px] font-[900] butter-dark tracking-tighter leading-none">Your outcome.</h3>
                      <p className="font-[300] text-sm md:text-[18px] opacity-60">Prepare your look on the left to see the AI session outcome here.</p>
                   </div>
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-20">
                   <div className="flex flex-col items-center gap-6 md:gap-8">
                      <div className="w-16 h-16 md:w-24 md:h-24 border-[6px] md:border-[8px] border-black border-t-[#FFFD63] rounded-full animate-spin shadow-lg" />
                      <div className="space-y-1 md:space-y-2 text-center">
                        <span className="font-[900] text-xl md:text-[28px] tracking-tighter butter-dark uppercase block">Processing</span>
                        <p className="text-[10px] md:text-[12px] font-medium tracking-[0.2em] opacity-40">AI SESSION IN PROGRESS</p>
                      </div>
                   </div>
                </div>
              )}
           </div>
           
           {result && (
              <div className="mt-6 md:mt-10 flex flex-col gap-4 md:gap-6">
                 <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                    <button 
                      onClick={handleDownload}
                      className="w-full sm:w-auto bg-white border-[2px] md:border-[3px] border-black px-8 md:px-12 py-3 md:py-5 rounded-xl md:rounded-[24px] font-[900] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 md:hover:translate-x-1 md:hover:translate-y-1 hover:shadow-none transition-all tracking-tighter text-sm md:text-base"
                    >
                       Download.
                    </button>
                    <button 
                      onClick={handleSaveOutfit}
                      disabled={saveLoading}
                      className={`w-full sm:w-auto border-[2px] md:border-[3px] border-black px-8 md:px-12 py-3 md:py-5 rounded-xl md:rounded-[24px] font-[900] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 md:hover:translate-x-1 md:hover:translate-y-1 hover:shadow-none transition-all tracking-tighter text-sm md:text-base ${saveSuccess ? 'bg-[#BFF9EA]' : 'bg-[#C7D0FF]'}`}
                    >
                       {saveLoading ? 'Saving...' : saveSuccess ? 'Saved! ✨' : 'Save Outfit.'}
                    </button>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                    <button 
                      onClick={() => navigate('/wardrobe')}
                      className="w-full sm:w-auto bg-white border-[2px] md:border-[3px] border-black px-8 md:px-12 py-3 md:py-5 rounded-xl md:rounded-[24px] font-[900] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 md:hover:translate-x-1 md:hover:translate-y-1 hover:shadow-none transition-all tracking-tighter text-sm md:text-base"
                    >
                       Wardrobe.
                    </button>
                    <button 
                      onClick={handleStartOver}
                      className="w-full sm:w-auto bg-white border-[2px] md:border-[3px] border-black px-8 md:px-12 py-3 md:py-5 rounded-xl md:rounded-[24px] font-[900] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 md:hover:translate-x-1 md:hover:translate-y-1 hover:shadow-none transition-all tracking-tighter text-sm md:text-base"
                    >
                       Start Over.
                    </button>
                 </div>
              </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default GeneratorPage;
