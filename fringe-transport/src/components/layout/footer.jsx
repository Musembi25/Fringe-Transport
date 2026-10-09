import { Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <div className="mb-4 text-lg font-bold tracking-[0.2em]">
              FRINGE
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/60">
              Reliable and professional transport services across Nairobi
              and beyond.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Company
            </h3>

            <div className="space-y-3 text-sm text-white/70">
              <a href="/about" className="block hover:text-white">
                About Us
              </a>

              <a href="/services" className="block hover:text-white">
                Services
              </a>

              <a href="/contact" className="block hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Services
            </h3>

            <div className="space-y-3 text-sm text-white/70">
              <p>Airport Transfers</p>
              <p>Private Transport</p>
              <p>Corporate Transport</p>
              <p>Long-Distance Travel</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-white/70">
              <a
                href="tel:+254742934895"
                className="flex items-center gap-3 hover:text-white"
              >
                <Phone size={17} />
                +254 742 934 895
              </a>

              <a
                href="mailto:musembi.shad1@gmail.com"
                className="flex items-center gap-3 break-all hover:text-white"
              >
                <Mail size={17} />
                musembi.shad1@gmail.com
              </a>

              <p>Nairobi, Kenya</p>
            </div>
          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Fringe Transport. All rights reserved.
        </div>
      </div>
    </footer>
  )
}