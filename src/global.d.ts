import type { Database } from './lib/types/database.types';

declare global {
  type Reservation = Database['public']['Tables']['reservation']['Row'];
  type Todos = Database['public']['Tables']['todos']['Row'];
}
