import { Shield, MapPin, UserRound, Globe, Phone, Menu, X, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { lang, setLang, t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (newLang: "en" | "hi" | "ja" | "fr" | "ru" | "es" | "de" | "ar" | "zh") => {
    setLang(newLang);
    setMobileMenuOpen(false);
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

  const navLinks = [
    { name: t("footer.home") || "Home", path: "/" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Safety Features", path: "/#features" },
    { name: "Register", path: "/register-your-stay" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${isScrolled
        ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-2"
        : "bg-transparent border-transparent py-4"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <div className="relative">
                <Shield className="w-6 h-6 text-primary" />
                <MapPin className="w-3 h-3 text-white absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
              </div>
            </div>
            <div>
              <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                Trust <span className="text-primary">Tour</span>
              </span>
              <p className={`text-[10px] leading-none hidden sm:block font-medium ${isScrolled ? 'text-slate-500' : 'text-slate-600'}`}>
                {t("header.tagline")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? 'text-slate-600' : 'text-slate-800'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={`gap-2 rounded-full font-medium ${isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-800 hover:bg-white/20'}`}>
                  <Globe className="w-4 h-4" />
                  <span>{getLanguageLabel(lang)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px] rounded-xl border-slate-200">
                <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="cursor-pointer">English ({t("header.lang_en")})</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("hi")} className="cursor-pointer">हिंदी ({t("header.lang_hi")})</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ja")} className="cursor-pointer">日本語 (JA)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("fr")} className="cursor-pointer">Français (FR)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ru")} className="cursor-pointer">Русский (RU)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("es")} className="cursor-pointer">Español (ES)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("de")} className="cursor-pointer">Deutsch (DE)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("ar")} className="cursor-pointer">العربية (AR)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("zh")} className="cursor-pointer">中文 (ZH)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-medium shadow-sm h-9 px-5 gap-2 transition-all">
                  <UserRound className="w-4 h-4" />
                  Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] rounded-xl border-slate-200">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/register-your-stay" className="w-full flex items-center gap-2">
                    <UserRound className="w-4 h-4 text-slate-500" /> Tourist Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/authority-dashboard" className="w-full flex items-center gap-2">
                    <Shield className="w-4 h-4 text-slate-500" /> Police Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/airport-login" className="w-full flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-500" /> Airport Portal
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="rounded-full border-destructive/30 text-destructive hover:bg-destructive hover:text-white font-medium h-9 px-4 gap-2 transition-all shadow-sm">
              <Phone className="w-4 h-4" />
              SOS
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={isScrolled ? 'text-slate-900' : 'text-slate-900'}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-slate-700 font-medium py-2 px-3 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="h-px bg-slate-100 my-1 font-medium" />

          <div className="flex flex-col gap-2 pb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 pt-2">Portals</span>
            <Link to="/register-your-stay" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start rounded-xl gap-2 border-slate-200 text-slate-700">
                <UserRound className="w-4 h-4" />
                Tourist Login
              </Button>
            </Link>
            <Link to="/authority-dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start rounded-xl gap-2 border-slate-200 text-slate-700">
                <Shield className="w-4 h-4" />
                Police Portal
              </Button>
            </Link>
            <Link to="/airport-login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start rounded-xl gap-2 border-slate-200 text-slate-700">
                <Building2 className="w-4 h-4" />
                Airport Portal
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-center mt-2 rounded-xl border-destructive/30 text-destructive gap-2">
              <Phone className="w-4 h-4" />
              SOS
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
