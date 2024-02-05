import Hero from './hero';
import Place from './place';
import Reservation from './reservation';
import Rooms from './rooms';

export default function Home() {
  return (
    <main className="min-h-screen text-secondary">
      <Hero />
      <Rooms />
      <Reservation />
      <Place />
    </main>
  );
}
