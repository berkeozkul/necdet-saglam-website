import { GraduationCap, Award, Briefcase, BookOpen, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata() {
  const t = await getTranslations("Navigation");
  return {
    title: `${t("about")} | Prof. Dr. Necdet Sağlam`,
    description: "Prof. Dr. Necdet Sağlam'ın eğitim geçmişi, akademik kariyeri ve tıbbi uzmanlık alanları hakkında detaylı bilgi.",
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations("About");
  const c = await getTranslations("Home");
  const nav = await getTranslations("Navigation");

  const supabase = await createClient();
  const { data: setting } = await supabase.from('settings').select('*').eq('id', 'about_me').single();

  const biographyContent = locale === 'tr' ? setting?.content : setting?.content_en || setting?.content;

  const timelineData = [
    { year: "2025", titleTr: "Acıbadem Sağlık Grubu", titleEn: "Acıbadem Healthcare Group", descTr: "Ortopedi ve Travmatoloji Uzmanı", descEn: "Orthopedics and Traumatology Specialist", current: true },
    { year: "2024 – 2025", titleTr: "Ümraniye Eğitim ve Araştırma Hastanesi", titleEn: "Umraniye Training and Research Hospital", descTr: "Profesör", descEn: "Professor" },
    { year: "2024", titleTr: "Başakşehir Çam ve Sakura Şehir Hastanesi", titleEn: "Basaksehir Cam and Sakura City Hospital", descTr: "Başhekim", descEn: "Chief Physician" },
    { year: "2017 – 2024", titleTr: "SBÜ Ümraniye Eğitim ve Araştırma Merkezi", titleEn: "SBU Umraniye Training and Research Center", descTr: "Başhekim", descEn: "Chief Physician" },
    { year: "2014 – 2017", titleTr: "Ümraniye Eğitim ve Araştırma Hastanesi", titleEn: "Umraniye Training and Research Hospital", descTr: "Doçent Doktor", descEn: "Associate Professor" },
    { year: "2011 – 2014", titleTr: "Ümraniye Eğitim ve Araştırma Hastanesi", titleEn: "Umraniye Training and Research Hospital", descTr: "Başasistan", descEn: "Chief Assistant" },
    { year: "2006 – 2010", titleTr: "Medipol Üniversitesi", titleEn: "Medipol University", descTr: "Yardımcı Doçent", descEn: "Assistant Professor" },
    { year: "2005 – 2006", titleTr: "Acıbadem International Hastanesi", titleEn: "Acibadem International Hospital", descTr: "Uzman Doktor", descEn: "Specialist Doctor" },
    { year: "2003 – 2005", titleTr: "Haydarpaşa Numune Eğitim ve Araştırma Hastanesi", titleEn: "Haydarpasa Numune Training and Research Hospital", descTr: "Başasistan", descEn: "Chief Assistant" },
    { year: "2002 – 2003", titleTr: "T.S.K. Elazığ Asker Hastanesi", titleEn: "Turkish Armed Forces Elazig Military Hospital", descTr: "Tabip Asteğmen", descEn: "Medical Lieutenant" }
  ];

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
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar - Photo & Quick Facts */}
            <div className="lg:col-span-4 space-y-8">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white relative">
                <Image src="/images/doctor.png" alt="Prof. Dr. Necdet Sağlam" fill className="object-cover object-top" priority />
              </div>
              
              <div className="bg-accent rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-primary mb-4 border-b border-primary/10 pb-4">
                  {locale === 'tr' ? 'Kısa Bilgiler' : 'Quick Facts'}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Briefcase className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">{locale === 'tr' ? 'Mevcut Kurum' : 'Current Institution'}</p>
                      <p className="text-sm text-foreground/70">{locale === 'tr' ? 'Acıbadem Hastanesi' : 'Acıbadem Hospital'}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <GraduationCap className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">{locale === 'tr' ? 'Uzmanlık' : 'Specialization'}</p>
                      <p className="text-sm text-foreground/70">{locale === 'tr' ? 'Ortopedi ve Travmatoloji' : 'Orthopedics and Traumatology'}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">{locale === 'tr' ? 'Deneyim' : 'Experience'}</p>
                      <p className="text-sm text-foreground/70">30+ {locale === 'tr' ? 'Yıl' : 'Years'}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Content - Biography & Timeline */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Biography Text */}
              <div className="prose prose-lg max-w-none text-foreground/80">
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                  {locale === 'tr' ? 'Prof. Dr. Necdet Sağlam Kimdir?' : 'Who is Prof. Dr. Necdet Sağlam?'}
                </h2>
                
                {biographyContent ? (
                  <div dangerouslySetInnerHTML={{ __html: biographyContent }} />
                ) : (
                  <p>
                    {locale === 'tr' 
                      ? 'Prof. Dr. Necdet Sağlam, ortopedi ve travmatoloji alanında 30 yılı aşkın deneyime sahip olup, özellikle kalça ve diz protez cerrahisi, travma cerrahisi ve omurga cerrahisi üzerine çalışmalar yürütmektedir. Akademik yaşamı boyunca hem eğitim hem de sağlık hizmetlerinde yenilikçi uygulamalara öncülük etmiştir.'
                      : 'Prof. Dr. Necdet Sağlam has over 30 years of experience in the field of orthopedics and traumatology, focusing especially on hip and knee replacement surgery, trauma surgery, and spinal surgery. Throughout his academic life, he has pioneered innovative practices in both education and healthcare services.'}
                  </p>
                )}

                <h3 className="font-heading text-2xl font-bold text-primary mt-8 mb-4">{locale === 'tr' ? 'Eğitim' : 'Education'}</h3>
                <ul className="list-none space-y-2 pl-0">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span><strong>2000</strong> — İstanbul Üniversitesi İstanbul Tıp Fakültesi Ortopedi ve Travmatoloji</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span><strong>1995</strong> — İstanbul Üniversitesi İstanbul Tıp Fakültesi</span></li>
                </ul>

                <h3 className="font-heading text-2xl font-bold text-primary mt-8 mb-4">{locale === 'tr' ? 'Üyelikler' : 'Memberships'}</h3>
                <ul className="list-none space-y-2 pl-0">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span><strong>TOTDER</strong> — Türk Ortopedi ve Travmatoloji Derneği (Yönetim Kurulu Üyesi)</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span><strong>TOTEK</strong> — Türk Ortopedi ve Travmatoloji Eğitim Konseyi</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span><strong>TOD</strong> — Türk Omurga Derneği</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span>Kalça Diz Artroplasti Derneği</span></li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span><strong>TOTBİD</strong> — Türk Ortopedi ve Travmatoloji Birliği Derneği</span></li>
                </ul>

                <h3 className="font-heading text-2xl font-bold text-primary mt-8 mb-4">{locale === 'tr' ? 'Öne Çıkan Bilimsel Yayınlar' : 'Featured Scientific Publications'}</h3>
                <ul className="list-none space-y-3 pl-0 text-sm">
                  <li className="flex items-start"><BookOpen className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span>Mid-term survivorship and clinical results of cementless total hip arthroplasty for steroid-induced avascular necrosis (North Clin Istanb. 2024)</span></li>
                  <li className="flex items-start"><BookOpen className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span>Is step-cut shortening osteotomy a better choice than transverse osteotomy for total hip arthroplasty for Crowe type III-IV hip dysplasia? (Orthop Traumatol Surg Res. 2024)</span></li>
                  <li className="flex items-start"><BookOpen className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span>Kyphectomy and sliding growing rod technique in patients with congenital lumbar kyphosis deformity (J Orthop Surg Res. 2024)</span></li>
                  <li className="flex items-start"><BookOpen className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span>Radiographic and clinical outcomes of distal tibia fractures: Comparison of two intramedullary nailing (Ulus Travma Acil Cerrahi Derg. 2022)</span></li>
                  <li className="flex items-start"><BookOpen className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span>Is Obesity Associated with Higher Complication Rates in Total Hip Arthroplasty? (Indian J Orthop. 2021)</span></li>
                  <li className="flex items-start"><BookOpen className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span>Comparison of Four Different Posterior Screw Fixation Techniques (World Neurosurg. 2019)</span></li>
                  <li className="flex items-start"><BookOpen className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" /> <span>The combined administration of systemic and topical tranexamic acid for total hip arthroplasty (Acta Orthop Traumatol Turc. 2019)</span></li>
                </ul>
              </div>

              {/* Experience Timeline */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-8 flex items-center">
                  <Briefcase className="w-6 h-6 mr-3 text-secondary" />
                  {locale === 'tr' ? 'Kariyer ve Deneyim' : 'Career and Experience'}
                </h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary/30 before:to-transparent">
                  
                  {timelineData.map((item, index) => (
                    <div key={index} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${item.current ? 'is-active' : ''}`}>
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${item.current ? 'bg-secondary text-white' : 'bg-primary/20 text-primary'}`}>
                        {item.current ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-primary/5 group-hover:border-secondary/30 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                          <h4 className="font-bold text-primary text-lg">{locale === 'tr' ? item.titleTr : item.titleEn}</h4>
                          <span className={`text-sm font-medium whitespace-nowrap ${item.current ? 'text-secondary bg-secondary/10 px-3 py-1 rounded-full' : 'text-foreground/50'}`}>
                            {item.year}
                          </span>
                        </div>
                        <p className="text-foreground/70">{locale === 'tr' ? item.descTr : item.descEn}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
