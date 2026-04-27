import { createClient } from '@/utils/supabase/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

export async function HomeVideos() {
  const supabase = await createClient();
  const t = await getTranslations('Home');
  const locale = await getLocale();
  
  // En son eklenen 2 videoyu getir
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('is_pinned', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(2);

  if (!videos || videos.length === 0) {
    return null; // Eğer hiç video yoksa bu bölümü gösterme
  }

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t('videosTitle')}</h2>
            <div className="w-24 h-1 bg-secondary mb-6 rounded-full"></div>
            <p className="text-white/70 text-lg">
              {t('videosDesc')}
            </p>
          </div>
          <Link 
            href="/videolar"
            className="inline-flex items-center text-white font-bold hover:text-secondary transition-colors mt-6 md:mt-0 group"
          >
            {t('viewAllVideos')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-secondary/50 transition-all duration-300 flex flex-col">
              {/* YouTube Iframe */}
              <div className="aspect-video relative w-full bg-slate-900 shadow-2xl">
                <iframe 
                  src={`https://www.youtube.com/embed/${video.youtube_url}?rel=0`}
                  title={locale === 'en' && video.title_en ? video.title_en : video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
              </div>
              
              {/* Content */}
              <div className="p-6 flex-grow flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-white leading-snug group-hover:text-secondary transition-colors pr-4">
                  {locale === 'en' && video.title_en ? video.title_en : video.title}
                </h3>
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <PlayCircle className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
