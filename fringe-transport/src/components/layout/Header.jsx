import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import BrandLogo from "../BrandLogo";
import InstallAppButton from "../InstallAppButton";

const navigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Reviews", path: "/reviews" },
  { name: "Booking", path: "/booking" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97706] focus-visible:ring-offset-2"
        >
          <BrandLogo className="w-[142px] sm:w-[156px]" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97706] focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-orange-50 text-[#a16207]"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-[#a16207]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <InstallAppButton compact />
          <a
            href="tel:+254742934895"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-[#a16207] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97706]"
          >
            <Phone size={17} />
            +254 742 934 895
          </a>

          <Link
            to="/booking"
            className="rounded-xl bg-[#171717] px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#d97706] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97706] focus-visible:ring-offset-2"
          >
            Book a Ride
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-[#111111] transition duration-200 hover:border-amber-300 hover:bg-orange-50 hover:text-[#a16207] active:scale-95 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <nav id="mobile-navigation" className="mx-auto flex max-w-[1280px] flex-col px-5 py-4">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-neutral-100 px-3 py-4 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-orange-50 text-[#a16207]"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-[#a16207]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <a
              href="tel:+254742934895"
              onClick={closeMenu}
              className="flex min-h-12 items-center gap-2 rounded-lg px-3 py-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-[#a16207]"
            >
              <Phone size={17} />
              +254 742 934 895
            </a>

            <Link
              to="/booking"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-[#171717] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#d97706] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97706] focus-visible:ring-offset-2"
            >
              Book a Ride
            </Link>
            <InstallAppButton className="w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}
