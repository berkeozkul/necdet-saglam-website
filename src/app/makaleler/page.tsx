import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

export const metadata = {
  title: "Makaleler | Prof. Dr. Necdet Sağlam",
  description: "Ortopedi ve travmatoloji hakkında güncel makaleler, tedavi yöntemleri ve sağlık rehberi.",
};

export default async function BlogPage() {
  const supabase = await createClient()
  
  // Sadece yayında olan makaleleri getir
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Makaleler</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ortopedi ve travmatoloji alanındaki en güncel gelişmeler, tedavi yöntemleri ve sağlıklı yaşam rehberi.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Henüz Makale Bulunmuyor</h2>
              <p className="text-foreground/60">Çok yakında yeni yazılarımızla karşınızda olacağız.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/makaleler/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-primary/5 hover:border-secondary/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] relative bg-slate-100 overflow-hidden">
                    <img 
                      src={post.image_url || "/images/default-post.png"} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-foreground/50 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    
                    <h2 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-secondary font-medium text-sm mt-auto group-hover:text-primary transition-colors">
                      Devamını Oku
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
