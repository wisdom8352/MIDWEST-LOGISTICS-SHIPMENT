import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Box, Layers, Zap, Shield, CheckCircle, Truck, ArrowRight } from "lucide-react";

export default function PackagingStorage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-[#000080] to-[#001a4d] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <rect x="100" y="100" width="150" height="150" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="300" y="80" width="150" height="170" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="500" y="100" width="150" height="150" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="700" y="80" width="150" height="170" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="900" y="100" width="150" height="150" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 h-full flex items-center px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FF8C00]/20 rounded-lg flex items-center justify-center">
                <Box className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <span className="text-[#FF8C00] font-bold text-sm uppercase tracking-widest">Protection & Storage</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Packaging & Storage Services</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Professional packaging and storage solutions for various cargo types. Custom packaging, protective materials, and flexible storage options.
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
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Why Choose Our Packaging & Storage?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Box,
                title: "Custom Packaging",
                description: "Tailored packaging solutions for your specific cargo requirements.",
              },
              {
                icon: Layers,
                title: "Protective Materials",
                description: "Premium protective materials to ensure cargo safety during transit.",
              },
              {
                icon: Zap,
                title: "Quick Service",
                description: "Fast turnaround times for packaging and storage operations.",
              },
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "Rigorous quality checks on all packaged items before shipment.",
              },
              {
                icon: Truck,
                title: "Flexible Storage",
                description: "Short-term and long-term storage options available.",
              },
              {
                icon: CheckCircle,
                title: "Insurance Ready",
                description: "All packages prepared for insurance coverage and documentation.",
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
              <h2 className="text-3xl font-bold text-[#000080] mb-6">Comprehensive Packaging Solutions</h2>
              <div className="space-y-4">
                {[
                  "Custom box and crate design",
                  "Foam, bubble wrap, and protective padding",
                  "Fragile item handling expertise",
                  "Heavy equipment packaging",
                  "Hazardous material packaging",
                  "Eco-friendly packaging options",
                  "Reusable packaging solutions",
                  "Documentation and labeling",
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
                <Box className="w-32 h-32 text-[#FF8C00] opacity-20 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Professional Packaging Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging Types */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Packaging Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Standard Packaging",
                description: "Reliable packaging for general cargo",
                features: ["Cardboard boxes", "Bubble wrap", "Tape and labels", "Cost-effective"],
              },
              {
                title: "Premium Packaging",
                description: "Enhanced protection for valuable items",
                features: ["Foam inserts", "Wooden crates", "Custom design", "Maximum protection"],
              },
              {
                title: "Specialized Packaging",
                description: "Custom solutions for unique cargo",
                features: ["Hazmat certified", "Temperature control", "Anti-static materials", "Custom sizing"],
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

      {/* Storage Options */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Storage Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Short-Term Storage",
                duration: "Up to 30 days",
                features: ["Flexible terms", "Quick access", "Standard rates", "No long-term commitment"],
              },
              {
                title: "Long-Term Storage",
                duration: "30+ days",
                features: ["Discounted rates", "Climate control", "Inventory management", "Flexible extension"],
              },
              {
                title: "Climate-Controlled",
                duration: "Any duration",
                features: ["Temperature control", "Humidity monitoring", "Sensitive goods", "Premium pricing"],
              },
              {
                title: "Bonded Storage",
                duration: "Customs approved",
                features: ["Duty deferral", "Import/export ready", "Compliance certified", "Regulatory approved"],
              },
            ].map((storage, index) => (
              <Card key={index} className="border-2 border-[#FF8C00]/20 p-6 hover:border-[#FF8C00] transition-all">
                <h3 className="text-xl font-bold text-[#000080] mb-2">{storage.title}</h3>
                <p className="text-[#FF8C00] font-bold mb-4">{storage.duration}</p>
                <ul className="space-y-2">
                  {storage.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#FF8C00]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#000080] to-[#001a4d] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Packaging or Storage?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Get a customized quote for your packaging and storage needs. Our team is ready to help.
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
