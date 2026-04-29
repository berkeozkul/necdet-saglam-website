import { createClient } from '@/utils/supabase/server'
import { updatePost } from '../../actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!post) {
    redirect('/admin/dashboard/blog')
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Makale Düzenle</h1>
          <p className="mt-2 text-sm text-slate-600">Makalenizde değişiklik yapabilirsiniz.</p>
        </div>
        <Link href="/admin/dashboard/blog" className="text-secondary hover:text-primary font-medium transition-colors">
          &larr; Blog Yönetimine Dön
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <form action={updatePost} className="space-y-6">
          <input type="hidden" name="id" value={post.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Başlık (TR)</label>
              <input type="text" id="title" name="title" required defaultValue={post.title} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div>
              <label htmlFor="title_en" className="block text-sm font-medium text-slate-700 mb-1">Başlık (EN)</label>
              <input type="text" id="title_en" name="title_en" defaultValue={post.title_en || ''} placeholder="Opsiyonel: İngilizce Başlık" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (TR)</label>
              <textarea id="excerpt" name="excerpt" rows={3} required defaultValue={post.excerpt} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>

            <div>
              <label htmlFor="excerpt_en" className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (EN)</label>
              <textarea id="excerpt_en" name="excerpt_en" rows={3} defaultValue={post.excerpt_en || ''} placeholder="Opsiyonel: İngilizce Özet" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-none"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">İçerik (TR - HTML destekler)</label>
              <textarea id="content" name="content" rows={10} required defaultValue={post.content} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-y"></textarea>
            </div>

            <div>
              <label htmlFor="content_en" className="block text-sm font-medium text-slate-700 mb-1">İçerik (EN - HTML destekler)</label>
              <textarea id="content_en" name="content_en" rows={10} defaultValue={post.content_en || ''} placeholder="Opsiyonel: İngilizce İçerik" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none resize-y"></textarea>
            </div>
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-slate-700 mb-1">Görsel URL (İsteğe bağlı)</label>
            <input type="url" id="image_url" name="image_url" defaultValue={post.image_url || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
          </div>

          <div className="flex items-center space-x-6 pt-4 border-t border-slate-100">
            <div className="flex items-center">
              <input type="checkbox" id="is_published" name="is_published" defaultChecked={post.is_published} className="w-5 h-5 text-secondary bg-slate-100 border-slate-300 rounded focus:ring-secondary cursor-pointer" />
              <label htmlFor="is_published" className="ml-2 text-sm font-medium text-slate-700 cursor-pointer">Yayında</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="is_pinned" name="is_pinned" defaultChecked={post.is_pinned} className="w-5 h-5 text-secondary bg-slate-100 border-slate-300 rounded focus:ring-secondary cursor-pointer" />
              <label htmlFor="is_pinned" className="ml-2 text-sm font-medium text-slate-700 cursor-pointer">Başa Tuttur</label>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg">
              Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
