import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LanguageContext";
import { ShieldCheck, Eye, HeadphonesIcon, Globe, Lock, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const { t } = useLang();

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Government Verified Security",
      description: "Directly integrated with local law enforcement and airport authorities to ensure a fully secure system for international and domestic tourists.",
    },
    {
      icon: <Eye className="w-6 h-6 text-teal" />,
      title: "24/7 Live Monitoring",
      description: "Round-the-clock safety tracking provided by dedicated regional control centers, allowing immediate action if any anomaly is detected.",
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-saffron" />,
      title: "Instant Emergency Support",
      description: "A single tap SOS button immediately connects you to emergency responders, dispatching your live location directly to the nearest authorities.",
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Multi-language Assistance",
      description: "Comprehensive support in multiple global languages, breaking down communication barriers and ensuring every traveler feels at home.",
    },
    {
      icon: <Lock className="w-6 h-6 text-teal" />,
      title: "Data Privacy & Encryption",
      description: "Your travel documents and itinerary are secured using military-grade encryption, heavily restricted to authorized personnel only.",
    },
    {
      icon: <Plane className="w-6 h-6 text-saffron" />,
      title: "Seamless Airport Transit",
      description: "Coordinated safety workflows between airport security checks and your local accommodation guarantees end-to-end security.",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal/5 rounded-full blur-3xl -z-10" />
          
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
              About <span className="text-primary">Trust Tour</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Empowering your journeys with unparalleled security, seamless integration with official authorities, and peace of mind at every step.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed text-center">
              Trust Tour was built with a singular vision: to ensure that every traveler visiting our vibrant nation can explore, discover, and experience everything India has to offer with absolute confidence. By bridging the gap between innovative technology and government-backed security infrastructure, we deliver an ecosystem where safety is not just a promise, but a guaranteed right for every tourist.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Trust Tour?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our platform delivers state-of-the-art security features designed specifically for modern travel needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Ready to start your secure journey?</h2>
            <p className="text-lg text-slate-600">
              Join thousands of verified tourists and experience India with comprehensive government-backed protection.
            </p>
            <Link to="/register-your-stay" className="inline-block mt-4">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold h-14 px-10 text-lg shadow-lg">
                Register Your Travel Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
