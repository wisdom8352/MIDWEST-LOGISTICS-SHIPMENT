import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Plane, Clock, Globe, Shield, Zap, CheckCircle, ArrowRight } from "lucide-react";

export default function AirFreight() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-[#000080] to-[#001a4d] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <path d="M100,300 Q300,100 500,300 T900,300" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <circle cx="150" cy="300" r="8" fill="#FF8C00" />
            <circle cx="900" cy="300" r="8" fill="#FF8C00" />
          </svg>
        </div>
        <div className="relative z-10 h-full flex items-center px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FF8C00]/20 rounded-lg flex items-center justify-center">
                <Plane className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <span className="text-[#FF8C00] font-bold text-sm uppercase tracking-widest">Express Delivery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Air Freight Services</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Fast, reliable international air freight solutions for time-sensitive shipments. Reach 200+ destinations worldwide with our IATA-certified services.
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

      {/* Key Features */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Why Choose Our Air Freight?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Express delivery to 200+ destinations with typical transit times of 2-5 days for international shipments.",
              },
              {
                icon: Shield,
                title: "IATA Certified",
                description: "Full compliance with international air transport regulations and industry safety standards.",
              },
              {
                icon: Globe,
                title: "Global Network",
                description: "Strategic partnerships with major airlines and airports worldwide for seamless connectivity.",
              },
              {
                icon: Clock,
                title: "24/7 Operations",
                description: "Round-the-clock booking, tracking, and customer support for your peace of mind.",
              },
              {
                icon: CheckCircle,
                title: "Real-Time Tracking",
                description: "Live GPS tracking and instant notifications at every stage of your shipment's journey.",
              },
              {
                icon: Plane,
                title: "Flexible Options",
                description: "Full charter services, scheduled flights, and consolidation options to fit your budget.",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-[#000080]/5 to-[#FF8C00]/5 border-[#FF8C00]/20 p-6 hover:shadow-lg transition-shadow">
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
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#000080] mb-6">Comprehensive Air Freight Solutions</h2>
              <div className="space-y-4">
                {[
                  "Express Air Services for urgent shipments",
                  "Consolidated freight for cost-effective solutions",
                  "Full charter flights for large volumes",
                  "Temperature-controlled cargo handling",
                  "Hazardous materials expertise",
                  "Door-to-door delivery options",
                  "Customs clearance assistance",
                  "Insurance coverage available",
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
                <Plane className="w-32 h-32 text-[#FF8C00] opacity-20 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Professional Air Freight Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Options */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Service Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Express Air",
                description: "Fastest service for urgent shipments",
                features: ["2-5 day delivery", "Priority handling", "Real-time tracking", "Dedicated support"],
                price: "Premium",
              },
              {
                title: "Standard Air",
                description: "Reliable service with competitive pricing",
                features: ["5-10 day delivery", "Consolidated freight", "Standard tracking", "Business hours support"],
                price: "Standard",
              },
              {
                title: "Charter Service",
                description: "Full aircraft charter for large volumes",
                features: ["Custom scheduling", "Flexible capacity", "Dedicated aircraft", "White-glove service"],
                price: "Custom Quote",
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
                <div className="text-[#FF8C00] font-bold text-lg mb-6">{option.price}</div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship by Air?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Get a competitive quote for your air freight needs within 2 hours. Our logistics experts are ready to help.
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
