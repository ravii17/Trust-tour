import { Shield, MapPin } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLang();

  const links = [
    { key: "footer.home", href: "#" },
    { key: "footer.safety", href: "#safety-guide" },
    { key: "footer.emergency", href: "#safety-guide" },
    { key: "footer.about", href: "#" },
  ];

  return (
    <footer className="bg-slate-text text-white">
      {/* Flag stripe */}
      <div className="flex h-1">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-india-green" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-saffron/20">
                <div className="relative">
                  <Shield className="w-5 h-5 text-saffron" />
                  <MapPin className="w-2.5 h-2.5 text-teal absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
                </div>
              </div>
              <span className="text-lg font-bold">
                Trust <span className="text-saffron">Tour</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">{t("footer.mission")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">{t("footer.links_title")}</h4>
            <ul className="space-y-2.5">
              {links.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-sm text-white/60 hover:text-saffron transition-colors"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry branding */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-3 mb-4">
              <span className="text-lg">🇮🇳</span>
              <div>
                <p className="text-xs font-semibold text-white">{t("footer.ministry")}</p>
                <p className="text-[10px] text-white/50">Incredible India</p>
              </div>
            </div>
            <div className="flex gap-3">
              {["Emergency: 112", "Ambulance: 108", "Tourist Police: 1800-111-363"].map((c) => (
                <span key={c} className="sr-only">{c}</span>
              ))}
              <a href="tel:112" className="w-8 h-8 rounded-lg bg-destructive/20 border border-destructive/30 flex items-center justify-center text-xs font-bold text-destructive hover:bg-destructive/30 transition-colors" title="Emergency 112">112</a>
              <a href="tel:108" className="w-8 h-8 rounded-lg bg-destructive/15 border border-destructive/25 flex items-center justify-center text-xs font-bold text-destructive/80 hover:bg-destructive/25 transition-colors" title="Ambulance 108">108</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{t("footer.rights")}</p>
          <p className="text-xs text-white/30">Built with Trust for India's Tourists</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
