import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import BrandLogo from "../BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="mb-4 inline-flex rounded-xl bg-white p-2">
            <BrandLogo className="w-36" />
          </div>

          <p className="max-w-md text-sm leading-7 text-neutral-400">
            Professional, dependable private transport services in Nairobi,
            Kenya. Comfortable journeys, reliable service and a commitment to
            getting you where you need to be.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm text-neutral-400">
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <Link to="/services" className="hover:text-white">
              Services
            </Link>
            <Link to="/booking" className="hover:text-white">
              Book a Ride
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>

          <div className="flex flex-col gap-4 text-sm text-neutral-400">
            <a
              href="tel:+254742934895"
              className="flex items-center gap-3 hover:text-white"
            >
              <Phone size={16} />
              +254 742 934 895
            </a>

            <a
              href="mailto:musembi.shad1@gmail.com"
              className="flex items-center gap-3 hover:text-white"
            >
              <Mail size={16} />
              musembi.shad1@gmail.com
            </a>

            <div className="flex items-center gap-3">
              <MapPin size={16} />
              Nairobi, Kenya
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-6 text-xs text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Fringe Transport. All rights
            reserved.
          </p>

          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
