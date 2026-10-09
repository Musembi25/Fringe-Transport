import { Link } from "react-router-dom";

const sections = [
  ["1. Booking requests", "Submitting a booking form is a request for transport, not automatic confirmation. A booking becomes confirmed only when Fringe Transport communicates confirmation and the relevant arrangements have been agreed."],
  ["2. Accurate information", "Customers should provide accurate contact details, journey locations, dates, times, passenger numbers and other information needed to plan the journey. Please communicate changes as soon as possible."],
  ["3. Fares and payment", "Any fare, deposit, payment method or payment deadline applicable to a journey should be agreed with Fringe Transport before travel. Additional stops, route changes, waiting time or other changes may affect the agreed price."],
  ["4. Changes and cancellations", "Contact Fringe Transport promptly to request a change or cancellation. Whether a fee or other condition applies depends on the terms communicated and agreed for that booking."],
  ["5. Passenger responsibilities", "Passengers should be ready at the agreed pickup point and time, treat the driver and vehicle respectfully, follow reasonable safety instructions and ensure their luggage and belongings are managed appropriately."],
  ["6. Delays and circumstances beyond our control", "Traffic, weather, road closures, flight disruptions, mechanical issues and other unexpected events can affect travel. We will aim to communicate relevant changes, but exact arrival times cannot always be guaranteed."],
  ["7. Service availability", "All services and routes are subject to availability and confirmation. Submitting a request does not guarantee that a vehicle or driver will be available."],
  ["8. Website information", "We aim to keep website information accurate and current. Service descriptions are general information and do not override the specific arrangements confirmed for an individual booking."],
  ["9. Contact", "For questions about these terms or a booking, contact Fringe Transport by phone at +254 742 934 895 or by email at musembi.shad1@gmail.com."],
];

export default function Terms() {
  return (
    <main className="min-h-[60vh] bg-[#f7f6f2]">
      <section className="bg-[#111111] text-white">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f59e0b]">Website information</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Terms &amp; Conditions</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-300">
            These general terms explain how booking requests and transport arrangements are handled.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        <p className="mb-8 border-l-2 border-[#d97706] bg-white p-5 text-sm leading-7 text-neutral-600">
          Please read these terms before using the website. The specific terms agreed for a confirmed journey may provide additional details. This general page is informational and is not a substitute for legal advice.
        </p>
        <div className="space-y-8">
          {sections.map(([title, text]) => (
            <article key={title} className="border-b border-neutral-200 pb-7 last:border-0">
              <h2 className="text-lg font-semibold text-[#111111]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-neutral-600">
          Questions? <Link to="/contact" className="font-semibold text-[#a16207] hover:underline">Contact Fringe Transport.</Link>
        </p>
      </section>
    </main>
  );
}
