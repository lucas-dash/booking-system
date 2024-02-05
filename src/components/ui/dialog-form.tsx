import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './button';

interface DialogFormProps {
  open: boolean;
  toggle: () => void;
}

export default function DialogForm({ open, toggle }: DialogFormProps) {
  return (
    <Dialog open={open} onOpenChange={toggle}>
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
      </DialogContent>
    </Dialog>
  );
}
