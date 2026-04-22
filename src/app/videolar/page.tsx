import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: "Videolar | Prof. Dr. Necdet Sağlam",
  description: "Prof. Dr. Necdet Sağlam'ın katıldığı TV programları, röportajlar ve bilgilendirici videolar.",
};

export default async function VideosPage() {
  const supabase = await createClient()
  const { data: videos } = await supabase.from('videos').select('*').order('created_at', { ascending: false })

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Videolar</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Televizyon programları, röportajlar ve ortopedi alanındaki bilgilendirici videolarımız.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          {!videos || videos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-primary/5">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Henüz Video Yüklenmedi</h2>
              <p className="text-foreground/60">Bu sayfaya yakında yeni videolar eklenecektir.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/5 flex flex-col group">
                  {/* YouTube Iframe */}
                  <div className="aspect-video relative w-full bg-slate-900">
                    <iframe 
                      src={`https://www.youtube.com/embed/${video.youtube_url}?rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0"
                    ></iframe>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <h3 className="font-heading text-lg font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                      {video.title}
                    </h3>
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
            Daha Fazla Bilgi İçin
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
