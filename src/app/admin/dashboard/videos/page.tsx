import { createClient } from '@/utils/supabase/server'
import { createVideo, deleteVideo } from '../actions'
import Link from 'next/link'

export default async function VideosAdminPage() {
  const supabase = await createClient()
  const { data: videos } = await supabase.from('videos').select('*').order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Video Yönetimi</h1>
          <p className="mt-2 text-sm text-slate-600">YouTube'daki TV programlarınızı veya bilgilendirici videolarınızı buradan ekleyebilirsiniz.</p>
        </div>
        <Link href="/admin/dashboard" className="text-secondary hover:text-primary font-medium transition-colors">
          &larr; Panele Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Yeni Video Ekleme Formu */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-primary mb-6">Yeni Video Ekle</h2>
          <form action={createVideo} className="space-y-4">
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Video Başlığı</label>
              <input type="text" id="title" name="title" required placeholder="Örn: Habertürk TV - Diz Protezi Hakkında" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>
            
            <div>
              <label htmlFor="youtube_url" className="block text-sm font-medium text-slate-700 mb-1">YouTube Linki</label>
              <input type="url" id="youtube_url" name="youtube_url" required placeholder="https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
              <p className="text-xs text-slate-500 mt-1">Videoyu YouTube'da açıp adres çubuğundaki linki kopyalayıp buraya yapıştırın.</p>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4">
              Videoyu Kaydet
            </button>
          </form>
        </div>

        {/* Mevcut Videolar Listesi */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-primary">Mevcut Videolar</h2>
            </div>
            
            <div className="p-6">
              {!videos || videos.length === 0 ? (
                <p className="text-center text-slate-500 py-8">Henüz hiç video eklenmemiş.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.map((video) => (
                    <div key={video.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex flex-col">
                      <div className="aspect-video relative">
                        {/* YouTube Thumbnail (Kapak Resmi) */}
                        <img 
                          src={`https://img.youtube.com/vi/${video.youtube_url}/mqdefault.jpg`} 
                          alt={video.title} 
                          className="w-full h-full object-cover" 
                        />
                        
                        {/* Oynat İkonu (Sadece Görsel) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white flex-grow flex flex-col justify-between">
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-2 mb-4">{video.title}</h3>
                        
                        <form action={async () => {
                          'use server'
                          await deleteVideo(video.id)
                        }}>
                          <button type="submit" className="w-full text-red-500 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors text-xs font-bold flex items-center justify-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Videoyu Sil
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
