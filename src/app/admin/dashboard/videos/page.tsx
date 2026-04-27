import { createClient } from '@/utils/supabase/server'
import { createVideo, deleteVideo, toggleVideoPin } from '../actions'
import Link from 'next/link'
import { DeleteForm } from '@/components/admin/DeleteForm'

export default async function VideosAdminPage() {
  const supabase = await createClient()
  const { data: videos } = await supabase.from('videos').select('*').order('is_pinned', { ascending: false, nullsFirst: false }).order('created_at', { ascending: false })

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
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Video Başlığı (TR)</label>
              <input type="text" id="title" name="title" required placeholder="Örn: Habertürk TV - Diz Protezi Hakkında" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div>
              <label htmlFor="title_en" className="block text-sm font-medium text-slate-700 mb-1">Video Başlığı (EN)</label>
              <input type="text" id="title_en" name="title_en" placeholder="Opsiyonel: Habertürk TV - About Knee Replacement" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>
            
            <div>
              <label htmlFor="youtube_url" className="block text-sm font-medium text-slate-700 mb-1">YouTube Linki</label>
              <input type="url" id="youtube_url" name="youtube_url" required placeholder="https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
              <p className="text-xs text-slate-500 mt-1">Videoyu YouTube'da açıp adres çubuğundaki linki kopyalayıp buraya yapıştırın.</p>
            </div>

            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center">
                <input type="checkbox" id="is_pinned" name="is_pinned" className="w-4 h-4 text-secondary bg-slate-100 border-slate-300 rounded focus:ring-secondary" />
                <label htmlFor="is_pinned" className="ml-2 text-sm font-medium text-slate-700">Başa Tuttur</label>
              </div>
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
                        <div className="flex items-start justify-between mb-4 gap-2">
                          <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{video.title}</h3>
                          {video.is_pinned && <svg className="w-4 h-4 text-secondary shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" /></svg>}
                        </div>
                        
                        <div className="flex gap-2">
                          <form action={async () => {
                            'use server'
                            await toggleVideoPin(video.id, video.is_pinned)
                          }} className="flex-1">
                            <button type="submit" className={`w-full py-2 rounded-lg transition-colors text-xs font-bold flex items-center justify-center ${video.is_pinned ? 'text-secondary bg-secondary/10 hover:bg-secondary/20' : 'text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-600'}`} title={video.is_pinned ? "Tutturmayı Kaldır" : "Başa Tuttur"}>
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" /></svg>
                              {video.is_pinned ? "Kaldır" : "Tuttur"}
                            </button>
                          </form>
                          <DeleteForm action={async () => {
                            'use server'
                            await deleteVideo(video.id)
                          }} className="flex-1">
                            <button type="submit" className="w-full text-red-500 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors text-xs font-bold flex items-center justify-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              Sil
                            </button>
                          </DeleteForm>
                        </div>
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
