import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SplitPortal from "@/components/SplitPortal";
import SafetyGuide from "@/components/SafetyGuide";
import GoldenRules from "@/components/GoldenRules";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <SplitPortal />
        <SafetyGuide />
        <GoldenRules />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
