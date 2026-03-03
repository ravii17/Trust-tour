import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import SafetyGuide from "@/components/SafetyGuide";
import GoldenRules from "@/components/GoldenRules";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SafetyGuide />
        <GoldenRules />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
