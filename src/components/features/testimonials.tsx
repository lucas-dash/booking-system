export default function Testimonials() {
  return (
    <article className="flex items-center gap-5 sm:gap-10">
      <div className="flex flex-col items-start">
        <h4 className="text-3xl sm:text-4xl font-bold max-sm:text-primary">
          29+
        </h4>
        <p className="text-gray-200 sm:text-gray-500">Activities around</p>
      </div>

      <div className="flex flex-col items-start">
        <h4 className="text-3xl sm:text-4xl font-bold max-sm:text-primary">
          74k+
        </h4>
        <p className="text-gray-200 sm:text-gray-500">Happy customers</p>
      </div>
    </article>
  );
}
