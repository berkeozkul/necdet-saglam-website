import { createClient } from '@/utils/supabase/server'
import { updateService } from '../../actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!service) {
    redirect('/admin/dashboard/services')
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Uzmanlık Alanı Düzenle</h1>
          <p className="mt-2 text-sm text-slate-600">Uzmanlık alanında değişiklik yapabilirsiniz.</p>
        </div>
        <Link href="/admin/dashboard/services" className="text-secondary hover:text-primary font-medium transition-colors">
          &larr; Uzmanlıklara Dön
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <form action={updateService} className="space-y-6">
          <input type="hidden" name="id" value={service.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Başlık (TR)</label>
              <input type="text" id="title" name="title" required defaultValue={service.title} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div>
              <label htmlFor="title_en" className="block text-sm font-medium text-slate-700 mb-1">Başlık (EN)</label>
              <input type="text" id="title_en" name="title_en" defaultValue={service.title_en || ''} placeholder="Opsiyonel: İngilizce Başlık" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="short_desc" className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (TR - Anasayfa için)</label>
              <textarea id="short_desc" name="short_desc" rows={3} required defaultValue={service.short_desc} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="short_desc_en" className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (EN)</label>
              <textarea id="short_desc_en" name="short_desc_en" rows={3} defaultValue={service.short_desc_en || ''} placeholder="Opsiyonel: İngilizce Özet" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Detaylı İçerik (TR - HTML destekler)</label>
              <textarea id="content" name="content" rows={10} required defaultValue={service.content} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-y"></textarea>
            </div>

            <div>
              <label htmlFor="content_en" className="block text-sm font-medium text-slate-700 mb-1">Detaylı İçerik (EN - HTML destekler)</label>
              <textarea id="content_en" name="content_en" rows={10} defaultValue={service.content_en || ''} placeholder="Opsiyonel: İngilizce Detaylı İçerik" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-y"></textarea>
            </div>
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-slate-700 mb-1">İkon Adı (Lucide Icons)</label>
            <select id="icon" name="icon" defaultValue={service.icon} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none bg-white">
              <option value="Bone">Kemik (Bone)</option>
              <option value="Activity">Aktivite (Activity)</option>
              <option value="Stethoscope">Steteskop (Stethoscope)</option>
              <option value="ShieldPlus">Kalkan (ShieldPlus)</option>
              <option value="HeartPulse">Kalp (HeartPulse)</option>
              <option value="UserPlus">İnsan (UserPlus)</option>
            </select>
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
