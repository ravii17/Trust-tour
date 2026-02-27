import { useLang } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background pattern — landmark silhouettes */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.04]">
        <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Taj Mahal silhouette */}
          <g fill="currentColor" className="text-slate-text">
            <rect x="520" y="300" width="160" height="100" />
            <rect x="540" y="250" width="120" height="60" />
            <rect x="560" y="200" width="80" height="60" />
            <ellipse cx="600" cy="195" rx="45" ry="55" />
            <ellipse cx="600" cy="145" rx="10" ry="20" />
            <rect x="500" y="280" width="20" height="70" />
            <ellipse cx="510" cy="275" rx="12" ry="25" />
            <rect x="680" y="280" width="20" height="70" />
            <ellipse cx="690" cy="275" rx="12" ry="25" />
            <rect x="465" y="290" width="15" height="60" />
            <ellipse cx="472" cy="286" rx="9" ry="18" />
            <rect x="720" y="290" width="15" height="60" />
            <ellipse cx="728" cy="286" rx="9" ry="18" />
          </g>
          {/* Gateway of India */}
          <g fill="currentColor" className="text-slate-text">
            <rect x="50" y="280" width="160" height="120" />
            <rect x="70" y="240" width="120" height="50" />
            <path d="M 90 240 Q 130 200 170 240" />
            <rect x="50" y="270" width="30" height="130" />
            <rect x="180" y="270" width="30" height="130" />
          </g>
          {/* India Gate */}
          <g fill="currentColor" className="text-slate-text">
            <rect x="950" y="290" width="120" height="110" />
            <rect x="970" y="250" width="80" height="50" />
            <path d="M 960 250 Q 1010 210 1060 250" />
            <rect x="960" y="280" width="20" height="120" />
            <rect x="1040" y="280" width="20" height="120" />
          </g>
        </svg>
      </div>

      {/* Flag accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-background border-y border-border" />
        <div className="flex-1 bg-india-green" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-saffron-light text-saffron-dark text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-saffron/20">
          <span className="w-2 h-2 bg-saffron rounded-full animate-pulse" />
          Government of India — Official Tourist Portal
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-text leading-tight mb-6">
          {t("hero.title")}
        </h1>

        <p className="text-lg text-slate-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { key: "hero.badge1", color: "bg-saffron-light text-saffron-dark border-saffron/25" },
            { key: "hero.badge2", color: "bg-teal-light text-teal-dark border-teal/25" },
            { key: "hero.badge3", color: "bg-saffron-light text-saffron-dark border-saffron/25" },
          ].map(({ key, color }) => (
            <span
              key={key}
              className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border ${color}`}
            >
              {t(key)}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom flag accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-background border-y border-border" />
        <div className="flex-1 bg-india-green" />
      </div>
    </section>
  );
};

export default HeroSection;
