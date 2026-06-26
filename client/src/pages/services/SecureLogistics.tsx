import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Shield, Lock, Eye, AlertCircle, CheckCircle, Users, ArrowRight } from "lucide-react";

export default function SecureLogistics() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-[#000080] to-[#001a4d] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 600" className="w-full h-full">
            <rect x="200" y="200" width="300" height="200" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <circle cx="350" cy="300" r="20" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M700,200 L900,300 L700,400 Z" stroke="#FF8C00" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 h-full flex items-center px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FF8C00]/20 rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <span className="text-[#FF8C00] font-bold text-sm uppercase tracking-widest">High-Value Protection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Secure Logistics Services</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Specialized secure handling for high-value and sensitive shipments. Armed escort services, secure packaging, and comprehensive insurance coverage.
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
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Why Choose Our Secure Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Armed Escort",
                description: "Professional armed security personnel for high-value shipments.",
              },
              {
                icon: Lock,
                title: "Secure Packaging",
                description: "Tamper-evident sealing and secure packaging materials.",
              },
              {
                icon: Eye,
                title: "Real-Time Monitoring",
                description: "GPS tracking and live monitoring throughout transport.",
              },
              {
                icon: AlertCircle,
                title: "Insurance Coverage",
                description: "Comprehensive insurance for full cargo value protection.",
              },
              {
                icon: Users,
                title: "Trained Personnel",
                description: "Certified security professionals with specialized training.",
              },
              {
                icon: CheckCircle,
                title: "Compliance",
                description: "Full compliance with international security standards.",
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
              <h2 className="text-3xl font-bold text-[#000080] mb-6">Comprehensive Security Solutions</h2>
              <div className="space-y-4">
                {[
                  "Armed escort services",
                  "Secure packaging and sealing",
                  "GPS tracking and monitoring",
                  "Insurance coverage up to full value",
                  "Diplomatic bag services",
                  "Jewelry and precious metals transport",
                  "Electronics and technology shipments",
                  "Artwork and antiques handling",
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
                <Shield className="w-32 h-32 text-[#FF8C00] opacity-20 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Professional Security Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cargo Types */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Specialized Cargo Handling</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Jewelry & Precious Metals",
                description: "Secure transport of diamonds, gold, and precious gemstones",
                security: "Maximum",
              },
              {
                title: "Electronics & Technology",
                description: "Protection for high-value tech equipment and components",
                security: "High",
              },
              {
                title: "Artwork & Antiques",
                description: "Specialized handling for fine art and collectibles",
                security: "High",
              },
              {
                title: "Pharmaceuticals",
                description: "Secure transport of high-value pharmaceutical products",
                security: "High",
              },
              {
                title: "Currency & Documents",
                description: "Diplomatic and sensitive document transport",
                security: "Maximum",
              },
              {
                title: "Luxury Goods",
                description: "Protection for designer goods and luxury items",
                security: "High",
              },
            ].map((cargo, index) => (
              <Card key={index} className="border-2 border-[#FF8C00]/20 p-6 hover:border-[#FF8C00] transition-all">
                <h3 className="text-xl font-bold text-[#000080] mb-3">{cargo.title}</h3>
                <p className="text-gray-600 mb-4">{cargo.description}</p>
                <div className="inline-block px-4 py-2 bg-[#FF8C00]/10 text-[#FF8C00] font-bold rounded-lg text-sm">
                  {cargo.security} Security
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Our Security Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "24/7 GPS tracking with real-time alerts",
              "Armed security personnel on all high-value shipments",
              "Tamper-evident packaging and sealing",
              "Comprehensive cargo insurance coverage",
              "Secure facilities with biometric access",
              "Background-checked and trained staff",
              "International security compliance",
              "Emergency response protocols",
              "Secure chain of custody documentation",
              "Regular security audits and inspections",
              "Encrypted communication systems",
              "Dedicated security coordinator",
            ].map((feature, index) => (
              <Card key={index} className="bg-white border-2 border-[#FF8C00]/20 p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-medium">{feature}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#000080] to-[#001a4d] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Secure Logistics?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Get a customized security solution for your high-value shipments. Our experts are ready to assist.
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
