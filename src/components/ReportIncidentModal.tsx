import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportIncidentModal = ({ isOpen, onClose }: ReportIncidentModalProps) => {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-text/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md border border-border animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-slate-text">{t("modal.title")}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-muted hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 flex flex-col items-center gap-3 text-center">
            <CheckCircle2 className="w-14 h-14 text-teal" />
            <p className="text-lg font-semibold text-slate-text">{t("modal.submitted")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <Label>{t("modal.name")}</Label>
              <Input placeholder="Your name" required />
            </div>
            <div className="space-y-1.5">
              <Label>{t("modal.incident_type")}</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required>
                <option value="">Select type</option>
                <option>Theft / Robbery</option>
                <option>Harassment</option>
                <option>Scam / Fraud</option>
                <option>Medical Emergency</option>
                <option>Sex offence</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>{t("modal.location")}</Label>
              <Input placeholder="City / Area" required />
            </div>
            <div className="space-y-1.5">
              <Label>{t("modal.description")}</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Briefly describe what happened..."
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                {t("modal.cancel")}
              </Button>
              <button
                type="submit"
                className="flex-1 h-10 rounded-md bg-saffron text-primary-foreground font-semibold text-sm hover:bg-saffron-dark transition-colors"
              >
                {t("modal.submit")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportIncidentModal;
