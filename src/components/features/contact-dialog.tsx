import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import GuestForm from './guest-form';

interface DialogFormProps {
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContactDialog({ open, close }: DialogFormProps) {
  // todo handle dialog close ofter resolve reservation

  return (
    <Dialog open={open} onOpenChange={() => close(false)}>
      <DialogTrigger asChild>
        <Button className="w-full" type="submit">
          Reserve
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Info</DialogTitle>
          <DialogDescription>
            These information is for your comfortable accommodation
          </DialogDescription>
        </DialogHeader>
        <GuestForm />
      </DialogContent>
    </Dialog>
  );
}
