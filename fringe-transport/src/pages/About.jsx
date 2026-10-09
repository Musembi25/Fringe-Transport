import { ArrowRight, CheckCircle2, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import aboutBackground from "../assets/about.jpg";

const principles = [
  {
    icon: ShieldCheck,
    title: "Dependability",
    text: "Clear communication, careful planning and a serious commitment to your journey.",
  },
  {
    icon: HeartHandshake,
    title: "Personal service",
    text: "Transport arranged around your needs, schedule and individual requirements.",
  },
  {
    icon: Compass,
    title: "Purposeful journeys",
    text: "From airport transfers to business travel, every booking deserves attention.",
  },
];

export default function About() {
  return (
    <main className="bg-[#f7f6f2]">
      <section
        className="page-hero page-hero--about bg-[#111111] text-white"
        style={{ "--page-hero-image": `url(${aboutBackground})` }}
      >
        <div className="page-hero-content mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f59e0b]">
            About Fringe Transport
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Every journey deserves to be handled well.
            </h1>
            <p className="max-w-xl text-base leading-8 text-neutral-300 sm:text-lg">
              We provide private transport from Nairobi, Kenya, with a focus on
              comfort, dependable coordination and service that respects your time.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/booking" className="inline-flex items-center justify-center gap-2 bg-[#d97706] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#f59e0b]">
              Arrange your journey <ArrowRight size={17} />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center border border-neutral-600 px-6 py-4 text-sm font-semibold text-white transition hover:border-white">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d97706]">Who we are</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#111111] sm:text-4xl">
            Professional transport. A more personal approach.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-neutral-600">
          <p>
            Fringe Transport is a Nairobi-based private transport service for
            people who value a comfortable journey and straightforward communication.
          </p>
          <p>
            We arrange journeys for airport transfers, personal appointments,
            business engagements, events and travel beyond the city. We take
            time to understand each request and confirm arrangements clearly.
          </p>
          <p>
            Our aim is simple: make arranging transport easier and help every
            customer travel with greater confidence.
          </p>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d97706]">What guides us</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl">
              The standards behind every booking.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border border-neutral-200 bg-[#f7f6f2] p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center bg-[#111111] text-[#f59e0b]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#111111]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111111]">Planning your next journey?</h2>
          <p className="mt-3 text-neutral-600">Tell us where you need to go and when.</p>
        </div>
        <Link to="/booking" className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#111111] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#d97706]">
          Book a ride <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
