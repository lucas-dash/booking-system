import ContactDialog from './booking/contact-dialog';
import BookingCard from './booking/booking-card';

export default function Reservation() {
  return (
    <section className="grid sm:grid-cols-[1fr_0.7fr] gap-5 px-2 sm:px-5 lg:container py-10">
      <ContactDialog />
      <article>
        <p>
          Holiday Hill is a comfortable cottage with a fully equipped kitchen,
          living room bedroom and apartment (for children), where our guests
          will find everything they need to relax and rest in the forests and
          meadows of the Sumava Forest. The cottage has two terraces, surrounded
          by a garden of 1500 m, in which everyone will find space to relax.
          Another attraction in the garden is the POOL and SAUNA (reservation
          and extra charge).
        </p>
      </article>
      <BookingCard />
    </section>
  );
}
