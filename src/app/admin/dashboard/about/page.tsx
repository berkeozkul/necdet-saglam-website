import { createClient } from '@/utils/supabase/server'
import { updateAbout } from '../actions'
import Link from 'next/link'

export default async function AboutAdminPage() {
  const supabase = await createClient()
  const { data: setting } = await supabase.from('settings').select('*').eq('id', 'about_me').single()

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Hakkımda Yönetimi</h1>
          <p className="mt-2 text-sm text-slate-600">Sitenizdeki özgeçmiş ve biyografi metnini buradan güncelleyebilirsiniz.</p>
        </div>
        <Link href="/admin/dashboard" className="text-secondary hover:text-primary font-medium transition-colors">
          &larr; Panele Dön
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-primary">Özgeçmiş Metni</h2>
          {setting?.updated_at && (
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Son Güncelleme: {new Date(setting.updated_at).toLocaleString('tr-TR')}
            </span>
          )}
        </div>

        <form action={updateAbout} className="space-y-6">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
              Detaylı Biyografi (HTML etiketleri kullanabilirsiniz: &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt; vb.)
            </label>
            <textarea 
              id="content" 
              name="content" 
              rows={15} 
              required 
              defaultValue={setting?.content || ''}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-secondary focus:border-secondary outline-none resize-y font-mono text-sm"
            ></textarea>
            <p className="mt-2 text-xs text-slate-500">
              İpucu: Paragrafları ayırmak için metinleri &lt;p&gt; Paragraf metni &lt;/p&gt; arasına alabilirsiniz.
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
