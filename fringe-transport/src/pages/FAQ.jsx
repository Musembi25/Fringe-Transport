import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";

const questions = [
  {
    q: "How do I book a ride?",
    a: "Open the booking page, enter your contact information and journey details, then submit your request. Keep the booking reference shown after submission for follow-up.",
  },
  {
    q: "Is my booking confirmed immediately?",
    a: "No. Submitting the form sends a booking request. Your journey is confirmed only after Fringe Transport has reviewed the details and communicated confirmation to you.",
  },
  {
    q: "What information should I provide?",
    a: "Provide your name, phone number, pickup point, destination, preferred date and time, passenger count and any important travel details. For airport transfers, include your flight number when available.",
  },
  {
    q: "Can I request an airport transfer?",
    a: "Yes. Select the relevant service when booking and include your flight details if available. Contact us if your flight changes or you need to update the arrangement.",
  },
  {
    q: "Can I request additional stops?",
    a: "Yes. Include your additional stops and any relevant instructions in the booking form so the route can be reviewed before confirmation.",
  },
  {
    q: "How are fares determined?",
    a: "Fares depend on the journey, distance, timing and other requirements. Submit your request and discuss the price with us. Do not assume a booking is confirmed until the arrangements and fare have been agreed.",
  },
  {
    q: "How do I change or cancel a booking?",
    a: "Contact us by phone, WhatsApp or email as soon as possible. Include your booking reference so we can identify your request. Any applicable cancellation terms will depend on the arrangements communicated to you.",
  },
  {
    q: "Where does Fringe Transport operate?",
    a: "Fringe Transport is based in Nairobi, Kenya. You can enquire about journeys within the city and travel to other destinations. Availability depends on the requested route and schedule.",
  },
];

export default function FAQ() {
  return (
    <main className="bg-[#f7f6f2]">
      <section className="bg-[#111111] text-white">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f59e0b]">Help centre</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Frequently asked questions.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-300">
            Useful information about bookings, journey arrangements and contacting Fringe Transport.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="space-y-3">
          {questions.map(({ q, a }) => (
            <details key={q} className="group border border-neutral-200 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-semibold text-[#111111] sm:p-6">
                <span>{q}</span>
                <ChevronDown size={19} className="shrink-0 text-[#d97706] transition group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-sm leading-7 text-neutral-600 sm:px-6 sm:pb-6">{a}</div>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-4">
            <MessageCircle size={24} className="mt-1 shrink-0 text-[#d97706]" />
            <div>
              <h2 className="font-semibold text-[#111111]">Still have a question?</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Contact us and we'll help you with your enquiry.</p>
            </div>
          </div>
          <Link to="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]">
            Contact us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
