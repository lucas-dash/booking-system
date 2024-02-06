import { useQuery } from '@tanstack/react-query';
import { getReservation } from '../queries/get-reservations';

export default function useReservation() {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: () => getReservation(),
  });
}
