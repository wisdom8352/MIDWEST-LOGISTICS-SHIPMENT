import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Search, Package, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function Track() {
  const [, setLocation] = useLocation();
  const [trackingCode, setTrackingCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      toast.error("Please enter a tracking code");
      return;
    }

    setIsSearching(true);
    try {
      // Navigate to the tracking page with the code
      setLocation(`/track/${trackingCode}`);
    } catch (error) {
      toast.error("Failed to track shipment. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#000080] to-[#001a4d] text-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Track Your Shipment</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Enter your tracking code to get real-time updates on your shipment's location and status.
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border-[#FF8C00]/20 p-8 md:p-12">
            <form onSubmit={handleTrack} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Tracking Code</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                    placeholder="Enter your 12-character tracking code (e.g., ABC123DEF456)"
                    className="border-[#FF8C00]/30 focus:border-[#FF8C00] text-lg"
                    maxLength={12}
                  />
                  <Button
                    type="submit"
                    disabled={isSearching}
                    className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] px-8 flex items-center gap-2"
                  >
                    {isSearching ? "Searching..." : "Track"} <Search size={18} />
                  </Button>
                </div>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 text-sm">
                <strong>Tip:</strong> Your tracking code was provided in your shipment confirmation email. It's a 12-character code that uniquely identifies your package.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">How Tracking Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Package,
                title: "1. Enter Code",
                description: "Input your 12-character tracking code in the search box above.",
              },
              {
                icon: Clock,
                title: "2. Real-Time Updates",
                description: "View live updates on your shipment's status and location.",
              },
              {
                icon: MapPin,
                title: "3. Track Journey",
                description: "Follow your package through each stage of its journey.",
              },
              {
                icon: Search,
                title: "4. Get Details",
                description: "Access comprehensive information about your shipment.",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="bg-white border-[#FF8C00]/20 p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-[#FF8C00]/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#FF8C00]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#000080] mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#000080] mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Where can I find my tracking code?",
                a: "Your tracking code is provided in the shipment confirmation email sent to you when your package is picked up.",
              },
              {
                q: "How often are tracking updates provided?",
                a: "Tracking updates are provided in real-time as your shipment moves through our logistics network.",
              },
              {
                q: "What if my tracking code doesn't work?",
                a: "Please double-check the code and ensure it's entered correctly. Contact our support team if you continue to have issues.",
              },
              {
                q: "Can I track multiple shipments?",
                a: "Yes, you can track each shipment individually by entering its unique tracking code.",
              },
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-[#000080]/5 to-[#FF8C00]/5 border-[#FF8C00]/20 p-6">
                <h3 className="font-bold text-[#000080] mb-3">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </Card>
            ))}
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
