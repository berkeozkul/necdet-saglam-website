import { GraduationCap, Award, Briefcase, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Hakkımda | Prof. Dr. Necdet Sağlam",
  description: "Prof. Dr. Necdet Sağlam'ın eğitim geçmişi, akademik kariyeri ve tıbbi uzmanlık alanları hakkında detaylı bilgi.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Hakkımda</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ortopedi ve Travmatoloji alanında 25 yılı aşkın tecrübe, akademik birikim ve binlerce başarılı operasyon.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar - Photo & Quick Facts */}
            <div className="lg:col-span-4 space-y-8">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white relative">
                <Image src="/images/doctor.png" alt="Prof. Dr. Necdet Sağlam" fill className="object-cover object-top" priority />
              </div>
              
              <div className="bg-accent rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-primary mb-4 border-b border-primary/10 pb-4">Kısa Bilgiler</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Briefcase className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Mevcut Kurum</p>
                      <p className="text-sm text-foreground/70">Acıbadem Hastanesi</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <GraduationCap className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Uzmanlık</p>
                      <p className="text-sm text-foreground/70">Ortopedi ve Travmatoloji</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Deneyim</p>
                      <p className="text-sm text-foreground/70">25+ Yıl</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Content - Biography & Timeline */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Biography Text */}
              <div className="prose prose-lg max-w-none text-foreground/80">
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">Prof. Dr. Necdet Sağlam Kimdir?</h2>
                <p>
                  Tıp eğitimimi başarıyla tamamladıktan sonra Ortopedi ve Travmatoloji alanında uzmanlık eğitimimi aldım. Meslek hayatım boyunca hastalarımın yaşam kalitesini artırmak ve onlara ağrısız, özgürce hareket edebilecekleri bir yaşam sunmak en büyük motivasyonum oldu.
                </p>
                <p>
                  Özellikle <strong>diz ve kalça protez cerrahisi</strong>, <strong>spor yaralanmaları</strong> ve <strong>artroskopik cerrahi</strong> alanlarında yoğunlaşarak, ulusal ve uluslararası alanda birçok bilimsel çalışmaya imza attım. Teknolojinin tıbba sunduğu en güncel yenilikleri yakından takip ediyor ve cerrahi pratiğimde uyguluyorum.
                </p>
                <p>
                  Akademik kariyerim boyunca edindiğim "Profesör" unvanı, sadece bir akademik derece değil, aynı zamanda hastalarıma karşı taşıdığım sorumluluğun ve bilime olan bağlılığımın bir göstergesidir.
                </p>
              </div>

              {/* Experience Timeline */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-8 flex items-center">
                  <Briefcase className="w-6 h-6 mr-3 text-secondary" />
                  Kariyer ve Deneyim
                </h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary/30 before:to-transparent">
                  
                  {/* Timeline Item 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-primary/5 group-hover:border-secondary/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-primary text-lg">Acıbadem Hastanesi</h4>
                        <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">Günümüz</span>
                      </div>
                      <p className="text-foreground/70">Ortopedi ve Travmatoloji Uzmanı</p>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-primary/5 group-hover:border-secondary/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-primary text-lg">Profesörlük Ünvanı</h4>
                        <span className="text-sm font-medium text-foreground/50">Geçmiş</span>
                      </div>
                      <p className="text-foreground/70">Akademik kariyerde Profesörlük derecesinin alınması ve üniversite öğretim üyeliği.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Memberships */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-secondary" />
                  Bilimsel Dernek Üyelikleri
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Türk Ortopedi ve Travmatoloji Birliği Derneği (TOTBİD)",
                    "Türkiye Spor Yaralanmaları Artroskopi ve Diz Cerrahisi Derneği (TUSYAD)",
                    "Türk Ortopedi ve Travmatoloji Eğitim Konseyi (TOTEK)",
                    "Avrupa Ortopedi ve Travmatoloji Derneği (EFORT)"
                  ].map((membership, index) => (
                    <div key={index} className="flex items-start bg-accent p-4 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                      <span className="text-foreground/80 font-medium">{membership}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
            Sağlığınız İçin Doğru Adrestesiniz
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-bold transition-all shadow-md text-lg"
            >
              Randevu Alın
            </a>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center bg-white border-2 border-primary/10 hover:border-primary/30 text-primary px-8 py-4 rounded-full font-bold transition-all text-lg"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
