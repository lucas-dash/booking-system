import { FormEvent, useState } from 'react';
import { Button } from './ui/button';

export default function AddReservation() {
  const [room, setRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={room}
        onChange={({ target }) => setRoom(target.value)}
      />
      <input
        type="date"
        value={checkIn}
        onChange={({ target }) => setCheckIn(target.value)}
      />
      <input
        type="date"
        value={checkOut}
        onChange={({ target }) => setCheckOut(target.value)}
      />

      <Button>
        {/* {isPending && <Loader2 className="mr-1 animate-spin" />} */}
        Reserve
      </Button>
    </form>
  );
}
