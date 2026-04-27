"use client";

import { useState, useEffect } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Menu, X, Phone, Calendar, Search, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function Header() {
  const t = useTranslations("Navigation");
  const c = useTranslations("Common");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    router.replace(pathname, { locale: nextLocale });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/hakkimda" },
    { name: t("services"), href: "/uzmanliklar" },
    { name: t("blog"), href: "/makaleler" },
    { name: t("gallery"), href: "/galeri" },
    { name: t("videos"), href: "/videolar" },
    { name: t("contact"), href: "/iletisim" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-heading text-xl md:text-2xl font-bold text-primary">
              Prof. Dr. Necdet Sağlam
            </span>
            <span className="text-xs md:text-sm text-secondary font-medium tracking-wide">
              {locale === 'tr' ? 'Ortopedi ve Travmatoloji' : 'Orthopedics and Traumatology'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-secondary font-medium transition-colors text-sm uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-primary transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full"
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'tr' ? 'EN' : 'TR'}</span>
            </button>

            <form onSubmit={handleSearch} className="relative hidden xl:block">
              <input 
                type="text" 
                placeholder={c("search")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm w-40 transition-all focus:w-56 bg-slate-50/50"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <a
              href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-full font-medium transition-all flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap text-sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t("appointment")}
            </a>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={toggleLanguage}
              className="flex items-center text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded"
            >
              <span>{locale === 'tr' ? 'EN' : 'TR'}</span>
            </button>
            <button
              className="text-primary p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground hover:text-secondary font-medium py-2 border-b border-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            <form onSubmit={handleSearch} className="relative w-full mb-2">
              <input 
                type="text" 
                placeholder={c("search")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-slate-50"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
            <a
              href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-secondary text-white py-3 rounded-lg font-medium shadow-md"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {t("appointment")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
