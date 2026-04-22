import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: "Galeri | Prof. Dr. Necdet Sağlam",
  description: "Prof. Dr. Necdet Sağlam'ın ameliyat, vaka sonucu ve klinik fotoğrafları.",
};

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: galleryItems } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })

  // Fotoğrafları "album_name" değerine göre gruplama
  const groupedGallery: Record<string, any[]> = galleryItems?.reduce((acc, item) => {
    const album = item.album_name || 'Genel Vaka';
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Galeri</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ameliyatlarımızdan, vaka sonuçlarından ve kliniğimizden kareler.
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
              <h2 className="text-2xl font-bold text-primary mb-2">Henüz Fotoğraf Yüklenmedi</h2>
              <p className="text-foreground/60">Galeriye yakında yeni fotoğraflar eklenecektir.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedGallery).map(([albumName, items]) => (
                <div key={albumName} className="bg-white rounded-3xl shadow-sm border border-primary/5 p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                    <div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">{albumName}</h2>
                      <p className="text-foreground/50 text-sm mt-2">{items.length} Fotoğraf</p>
                    </div>
                    <span className="hidden sm:inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-bold rounded-full">
                      {items[0].category}
                    </span>
                  </div>

                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-100">
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <h3 className="text-white font-bold text-lg leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
            Sağlıklı Günlere Adım Atın
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
