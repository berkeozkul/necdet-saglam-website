import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single()

  if (!post) {
    return { title: "Makale Bulunamadı" }
  }

  return {
    title: `${post.title} | Prof. Dr. Necdet Sağlam`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post || !post.is_published) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Article Header */}
      <section className="bg-primary pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <Link href="/makaleler" className="inline-flex items-center text-secondary hover:text-white font-medium transition-colors mb-8 group text-sm">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Tüm Makalelere Dön
          </Link>
          
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center text-sm text-white/60 space-x-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.created_at).toLocaleDateString('tr-TR')}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Prof. Dr. Necdet Sağlam
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl border border-primary/5 p-8 md:p-12">
            
            {/* Featured Image */}
            <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-10 bg-slate-100">
              <img 
                src={post.image_url || "/images/default-post.png"} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Excerpt */}
            <div className="text-xl text-primary font-medium leading-relaxed mb-10 pb-10 border-b border-slate-100">
              {post.excerpt}
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-heading prose-headings:text-primary prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-li:my-2 prose-ul:list-disc prose-ul:pl-5 prose-strong:text-primary prose-a:text-secondary hover:prose-a:text-primary prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Footer */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center bg-accent p-6 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shrink-0 mr-4">
                NS
              </div>
              <div>
                <h4 className="font-bold text-primary text-lg">Prof. Dr. Necdet Sağlam</h4>
                <p className="text-sm text-foreground/70">Ortopedi ve Travmatoloji Uzmanı</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
