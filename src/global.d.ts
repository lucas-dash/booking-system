import type { Database } from './lib/types/database.types';

declare global {
  type Reservations = Database['public']['Tables']['reservations']['Row'];
  type Rooms = Database['public']['Tables']['rooms']['Row'];
  type Reviews = Database['public']['Tables']['reviews']['Row'];
}
