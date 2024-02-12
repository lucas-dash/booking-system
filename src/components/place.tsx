export default function Place() {
  return (
    <section className="w-full flex items-center justify-center h-full">
      <div className="w-max h-max overflow-hidden rounded-2xl border-2 border-secondary">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.095073527226!2d13.505007664428417!3d49.05829385403307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4774da0bc9d5f0e7%3A0x2c5988158cfcadcd!2sVchynice-Tetov%20I%2034%2C%20341%2092%20Srn%C3%AD-Ka%C5%A1persk%C3%A9%20Hory!5e0!3m2!1scs!2scz!4v1707579487285!5m2!1scs!2scz"
          width="1000"
          height="500"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
