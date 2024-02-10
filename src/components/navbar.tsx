import { BedDouble } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-scroll';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between absolute top-5 z-50 left-0 right-0 w-[90%] mx-auto">
      <div className="w-[40px] h-[40px] rounded-full grid place-items-center border-2 border-primary sm:border-secondary">
        <BedDouble className="max-sm:text-primary " />
      </div>

      <ul className="flex items-center gap-3">
        <li>
          <Button variant={'secondary'} asChild>
            <Link
              to={'Contact'}
              spy={true}
              offset={-100}
              smooth={true}
              duration={600}
              aria-label="scroll to section"
              role="button"
            >
              Contact
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link
              to={'Reservation'}
              spy={true}
              offset={-100}
              smooth={true}
              duration={600}
              aria-label="scroll to section"
              role="button"
            >
              Reserve
            </Link>
          </Button>
        </li>
      </ul>
    </header>
  );
}
