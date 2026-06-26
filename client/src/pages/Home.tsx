import { useState, useEffect } from "react";
import { Plane, Ship, Truck, FileText, MapPin, Clock, Shield, TrendingUp, Star, ChevronDown, CheckCircle, Package, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ResponsiveNav } from "@/components/ResponsiveNav";

const heroSlides = [
  {
    id: 1,
    title: "Global Logistics",
    headline: "Leading Global Logistics Service",
    subtitle: "We offer a full range of global freight services with unmatched reliability and speed.",
    icon: <Globe className="w-8 h-8 text-[#FF8C00]" />,
    backgroundVideo: "/videos/logistics-1.mp4",
    isVideo: true,
  },
  {
    id: 2,
    title: "Courier & Speed",
    headline: "Fastest & Reliable Courier Service",
    subtitle: "We offer a full range of global, ocean-freight services including FCL, LCL and consolidation.",
    icon: <Truck className="w-8 h-8 text-[#FF8C00]" />,
    backgroundImage: "/images/hero/logistics-2.jpg",
    isVideo: false,
  },
  {
    id: 3,
    title: "Professional Freight",
    headline: "Professional Freight Solutions",
    subtitle: "Professional shipping solutions tailored to meet your business needs worldwide.",
    icon: <Ship className="w-8 h-8 text-[#FF8C00]" />,
    backgroundImage: "/images/hero/logistics-3.jpg",
    isVideo: false,
  },
  {
    id: 4,
    title: "Storage & Warehousing",
    headline: "Industry Standard Warehousing",
    subtitle: "Comprehensive and scalable warehousing solutions with state-of-the-art security for modern businesses.",
    icon: <Package className="w-8 h-8 text-[#FF8C00]" />,
    backgroundImage: "/images/hero/logistics-4.jpg",
    isVideo: false,
  },
];

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description: "Midwest Logistics, as an IATA-endorsed air forwarder, offers professional and reliable global air-freight solutions.",
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service1.jpg",
  },
  {
    icon: Ship,
    title: "Sea/Ocean Freight",
    description: "International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.",
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service2.jpg",
  },
  {
    icon: Truck,
    title: "Road Transportation",
    description: "Highly experienced and dependable, Midwest Logistics is a trusted partner in domestic road transportation.",
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service3.jpg",
  },
  {
    icon: Shield,
    title: "Diplomatic Bag & Secure Logistics",
    description: "Global secure mail and equipment delivery service with complete confidence and security.",
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service4.jpg",
  },
  {
    icon: Package,
    title: "Warehousing",
    description: "Shared and dedicated warehousing solutions supported by state-of-the-art technology and warehouse services.",
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service5.jpg",
  },
  {
    icon: FileText,
    title: "Packaging & Storage",
    description: "Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.",
    image: "https://coexzggshiplogistics.live/temp/custom/images/services/service6.jpg",
  },
];

const whyChooseUs = [
  {
    title: "Global Supply Chain",
    description: "Access to international networks and partnerships ensuring seamless global logistics.",
  },
  {
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance from our dedicated support team whenever you need help.",
  },
  {
    title: "Careful Handling of Valuable Goods",
    description: "Specialized packaging and handling procedures for high-value and sensitive shipments.",
  },
  {
    title: "Real-Time Tracking",
    description: "Live GPS tracking and instant notifications to keep you informed every step of the way.",
  },
];

const statistics = [
  { number: "50K+", label: "Packages Delivered", icon: Package },
  { number: "10K+", label: "Happy Clients", icon: Users },
  { number: "150+", label: "Cities Reached", icon: Globe },
];

