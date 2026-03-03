import { Shield, MapPin, UserRound, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { lang, setLang, t } = useLang();

  const handleLanguageChange = (newLang: "en" | "hi" | "ja" | "fr" | "ru" | "es" | "de" | "ar" | "zh") => {
    setLang(newLang);
  };

  const getLanguageLabel = (l: string) => {
    switch (l) {
      case "en": return "English";
      case "hi": return "हिंदी";
      case "ja": return "日本語";
      case "fr": return "Français";
      case "ru": return "Русский";
      case "es": return "Español";
      case "de": return "Deutsch";
      case "ar": return "العربية";
      case "zh": return "中文";
      default: return "English";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 glass shadow-sm transition-all duration-300">
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
              <span className="text-xl font-black text-slate-800 tracking-tight">
                Trust <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-dark">Tour</span>
              </span>
              <p className="text-[10px] text-slate-muted leading-none hidden sm:block">
                {t("header.tagline")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/register-your-stay"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-to-r from-teal to-teal-dark text-white text-sm font-semibold hover:shadow-lg hover:shadow-teal/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <UserRound className="w-4 h-4" />
              {t("header.tourist_login")}
            </Link>

            {/* Language Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full gap-2 border-slate-200 bg-white/50 hover:bg-white shadow-sm transition-all duration-300">
                  <Globe className="w-4 h-4 text-teal-dark" />
                  <span className="font-semibold text-slate-700">{getLanguageLabel(lang)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px] rounded-xl">
                <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="font-medium cursor-pointer">
                  English ({t("header.lang_en")})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("hi")} className="font-medium cursor-pointer">
                  हिंदी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ja")} className="font-medium cursor-pointer">
                  日本語 (JA)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("fr")} className="font-medium cursor-pointer">
                  Français (FR)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ru")} className="font-medium cursor-pointer">
                  Русский (RU)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("es")} className="font-medium cursor-pointer">
                  Español (ES)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("de")} className="font-medium cursor-pointer">
                  Deutsch (DE)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ar")} className="font-medium cursor-pointer">
                  العربية (AR)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("zh")} className="font-medium cursor-pointer">
                  中文 (ZH)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
