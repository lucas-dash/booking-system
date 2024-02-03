import { Button } from '../ui/button';

export default function DynamicNavbar() {
  return (
    <nav className="bg-accent rounded-full h-14 max-w-[280px] w-full flex items-center overflow-hidden fixed bottom-20 sm:top-10 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center w-full">
        <li>
          <Button variant={'ghost'} className="font-semibold text-base">
            Home
          </Button>
        </li>
        <li>
          <Button variant={'ghost'} className="font-semibold text-base">
            Rooms
          </Button>
        </li>
        <li>
          <Button variant={'ghost'} className="font-semibold text-base">
            Reserve
          </Button>
        </li>
      </ul>
    </nav>
  );
}
