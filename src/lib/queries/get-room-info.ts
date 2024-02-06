import { supabase } from '../supabase/client';

export async function getRoomInfo() {
  const { data, error } = await supabase
    .from('rooms')
    .select()
    .eq('room_id', 'bea3d337-90a6-4075-9ce5-07775f0c486f')
    .single();

  if (error) {
    throw new Error(error?.message);
  }

  if (!data) {
    throw new Error('Failed to fetch room info!');
  }

  return data;
}
