import { Link } from "react-router-dom";

const sections = [
  ["Information we collect", "When you submit a booking request, we may collect your name, phone number, email address, pickup and destination details, travel date and time, passenger and luggage counts, service selection, flight information and any instructions you provide."],
  ["How we use information", "We use the information you provide to review and coordinate booking requests, contact you about your journey, respond to enquiries, manage customer service and maintain appropriate business records."],
  ["Who may receive information", "Information may be accessed by authorised people involved in managing your request and by service providers used to operate the website or support business operations, where applicable. We do not publish your booking details as public content."],
  ["Storage and security", "Booking information is stored using the systems configured for this website. We take reasonable steps to restrict access, but no website or electronic storage system can be guaranteed completely secure."],
  ["Cookies and technical data", "The website and its hosting or application services may process technical information needed to deliver, secure and troubleshoot the service. Any additional analytics or cookie tools should be disclosed here if they are introduced."],
  ["Your choices and requests", "If you would like to ask about personal information associated with your booking or request a correction, contact us. We may need to verify your identity before responding, and legal or operational recordkeeping obligations may limit deletion in some cases."],
  ["Contact", "For privacy enquiries, email musembi.shad1@gmail.com or call +254 742 934 895."],
];

export default function Privacy() {
  return (
    <main className="min-h-[60vh] bg-[#f7f6f2]">
      <section className="bg-[#111111] text-white">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f59e0b]">Your information</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-300">
            How Fringe Transport handles information you provide when making enquiries or requesting transport.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        <p className="mb-8 border-l-2 border-[#d97706] bg-white p-5 text-sm leading-7 text-neutral-600">
          This page describes the intended handling of information for the website. Review it against your actual hosting, analytics and business practices before publishing, and update it when those practices change.
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
          Need assistance? <Link to="/contact" className="font-semibold text-[#a16207] hover:underline">Get in touch.</Link>
        </p>
      </section>
    </main>
  );
}
