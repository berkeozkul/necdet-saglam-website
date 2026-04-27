import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { ContactForm } from "@/components/ui/ContactForm";

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

              <ContactForm />
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
