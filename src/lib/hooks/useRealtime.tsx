import { useQuery } from '@tanstack/react-query';
import { getReservation } from '../queries/get-reservations';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';

export default function useRealtime() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['realtimeReservation'],
    queryFn: () => getReservation(),
  });

  useEffect(() => {
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reservations' },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return { isLoading, data };
}
