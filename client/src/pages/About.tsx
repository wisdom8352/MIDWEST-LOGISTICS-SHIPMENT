import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Users, Globe, Award, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#000080] to-[#001a4d] text-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Midwest Logistics</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Leading the logistics industry with innovative solutions, reliable service, and a commitment to excellence since our founding.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#000080] mb-6">Who We Are</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Midwest Logistics is a premier global logistics and freight forwarding company dedicated to providing comprehensive shipping solutions. With over two decades of industry experience, we have established ourselves as a trusted partner for businesses of all sizes.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our mission is to simplify global logistics by offering reliable, cost-effective, and innovative transportation solutions that connect businesses worldwide. We pride ourselves on our customer-centric approach and commitment to operational excellence.
              </p>
              <Button
                onClick={() => setLocation("/services")}
                className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] flex items-center gap-2"
              >
                Explore Our Services <ArrowRight size={18} />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-[#FF8C00]/20 to-[#000080]/20 rounded-lg p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Globe className="w-8 h-8 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[#000080] mb-2">Global Reach</h3>
                    <p className="text-gray-700 text-sm">Operations in 50+ countries with strategic partnerships worldwide.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Award className="w-8 h-8 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[#000080] mb-2">Industry Certified</h3>
                    <p className="text-gray-700 text-sm">IATA, ISO 9001, and multiple international certifications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[#000080] mb-2">Expert Team</h3>
                    <p className="text-gray-700 text-sm">500+ dedicated logistics professionals with specialized expertise.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Reliability",
                description: "Consistent, on-time delivery and dependable service you can count on.",
              },
              {
                title: "Innovation",
                description: "Cutting-edge technology and forward-thinking solutions for modern logistics.",
              },
              {
                title: "Integrity",
                description: "Transparent operations and honest communication with all stakeholders.",
              },
              {
                title: "Excellence",
                description: "Commitment to highest standards in every aspect of our operations.",
              },
            ].map((value, index) => (
              <Card key={index} className="bg-white border-[#FF8C00]/20 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#FF8C00]/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-[#FF8C00]" />
                </div>
                <h3 className="font-bold text-[#000080] mb-3">{value.title}</h3>
                <p className="text-gray-700 text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Milestones */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Our Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: "2000",
                title: "Founded",
                description: "Midwest Logistics established with a vision to revolutionize global freight forwarding.",
              },
              {
                year: "2010",
                title: "Global Expansion",
                description: "Expanded operations to 30+ countries and achieved IATA certification.",
              },
              {
                year: "2020",
                title: "Digital Transformation",
                description: "Launched advanced tracking system and AI-powered logistics optimization.",
              },
            ].map((milestone, index) => (
              <Card key={index} className="bg-gradient-to-br from-[#000080]/5 to-[#FF8C00]/5 border-[#FF8C00]/20 p-8">
                <div className="text-3xl font-bold text-[#FF8C00] mb-3">{milestone.year}</div>
                <h3 className="font-bold text-[#000080] mb-3 text-lg">{milestone.title}</h3>
                <p className="text-gray-700">{milestone.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#000080] to-[#001a4d] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "50+", label: "Countries Served" },
              { stat: "500+", label: "Team Members" },
              { stat: "1M+", label: "Shipments Annually" },
              { stat: "99.8%", label: "On-Time Delivery" },
            ].map((item, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-[#FF8C00] mb-2">{item.stat}</div>
                <p className="text-gray-200">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#000080] mb-6">Ready to Partner With Us?</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Experience the difference that professional logistics management can make for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/services")}
              className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] px-8 py-3"
            >
              View Services
            </Button>
            <Button
              onClick={() => setLocation("/contact")}
              variant="outline"
              className="border-[#000080] text-[#000080] hover:bg-[#000080]/5 px-8 py-3 font-bold"
            >
              Get in Touch
            </Button>
          </div>
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
