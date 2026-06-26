import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Package, Thermometer, Lock, BarChart3, CheckCircle, Users, ArrowRight } from "lucide-react";

export default function Warehousing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-[#000080] to-[#001a4d] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <rect x="100" y="150" width="200" height="300" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="350" y="100" width="200" height="350" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="600" y="150" width="200" height="300" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="850" y="100" width="200" height="350" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 h-full flex items-center px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FF8C00]/20 rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <span className="text-[#FF8C00] font-bold text-sm uppercase tracking-widest">Storage Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Warehousing Services</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Modern warehousing and storage solutions with advanced inventory management. Climate-controlled facilities with 24/7 security monitoring.
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
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Why Choose Our Warehousing?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Thermometer,
                title: "Climate Control",
                description: "Temperature and humidity-controlled facilities for sensitive goods.",
              },
              {
                icon: BarChart3,
                title: "Inventory Management",
                description: "Advanced systems for real-time inventory tracking and reporting.",
              },
              {
                icon: Lock,
                title: "24/7 Security",
                description: "Round-the-clock surveillance and security monitoring systems.",
              },
              {
                icon: Package,
                title: "Flexible Space",
                description: "Shared and dedicated warehouse space tailored to your needs.",
              },
              {
                icon: Users,
                title: "Expert Staff",
                description: "Trained professionals for efficient handling and operations.",
              },
              {
                icon: CheckCircle,
                title: "Compliance",
                description: "Full compliance with industry standards and regulations.",
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
              <h2 className="text-3xl font-bold text-[#000080] mb-6">Complete Warehousing Solutions</h2>
              <div className="space-y-4">
                {[
                  "Climate-controlled storage facilities",
                  "Shared and dedicated warehouse space",
                  "Real-time inventory management systems",
                  "Automated picking and packing services",
                  "Cross-docking operations",
                  "Hazardous materials storage",
                  "Quality control and inspection",
                  "Customs bonded warehousing",
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
                <Package className="w-32 h-32 text-[#FF8C00] opacity-20 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Modern Warehouse Facilities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse Types */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Warehouse Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Standard Warehouse",
                description: "General-purpose storage for most cargo types",
                features: ["Basic climate control", "Standard security", "Flexible terms", "Cost-effective"],
              },
              {
                title: "Climate-Controlled",
                description: "Temperature and humidity-controlled storage",
                features: ["Precise temperature control", "Humidity monitoring", "Sensitive goods", "Premium pricing"],
              },
              {
                title: "Bonded Warehouse",
                description: "Customs-approved storage for imported goods",
                features: ["Customs compliance", "Duty deferral", "Import/export ready", "Regulatory approved"],
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

      {/* Value Added Services */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Value-Added Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Labeling and packaging",
              "Quality inspection",
              "Kitting and assembly",
              "Returns management",
              "Inventory optimization",
              "Data analytics and reporting",
              "EDI integration",
              "24/7 customer support",
            ].map((service, index) => (
              <Card key={index} className="bg-white border-2 border-[#FF8C00]/20 p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-medium">{service}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#000080] to-[#001a4d] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Warehousing Solutions?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Get a customized warehousing quote for your storage and inventory needs.
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
