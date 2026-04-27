import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Activity } from "lucide-react";
import { services, getIconComponent } from "@/data/services";
import { InstagramFeed } from "@/components/ui/InstagramFeed";
import { Testimonials } from "@/components/ui/Testimonials";
import { RecentPosts } from "@/components/ui/RecentPosts";
import { HomeGallery } from "@/components/ui/HomeGallery";
import { HomeVideos } from "@/components/ui/HomeVideos";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-accent to-white py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
                Ortopedi ve Travmatoloji Uzmanı
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-tight">
                Ağrısız, Dengeli, Bağımsız ve <br />
                <span className="text-secondary italic">Özgür Hareket İçin Ortopedik Yaklaşım</span>
              </h1>
              <p className="text-lg text-foreground/80 max-w-xl leading-relaxed">
              Diz ve kalça protezi, spor yaralanmaları ve Artrospik cerrahi, travma cerrahisi ve Omurga cerrahisi konularında spesifik, 30 yılı aşkın genel ortopedi tecrübesi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://www.acibadem.com.tr/doktor/necdet-saglam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                >
                  Randevu Al
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#hakkimda"
                  className="inline-flex items-center justify-center bg-white border-2 border-primary/10 hover:border-primary/30 text-primary px-8 py-4 rounded-full font-medium transition-all text-lg"
                >
                  Hakkımda
                </a>
              </div>
              
              <div className="pt-8 flex items-center gap-6 text-sm font-medium text-foreground/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>30+ Yıl Tecrübe</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>Omurga Cerrahisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>Diz ve Kalça Protez Cerrahisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>Boy Uzatma Cerrahisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>Kırık ve Kaynamama Cerrahisi</span>
                </div>
              </div>
            </div>
            
            <div className="relative lg:h-[600px] flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
              
              {/* Image placeholder - In a real app, replace with actual photo */}
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10"></div>
                <Image src="/images/doctor.png" alt="Prof. Dr. Necdet Sağlam" fill className="object-cover object-top" priority />
              </div>
              
              {/* Floating badge */}
              <div className="absolute bottom-10 -left-6 md:left-0 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Başarılı Operasyon</p>
                  <p className="text-xs text-foreground/60">Binlerce mutlu hasta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="uzmanliklar" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Uzmanlık Alanları</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
            <p className="text-foreground/70 text-lg">
              Modern tıbbın sunduğu en güncel teşhis ve tedavi yöntemleriyle, ortopedik rahatsızlıklarınıza kalıcı çözümler üretiyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link 
                key={service.id}
                href={`/uzmanliklar/${service.id}`}
                className="group bg-accent rounded-2xl p-8 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="bg-white text-secondary group-hover:text-primary group-hover:bg-white/90 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm transition-colors">
                  {getIconComponent(service.icon, "w-8 h-8")}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-white text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-foreground/70 group-hover:text-white/80 transition-colors leading-relaxed mb-6 flex-grow">
                  {service.shortDesc}
                </p>
                <div className="flex items-center text-secondary group-hover:text-white font-medium mt-auto">
                  Detaylı İncele
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/uzmanliklar"
              className="inline-flex items-center justify-center bg-white border-2 border-primary/10 hover:border-primary/30 text-primary px-8 py-4 rounded-full font-bold transition-all text-lg"
            >
              Tüm Uzmanlık Alanlarını Gör
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="hakkimda" className="py-20 bg-primary text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-white/10 relative z-10">
                <Image src="/images/doctor.png" alt="Prof. Dr. Necdet Sağlam Klinik" fill className="object-cover object-top" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-50 -z-10"></div>
            </div>
            
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Prof. Dr. Necdet Sağlam</h2>
              <h3 className="text-xl text-secondary font-medium">Ortopedi ve Travmatoloji Uzmanı</h3>
              
              <div className="w-20 h-1 bg-secondary rounded-full my-6"></div>
              
              <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                <p>
                  Yılların getirdiği akademik ve klinik tecrübe ile hastalarıma en güncel ve güvenilir tedavi yöntemlerini sunmayı amaçlıyorum.
                </p>
                <p>
                  Özellikle diz ve kalça protez cerrahisi, spor yaralanmaları ve artroskopik cerrahi alanlarında sayısız başarılı operasyona imza atmanın gururunu yaşıyorum.
                </p>
                <p>
                  Her hastanın hikayesi özeldir. Bu nedenle tedavi planlamamızı, hastamızın yaşam tarzına, beklentilerine ve genel sağlık durumuna en uygun şekilde, kişiye özel olarak yapıyoruz.
                </p>
              </div>
              
              <div className="pt-6">
                <Link href="/hakkimda" className="inline-flex items-center text-white font-medium hover:text-secondary transition-colors group">
                  Detaylı Özgeçmiş
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Güncel Paylaşımlar</h2>
              <p className="text-foreground/70 text-lg">
                Sağlıklı yaşam önerileri, vaka örnekleri ve klinikten kareler için Instagram'da bizi takip edin.
              </p>
            </div>
            <a 
              href="https://instagram.com/profdrnecdetsaglam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors mt-4 md:mt-0"
            >
              @profdrnecdetsaglam
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>

          {/* Feed Grid */}
          <InstagramFeed />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Recent Posts Section */}
      <RecentPosts />

      {/* Home Gallery Section */}
      <HomeGallery />

      {/* Home Videos Section */}
      <HomeVideos />
      
    </div>
  );
}
