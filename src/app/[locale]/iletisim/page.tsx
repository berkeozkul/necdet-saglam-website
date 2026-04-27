import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Contact");
  return {
    title: `${t("title")} | Prof. Dr. Necdet Sağlam`,
    description: t("desc"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const locale = await getLocale();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("desc")}
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
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                  {locale === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}
                </h2>
                <p className="text-foreground/70 text-lg mb-8">
                  {locale === 'tr' 
                    ? 'Acıbadem Hastanesi bünyesinde hizmet vermekteyiz. Muayene ve randevu işlemleri için aşağıdaki iletişim kanallarını kullanabilirsiniz.'
                    : 'We provide services within Acıbadem Hospital. You can use the communication channels below for examination and appointment procedures.'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Address Card */}
                <div className="bg-accent p-6 rounded-2xl border border-primary/5 hover:border-secondary/30 transition-colors shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary mb-4 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">{t("addressTitle")}</h3>
                  <p className="text-foreground/70 mb-4">
                    Acıbadem {locale === 'tr' ? 'Kartal Hastanesi' : 'Kartal Hospital'}<br />
                    {locale === 'tr' ? 'Ortopedi ve Travmatoloji Kliniği' : 'Orthopedics and Traumatology Clinic'}<br />
                    {locale === 'tr' ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}
                  </p>
                  <a href="https://maps.app.goo.gl/cvD4n4tN1zK9ucE27" target="_blank" rel="noopener noreferrer" className="text-secondary font-bold hover:text-primary transition-colors flex items-center text-sm">
                    {locale === 'tr' ? 'Haritada Gör' : 'View on Map'}
                  </a>
                </div>

                {/* Email Card */}
                <div className="bg-accent p-6 rounded-2xl border border-primary/5 hover:border-secondary/30 transition-colors shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary mb-4 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">{t("emailTitle")}</h3>
                  <p className="text-foreground/70 mb-2">{locale === 'tr' ? 'Sorularınız için:' : 'For your questions:'}</p>
                  <a href="mailto:necdet.saglam@acibadem.com" className="text-secondary font-bold hover:text-primary transition-colors text-sm md:text-base break-all">
                    necdet.saglam@acibadem.com
                  </a>
                </div>

                {/* Hours Card */}
                <div className="bg-accent p-6 rounded-2xl border border-primary/5 hover:border-secondary/30 transition-colors shadow-sm sm:col-span-2 md:col-span-1 xl:col-span-2">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary mb-4 shadow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">{t("workingHoursTitle")}</h3>
                  <p className="text-foreground/70 whitespace-pre-line">
                    {t("workingHours")}<br/>
                    {locale === 'tr' ? 'Pazar: Kapalı' : 'Sun: Closed'}
                  </p>
                </div>
              </div>

              {/* Acıbadem Redirect Banner */}
              <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50 -z-10"></div>
                <h3 className="font-heading text-2xl font-bold mb-4">{locale === 'tr' ? 'Hızlı Randevu' : 'Quick Appointment'}</h3>
                <p className="text-white/80 mb-6">
                  {locale === 'tr' 
                    ? 'Acıbadem Hastanesi resmi web sitesi üzerinden doğrudan randevunuzu oluşturabilirsiniz.'
                    : 'You can directly create your appointment through the Acıbadem Hospital official website.'}
                </p>
                <a
                  href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-secondary hover:bg-white hover:text-primary text-white px-6 py-3 rounded-full font-bold transition-all w-full sm:w-auto text-center"
                >
                  {locale === 'tr' ? 'Randevu Al' : 'Book Appointment'}
                </a>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-primary/5 h-fit">
              <h2 className="font-heading text-2xl font-bold text-primary mb-2">{t("formTitle")}</h2>
              <p className="text-foreground/60 mb-8">
                {locale === 'tr' 
                  ? 'Formu doldurarak bize mesajınızı iletebilirsiniz. En kısa sürede size dönüş yapılacaktır.'
                  : 'You can send us your message by filling out the form. We will get back to you as soon as possible.'}
              </p>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-primary">{locale === 'tr' ? 'Adınız' : 'First Name'}</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      placeholder={locale === 'tr' ? 'Örn: Ahmet' : 'Ex: John'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-primary">{locale === 'tr' ? 'Soyadınız' : 'Last Name'}</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      placeholder={locale === 'tr' ? 'Örn: Yılmaz' : 'Ex: Doe'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-primary">{t("formPhone")}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    placeholder="05XX XXX XX XX"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-primary">{t("formSubject")}</label>
                  <select 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none appearance-none"
                  >
                    <option value="">{locale === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
                    <option value="randevu">{locale === 'tr' ? 'Randevu Talebi' : 'Appointment Request'}</option>
                    <option value="bilgi">{locale === 'tr' ? 'Bilgi Alma' : 'Information'}</option>
                    <option value="diger">{locale === 'tr' ? 'Diğer' : 'Other'}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-primary">{t("formMessage")}</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none resize-none"
                    placeholder={locale === 'tr' ? 'Size nasıl yardımcı olabiliriz?' : 'How can we help you?'}
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="kvkk" 
                    className="mt-1 w-4 h-4 text-secondary bg-accent border-gray-300 rounded focus:ring-secondary"
                  />
                  <label htmlFor="kvkk" className="text-xs text-foreground/60 leading-relaxed">
                    {t("formTerms")}
                  </label>
                </div>

                <button 
                  type="button" 
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                  {t("formSubmit")}
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full relative">
        <iframe 
          src="https://maps.google.com/maps?q=Ac%C4%B1badem%20Kartal%20Hastanesi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
