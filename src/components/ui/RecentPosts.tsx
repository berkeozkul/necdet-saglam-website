import { createClient } from '@/utils/supabase/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, Calendar } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

export async function RecentPosts() {
  const supabase = await createClient();
  const t = await getTranslations('Home');
  const c = await getTranslations('Common');
  const locale = await getLocale();
  
  // Sadece yayında olan ve en son eklenen 3 makaleyi getir
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('is_pinned', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(3);

  if (!posts || posts.length === 0) {
    return null; // Eğer hiç makale yoksa bu bölümü anasayfada gösterme
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">{t('latestArticles')}</h2>
            <div className="w-24 h-1 bg-secondary mb-6 rounded-full"></div>
            <p className="text-foreground/70 text-lg">
              {t('latestArticlesDesc')}
            </p>
          </div>
          <Link 
            href="/makaleler"
            className="inline-flex items-center text-secondary font-bold hover:text-primary transition-colors mt-4 md:mt-0 group"
          >
            {t('viewAllArticles')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/makaleler/${locale === 'en' && post.slug_en ? post.slug_en : post.slug}` as any}
              className="group bg-white rounded-2xl overflow-hidden border border-primary/5 hover:border-secondary/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative bg-slate-100 overflow-hidden">
                <img 
                  src={post.image_url || "/images/default-post.png"} 
                  alt={locale === 'en' && post.title_en ? post.title_en : post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-foreground/50 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(post.created_at).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}
                  </div>
                </div>
                
                <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                  {locale === 'en' && post.title_en ? post.title_en : post.title}
                </h3>
                
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {locale === 'en' && post.excerpt_en ? post.excerpt_en : post.excerpt}
                </p>
                
                <div className="flex items-center text-secondary font-medium text-sm mt-auto group-hover:text-primary transition-colors">
                  {t('readArticle')}
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
