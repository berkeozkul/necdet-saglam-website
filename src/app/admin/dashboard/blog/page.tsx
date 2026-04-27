import { createClient } from '@/utils/supabase/server'
import { createPost, deletePost, togglePostPin } from '../actions'
import Link from 'next/link'
import { DeleteForm } from '@/components/admin/DeleteForm'

export default async function BlogAdminPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('posts').select('*').order('is_pinned', { ascending: false, nullsFirst: false }).order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Blog Yönetimi</h1>
          <p className="mt-2 text-sm text-slate-600">Sitenizdeki makaleleri buradan ekleyebilir ve silebilirsiniz.</p>
        </div>
        <Link href="/admin/dashboard" className="text-secondary hover:text-primary font-medium transition-colors">
          &larr; Panele Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Yeni Makale Ekleme Formu */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-primary mb-6">Yeni Makale Ekle</h2>
          <form action={createPost} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Başlık (TR)</label>
              <input type="text" id="title" name="title" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div>
              <label htmlFor="title_en" className="block text-sm font-medium text-slate-700 mb-1">Başlık (EN)</label>
              <input type="text" id="title_en" name="title_en" placeholder="Opsiyonel: İngilizce Başlık" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (TR)</label>
              <textarea id="excerpt" name="excerpt" rows={2} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="excerpt_en" className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (EN)</label>
              <textarea id="excerpt_en" name="excerpt_en" rows={2} placeholder="Opsiyonel: İngilizce Özet" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">İçerik (TR - HTML destekler)</label>
              <textarea id="content" name="content" rows={6} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="content_en" className="block text-sm font-medium text-slate-700 mb-1">İçerik (EN - HTML destekler)</label>
              <textarea id="content_en" name="content_en" rows={6} placeholder="Opsiyonel: İngilizce İçerik" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-slate-700 mb-1">Görsel URL (İsteğe bağlı)</label>
              <input type="url" id="image_url" name="image_url" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input type="checkbox" id="is_published" name="is_published" defaultChecked className="w-4 h-4 text-secondary bg-slate-100 border-slate-300 rounded focus:ring-secondary" />
                <label htmlFor="is_published" className="ml-2 text-sm font-medium text-slate-700">Hemen Yayınla</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="is_pinned" name="is_pinned" className="w-4 h-4 text-secondary bg-slate-100 border-slate-300 rounded focus:ring-secondary" />
                <label htmlFor="is_pinned" className="ml-2 text-sm font-medium text-slate-700">Başa Tuttur</label>
              </div>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Makaleyi Kaydet
            </button>
          </form>
        </div>

        {/* Mevcut Makaleler Listesi */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-primary">Mevcut Makaleler</h2>
            </div>
            
            <ul className="divide-y divide-slate-200">
              {!posts || posts.length === 0 ? (
                <li className="p-6 text-center text-slate-500">Henüz hiç makale eklenmemiş.</li>
              ) : (
                posts.map((post) => (
                  <li key={post.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center space-x-2">
                          {post.is_pinned && <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" /></svg>}
                          <h3 className="text-lg font-bold text-slate-900 truncate">{post.title}</h3>
                        </div>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{post.excerpt}</p>
                        <div className="mt-2 flex items-center text-xs text-slate-400">
                          <span className={`px-2 py-1 rounded-full ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {post.is_published ? 'Yayında' : 'Taslak'}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <form action={async () => {
                          'use server'
                          await togglePostPin(post.id, post.is_pinned)
                        }}>
                          <button type="submit" className={`p-2 rounded-lg transition-colors ${post.is_pinned ? 'text-secondary bg-secondary/10 hover:bg-secondary/20' : 'text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-600'}`} title={post.is_pinned ? "Tutturmayı Kaldır" : "Başa Tuttur"}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" /></svg>
                          </button>
                        </form>
                        <DeleteForm action={async () => {
                          'use server'
                          await deletePost(post.id)
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
