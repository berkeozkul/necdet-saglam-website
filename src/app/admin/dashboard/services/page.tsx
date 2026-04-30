import { createClient } from '@/utils/supabase/server'
import { createService, deleteService } from '../actions'
import Link from 'next/link'
import { DeleteForm } from '@/components/admin/DeleteForm'
import { SubmitButton } from '@/components/admin/SubmitButton'

export default async function ServicesAdminPage() {
  const supabase = await createClient()
  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: true })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Uzmanlık Alanları Yönetimi</h1>
          <p className="mt-2 text-sm text-slate-600">Sitenizdeki uzmanlık alanlarını buradan ekleyebilir ve silebilirsiniz.</p>
        </div>
        <Link href="/admin/dashboard" className="text-secondary hover:text-primary font-medium transition-colors">
          &larr; Panele Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Yeni Hizmet Ekleme Formu */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-primary mb-6">Yeni Uzmanlık Ekle</h2>
          <form action={createService} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Başlık (TR)</label>
              <input type="text" id="title" name="title" required placeholder="Örn: Diz Protezi" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div>
              <label htmlFor="title_en" className="block text-sm font-medium text-slate-700 mb-1">Başlık (EN)</label>
              <input type="text" id="title_en" name="title_en" placeholder="Opsiyonel: Knee Replacement" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>
            
            <div>
              <label htmlFor="short_desc" className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (TR - Anasayfa için)</label>
              <textarea id="short_desc" name="short_desc" rows={2} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="short_desc_en" className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (EN)</label>
              <textarea id="short_desc_en" name="short_desc_en" rows={2} placeholder="Opsiyonel: İngilizce Kısa Açıklama" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Detaylı İçerik (TR - HTML destekler)</label>
              <textarea id="content" name="content" rows={6} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="content_en" className="block text-sm font-medium text-slate-700 mb-1">Detaylı İçerik (EN - HTML destekler)</label>
              <textarea id="content_en" name="content_en" rows={6} placeholder="Opsiyonel: İngilizce Detaylı İçerik" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-slate-700 mb-1">İkon Adı (Lucide Icons)</label>
              <select id="icon" name="icon" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none bg-white">
                <option value="Bone">Kemik (Bone)</option>
                <option value="Activity">Aktivite (Activity)</option>
                <option value="Stethoscope">Steteskop (Stethoscope)</option>
                <option value="ShieldPlus">Kalkan (ShieldPlus)</option>
                <option value="HeartPulse">Kalp (HeartPulse)</option>
                <option value="UserPlus">İnsan (UserPlus)</option>
              </select>
            </div>

            <SubmitButton loadingText="Kaydediliyor...">
              Uzmanlığı Kaydet
            </SubmitButton>
          </form>
        </div>

        {/* Mevcut Hizmetler Listesi */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-primary">Mevcut Uzmanlık Alanları</h2>
            </div>
            
            <ul className="divide-y divide-slate-200">
              {!services || services.length === 0 ? (
                <li className="p-6 text-center text-slate-500">Henüz hiç uzmanlık alanı eklenmemiş.</li>
              ) : (
                services.map((service) => (
                  <li key={service.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center">
                          <span className="bg-secondary/10 text-secondary p-2 rounded-lg mr-3 text-xs font-bold uppercase tracking-wider">
                            {service.icon}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 truncate">{service.title}</h3>
                        </div>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">{service.short_desc}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link 
                          href={`/admin/dashboard/services/${service.id}`} 
                          className="text-blue-500 hover:text-blue-700 p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" 
                          title="Düzenle"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </Link>
                        <DeleteForm action={async () => {
                          'use server'
                          await deleteService(service.id)
                        }}>
                          <button type="submit" className="text-red-500 hover:text-red-700 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Sil">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </DeleteForm>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
