import { useLang } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-background pt-24 min-h-[90vh] flex items-center">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Text Content */}
          <div className="text-left space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-full border border-slate-200">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Government of India — Official Portal
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Travel Safe. <br />
              <span className="text-primary">Stay Protected.</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Government-verified traveler registration for secure journeys. Register now to ensure 24/7 monitoring and emergency support during your stay in India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register-your-stay">
                <Button className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-white font-semibold h-14 px-8 text-lg shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all">
                  Register Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" className="w-full sm:w-auto rounded-full text-slate-600 hover:text-slate-900 font-semibold h-14 px-8 text-lg hover:bg-slate-100 transition-all">
                Learn More
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { key: "hero.badge1", color: "bg-slate-100 text-slate-700 border-slate-200" },
                { key: "hero.badge2", color: "bg-teal/10 text-teal-dark border-teal/20" },
                { key: "hero.badge3", color: "bg-slate-100 text-slate-700 border-slate-200" },
              ].map(({ key, color }) => (
                <span
                  key={key}
                  className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${color}`}
                >
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/5] max-w-lg mx-auto">

              {/* Photo Background */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src="/hero-image.png" alt="Tourists safely exploring India" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent mix-blend-multiply" />
              </div>

              {/* Central Shield/Card - Floating over the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-white p-6 flex flex-col items-center justify-center gap-6 z-10 transform transition-transform hover:-translate-y-1 hover:scale-105 duration-500">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldAlert className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-3 text-center w-full">
                  <div className="h-4 bg-slate-100 rounded-full w-3/4 mx-auto" />
                  <div className="h-4 bg-slate-100 rounded-full w-1/2 mx-auto" />
                </div>
                <div className="w-full mt-4 bg-teal/10 text-teal-dark text-xs font-bold text-center py-2.5 rounded-lg border border-teal/20">
                  VERIFIED SAFE
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute top-[15%] -left-8 w-24 h-24 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white flex items-center justify-center z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 bg-slate-100 rounded-full" />
              </div>
              <div className="absolute bottom-[20%] -right-8 w-32 h-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white flex items-center justify-center z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-teal rounded-full" />
                  <div className="w-12 h-3 bg-slate-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