const reviews = [
  {
    name: "John Smith",
    company: "Tech Exports Inc.",
    text: "Midwest Logistics handled our international freight with incredible speed. The real-time tracking gave us total peace of mind.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    name: "Sarah Johnson",
    company: "Global Imports Ltd.",
    text: "Professional service, competitive pricing, and exceptional customer support. Midwest Logistics exceeded our expectations!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    name: "Michael Chen",
    company: "Trade Solutions Co.",
    text: "Reliable partner for all our logistics needs. The tracking system is intuitive and their team is always responsive.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
];

const faqs = [
  {
    question: "How do I track my shipment?",
    answer: "You can track your shipment in real-time using your tracking code on our tracking page. Simply enter your code to view location updates and delivery status.",
  },
  {
    question: "What shipping methods do you offer?",
    answer: "We offer air freight, sea freight, road freight, and customs clearance services tailored to your specific needs.",
  },
  {
    question: "What is your delivery timeframe?",
    answer: "Delivery times vary based on destination and shipping method. Air freight typically takes 2-5 days, sea freight 10-30 days, and road freight 1-10 days.",
  },
  {
    question: "Do you provide insurance?",
    answer: "Yes, we offer comprehensive cargo insurance options to protect your shipments during transit.",
  },
  {
    question: "How can I get a quote?",
    answer: "Contact our sales team with your shipment details, and we'll provide a competitive quote within 24 hours.",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trackingCode, setTrackingCode] = useState("");

  // Auto-play hero slider - transitions every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      setLocation(`/track/${trackingCode.toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Responsive Navigation */}
      <ResponsiveNav />

      {/* Hero Slider - Full Viewport Height - Mobile-First Design */}
      <div className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Video or Image - Optimized for Mobile */}
            {slide.isVideo && slide.backgroundVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={slide.backgroundVideo} type="video/mp4" />
              </video>
            ) : slide.backgroundImage ? (
              <img
                src={slide.backgroundImage}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : null}

            {/* Dark Overlay - Ensures Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>

            {/* Mobile-First Content Layout - Centered and Responsive */}
            <div className="relative z-20 h-full flex items-center justify-center md:justify-start">
              <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 max-w-2xl text-center md:text-left">
                {/* Icon and Label */}
                <div className="flex items-center gap-3 mb-4 md:mb-6 justify-center md:justify-start">
                  {slide.icon}
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#FF8C00]">
                    {slide.title}
                  </span>
                </div>

                {/* Main Headline - Responsive Typography */}
                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight transition-all duration-1000 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}>
                  {slide.headline}
                </h1>

                {/* Subtitle - Responsive and Legible */}
                <p className={`text-base sm:text-lg md:text-xl text-gray-100 mb-6 md:mb-10 max-w-xl leading-relaxed transition-all duration-1000 delay-300 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}>
                  {slide.subtitle}
                </p>

                {/* CTA Buttons - Mobile-Optimized Stack */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                  <Button
                    onClick={() => setLocation('/track')}
                    className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] hover:scale-105 transition-all px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
                  >
                    Track Shipment
                  </Button>
                  <Button
                    onClick={() => setLocation('/services')}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#000080] px-6 md:px-8 py-3 text-base md:text-lg transition-all w-full sm:w-auto"
                  >
                    View Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators Only - No Navigation Arrows */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3">
          {heroSlides.map((_, index) => (
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

      {/* Floating Tracking Widget - Overlaps Hero & Services */}
      <div className="relative z-40 -mt-16 md:-mt-24 mb-12 md:mb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-2xl p-6 md:p-10 border-none rounded-2xl">
            <h3 className="text-[#000080] font-bold mb-2 text-xl md:text-3xl">Track & Trace Your Shipment</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">Enter your tracking number to get real-time updates on your shipment</p>
            <form onSubmit={handleTrackingSearch} className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="Enter your tracking number..."
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                className="bg-gray-50 border-2 border-gray-200 text-[#000080] h-12 text-base md:text-lg focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 transition-all"
              />
              <Button
                type="submit"
                className="bg-[#FF8C00] text-white font-bold hover:bg-[#E67E00] hover:scale-105 transition-all h-12 px-6 md:px-8 whitespace-nowrap text-base md:text-lg"
              >
                Track Shipment
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Services Grid - Responsive Layout */}
      <div id="services" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#000080] mb-4">Our Core Services</h2>
          <div className="w-20 h-1 bg-[#FF8C00] mx-auto"></div>
        </div>
        {/* Responsive Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white border-2 border-gray-200 overflow-hidden hover:border-[#FF8C00] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group rounded-xl"
            >
              {/* Image Top */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-[#FF8C00] p-3 rounded-lg text-white group-hover:bg-[#E67E00] transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
              </div>
              {/* Title & Description */}
              <div className="p-6 md:p-8">
                <h3 className="text-[#000080] font-bold text-lg md:text-xl mb-3 md:mb-4 group-hover:text-[#FF8C00] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 md:mb-6">
                  {service.description}
                </p>
                <Button
                  onClick={() => setLocation('/services')}
                  variant="ghost"
                  className="text-[#FF8C00] hover:text-[#E67E00] hover:bg-[#FF8C00]/10 font-semibold text-sm"
                >
                  Learn More →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-[#000080] to-[#001a4d] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose Midwest Logistics?</h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              We deliver excellence through reliability, innovation, and dedicated customer service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-[#FF8C00] mt-1" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#000080] mb-4">Our Impact & Achievements</h2>
            <div className="w-20 h-1 bg-[#FF8C00] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 md:w-16 md:h-16 text-[#FF8C00]" />
                </div>
                <div className="text-3xl md:text-5xl font-bold text-[#000080] mb-2">{stat.number}</div>
                <p className="text-gray-600 text-base md:text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#000080] mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 text-base md:text-lg">Hear from satisfied customers about their experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white p-6 md:p-8 border-2 border-gray-200 rounded-xl hover:border-[#FF8C00] transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-[#000080]">{review.name}</h4>
                    <p className="text-gray-600 text-sm">{review.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF8C00] text-[#FF8C00]" />
                    ))}
                </div>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#000080] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-base md:text-lg">Find answers to common questions about our services</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 md:p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                    <h3 className="font-bold text-[#000080] text-base md:text-lg">{faq.question}</h3>
                    <ChevronDown className="w-5 h-5 text-[#FF8C00]" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 md:p-6 bg-white border-2 border-gray-200 border-t-0 rounded-b-lg">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#FF8C00] to-[#E67E00] py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Ready to Ship with Confidence?</h2>
          <p className="text-white/90 text-base md:text-lg mb-8">Get started with our professional logistics services today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation('/contact')}
              className="bg-white text-[#FF8C00] font-bold hover:bg-gray-100 px-8 py-3 text-base md:text-lg w-full sm:w-auto"
            >
              Get Free Quote
            </Button>
            <Button
              onClick={() => setLocation('/track')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-base md:text-lg w-full sm:w-auto"
            >
              Track Shipment
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#000080] text-white py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div>
              <h4 className="font-bold text-lg mb-4">Midwest Logistics</h4>
              <p className="text-gray-300 text-sm">Professional global logistics solutions for your business.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-300 hover:text-[#FF8C00] transition-colors">Home</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-[#FF8C00] transition-colors">About Us</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-[#FF8C00] transition-colors">Services</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-[#FF8C00] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services" className="text-gray-300 hover:text-[#FF8C00] transition-colors">Air Freight</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-[#FF8C00] transition-colors">Sea Freight</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-[#FF8C00] transition-colors">Road Transport</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-[#FF8C00] transition-colors">Warehousing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <p className="text-gray-300 text-sm mb-2">📞 +1 (800) 123-4567</p>
              <p className="text-gray-300 text-sm mb-2">📧 info@midwestlogistics.com</p>
              <p className="text-gray-300 text-sm">🕐 Open 24/7</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-300 text-sm">
            <p>&copy; 2026 Midwest Logistics Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
