import Hero from './hero';
import Rooms from './rooms';

export default function Home() {
  return (
    <main className="min-h-screen text-secondary">
      <Hero />
      <Rooms />
    </main>
  );
}
