import { useState } from "react";
import { AlertTriangle, HeartPulse, UserCheck, BookOpen, Map, Megaphone } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import ReportIncidentModal from "@/components/ReportIncidentModal";

const SafetyGuide = () => {
  const { t } = useLang();
  const [modalOpen, setModalOpen] = useState(false);

  const emergencyCards = [
    {
      icon: <AlertTriangle className="w-7 h-7" />,
      titleKey: "safety.emergency_title",
      numKey: "safety.emergency_num",
      descKey: "safety.emergency_desc",
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      icon: <HeartPulse className="w-7 h-7" />,
      titleKey: "safety.medical_title",
      numKey: "safety.medical_num",
      descKey: "safety.medical_desc",
      color: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      icon: <UserCheck className="w-7 h-7" />,
      titleKey: "safety.police_title",
      numKey: "safety.police_num",
      descKey: "safety.police_desc",
      color: "text-teal",
      bg: "bg-teal-light",
      border: "border-teal/20",
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      titleKey: "safety.rights_title",
      numKey: null,
      descKey: "safety.rights_desc",
      color: "text-saffron-dark",
      bg: "bg-saffron-light",
      border: "border-saffron/20",
    },
    {
      icon: <Map className="w-7 h-7" />,
      titleKey: "safety.tips_title",
      numKey: null,
      descKey: "safety.tips_desc",
      color: "text-teal",
      bg: "bg-teal-light",
      border: "border-teal/20",
    },
  ];

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background" id="safety-guide">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-light text-teal-dark text-xs font-semibold px-4 py-1.5 rounded-full mb-3 border border-teal/20">
              {t("safety.section_sub")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-text">
              {t("safety.section_title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Emergency cards */}
            {emergencyCards.map((card) => (
              <div
                key={card.titleKey}
                className={`rounded-2xl border ${card.border} ${card.bg} p-6 flex flex-col gap-3 hover:shadow-md transition-shadow`}
              >
                <div className={`${card.color}`}>{card.icon}</div>
                <div>
                  <h3 className={`font-bold text-slate-text text-base`}>
                    {t(card.titleKey)}
                  </h3>
                  {card.numKey && (
                    <p className={`text-2xl font-extrabold ${card.color} leading-tight`}>
                      {t(card.numKey)}
                    </p>
                  )}
                </div>
                <p className="text-sm text-slate-muted leading-relaxed">{t(card.descKey)}</p>
              </div>
            ))}

            {/* Report Incident CTA card */}
            <div className="rounded-2xl border border-saffron/30 bg-saffron-light p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="text-saffron">
                <Megaphone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-text text-base">{t("safety.report_title")}</h3>
              </div>
              <p className="text-sm text-slate-muted leading-relaxed flex-1">{t("safety.report_desc")}</p>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-auto w-full h-10 rounded-xl bg-saffron text-white font-semibold text-sm hover:bg-saffron-dark transition-colors"
              >
                {t("safety.report_btn")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ReportIncidentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default SafetyGuide;
