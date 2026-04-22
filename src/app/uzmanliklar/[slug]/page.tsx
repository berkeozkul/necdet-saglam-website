import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { services, getIconComponent } from "@/data/services";

// Generate static params for all service pages
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.id === params.slug);
  
  if (!service) {
    return { title: "Uzmanlık Alanı Bulunamadı" };
  }

  return {
    title: `${service.title} | Prof. Dr. Necdet Sağlam`,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.id === params.slug);

  if (!service) {
    notFound();
  }

  // Get other services for the sidebar
  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center text-secondary/80 text-sm font-medium mb-4">
            <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/uzmanliklar" className="hover:text-white transition-colors">Uzmanlık Alanları</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">{service.title}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 flex items-center">
            <span className="bg-white text-secondary w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-lg shrink-0">
              {getIconComponent(service.icon, "w-8 h-8")}
            </span>
            {service.title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mt-6">
            {service.shortDesc}
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
                  Tüm Uzmanlık Alanlarına Dön
                </Link>
                
                <div 
                  className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-heading prose-headings:text-primary prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-p:leading-relaxed prose-li:my-2 prose-ul:list-disc prose-ul:pl-5 prose-strong:text-primary"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />

                <div className="mt-12 p-8 bg-accent rounded-2xl border border-secondary/20">
                  <h3 className="font-heading text-2xl font-bold text-primary mb-4">Tedavi Planlaması İçin</h3>
                  <p className="text-foreground/70 mb-6">
                    {service.title} konusunda yaşadığınız şikayetlerin detaylı değerlendirmesi ve size en uygun tedavi yönteminin belirlenmesi için kliniğimize başvurabilirsiniz.
                  </p>
                  <a
                    href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-bold transition-all shadow-md"
                  >
                    Hemen Randevu Alın
                  </a>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Other Services */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-accent rounded-3xl p-8 shadow-sm border border-primary/5 sticky top-32">
                <h3 className="font-heading text-2xl font-bold text-primary mb-6 pb-4 border-b border-primary/10">
                  Diğer Uzmanlık Alanları
                </h3>
                <ul className="space-y-3">
                  {otherServices.map((other) => (
                    <li key={other.id}>
                      <Link 
                        href={`/uzmanliklar/${other.id}`}
                        className="flex items-center justify-between p-4 rounded-xl bg-white hover:bg-primary hover:text-white text-foreground/80 transition-all group shadow-sm"
                      >
                        <span className="font-medium flex items-center">
                          <span className="text-secondary group-hover:text-white mr-3">
                            {getIconComponent(other.icon, "w-5 h-5")}
                          </span>
                          {other.title}
                        </span>
                        <ChevronRight className="w-5 h-5 text-secondary group-hover:text-white group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-primary/10">
                  <h4 className="font-bold text-primary mb-2">Sorularınız mı var?</h4>
                  <p className="text-sm text-foreground/70 mb-4">Uzman ekibimiz size yardımcı olmaktan memnuniyet duyacaktır.</p>
                  <Link 
                    href="/iletisim"
                    className="block w-full text-center bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-xl font-bold transition-colors"
                  >
                    Bize Ulaşın
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
