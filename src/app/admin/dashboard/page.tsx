import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '../actions'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-heading font-bold text-xl text-primary">Yönetim Paneli</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-slate-500 mr-4">{user.email}</span>
              <form action={logout}>
                <button
                  type="submit"
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Çıkış Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Hoş Geldiniz</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sitenizin içeriklerini bu panel üzerinden yönetebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-slate-200 hover:border-secondary/50 transition-colors">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary/10 rounded-xl p-3">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Blog / Makaleler</h3>
                  <p className="text-sm text-slate-500">Yeni makale ekle veya düzenle</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
              <div className="text-sm">
                <Link href="/admin/dashboard/blog" className="font-medium text-secondary hover:text-primary transition-colors">
                  Yönetime Git &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-slate-200 hover:border-secondary/50 transition-colors">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary/10 rounded-xl p-3">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Uzmanlık Alanları</h3>
                  <p className="text-sm text-slate-500">Hizmetleri güncelle</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
              <div className="text-sm">
                <Link href="/admin/dashboard/services" className="font-medium text-secondary hover:text-primary transition-colors">
                  Yönetime Git &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-slate-200 hover:border-secondary/50 transition-colors">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary/10 rounded-xl p-3">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Hakkımda</h3>
                  <p className="text-sm text-slate-500">Özgeçmişi ve bilgileri güncelle</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
              <div className="text-sm">
                <Link href="/admin/dashboard/about" className="font-medium text-secondary hover:text-primary transition-colors">
                  Yönetime Git &rarr;
                </Link>
              </div>
            </div>
          </div>
          {/* Card 4 (Gallery) */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-slate-200 hover:border-secondary/50 transition-colors">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary/10 rounded-xl p-3">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Galeri Yönetimi</h3>
                  <p className="text-sm text-slate-500">Ameliyat ve vaka fotoğrafları</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
              <div className="text-sm">
                <Link href="/admin/dashboard/gallery" className="font-medium text-secondary hover:text-primary transition-colors">
                  Yönetime Git &rarr;
                </Link>
              </div>
            </div>
          </div>
          {/* Card 5 (Videos) */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-slate-200 hover:border-secondary/50 transition-colors">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary/10 rounded-xl p-3">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Video Yönetimi</h3>
                  <p className="text-sm text-slate-500">TV programları ve röportajlar</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
              <div className="text-sm">
                <Link href="/admin/dashboard/videos" className="font-medium text-secondary hover:text-primary transition-colors">
                  Yönetime Git &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
