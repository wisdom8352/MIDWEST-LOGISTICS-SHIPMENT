import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Plane, Ship, Truck, Package, Shield, FileText, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    id: "air-freight",
    icon: Plane,
    title: "Air Freight",
    description: "Fast and reliable international air freight services for time-sensitive shipments.",
    features: [
      "Express delivery to 200+ destinations",
      "IATA certified handling",
      "Real-time tracking",
      "Competitive rates for bulk shipments",
    ],
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service1.jpg",
  },
  {
    id: "sea-freight",
    icon: Ship,
    title: "Sea/Ocean Freight",
    description: "Cost-effective ocean shipping for large volume shipments worldwide.",
    features: [
      "FCL and LCL services",
      "Port-to-port and door-to-door options",
      "Customs clearance assistance",
      "Competitive ocean freight rates",
    ],
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service2.jpg",
  },
  {
    id: "road-transportation",
    icon: Truck,
    title: "Road Transportation",
    description: "Reliable domestic and cross-border road transportation services.",
    features: [
      "Full truckload (FTL) and LTL services",
      "GPS tracking and real-time updates",
      "Professional drivers and modern fleet",
      "Flexible scheduling and routing",
    ],
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service3.jpg",
  },
  {
    id: "secure-logistics",
    icon: Shield,
    title: "Secure Logistics",
    description: "Specialized secure handling for high-value and sensitive shipments.",
    features: [
      "Armed escort services available",
      "Secure packaging and sealing",
      "Insurance coverage options",
      "Diplomatic bag services",
    ],
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service4.jpg",
  },
  {
    id: "warehousing",
    icon: Package,
    title: "Warehousing",
    description: "Modern warehousing and storage solutions with advanced inventory management.",
    features: [
      "Climate-controlled facilities",
      "Inventory management systems",
      "Shared and dedicated spaces",
      "24/7 security monitoring",
    ],
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service5.jpg",
  },
  {
    id: "packaging",
    icon: FileText,
    title: "Packaging & Storage",
    description: "Professional packaging and storage for various types of cargo.",
    features: [
      "Custom packaging solutions",
      "Protective materials and handling",
      "Cargo insurance available",
      "Long-term and short-term storage",
    ],
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service6.jpg",
  },
];

export default function Services() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#000080] to-[#001a4d] text-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Comprehensive logistics solutions tailored to your unique shipping needs. From air freight to warehousing, we have you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.id}
                  className="bg-white border-[#FF8C00]/20 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Service Image */}
                  <div className="h-48 bg-gradient-to-br from-[#000080]/10 to-[#FF8C00]/10 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-20 h-20 text-[#FF8C00] opacity-20" />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#FF8C00]/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[#FF8C00]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#000080]">{service.title}</h3>
                    </div>

                    <p className="text-gray-700 mb-6 text-sm leading-relaxed">{service.description}</p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-[#FF8C00] flex-shrink-0 mt-1" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <Button
                      onClick={() => {
                        const routeMap: Record<string, string> = {
                          "air-freight": "/services/air-freight",
                          "sea-freight": "/services/sea-freight",
                          "road-transportation": "/services/road-transportation",
                          "secure-logistics": "/services/secure-logistics",
                          "warehousing": "/services/warehousing",
                          "packaging": "/services/packaging-storage",
                        };
                        setLocation(routeMap[service.id] || "/services");
                      }}
                      className="w-full bg-[#FF8C00] text-white hover:bg-[#E67E00] font-bold flex items-center justify-center gap-2"
                    >
                      Learn More <ArrowRight size={16} />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Why Choose Our Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Competitive Pricing",
                description: "Best rates in the industry without compromising on quality or service standards.",
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer support to address any concerns or emergencies.",
              },
              {
                title: "Real-Time Tracking",
                description: "Advanced tracking systems for complete visibility of your shipments.",
              },
              {
                title: "Global Network",
                description: "Access to international partnerships and logistics networks worldwide.",
              },
              {
                title: "Customs Expertise",
                description: "Professional handling of customs clearance and documentation.",
              },
              {
                title: "Flexible Solutions",
                description: "Customizable services tailored to your specific business requirements.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="bg-white border-[#FF8C00]/20 p-6">
                <h3 className="font-bold text-[#000080] mb-3 text-lg">{benefit.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#000080] to-[#001a4d] text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-lg mb-8 text-gray-200">
            Our logistics experts are ready to design a tailored solution for your unique shipping needs.
          </p>
          <Button
            onClick={() => setLocation("/contact")}
            className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] px-8 py-3 flex items-center gap-2 mx-auto"
          >
            Get a Quote <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000080] text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">© 2026 Midwest Logistics Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
