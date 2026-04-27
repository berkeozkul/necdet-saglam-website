import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { getIconComponent } from "@/data/services";
import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata() {
  const t = await getTranslations("Navigation");
  return {
    title: `${t("services")} | Prof. Dr. Necdet Sağlam`,
    description: "Diz ve kalça protezi, spor yaralanmaları, artroskopik cerrahi ve diğer ortopedik uzmanlık alanlarımız.",
  };
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const c = await getTranslations("Common");
  const t = await getTranslations("Home");
  const supabase = await createClient();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true });

  const displayServices = services || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{c("services")}</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {locale === 'tr' 
              ? 'Modern tıbbın sunduğu en güncel teşhis ve tedavi yöntemleriyle, ortopedik rahatsızlıklarınıza kalıcı çözümler üretiyoruz.'
              : 'With the most up-to-date diagnostic and treatment methods offered by modern medicine, we produce permanent solutions to your orthopedic disorders.'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service) => {
              const title = locale === 'tr' ? service.title : service.title_en || service.title;
              const shortDesc = locale === 'tr' ? service.short_desc : service.short_desc_en || service.short_desc;
              
              return (
                <Link 
                  key={service.slug}
                  href={`/uzmanliklar/${service.slug}`}
                  className="group bg-accent rounded-2xl p-8 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="bg-white text-secondary group-hover:text-primary group-hover:bg-white/90 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm transition-colors">
                    {getIconComponent(service.icon, "w-8 h-8")}
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-3 group-hover:text-white text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-foreground/70 group-hover:text-white/80 transition-colors leading-relaxed mb-6 flex-grow">
                    {shortDesc}
                  </p>
                  <div className="flex items-center text-secondary group-hover:text-white font-medium mt-auto">
                    {c("readMore")}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
