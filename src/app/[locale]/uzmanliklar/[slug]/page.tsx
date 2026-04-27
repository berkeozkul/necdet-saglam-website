import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { getIconComponent } from "@/data/services";
import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";

// Generate static params for all service pages
export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('slug');
  return (services || []).map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  const locale = await getLocale();
  
  if (!service) {
    return { title: locale === 'tr' ? "Uzmanlık Alanı Bulunamadı" : "Service Not Found" };
  }

  const title = locale === 'tr' ? service.title : service.title_en || service.title;
  const shortDesc = locale === 'tr' ? service.short_desc : service.short_desc_en || service.short_desc;

  return {
    title: `${title} | Prof. Dr. Necdet Sağlam`,
    description: shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  const locale = await getLocale();
  const c = await getTranslations("Common");

  if (!service) {
    notFound();
  }

  const title = locale === 'tr' ? service.title : service.title_en || service.title;
  const shortDesc = locale === 'tr' ? service.short_desc : service.short_desc_en || service.short_desc;
  const content = locale === 'tr' ? service.content : service.content_en || service.content;

  // Get other services for the sidebar
  const { data: otherServices } = await supabase
    .from('services')
    .select('slug, title, title_en, icon')
    .neq('slug', resolvedParams.slug)
    .limit(5);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center text-secondary/80 text-sm font-medium mb-4">
            <Link href="/" className="hover:text-white transition-colors">{locale === 'tr' ? 'Anasayfa' : 'Home'}</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/uzmanliklar" className="hover:text-white transition-colors">{c("services")}</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">{title}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 flex items-center">
            <span className="bg-white text-secondary w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-lg shrink-0">
              {getIconComponent(service.icon, "w-8 h-8")}
            </span>
            {title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mt-6">
            {shortDesc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Content - Details */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-sm border border-primary/5 p-8 md:p-12">
                <Link href="/uzmanliklar" className="inline-flex items-center text-secondary font-medium hover:text-primary transition-colors mb-8 group">
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  {locale === 'tr' ? 'Tüm Uzmanlık Alanlarına Dön' : 'Back to All Services'}
                </Link>
                
                <div 
                  className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-heading prose-headings:text-primary prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-p:leading-relaxed prose-li:my-2 prose-ul:list-disc prose-ul:pl-5 prose-strong:text-primary"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>

            {/* Right Sidebar - Other Services */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-accent rounded-3xl p-8 shadow-sm border border-primary/5 sticky top-32">
                <h3 className="font-heading text-2xl font-bold text-primary mb-6 pb-4 border-b border-primary/10">
                  {locale === 'tr' ? 'Diğer Uzmanlık Alanları' : 'Other Services'}
                </h3>
                <ul className="space-y-3">
                  {(otherServices || []).map((other) => {
                    const otherTitle = locale === 'tr' ? other.title : other.title_en || other.title;
                    return (
                      <li key={other.slug}>
                        <Link 
                          href={`/uzmanliklar/${other.slug}`}
                          className="flex items-center justify-between p-4 rounded-xl bg-white hover:bg-primary hover:text-white text-foreground/80 transition-all group shadow-sm"
                        >
                          <span className="font-medium flex items-center">
                            <span className="text-secondary group-hover:text-white mr-3">
                              {getIconComponent(other.icon, "w-5 h-5")}
                            </span>
                            {otherTitle}
                          </span>
                          <ChevronRight className="w-5 h-5 text-secondary group-hover:text-white group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
