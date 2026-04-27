import { createClient } from '@/utils/supabase/server'
import { Link } from '@/i18n/routing'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations("Navigation");
  return {
    title: `${t("gallery")} | Prof. Dr. Necdet Sağlam`,
    description: "Prof. Dr. Necdet Sağlam'ın ameliyat, vaka sonucu ve klinik fotoğrafları.",
  };
}

export default async function GalleryPage() {
  const supabase = await createClient()
  const locale = await getLocale()
  const c = await getTranslations("Common")
  const t = await getTranslations("Home")
  const nav = await getTranslations("Navigation")
  
  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .order('is_pinned', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  // Fotoğrafları "album_name" değerine göre gruplama
  const groupedGallery: Record<string, any[]> = galleryItems?.reduce((acc, item) => {
    const albumNameField = locale === 'en' && item.album_name_en ? item.album_name_en : item.album_name;
    const album = albumNameField || (locale === 'tr' ? 'Genel Vaka' : 'General Case');
    if (!acc[album]) {
      acc[album] = [];
    }
    acc[album].push(item);
    return acc;
  }, {} as Record<string, any[]>) || {};

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{nav("gallery")}</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("galleryDesc")}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          {Object.keys(groupedGallery).length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-primary/5">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                {locale === 'tr' ? 'Henüz Fotoğraf Yüklenmedi' : 'No Photos Uploaded Yet'}
              </h2>
              <p className="text-foreground/60">
                {locale === 'tr' ? 'Galeriye yakında yeni fotoğraflar eklenecektir.' : 'New photos will be added to the gallery soon.'}
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedGallery).map(([albumName, items]) => (
                <div key={albumName} className="bg-white rounded-3xl shadow-sm border border-primary/5 p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                    <div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">{albumName}</h2>
                      <p className="text-foreground/50 text-sm mt-2">{items.length} {locale === 'tr' ? 'Fotoğraf' : 'Photos'}</p>
                    </div>
                    <span className="hidden sm:inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-bold rounded-full">
                      {locale === 'en' && items[0].category === 'Vaka Sonucu' ? 'Case Result' : 
                       locale === 'en' && items[0].category === 'Ameliyathane' ? 'Operating Room' : 
                       locale === 'en' && items[0].category === 'Klinik' ? 'Clinic' : 
                       locale === 'en' && items[0].category === 'Genel' ? 'General' : 
                       items[0].category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item) => {
                      const itemTitle = locale === 'tr' ? item.title : item.title_en || item.title;
                      return (
                        <div key={item.id} className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-100 aspect-square">
                          <img 
                            src={item.image_url} 
                            alt={itemTitle} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white font-bold text-lg leading-tight">
                              {itemTitle}
                            </h3>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
