import { Shield, MapPin, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

const Header = () => {
  const { lang, setLang, t } = useLang();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
      {/* Indian flag accent stripe */}
      <div className="flex h-1">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-india-green" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-saffron-light">
              <div className="relative">
                <Shield className="w-6 h-6 text-saffron" />
                <MapPin className="w-3 h-3 text-teal absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-slate-text tracking-tight">
                Trust <span className="text-saffron">Tour</span>
              </span>
              <p className="text-[10px] text-slate-muted leading-none hidden sm:block">
                {t("header.tagline")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/register-your-stay"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-colors shadow-sm"
            >
              <UserRound className="w-4 h-4" />
              {t("header.tourist_login")}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-border p-1 bg-muted">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  lang === "en"
                    ? "bg-saffron text-primary-foreground shadow-sm"
                    : "text-slate-muted hover:text-slate-text"
                }`}
              >
                {t("header.lang_en")}
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  lang === "hi"
                    ? "bg-saffron text-primary-foreground shadow-sm"
                    : "text-slate-muted hover:text-slate-text"
                }`}
              >
                {t("header.lang_hi")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
