import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "S. (Skolyoz Ameliyatı)",
    date: "12 Kasım 2017",
    comment: "Necdet hocayla tanışana kadar birçok hastane ve doktor dolaştım skolyoz ameliyatı için hiçbiri umursamadı bile neyseki necdet hocamla tanıştım ve 24/10 tarihinde ameliyat oldum ve yarın dikişlerin alınacak çok şükür eski ağrılarım bitti ve eski halime geri geldim NECDET SAĞLAM hoca on numara bir doktor ALLAH ondan binlerce kez razı olsun iyi ki tanımışım iyi ki benim doktorum olmuş size çok çok teşekkür ediyorum hocam.",
  },
  {
    id: 2,
    name: "Müşerref Sena K.",
    date: "12 Eylül 2017",
    comment: "7 Haziran 2017 tarihinde Necdet Hoca ve başarılı doktor arkadaşlarının sayesinde skolyoz ameliyatından başarıyla çıktım. Şimdi çok iyiyim. Eskiden çok ağrım vardı. Ama Necdet Hoca sayesinde artık hiçbir ağrım yok. Bu yüzden Necdet Hoca ve doktor arkadaşlarına çok teşekkür ediyorum.",
  },
  {
    id: 3,
    name: "Ay...n (Kalça Protezi)",
    date: "11 Ağustos 2017",
    comment: "Syn Necdet Sağlam ve değerli doktor arkadaşlarına yapmış oldukları başarılı amaliyattan dolayı çok teşekkür ederim (bende doğuştan kalça çıkıklığı vardı 3 hafta önce ameliyat oldum ve çok memnunum tekrardan çok teşekkür ederim Necdet bey harika bir doktor).",
  },
  {
    id: 4,
    name: "Recep R.",
    date: "1 Nisan 2017",
    comment: "Necdet bey alaninda uzmanligi yani sira insanlara yaklaşımi mükemmel derecede olduğunu gördüm. Iyi ki onun hastasıyım. Herkese gönül rahatlığıyla tavsiye ederim. Sagligima kavustum iyi ki varsınız Necdet Bey....",
  },
  {
    id: 5,
    name: "Suna Gülşen",
    date: "8 Mart 2017",
    comment: "Kırık el bileği ameliyatımda sağlığıma yeniden kavuşmamı sağlayan değerli insan Nejdet Sağlam hocama ve Sefa Giray Batınbay hocama sonsuz teşekkürler iyiki varsınız.",
  },
  {
    id: 6,
    name: "Süleyman Koçoğlu",
    date: "27 Mart 2016",
    comment: "Bende hocama iç dış menisküs ve ön çapraz bağ ameliyatı oldum gerçekten adam gibi adam Allah kendisinden razı olsun.",
  }
];

export function Testimonials() {
  return (
    <section id="yorumlar" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary mb-4">
            <Star className="w-4 h-4 mr-2 fill-secondary" />
            DoktorTakvimi.com Yorumları
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Hastalarımız Ne Diyor?</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-foreground/70 text-lg">
            Yıllardır sağlığına kavuşturduğumuz binlerce hastamızın değerli geri bildirimleri.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-accent rounded-2xl p-8 border border-primary/5 hover:border-secondary/30 transition-colors shadow-sm relative"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-8 text-primary/5">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>

              <div className="flex text-amber-400 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-foreground/80 leading-relaxed mb-6 relative z-10 text-sm md:text-base italic">
                "{review.comment}"
              </p>
              
              <div className="mt-auto border-t border-primary/10 pt-4 relative z-10">
                <p className="font-bold text-primary">{review.name}</p>
                <p className="text-xs text-foreground/50 mt-1">{review.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.doktortakvimi.com/necdet-saglam/ortopedi-ve-travmatoloji/umraniye" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white border-2 border-primary/10 hover:border-primary/30 text-primary px-8 py-4 rounded-full font-bold transition-all text-lg shadow-sm"
          >
            Tüm Yorumları DoktorTakvimi'nde Gör
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
