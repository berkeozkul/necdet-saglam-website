import { createClient } from '@/utils/supabase/server'
import { createGalleryItem, deleteGalleryItem, deleteAlbum, toggleAlbumPin } from '../actions'
import Link from 'next/link'
import { DeleteForm } from '@/components/admin/DeleteForm'
import { SubmitButton } from '@/components/admin/SubmitButton'

export default async function GalleryAdminPage() {
  const supabase = await createClient()
  const { data: galleryItems } = await supabase.from('gallery').select('*').order('is_pinned', { ascending: false, nullsFirst: false }).order('created_at', { ascending: false })

  // Fotoğrafları "album_name" değerine göre gruplama
  const groupedGallery: Record<string, any[]> = galleryItems?.reduce((acc, item) => {
    const album = item.album_name || 'Genel Vaka';
    if (!acc[album]) {
      acc[album] = [];
    }
    acc[album].push(item);
    return acc;
  }, {} as Record<string, any[]>) || {};

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
              <label htmlFor="album_name" className="block text-sm font-medium text-slate-700 mb-1">Albüm / Vaka Adı (TR)</label>
              <input type="text" id="album_name" name="album_name" required placeholder="Örn: Ahmet Bey - Diz Protezi" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
              <p className="text-xs text-slate-500 mt-1">Aynı vakaya ait fotoğrafları aynı albüm adıyla kaydederseniz gruplanırlar.</p>
            </div>

            <div>
              <label htmlFor="album_name_en" className="block text-sm font-medium text-slate-700 mb-1">Albüm / Vaka Adı (EN)</label>
              <input type="text" id="album_name_en" name="album_name_en" placeholder="Opsiyonel: Mr. Ahmet - Knee Replacement" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Fotoğraf Açıklaması (TR)</label>
              <input type="text" id="title" name="title" required placeholder="Örn: Ameliyat sonrası 2. gün" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
            </div>

            <div>
              <label htmlFor="title_en" className="block text-sm font-medium text-slate-700 mb-1">Fotoğraf Açıklaması (EN)</label>
              <input type="text" id="title_en" name="title_en" placeholder="Opsiyonel: Post-op day 2" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-secondary focus:border-secondary outline-none" />
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

            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center">
                <input type="checkbox" id="is_pinned" name="is_pinned" className="w-4 h-4 text-secondary bg-slate-100 border-slate-300 rounded focus:ring-secondary" />
                <label htmlFor="is_pinned" className="ml-2 text-sm font-medium text-slate-700">Albümü Başa Tuttur</label>
              </div>
            </div>

            <SubmitButton loadingText="Fotoğraf Yükleniyor...">
              Fotoğrafı Yükle
            </SubmitButton>
          </form>
        </div>

        {/* Mevcut Fotoğraflar Listesi */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-primary">Mevcut Fotoğraflar</h2>
            </div>
            
            <div className="p-6">
              {Object.keys(groupedGallery).length === 0 ? (
                <p className="text-center text-slate-500 py-8">Henüz galeriye fotoğraf eklenmemiş.</p>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedGallery).map(([albumName, items]) => (
                    <div key={albumName} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      
                      {/* Albüm Başlığı ve Toplu Silme Butonu */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                        <div className="flex items-center space-x-2">
                          {items[0].is_pinned && <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" /></svg>}
                          <div>
                            <h3 className="text-lg font-bold text-primary">{albumName}</h3>
                            <p className="text-sm text-slate-500">{items.length} Fotoğraf • {items[0].category}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <form action={async () => {
                            'use server'
                            await toggleAlbumPin(albumName, items[0].is_pinned)
                          }}>
                            <button type="submit" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${items[0].is_pinned ? 'text-secondary bg-secondary/10 border-secondary/20 hover:bg-secondary/20' : 'text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                              {items[0].is_pinned ? "Tutturmayı Kaldır" : "Başa Tuttur"}
                            </button>
                          </form>
                          <DeleteForm action={async () => {
                            'use server'
                            await deleteAlbum(albumName)
                          }} message="Bu albümü ve içindeki tüm fotoğrafları silmek istediğinize emin misiniz?">
                            <button type="submit" className="text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-red-100">
                              Tüm Albümü Sil
                            </button>
                          </DeleteForm>
                        </div>
                      </div>

                      {/* Albüm İçindeki Fotoğraflar */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {items.map((item) => (
                          <div key={item.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center">
                              <p className="text-white text-xs font-medium line-clamp-2 mb-2">{item.title}</p>
                              
                              <DeleteForm action={async () => {
                                'use server'
                                await deleteGalleryItem(item.id)
                              }}>
                                <button type="submit" className="text-white bg-red-500 hover:bg-red-600 p-1.5 rounded-md transition-colors text-xs font-bold flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                  Sil
                                </button>
                              </DeleteForm>
                            </div>
                          </div>
                        ))}
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
