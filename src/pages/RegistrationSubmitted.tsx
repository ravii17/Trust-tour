import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

const RegistrationSubmitted = () => {
  const { t } = useLang();

  return (
    <main className="min-h-screen bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <CheckCircle2 className="mx-auto h-16 w-16 text-teal" />
        <h1 className="mt-5 text-3xl font-bold text-slate-text">{t("traveler.submitted")}</h1>
        <p className="mt-3 text-slate-muted">
          Your stay registration is Validated. 
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-saffron px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-saffron-dark"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default RegistrationSubmitted;
