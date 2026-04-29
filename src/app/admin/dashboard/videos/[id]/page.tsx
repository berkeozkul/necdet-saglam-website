import { createClient } from '@/utils/supabase/server'
import { updateVideo } from '../../actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!video) {
    redirect('/admin/dashboard/videos')
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Video Düzenle</h1>
          <p className="mt-2 text-sm text-slate-600">Videonuzda değişiklik yapabilirsiniz.</p>
        </div>
        <Link href="/admin/dashboard/videos" className="text-secondary hover:text-primary font-medium transition-colors">
          &larr; Videolara Dön
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <form action={updateVideo} className="space-y-6">
          <input type="hidden" name="id" value={video.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Video Başlığı (TR)</label>
              <input type="text" id="title" name="title" required defaultValue={video.title} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div>
              <label htmlFor="title_en" className="block text-sm font-medium text-slate-700 mb-1">Video Başlığı (EN)</label>
              <input type="text" id="title_en" name="title_en" defaultValue={video.title_en || ''} placeholder="Opsiyonel: İngilizce Başlık" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>
          </div>
          
          <div>
            <label htmlFor="youtube_url" className="block text-sm font-medium text-slate-700 mb-1">YouTube Linki</label>
            <input type="url" id="youtube_url" name="youtube_url" required defaultValue={`https://www.youtube.com/watch?v=${video.youtube_url}`} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            <p className="text-xs text-slate-500 mt-1">Videoyu YouTube'da açıp adres çubuğundaki linki kopyalayıp buraya yapıştırın.</p>
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
            <div className="flex items-center">
              <input type="checkbox" id="is_pinned" name="is_pinned" defaultChecked={video.is_pinned} className="w-5 h-5 text-secondary bg-slate-100 border-slate-300 rounded focus:ring-secondary cursor-pointer" />
              <label htmlFor="is_pinned" className="ml-2 text-sm font-medium text-slate-700 cursor-pointer">Başa Tuttur</label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg">
              Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
