import { createClient } from '@/utils/supabase/server'
import { createGalleryItem, deleteGalleryItem } from '../actions'
import Link from 'next/link'

export default async function GalleryAdminPage() {
  const supabase = await createClient()
  const { data: galleryItems } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Galeri Yönetimi</h1>
          <p className="mt-2 text-sm text-slate-600">Ameliyat, vaka sonucu veya klinik fotoğraflarını bilgisayarınızdan seçip albüm olarak yükleyebilirsiniz.</p>
        </div>
        <Link href="/admin/dashboard" className="text-secondary hover:text-primary font-medium transition-colors">
          &larr; Panele Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Yeni Fotoğraf Ekleme Formu */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-primary mb-6">Yeni Fotoğraf Yükle</h2>
          <form action={createGalleryItem} className="space-y-4">
            
            <div>
              <label htmlFor="album_name" className="block text-sm font-medium text-slate-700 mb-1">Albüm / Vaka Adı</label>
              <input type="text" id="album_name" name="album_name" required placeholder="Örn: Ahmet Bey - Diz Protezi" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
              <p className="text-xs text-slate-500 mt-1">Aynı vakaya ait fotoğrafları aynı albüm adıyla kaydederseniz gruplanırlar.</p>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Fotoğraf Açıklaması</label>
              <input type="text" id="title" name="title" required placeholder="Örn: Ameliyat sonrası 2. gün" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>
            
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-slate-700 mb-1">Fotoğrafları Seç (Birden fazla seçebilirsiniz)</label>
              <input 
                type="file" 
                id="images" 
                name="images" 
                accept="image/*" 
                multiple
                required 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 cursor-pointer" 
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
              <select id="category" name="category" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none bg-white">
                <option value="Vaka Sonucu">Vaka Sonucu</option>
                <option value="Ameliyathane">Ameliyathane</option>
                <option value="Klinik">Klinik</option>
                <option value="Genel">Genel</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4">
              Fotoğrafı Yükle
            </button>
          </form>
        </div>

        {/* Mevcut Fotoğraflar Listesi */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-primary">Mevcut Fotoğraflar</h2>
            </div>
            
            <div className="p-6">
              {!galleryItems || galleryItems.length === 0 ? (
                <p className="text-center text-slate-500 py-8">Henüz galeriye fotoğraf eklenmemiş.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                        <span className="text-[10px] font-bold text-white bg-secondary/80 px-2 py-1 rounded-full mb-1 w-full truncate">{item.album_name}</span>
                        <span className="text-[10px] font-bold text-secondary bg-white px-2 py-1 rounded-full mb-2">{item.category}</span>
                        <p className="text-white text-xs font-medium line-clamp-2 mb-3">{item.title}</p>
                        
                        <form action={async () => {
                          'use server'
                          await deleteGalleryItem(item.id)
                        }}>
                          <button type="submit" className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-colors text-xs font-bold flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Sil
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
