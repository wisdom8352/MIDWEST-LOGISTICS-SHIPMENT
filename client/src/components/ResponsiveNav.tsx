import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const serviceMenuItems = [
  { label: "Sea/Ocean Freight", href: "/services/sea-freight" },
  { label: "Road Transportation", href: "/services/road-transportation" },
  { label: "Air Freight", href: "/services/air-freight" },
  { label: "Warehousing", href: "/services/warehousing" },
  { label: "Packaging & Storage", href: "/services/packaging-storage" },
  { label: "Secure Logistics", href: "/services/secure-logistics" },
];

export function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  // Handle scroll event for blur effect
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  // Add scroll listener on mount
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:block bg-[#000080] border-b border-[#FF8C00]/30 px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm">
          <span className="text-gray-300">Open 24/7 for Global Logistics</span>
          <span className="text-gray-300">
            Email: <a href="mailto:info@midwestlogistics.com" className="text-[#FF8C00] hover:underline font-semibold">info@midwestlogistics.com</a> | 
            <span className="text-[#FF8C00] font-bold ml-2">TOLL FREE: +1 (800) 123-4567</span>
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-lg backdrop-blur-md bg-white/95" : "border-b border-gray-200"
      }`}>
        <div className="px-4 md:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <a className="text-2xl font-bold text-[#000080] hover:text-[#FF8C00] transition-colors">
                Midwest Logistics
              </a>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/">
                <a className="text-[#000080] hover:text-[#FF8C00] transition-colors font-medium">Home</a>
              </Link>
              <Link href="/about">
                <a className="text-[#000080] hover:text-[#FF8C00] transition-colors font-medium">About</a>
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <Link href="/services">
                  <a className="flex items-center gap-2 text-[#000080] hover:text-[#FF8C00] transition-colors font-medium">
                    Services
                    <ChevronDown size={18} className="group-hover:rotate-180 transition-transform duration-300" />
                  </a>
                </Link>
                <div className="absolute left-0 mt-0 w-56 bg-white border-2 border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 hover:opacity-100 hover:visible">
                  {serviceMenuItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <a className="block px-4 py-3 text-[#000080] hover:bg-[#FF8C00]/10 hover:text-[#FF8C00] transition-colors text-sm font-medium">
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/track">
                <a className="text-[#000080] hover:text-[#FF8C00] transition-colors font-medium">Track Shipment</a>
              </Link>
              <Link href="/contact">
                <a className="text-[#000080] hover:text-[#FF8C00] transition-colors font-medium">Contact</a>
              </Link>

              {/* Get Quote Button */}
              <Button className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] hover:scale-105 transition-all px-6 py-2 rounded-lg">
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-[#000080] hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link href="/">
                <a
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-[#000080] hover:text-[#FF8C00] hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-[#000080] hover:text-[#FF8C00] hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  About
                </a>
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={toggleServices}
                  className="w-full flex items-center justify-between px-4 py-3 text-[#000080] hover:text-[#FF8C00] hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Services
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 space-y-1 mt-2 animate-in fade-in slide-in-from-top duration-200">
                    {serviceMenuItems.map((item, index) => (
                      <Link key={index} href={item.href}>
                        <a
                          onClick={() => {
                            setIsOpen(false);
                            setIsServicesOpen(false);
                          }}
                          className="block px-4 py-2 text-[#000080] hover:text-[#FF8C00] hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                        >
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/track">
                <a
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-[#000080] hover:text-[#FF8C00] hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Track Shipment
                </a>
              </Link>
              <Link href="/contact">
                <a
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-[#000080] hover:text-[#FF8C00] hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Contact
                </a>
              </Link>

              {/* Mobile Get Quote Button */}
              <Button className="w-full bg-[#FF8C00] text-white hover:bg-[#E67E00] font-bold py-3 rounded-lg transition-all mt-2 hover:scale-105">
                Get Quote
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
