import useCounter from '@/lib/hooks/useCounter';

export default function Testimonials() {
  const activity = useCounter(29, 1.5);
  const customers = useCounter(74, 1.5);

  return (
    <article className="flex items-center gap-5 sm:gap-10">
      <div className="flex flex-col items-center sm:items-start">
        <h4 className="text-3xl sm:text-4xl font-bold max-sm:text-primary">
          {activity}+
        </h4>
        <p className="text-gray-200 sm:text-gray-500">Activities around</p>
      </div>

      <div className="flex flex-col items-center sm:items-start">
        <h4 className="text-3xl sm:text-4xl font-bold max-sm:text-primary">
          {customers}+
        </h4>
        <p className="text-gray-200 sm:text-gray-500">Happy customers</p>
      </div>
    </article>
  );
}
