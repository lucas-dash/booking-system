import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import GuestForm from './guest-form';
import { useModal } from '@/store/modal';

export default function ContactDialog() {
  const { modalState, closeModal } = useModal();
  return (
    <Dialog open={modalState} onOpenChange={closeModal}>
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
