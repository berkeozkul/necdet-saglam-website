"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, Calendar, Search } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımda", href: "/hakkimda" },
    { name: "Uzmanlıklar", href: "/uzmanliklar" },
    { name: "Makaleler", href: "/makaleler" },
    { name: "Galeri", href: "/galeri" },
    { name: "Videolar", href: "/videolar" },
    { name: "İletişim", href: "/iletisim" },
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
              Ortopedi ve Travmatoloji
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <input 
                type="text" 
                placeholder="Sitede Ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm w-48 transition-all focus:w-64 bg-slate-50/50"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <a
              href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-full font-medium transition-all flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Randevu Al
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
                placeholder="Sitede Ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-slate-50"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
            <a
              href="tel:+905555555555"
              className="flex items-center justify-center text-primary font-medium py-2 bg-accent rounded-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              0555 555 55 55
            </a>
            <a
              href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-secondary text-white py-3 rounded-lg font-medium shadow-md"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Acıbadem'den Randevu Al
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
