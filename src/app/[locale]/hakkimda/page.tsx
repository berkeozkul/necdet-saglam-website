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
                      <p className="text-sm text-foreground/70">25+ {locale === 'tr' ? 'Yıl' : 'Years'}</p>
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
                  <>
                    <p>
                      Tıp eğitimimi başarıyla tamamladıktan sonra Ortopedi ve Travmatoloji alanında uzmanlık eğitimimi aldım. Meslek hayatım boyunca hastalarımın yaşam kalitesini artırmak ve onlara ağrısız, özgürce hareket edebilecekleri bir yaşam sunmak en büyük motivasyonum oldu.
                    </p>
                    <p>
                      Özellikle <strong>diz ve kalça protez cerrahisi</strong>, <strong>spor yaralanmaları</strong> ve <strong>artroskopik cerrahi</strong> alanlarında yoğunlaşarak, ulusal ve uluslararası alanda birçok bilimsel çalışmaya imza attım. Teknolojinin tıbba sunduğu en güncel yenilikleri yakından takip ediyor ve cerrahi pratiğimde uyguluyorum.
                    </p>
                    <p>
                      Akademik kariyerim boyunca edindiğim "Profesör" unvanı, sadece bir akademik derece değil, aynı zamanda hastalarıma karşı taşıdığım sorumluluğun ve bilime olan bağlılığımın bir göstergesidir.
                    </p>
                  </>
                )}
              </div>

              {/* Experience Timeline */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-8 flex items-center">
                  <Briefcase className="w-6 h-6 mr-3 text-secondary" />
                  {locale === 'tr' ? 'Kariyer ve Deneyim' : 'Career and Experience'}
                </h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary/30 before:to-transparent">
                  
                  {/* Timeline Item 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-primary/5 group-hover:border-secondary/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-primary text-lg">{locale === 'tr' ? 'Acıbadem Hastanesi' : 'Acıbadem Hospital'}</h4>
                        <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">{locale === 'tr' ? 'Günümüz' : 'Present'}</span>
                      </div>
                      <p className="text-foreground/70">{locale === 'tr' ? 'Ortopedi ve Travmatoloji Uzmanı' : 'Orthopedics and Traumatology Specialist'}</p>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-primary/5 group-hover:border-secondary/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-primary text-lg">{locale === 'tr' ? 'Profesörlük Ünvanı' : 'Professorship Title'}</h4>
                        <span className="text-sm font-medium text-foreground/50">{locale === 'tr' ? 'Geçmiş' : 'Past'}</span>
                      </div>
                      <p className="text-foreground/70">{locale === 'tr' ? 'Akademik kariyerde Profesörlük derecesinin alınması ve üniversite öğretim üyeliği.' : 'Receiving the title of Professor in academic career and university faculty membership.'}</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
