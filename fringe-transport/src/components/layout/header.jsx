import { Link } from "react-router-dom"
import { Phone } from "lucide-react"
import Button from "../ui/Button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#F7F6F2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111111] text-sm font-bold text-white">
            FT
          </div>

          <div>
            <div className="text-sm font-bold tracking-[0.18em] text-[#111111]">
              FRINGE
            </div>

            <div className="text-[10px] font-medium tracking-[0.25em] text-[#737373]">
              TRANSPORT
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium hover:text-[#D97706]">
            Home
          </Link>

          <Link to="/services" className="text-sm font-medium hover:text-[#D97706]">
            Services
          </Link>

          <Link to="/about" className="text-sm font-medium hover:text-[#D97706]">
            About
          </Link>

          <Link to="/contact" className="text-sm font-medium hover:text-[#D97706]">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+254742934895"
            className="hidden items-center gap-2 text-sm font-semibold md:flex"
          >
            <Phone size={17} />
            +254 742 934 895
          </a>

          <Button>
            Book a Ride
          </Button>
        </div>
      </div>
    </header>
  )
}