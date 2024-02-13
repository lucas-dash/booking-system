import { BedDouble } from 'lucide-react';

export default function Logo() {
  return (
    <header className="absolute top-5 z-50 left-8 ">
      <div className="w-[40px] h-[40px] rounded-full grid place-items-center border-2 border-primary sm:border-secondary">
        <BedDouble className="max-sm:text-primary " />
      </div>
    </header>
  );
}
