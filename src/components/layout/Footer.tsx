import { Link } from "@/i18n/routing";
import { MapPin, Mail, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");
  const locale = useLocale();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-primary-foreground/10 pb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-1">Prof. Dr. Necdet Sağlam</h3>
              <p className="text-secondary font-medium text-sm tracking-wide">
                {locale === 'tr' ? 'Ortopedi ve Travmatoloji' : 'Orthopedics and Traumatology'}
              </p>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed text-sm">
              {t("description")}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 relative inline-block">
              {t("quickLinks")}
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: nav("home"), href: "/" },
                { name: nav("about"), href: "/hakkimda" },
                { name: nav("services"), href: "/uzmanliklar" },
                { name: nav("blog"), href: "/makaleler" },
                { name: nav("gallery"), href: "/galeri" },
                { name: nav("videos"), href: "/videolar" },
                { name: nav("contact"), href: "/iletisim" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href as any} className="text-primary-foreground/70 hover:text-white transition-colors flex items-center text-sm group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 relative inline-block">
              {t("services")}
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h4>
            <ul className="space-y-3">
              {[
                locale === 'tr' ? "Diz ve Kalça Protezi" : "Knee and Hip Replacement",
                locale === 'tr' ? "Spor Yaralanmaları" : "Sports Injuries",
                locale === 'tr' ? "Artroskopik Cerrahi" : "Arthroscopic Surgery",
                locale === 'tr' ? "Travma Cerrahisi" : "Trauma Surgery",
                locale === 'tr' ? "Omuz ve Dirsek Cerrahisi" : "Shoulder and Elbow Surgery",
                locale === 'tr' ? "Ayak ve Ayak Bileği Cerrahisi" : "Foot and Ankle Surgery",
                locale === 'tr' ? "Omurga Cerrahisi" : "Spinal Surgery",
                locale === 'tr' ? "Tümör Cerrahisi" : "Tumor Surgery",
                locale === 'tr' ? "Kemik ve Eklem Enfeksiyonları" : "Bone and Joint Infections",
                locale === 'tr' ? "Pediatrik Ortopedi" : "Pediatric Orthopedics",
                locale === 'tr' ? "Deformite Cerrahisi" : "Deformity Surgery",
                locale === 'tr' ? "Kemik ve Boy Uzatma Cerrahisi" : "Bone Lengthening Surgery",
              ].map((service) => (
                <li key={service} className="text-primary-foreground/70 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 relative inline-block">
              {t("contact")}
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start text-sm text-primary-foreground/70">
                <MapPin className="w-5 h-5 mr-3 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col w-full pr-4">
                  <span className="mb-2">
                    Acıbadem {locale === 'tr' ? 'Kartal Hastanesi' : 'Kartal Hospital'}<br />
                    {locale === 'tr' ? 'Ortopedi ve Travmatoloji Kliniği' : 'Orthopedics and Traumatology Clinic'}<br />
                    {locale === 'tr' ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}
                  </span>
                  <a href="https://maps.app.goo.gl/cvD4n4tN1zK9ucE27" target="_blank" rel="noopener noreferrer" className="text-secondary font-medium hover:text-white transition-colors flex items-center w-fit mb-4">
                    {locale === 'tr' ? 'Haritada Gör' : 'View on Map'}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </a>
                  <div className="w-full h-40 rounded-xl overflow-hidden shadow-inner">
                    <iframe 
                      src="https://maps.google.com/maps?q=Ac%C4%B1badem%20Kartal%20Hastanesi&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </li>
              <li className="flex items-center text-sm text-primary-foreground/70">
                <Mail className="w-5 h-5 mr-3 text-secondary shrink-0" />
                <a href="mailto:info@necdetsaglam.com" className="hover:text-white transition-colors">
                  info@necdetsaglam.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/50">
          <p>&copy; {currentYear} Prof. Dr. Necdet Sağlam. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
