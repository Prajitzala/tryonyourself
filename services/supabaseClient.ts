
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const saveOutfit = async (imageUrl: string, userId: string) => {
  const { data, error } = await supabase
    .from('outfits')
    .insert([
      {
        user_id: userId,
        image_url: imageUrl,
        created_at: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving outfit:', error);
    throw error;
  }
  return data;
};

export const getOutfits = async (userId: string) => {
  const { data, error } = await supabase
    .from('outfits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching outfits:', error);
    throw error;
  }
  return data;
};

export const deleteOutfit = async (outfitId: string) => {
  const { error } = await supabase
    .from('outfits')
    .delete()
    .eq('id', outfitId);

  if (error) {
    console.error('Error deleting outfit:', error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) console.error('Error signing in with Google:', error.message);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
};
