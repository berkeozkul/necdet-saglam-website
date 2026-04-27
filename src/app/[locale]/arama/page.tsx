import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { ArrowRight, Search, FileText, Activity } from 'lucide-react';
import { services, getIconComponent } from '@/data/services';

export const metadata = {
  title: "Arama Sonuçları | Prof. Dr. Necdet Sağlam",
  description: "Sitede yapılan aramanın sonuçları.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';
  const decodedQuery = decodeURIComponent(query).toLowerCase();
  
  let posts: any[] = [];
  let matchedServices: any[] = [];
  
  if (decodedQuery) {
    const supabase = await createClient();
    
    // Blog yazılarında arama (Başlık, Özet veya İçerikte geçiyorsa)
    const { data } = await supabase
      .from('posts')
      .select('id, slug, title, excerpt')
      .eq('is_published', true)
      .or(`title.ilike.%${decodedQuery}%,content.ilike.%${decodedQuery}%,excerpt.ilike.%${decodedQuery}%`)
      .order('created_at', { ascending: false });
      
    if (data) {
      posts = data;
    }

    // Uzmanlık alanlarında arama (local veri)
    matchedServices = services.filter(service => 
      service.title.toLowerCase().includes(decodedQuery) || 
      service.shortDesc.toLowerCase().includes(decodedQuery) ||
      service.content.toLowerCase().includes(decodedQuery)
    );
  }

  const hasResults = posts.length > 0 || matchedServices.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
            <Search className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Arama Sonuçları</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {decodedQuery ? (
              <><span className="font-semibold text-secondary">"{decodedQuery}"</span> için bulunan sonuçlar</>
            ) : (
              "Lütfen aramak istediğiniz kelimeyi girin."
            )}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          {!decodedQuery ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-primary/5">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-primary">Arama yapmadınız</h2>
              <p className="text-foreground/60 mt-2">Menüdeki arama çubuğunu kullanarak sitede arama yapabilirsiniz.</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-primary/5">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-primary">Sonuç Bulunamadı</h2>
              <p className="text-foreground/60 mt-2">Arama kriterlerinize uygun makale veya uzmanlık alanı bulunamadı. Lütfen başka kelimeler deneyin.</p>
              <Link href="/" className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors">
                Anasayfaya Dön
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              
              {/* Uzmanlık Sonuçları */}
              {matchedServices.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-primary mb-6 flex items-center border-b border-slate-200 pb-4">
                    <Activity className="w-6 h-6 mr-3 text-secondary" />
                    Uzmanlık Alanları ({matchedServices.length})
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {matchedServices.map((service) => (
                      <Link 
                        key={service.id}
                        href={`/uzmanliklar/${service.id}`}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-secondary/50 hover:shadow-md transition-all group flex flex-col"
                      >
                        <div className="flex items-center mb-3">
                          <span className="bg-secondary/10 text-secondary p-2 rounded-lg mr-3">
                            {getIconComponent(service.icon, "w-5 h-5")}
                          </span>
                          <h3 className="font-bold text-primary group-hover:text-secondary transition-colors text-lg">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-sm text-foreground/70 mb-4 line-clamp-2 flex-grow">
                          {service.shortDesc}
                        </p>
                        <div className="flex items-center text-secondary font-medium text-sm mt-auto">
                          Görüntüle
                          <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Makale Sonuçları */}
              {posts.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-primary mb-6 flex items-center border-b border-slate-200 pb-4">
                    <FileText className="w-6 h-6 mr-3 text-secondary" />
                    Makaleler ({posts.length})
                  </h2>
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <Link 
                        key={post.id} 
                        href={`/makaleler/${post.slug}`}
                        className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-secondary/50 hover:shadow-md transition-all group"
                      >
                        <h3 className="font-bold text-primary text-xl mb-2 group-hover:text-secondary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-foreground/70 text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-secondary font-medium text-sm">
                          Yazıyı Oku
                          <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          )}
          
        </div>
      </section>
    </div>
  );
}
