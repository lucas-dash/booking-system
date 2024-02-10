import { Suspense, lazy } from 'react';
import Hero from './hero';
import Rooms from './rooms';
import ReservationSkeleton from './ui/skeleton/reservation-skeleton';

const ReservationLazy = lazy(() => import('./reservation'));
const PlaceLazy = lazy(() => import('./place'));

export default function Home() {
  return (
    <main className="min-h-screen text-secondary">
      <Hero />
      <Rooms />

      <Suspense fallback={<ReservationSkeleton />}>
        <ReservationLazy />
        <PlaceLazy />
      </Suspense>
    </main>
  );
}
