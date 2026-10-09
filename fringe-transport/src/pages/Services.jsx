import {
  ArrowRight, BriefcaseBusiness, CalendarDays, CarFront,
  MapPinned, Plane, Route, Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import servicesBackground from "../assets/services.jpg";

const services = [
  {
    icon: Plane,
    number: "01",
    title: "Airport transfers",
    text: "Arrange airport pickup or drop-off with your travel details shared in advance. Include your flight number when making your request.",
    detail: "Airport pickup and drop-off",
  },
  {
    icon: CarFront,
    number: "02",
    title: "Private transport",
    text: "Private journeys for appointments, errands, personal plans and day-to-day travel, arranged around your schedule.",
    detail: "Flexible, pre-arranged journeys",
  },
  {
    icon: BriefcaseBusiness,
    number: "03",
    title: "Corporate travel",
    text: "Transport for meetings, client visits, business engagements and other professional commitments.",
    detail: "Business-focused coordination",
  },
  {
    icon: CalendarDays,
    number: "04",
    title: "Events and occasions",
    text: "Plan transport for social occasions, functions and scheduled events by sharing your timing and route requirements.",
    detail: "Advance journey planning",
  },
  {
    icon: Route,
    number: "05",
    title: "Long-distance journeys",
    text: "Request transport between Nairobi and other destinations. Share your route and preferred travel time for confirmation.",
    detail: "Intercity travel requests",
  },
  {
    icon: Users,
    number: "06",
    title: "Custom transport arrangements",
    text: "Have a specific transport requirement? Tell us your passenger count, luggage needs and any additional stops.",
    detail: "Requests tailored to your needs",
  },
];

export default function Services() {
  return (
    <main className="bg-[#f7f6f2]">
      <section
        className="page-hero page-hero--services bg-[#111111] text-white"
        style={{ "--page-hero-image": `url(${servicesBackground})` }}
      >
        <div className="page-hero-content mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f59e0b]">Our services</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Transport that works around your plans.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
            From airport transfers to business travel and journeys beyond Nairobi,
            tell us what you need and we will help coordinate your request.
          </p>
          <Link to="/booking" className="mt-9 inline-flex items-center justify-center gap-2 bg-[#d97706] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#f59e0b]">
            Request a booking <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d97706]">How we can help</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl">One service. Different journeys.</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-neutral-600">
            All journeys are subject to availability, route details and confirmation.
            Share your requirements so we can discuss the right arrangement.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ icon: Icon, number, title, text, detail }) => (
            <article key={number} className="group flex min-h-[290px] flex-col border border-neutral-200 bg-white p-6 transition hover:border-[#d97706] sm:p-8">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-[#111111] text-[#f59e0b] transition group-hover:bg-[#d97706] group-hover:text-white">
                  <Icon size={22} />
                </div>
                <span className="text-sm font-semibold text-neutral-300">{number}</span>
              </div>
              <h3 className="mt-7 text-xl font-semibold text-[#111111]">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-neutral-600">{text}</p>
              <div className="mt-6 border-t border-neutral-100 pt-4 text-xs font-semibold uppercase tracking-wider text-[#a16207]">
                {detail}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d97706]">Simple process</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl">From request to confirmed journey.</h2>
          </div>
          <div className="space-y-5">
            {[
              ["01", "Share your journey", "Enter your pickup point, destination, date, time and travel requirements."],
              ["02", "We review the request", "We check the details and contact you to discuss availability and any questions."],
              ["03", "Receive confirmation", "Your journey is confirmed once the arrangements have been agreed with you."],
            ].map(([number, title, text]) => (
              <div key={number} className="flex gap-4 border-b border-neutral-200 pb-5 last:border-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#f7f6f2] text-sm font-semibold text-[#a16207]">{number}</span>
                <div>
                  <h3 className="font-semibold text-[#111111]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1280px] flex-col gap-5 px-5 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex gap-4">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center bg-white text-[#d97706] sm:flex"><MapPinned size={22} /></div>
          <div>
            <h2 className="text-2xl font-semibold text-[#111111]">Have a particular route in mind?</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-600">Send us your details and we'll discuss the arrangements.</p>
          </div>
        </div>
        <Link to="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 border border-neutral-300 px-6 py-4 text-sm font-semibold text-[#111111] transition hover:border-[#d97706] hover:text-[#a16207]">
          Contact us <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
