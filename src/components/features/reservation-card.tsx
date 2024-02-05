import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DateForm from './date-form';

export default function ReservationCard() {
  // todo total prices calcul based on room
  return (
    <article>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            1,500 Kč
            <span className="ml-2 text-gray-500 text-base font-normal">
              night
            </span>
          </CardTitle>
          <CardDescription className="text-center">
            You won't be charged yet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DateForm />
        </CardContent>
        <CardFooter>
          <h5>Total:</h5>
        </CardFooter>
      </Card>
    </article>
  );
}
