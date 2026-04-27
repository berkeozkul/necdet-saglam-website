import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-primary-foreground/10 pb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-1">Prof. Dr. Necdet Sağlam</h3>
              <p className="text-secondary font-medium text-sm tracking-wide">Ortopedi ve Travmatoloji</p>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed text-sm">
              Sağlıklı, ağrısız ve özgürce hareket etmeniz için yılların tecrübesi ve modern tıbbın imkanlarıyla yanınızdayız.
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
              Hızlı Menü
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Anasayfa", href: "/" },
                { name: "Hakkımda", href: "/hakkimda" },
                { name: "Uzmanlık Alanları", href: "/uzmanliklar" },
                { name: "Makaleler", href: "/makaleler" },
                { name: "Galeri", href: "/galeri" },
                { name: "Videolar", href: "/videolar" },
                { name: "İletişim", href: "/iletisim" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-foreground/70 hover:text-white transition-colors flex items-center text-sm group">
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
              Uzmanlıklar
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h4>
            <ul className="space-y-3">
              {[
                "Diz ve Kalça Protezi",
                "Spor Yaralanmaları",
                "Artroskopik Cerrahi",
                "Travma Cerrahisi",
                "Omuz ve Dirsek Cerrahisi",
                "Ayak ve Ayak Bileği Cerrahisi",
                "Omurga Cerrahisi",
                "Tümör Cerrahisi",
                "Kemik ve Eklem Enfeksiyonları",
                "Pediatrik Ortopedi",
                "Deformite Cerrahisi",
                "Kemik ve Boy Uzatma Cerrahisi",
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
              İletişim
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start text-sm text-primary-foreground/70">
                <MapPin className="w-5 h-5 mr-3 text-secondary shrink-0 mt-0.5" />
                <span>
                  Acıbadem Kartal Hastanesi<br />
                  Ortopedi ve Travmatoloji Kliniği<br />
                  İstanbul, Türkiye
                </span>
              </li>
              <li className="flex items-center text-sm text-primary-foreground/70">
                <Mail className="w-5 h-5 mr-3 text-secondary shrink-0" />
                <a href="necdet.saglam@acıbadem.com" className="hover:text-white transition-colors">
                  info@necdetsaglam.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/50">
          <p>&copy; {currentYear} Prof. Dr. Necdet Sağlam. Tüm hakları saklıdır.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/kvkk" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
