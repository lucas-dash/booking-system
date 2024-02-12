import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section className=" h-full w-full flex-1 flex flex-col items-center justify-evenly">
      <h2 className="text-3xl font-semibold">Contact Us</h2>

      <div className="flex items-center flex-col gap-4 font-medium">
        <p className="font-medium flex items-center">
          <Phone className="mr-1" />
          792 888 992
        </p>
        <p className="font-medium flex items-center">
          <Mail className="mr-1" />
          johnDoe@gmail.com
        </p>
      </div>
    </section>
  );
}
