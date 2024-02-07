import { supabase } from '../supabase/client';
import { InsertType } from '../types/reservations-type';

export async function insertReservation({
  check_in,
  check_out,
  guests_count,
  firstName,
  lastName,
  email,
  phone,
  total,
}: InsertType) {
  const { error } = await supabase.from('reservations').insert({
    check_in,
    check_out,
    total_price: total,
    guests_count,
    status: 'pending',
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
  });

  if (error) {
    throw new Error(error?.message);
  }
}
