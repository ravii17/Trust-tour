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

  const handleLanguageChange = (newLang: "en" | "hi" | "ja" | "fr" | "ru") => {
    setLang(newLang);
  };

  const getLanguageLabel = (l: string) => {
    switch (l) {
      case "en": return "English";
      case "hi": return "हिंदी";
      case "ja": return "日本語";
      case "fr": return "Français";
      case "ru": return "Русский";
      default: return "English";
    }
  };

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

            {/* Language Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full gap-2 border-border shadow-sm">
                  <Globe className="w-4 h-4 text-slate-text" />
                  <span className="font-semibold text-slate-text">{getLanguageLabel(lang)}</span>
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
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
