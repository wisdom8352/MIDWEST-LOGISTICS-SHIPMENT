import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Ship, Anchor, DollarSign, TrendingDown, CheckCircle, MapPin, ArrowRight } from "lucide-react";

export default function SeaFreight() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-[#000080] to-[#001a4d] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <path d="M100,300 Q300,200 500,300 T900,300" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <circle cx="150" cy="300" r="8" fill="#FF8C00" />
            <circle cx="900" cy="300" r="8" fill="#FF8C00" />
          </svg>
        </div>
        <div className="relative z-10 h-full flex items-center px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FF8C00]/20 rounded-lg flex items-center justify-center">
                <Ship className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <span className="text-[#FF8C00] font-bold text-sm uppercase tracking-widest">Cost Effective</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Ocean Freight Services</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Cost-effective ocean shipping for large volume shipments worldwide. FCL and LCL services with flexible scheduling and competitive rates.
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
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Why Choose Our Ocean Freight?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Best Rates",
                description: "Competitive pricing for FCL and LCL shipments with volume discounts available.",
              },
              {
                icon: Anchor,
                title: "Global Ports",
                description: "Access to major ports worldwide with established relationships and priority handling.",
              },
              {
                icon: TrendingDown,
                title: "Cost Optimization",
                description: "Expert consolidation services to reduce shipping costs without compromising speed.",
              },
              {
                icon: MapPin,
                title: "Door-to-Door",
                description: "Complete logistics from origin to destination with customs clearance included.",
              },
              {
                icon: CheckCircle,
                title: "Flexible Options",
                description: "Full Container Load (FCL) and Less Than Container Load (LCL) services available.",
              },
              {
                icon: Ship,
                title: "Reliable Partners",
                description: "Partnerships with major shipping lines ensuring consistent schedules and capacity.",
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
              <h2 className="text-3xl font-bold text-[#000080] mb-6">Complete Ocean Shipping Solutions</h2>
              <div className="space-y-4">
                {[
                  "Full Container Load (FCL) services",
                  "Less Than Container Load (LCL) consolidation",
                  "Port-to-port and door-to-door options",
                  "Customs clearance and documentation",
                  "Hazardous cargo handling",
                  "Temperature-controlled containers",
                  "Insurance coverage options",
                  "Real-time shipment tracking",
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
                <Ship className="w-32 h-32 text-[#FF8C00] opacity-20 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Professional Ocean Freight Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Routes */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Major Shipping Routes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Asia-Europe",
                description: "Regular schedules to major European ports with competitive rates",
                transit: "30-45 days",
              },
              {
                title: "Americas Trade",
                description: "Comprehensive coverage of North and South American ports",
                transit: "15-30 days",
              },
              {
                title: "Intra-Asia",
                description: "Frequent sailings between major Asian ports and terminals",
                transit: "5-15 days",
              },
              {
                title: "Middle East",
                description: "Strategic routes to Gulf ports and Middle Eastern destinations",
                transit: "20-35 days",
              },
              {
                title: "Africa Routes",
                description: "Established connections to African ports and terminals",
                transit: "25-40 days",
              },
              {
                title: "Oceania",
                description: "Regular services to Australia, New Zealand, and Pacific ports",
                transit: "20-35 days",
              },
            ].map((route, index) => (
              <Card key={index} className="border-2 border-[#FF8C00]/20 p-6 hover:border-[#FF8C00] transition-all">
                <h3 className="text-xl font-bold text-[#000080] mb-3">{route.title}</h3>
                <p className="text-gray-600 mb-4">{route.description}</p>
                <div className="text-[#FF8C00] font-bold">Transit: {route.transit}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#000080] to-[#001a4d] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship by Sea?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Get a competitive quote for your ocean freight needs. Our team specializes in cost-effective solutions.
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
