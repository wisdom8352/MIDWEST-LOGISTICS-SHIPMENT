import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Truck, Navigation, Zap, Shield, CheckCircle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const cargoImages = [
  {
    title: "Cargo Trucks",
    description: "Modern fleet of cargo trucks for reliable transportation",
    icon: "🚚",
  },
  {
    title: "Freight Containers",
    description: "Secure shipping containers for various cargo types",
    icon: "📦",
  },
  {
    title: "Logistics Operations",
    description: "Professional cargo handling and logistics management",
    icon: "🏭",
  },
  {
    title: "Cargo Handling",
    description: "Expert loading and unloading services",
    icon: "👷",
  },
  {
    title: "Freight Movement",
    description: "Efficient movement of goods across regions",
    icon: "🛣️",
  },
  {
    title: "Supply Chain",
    description: "Integrated supply chain solutions",
    icon: "⛓️",
  },
];

export default function RoadTransportation() {
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cargoImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % cargoImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + cargoImages.length) % cargoImages.length);

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-[#000080] to-[#001a4d] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <path d="M100,300 L1100,300" stroke="#FF8C00" strokeWidth="2" opacity="0.5" />
            <circle cx="150" cy="300" r="8" fill="#FF8C00" />
            <circle cx="1050" cy="300" r="8" fill="#FF8C00" />
          </svg>
        </div>
        <div className="relative z-10 h-full flex items-center px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FF8C00]/20 rounded-lg flex items-center justify-center">
                <Truck className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <span className="text-[#FF8C00] font-bold text-sm uppercase tracking-widest">Nationwide Coverage</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Road Transportation</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Reliable domestic and cross-border road transportation. FTL and LTL services with GPS tracking and professional drivers.
            </p>
            <Button
              onClick={() => setLocation("/contact")}
              className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] px-8 py-3 flex items-center gap-2"
            >
              Get a Quote <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Cargo Carousel Slider */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Our Transportation Fleet & Services</h2>
          <div className="relative">
            {/* Carousel Container */}
            <div className="relative h-80 md:h-96 bg-gradient-to-br from-[#000080]/10 to-[#FF8C00]/10 rounded-2xl overflow-hidden">
              {cargoImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-8xl mb-4">{image.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#000080] mb-3">{image.title}</h3>
                    <p className="text-gray-600 text-lg">{image.description}</p>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 hover:bg-white text-[#000080] transition-all hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 hover:bg-white text-[#000080] transition-all hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {cargoImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 h-3 bg-[#FF8C00]"
                        : "w-3 h-3 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Why Choose Our Road Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Navigation,
                title: "GPS Tracking",
                description: "Real-time GPS tracking and live location updates for all shipments.",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                description: "Quick turnaround times with flexible scheduling and routing options.",
              },
              {
                icon: Shield,
                title: "Secure Transport",
                description: "Professional drivers and secure vehicles with insurance coverage.",
              },
              {
                icon: Truck,
                title: "Modern Fleet",
                description: "Well-maintained vehicles equipped with latest technology.",
              },
              {
                icon: CheckCircle,
                title: "Flexible Options",
                description: "FTL, LTL, and specialized transport services available.",
              },
              {
                icon: Navigation,
                title: "24/7 Support",
                description: "Round-the-clock customer support and emergency assistance.",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-white border-2 border-[#FF8C00]/20 p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-[#FF8C00]/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[#FF8C00]" />
                  </div>
                  <h3 className="font-bold text-[#000080] mb-3 text-lg">{feature.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#000080] mb-6">Comprehensive Road Transport Solutions</h2>
              <div className="space-y-4">
                {[
                  "Full Truckload (FTL) services",
                  "Less Than Truckload (LTL) consolidation",
                  "Dedicated transport solutions",
                  "Cross-border transportation",
                  "Hazardous materials handling",
                  "Temperature-controlled vehicles",
                  "Specialized cargo transport",
                  "Door-to-door delivery",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-[#000080]/10 to-[#FF8C00]/10 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <Truck className="w-32 h-32 text-[#FF8C00] opacity-20 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Professional Road Transportation Fleet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Transportation Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Full Truckload",
                description: "Dedicated vehicle for your complete shipment",
                features: ["Dedicated vehicle", "Direct routing", "Faster delivery", "Cost-effective for large volumes"],
              },
              {
                title: "Less Than Truckload",
                description: "Consolidated shipments with other cargo",
                features: ["Shared vehicle space", "Cost-efficient", "Flexible scheduling", "Regular routes"],
              },
              {
                title: "Specialized Transport",
                description: "Custom solutions for unique cargo needs",
                features: ["Hazmat certified", "Temperature control", "White-glove service", "Custom handling"],
              },
            ].map((option, index) => (
              <Card key={index} className="border-2 border-[#FF8C00]/20 p-8 hover:border-[#FF8C00] transition-all">
                <h3 className="text-2xl font-bold text-[#000080] mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#FF8C00]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setLocation("/contact")}
                  className="w-full bg-[#FF8C00] text-white hover:bg-[#E67E00] font-bold"
                >
                  Get Quote
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#000080] to-[#001a4d] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship by Road?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Get a competitive quote for your road transportation needs. Our fleet is ready to serve you.
          </p>
          <Button
            onClick={() => setLocation("/contact")}
            className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] px-8 py-3 flex items-center gap-2 mx-auto"
          >
            Contact Our Team <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000080] text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">© 2026 Midwest Logistics Company. All rights reserved.</p>
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            className="text-[#FF8C00] hover:text-white mt-4"
          >
            Back to Home
          </Button>
        </div>
      </footer>
    </div>
  );
}
