import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import contactBackground from "../assets/contact.jpg";

const phone = "+254742934895";
const email = "musembi.shad1@gmail.com";
const whatsapp = "https://wa.me/254742934895?text=Hello%20Fringe%20Transport%2C%20I%27d%20like%20to%20enquire%20about%20a%20journey.";

export default function Contact() {
  return (
    <main className="bg-[#f7f6f2]">
      <section
        className="page-hero page-hero--contact bg-[#111111] text-white"
        style={{ "--page-hero-image": `url(${contactBackground})` }}
      >
        <div className="page-hero-content mx-auto max-w-[1280px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f59e0b]">Contact us</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Let's plan your next journey.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
            Ask a question, discuss your route or follow up on a booking.
            Contact Fringe Transport using whichever option is most convenient for you.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d97706]">Get in touch</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl">We're ready to hear from you.</h2>
          <p className="mt-5 text-sm leading-7 text-neutral-600">
            For a faster response, include your travel date, pickup point,
            destination and any details relevant to your enquiry.
          </p>

          <div className="mt-8 space-y-4">
            <a href={`tel:${phone}`} className="flex items-start gap-4 border border-neutral-200 bg-white p-5 transition hover:border-[#d97706]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#f7f6f2] text-[#a16207]"><Phone size={20} /></span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Call us</span>
                <span className="mt-1 block break-words font-semibold text-[#111111]">+254 742 934 895</span>
              </span>
              <ArrowUpRight size={18} className="ml-auto shrink-0 text-neutral-400" />
            </a>

            <a href={whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4 border border-neutral-200 bg-white p-5 transition hover:border-[#d97706]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#f7f6f2] text-[#a16207]"><MessageCircle size={20} /></span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">WhatsApp</span>
                <span className="mt-1 block font-semibold text-[#111111]">Chat with Fringe Transport</span>
              </span>
              <ArrowUpRight size={18} className="ml-auto shrink-0 text-neutral-400" />
            </a>

            <a href={`mailto:${email}`} className="flex items-start gap-4 border border-neutral-200 bg-white p-5 transition hover:border-[#d97706]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#f7f6f2] text-[#a16207]"><Mail size={20} /></span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Email</span>
                <span className="mt-1 block break-all font-semibold text-[#111111]">{email}</span>
              </span>
              <ArrowUpRight size={18} className="ml-auto shrink-0 text-neutral-400" />
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-[#111111] p-7 text-white sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f59e0b]">Before you contact us</p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Help us understand your journey.</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-300">
              Having a few details ready helps us understand your request and
              discuss the next steps with you.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Your preferred date and pickup time",
                "Pickup point and destination",
                "Number of passengers and luggage",
                "Any stops or special requirements",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-neutral-200">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#d97706] text-[#f59e0b]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <MapPin size={18} className="text-[#f59e0b]" />
              Nairobi, Kenya
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-neutral-300">
              <Clock3 size={18} className="text-[#f59e0b]" />
              Contact us to discuss availability
            </div>
            <Link to="/booking" className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#d97706] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#f59e0b]">
              Go to booking form
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
