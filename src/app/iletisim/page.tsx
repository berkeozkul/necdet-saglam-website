import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "İletişim | Prof. Dr. Necdet Sağlam",
  description: "Prof. Dr. Necdet Sağlam iletişim bilgileri, adres, telefon ve randevu alma ekranı.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Sağlığınızla ilgili sorularınız ve randevu talepleriniz için bize ulaşın.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left Side - Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">Bize Ulaşın</h2>
                <p className="text-foreground/70 text-lg mb-8">
                  Acıbadem Hastanesi bünyesinde hizmet vermekteyiz. Muayene ve randevu işlemleri için aşağıdaki iletişim kanallarını kullanabilirsiniz.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Address Card */}
                <div className="bg-accent p-6 rounded-2xl border border-primary/5 hover:border-secondary/30 transition-colors shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary mb-4 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">Adres</h3>
                  <p className="text-foreground/70">
                    Acıbadem Hastanesi<br />
                    Ortopedi ve Travmatoloji Kliniği<br />
                    İstanbul, Türkiye
                  </p>
                </div>

                {/* Phone Card */}
                <div className="bg-accent p-6 rounded-2xl border border-primary/5 hover:border-secondary/30 transition-colors shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary mb-4 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">Telefon</h3>
                  <p className="text-foreground/70 mb-2">Randevu ve Bilgi için:</p>
                </div>

                {/* Email Card */}
                <div className="bg-accent p-6 rounded-2xl border border-primary/5 hover:border-secondary/30 transition-colors shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary mb-4 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">E-Posta</h3>
                  <p className="text-foreground/70 mb-2">Sorularınız için:</p>
                  <a href="mailto:info@necdetsaglam.com" className="text-secondary font-bold hover:text-primary transition-colors">
                    info@necdetsaglam.com
                  </a>
                </div>

                {/* Hours Card */}
                <div className="bg-accent p-6 rounded-2xl border border-primary/5 hover:border-secondary/30 transition-colors shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary mb-4 shadow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">Çalışma Saatleri</h3>
                  <p className="text-foreground/70">
                    Pazartesi - Cuma: 09:00 - 18:00<br />
                    Cumartesi: 09:00 - 13:00<br />
                    Pazar: Kapalı
                  </p>
                </div>
              </div>

              {/* Acıbadem Redirect Banner */}
              <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50 -z-10"></div>
                <h3 className="font-heading text-2xl font-bold mb-4">Hızlı Randevu</h3>
                <p className="text-white/80 mb-6">
                  Acıbadem Hastanesi resmi web sitesi üzerinden doğrudan randevunuzu oluşturabilirsiniz.
                </p>
                <a
                  href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-secondary hover:bg-white hover:text-primary text-white px-6 py-3 rounded-full font-bold transition-all w-full sm:w-auto text-center"
                >
                  Randevu Al
                </a>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-primary/5 h-fit">
              <h2 className="font-heading text-2xl font-bold text-primary mb-2">Mesaj Gönderin</h2>
              <p className="text-foreground/60 mb-8">
                Formu doldurarak bize mesajınızı iletebilirsiniz. En kısa sürede size dönüş yapılacaktır.
              </p>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-primary">Adınız</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      placeholder="Örn: Ahmet"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-primary">Soyadınız</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      placeholder="Örn: Yılmaz"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-primary">Telefon Numaranız</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    placeholder="05XX XXX XX XX"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-primary">Konu</label>
                  <select 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none appearance-none"
                  >
                    <option value="">Seçiniz...</option>
                    <option value="randevu">Randevu Talebi</option>
                    <option value="bilgi">Bilgi Alma</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-primary">Mesajınız</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none resize-none"
                    placeholder="Size nasıl yardımcı olabiliriz?"
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="kvkk" 
                    className="mt-1 w-4 h-4 text-secondary bg-accent border-gray-300 rounded focus:ring-secondary"
                  />
                  <label htmlFor="kvkk" className="text-xs text-foreground/60 leading-relaxed">
                    <a href="/kvkk" className="text-secondary hover:underline">KVKK Aydınlatma Metni</a>'ni okudum ve kabul ediyorum. Kişisel verilerimin işlenmesine onay veriyorum.
                  </label>
                </div>

                <button 
                  type="button" 
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                  Mesajı Gönder
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-slate-200 relative">
        {/* Placeholder for Google Maps iframe */}
        <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-500 bg-slate-100">
          <MapPin className="w-12 h-12 mb-4 text-slate-400" />
          <p className="font-medium text-lg">Google Haritalar Görünümü</p>
          <p className="text-sm">Acıbadem Hastanesi Konumu</p>
        </div>
      </section>
    </div>
  );
}
