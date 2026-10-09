export default function Home() {
  return (
    <section className="min-h-[80vh] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#D97706]">
          Nairobi • Kenya
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-[#111111] md:text-7xl">
          Your journey.
          <br />
          <span className="text-[#D97706]">Our commitment.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#737373]">
          Reliable, professional and convenient transport services
          across Nairobi and beyond.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/booking"
            className="rounded-lg bg-[#D97706] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#B45309]"
          >
            Book a Ride
          </a>

          <a
            href="tel:+254742934895"
            className="rounded-lg border border-[#111111] px-6 py-3.5 text-sm font-bold text-[#111111] transition hover:bg-[#111111] hover:text-white"
          >
            Call Fringe Transport
          </a>
        </div>
      </div>
    </section>
  )
}