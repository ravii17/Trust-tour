import { Luggage, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SplitPortal = () => {
  const { t } = useLang();
  const navigate = useNavigate();

  const handleTravelerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleAuthoritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/authority-dashboard");
  };

  return (
    <section id="tourist-login" className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="bg-saffron-light px-6 py-5 border-b border-saffron/20">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-saffron/20">
                  <Luggage className="w-5 h-5 text-saffron-dark" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-text">{t("traveler.heading")}</h2>
                  <p className="text-xs text-saffron-dark font-medium">Tourist Welcome Portal</p>
                </div>
              </div>
              <p className="text-sm text-slate-muted mt-3 leading-relaxed">{t("traveler.subheading")}</p>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleTravelerSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-slate-text font-medium">{t("traveler.name")}</Label>
                    <Input placeholder={t("traveler.name_placeholder")} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-text font-medium">{t("traveler.passport")}</Label>
                    <Input placeholder={t("traveler.passport_placeholder")} required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-slate-text font-medium">{t("traveler.phone")}</Label>
                    <Input type="tel" placeholder={t("traveler.phone_placeholder")} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-text font-medium">{t("traveler.city")}</Label>
                    <Input placeholder={t("traveler.city_placeholder")} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-text font-medium">{t("traveler.nationality")}</Label>
                  <Input placeholder={t("traveler.nationality_placeholder")} required />
                </div>
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-saffron text-primary-foreground font-semibold text-sm hover:bg-saffron-dark transition-colors shadow-sm mt-2"
                >
                  {t("traveler.submit")}
                </button>
              </form>
            </div>
          </div>

          {/* Authority Portal */}
          <div className="bg-authority-bg rounded-2xl border border-slate-text/30 shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="bg-slate-text/30 px-6 py-5 border-b border-slate-text/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">
                    <Lock className="w-5 h-5 text-teal-light" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{t("authority.heading")}</h2>
                    <p className="text-xs text-teal font-medium">Secure Portal</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-teal/20 text-teal text-xs font-semibold px-3 py-1.5 rounded-full border border-teal/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t("authority.badge")}
                </span>
              </div>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">{t("authority.subheading")}</p>
            </div>

            {/* Login form */}
            <form onSubmit={handleAuthoritySubmit} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <Label className="text-white/80 font-medium text-sm">{t("authority.officer_id")}</Label>
                <Input
                  required
                  placeholder={t("authority.officer_id_placeholder")}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-teal"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/80 font-medium text-sm">{t("authority.password")}</Label>
                <Input
                  required
                  type="password"
                  placeholder={t("authority.password_placeholder")}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-teal"
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-teal text-white font-semibold text-sm hover:bg-teal-dark transition-colors shadow-sm"
              >
                {t("authority.login")}
              </button>
              <p className="text-[11px] text-white/35 text-center leading-relaxed pt-1">{t("authority.note")}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitPortal;
