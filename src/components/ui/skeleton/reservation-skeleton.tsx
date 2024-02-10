import { Skeleton } from '../skeleton';

export default function ReservationSkeleton() {
  return (
    <div className="min-h-[80dvh] grid sm:grid-cols-[1fr_0.7fr] gap-5 px-2 sm:px-5 lg:container py-10">
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
    </div>
  );
}
