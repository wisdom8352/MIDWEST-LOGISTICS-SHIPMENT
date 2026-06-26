import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ResponsiveNav } from "@/components/ResponsiveNav";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#000080] to-[#001a4d] text-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Get in touch with our logistics experts. We're here to help with your shipping needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Phone,
                title: "Phone",
                content: "+1 (800) 123-4567",
                subtext: "Available 24/7",
              },
              {
                icon: Mail,
                title: "Email",
                content: "info@midwestlogistics.com",
                subtext: "Response within 2 hours",
              },
              {
                icon: MapPin,
                title: "Address",
                content: "123 Logistics Way",
                subtext: "Chicago, IL 60601",
              },
              {
                icon: Clock,
                title: "Hours",
                content: "Open 24/7",
                subtext: "365 days a year",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-[#000080]/5 to-[#FF8C00]/5 border-[#FF8C00]/20 p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-[#FF8C00]/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#FF8C00]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#000080] mb-2">{item.title}</h3>
                  <p className="font-semibold text-[#000080] mb-1">{item.content}</p>
                  <p className="text-gray-600 text-sm">{item.subtext}</p>
                </Card>
              );
            })}
          </div>

          {/* Contact Form and Map */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#000080] mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="border-[#FF8C00]/30 focus:border-[#FF8C00]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="border-[#FF8C00]/30 focus:border-[#FF8C00]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="border-[#FF8C00]/30 focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="border-[#FF8C00]/30 focus:border-[#FF8C00]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your shipping needs..."
                    rows={5}
                    className="border-[#FF8C00]/30 focus:border-[#FF8C00]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] py-3 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send size={18} />
                </Button>
              </form>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-[#000080] mb-6">Why Contact Us?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Get a Custom Quote",
                    description: "Receive a personalized quote for your shipping needs within 2 hours.",
                  },
                  {
                    title: "Discuss Your Logistics",
                    description: "Talk to our experts about optimizing your supply chain and reducing costs.",
                  },
                  {
                    title: "Schedule a Consultation",
                    description: "Book a meeting with our logistics specialists to explore solutions.",
                  },
                  {
                    title: "Report an Issue",
                    description: "Contact us immediately if you have concerns about your shipment.",
                  },
                ].map((item, index) => (
                  <Card key={index} className="bg-gradient-to-br from-[#000080]/5 to-[#FF8C00]/5 border-[#FF8C00]/20 p-6">
                    <h3 className="font-bold text-[#000080] mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
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
