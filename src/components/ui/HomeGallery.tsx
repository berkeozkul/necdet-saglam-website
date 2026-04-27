import { createClient } from '@/utils/supabase/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

export async function HomeGallery() {
  const supabase = await createClient();
  const t = await getTranslations('Home');
  const locale = await getLocale();
  
  // En son eklenen fotoğrafları getir
  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .order('is_pinned', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (!galleryItems || galleryItems.length === 0) {
    return null; // Eğer hiç fotoğraf yoksa bu bölümü gösterme
  }

  // Fotoğrafları albümlere göre grupla
  const groupedGallery: Record<string, any[]> = galleryItems.reduce((acc, item) => {
    // İngilizce ise album_name_en kullan
    const albumNameField = locale === 'en' && item.album_name_en ? item.album_name_en : item.album_name;
    const album = albumNameField || 'Genel Vaka';
    if (!acc[album]) {
      acc[album] = [];
    }
    acc[album].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  // Sadece en son eklenen 3 albümü al
  const latestAlbums = Object.entries(groupedGallery).slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">{t('galleryTitle')}</h2>
            <div className="w-24 h-1 bg-secondary mb-6 rounded-full"></div>
            <p className="text-foreground/70 text-lg">
              {t('galleryDesc')}
            </p>
          </div>
          <Link 
            href="/galeri"
            className="inline-flex items-center text-secondary font-bold hover:text-primary transition-colors mt-4 md:mt-0 group"
          >
            {t('viewAllPhotos')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestAlbums.map(([albumName, items]) => {
            const coverImage = items[0]; // Albümün ilk fotoğrafını kapak yap
            
            return (
              <Link 
                key={albumName} 
                href="/galeri"
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 block"
              >
                {/* Cover Image */}
                <img 
                  src={coverImage.image_url} 
                  alt={albumName} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-3 py-1 bg-secondary/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                      {coverImage.category}
                    </span>
                    <span className="inline-flex items-center text-white/80 text-sm font-medium">
                      <ImageIcon className="w-4 h-4 mr-1.5" />
                      {items.length} {locale === 'tr' ? 'Fotoğraf' : 'Photos'}
                    </span>
                  </div>
                  <h3 className="text-white font-heading text-xl font-bold leading-tight group-hover:text-secondary transition-colors">
                    {albumName}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
