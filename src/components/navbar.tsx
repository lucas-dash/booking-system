import { BedDouble } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between absolute top-5 z-50 left-0 right-0 w-[90%] mx-auto">
      <div className="w-[40px] h-[40px] rounded-full grid place-items-center border-2 border-primary sm:border-secondary">
        <BedDouble className="max-sm:text-primary " />
      </div>
    </header>
  );
}
