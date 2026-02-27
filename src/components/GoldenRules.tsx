import { Copy, Share2, Car, WifiOff, MapPin } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const rules = [
  { icon: <Copy className="w-6 h-6" />, titleKey: "rules.1_title", descKey: "rules.1_desc", num: "01" },
  { icon: <Share2 className="w-6 h-6" />, titleKey: "rules.2_title", descKey: "rules.2_desc", num: "02" },
  { icon: <Car className="w-6 h-6" />, titleKey: "rules.3_title", descKey: "rules.3_desc", num: "03" },
  { icon: <WifiOff className="w-6 h-6" />, titleKey: "rules.4_title", descKey: "rules.4_desc", num: "04" },
  { icon: <MapPin className="w-6 h-6" />, titleKey: "rules.5_title", descKey: "rules.5_desc", num: "05" },
];

const GoldenRules = () => {
  const { t } = useLang();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-saffron-light text-saffron-dark text-xs font-semibold px-4 py-1.5 rounded-full mb-3 border border-saffron/20">
            {t("rules.subtitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-text">
            {t("rules.title")}
          </h2>
        </div>

        {/* Rules grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {rules.map((rule, i) => (
            <div
              key={rule.num}
              className="bg-card rounded-2xl border border-border p-5 flex flex-col gap-3 hover:shadow-md hover:border-saffron/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-saffron-light text-saffron">
                  {rule.icon}
                </div>
                <span className="text-3xl font-black text-border select-none">{rule.num}</span>
              </div>
              <h3 className="font-bold text-slate-text text-sm leading-snug">{t(rule.titleKey)}</h3>
              <p className="text-xs text-slate-muted leading-relaxed">{t(rule.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoldenRules;
