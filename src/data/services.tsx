import { Bone, Activity, Stethoscope, UserPlus, HeartPulse, ShieldPlus } from "lucide-react";

export const services = [
  {
    id: "diz-ve-kalca-protezi",
    title: "Diz ve Kalça Protezi",
    shortDesc: "Kireçlenme (artroz) nedeniyle yıpranmış eklemlerin modern protez cerrahisi ile yenilenmesi.",
    icon: "Bone",
    content: `
      <p>Diz ve kalça eklemlerinde yıllar içinde meydana gelen aşınma ve kireçlenme (osteoartrit), şiddetli ağrılara ve hareket kısıtlılığına neden olabilir. İlaç, fizik tedavi veya eklem içi enjeksiyonların yetersiz kaldığı durumlarda <strong>diz ve kalça protez cerrahisi</strong> en etkili ve kalıcı çözümdür.</p>
      
      <h3>Protez Cerrahisi Nedir?</h3>
      <p>Protez cerrahisi, hasar görmüş eklem yüzeylerinin çıkarılarak yerine vücutla uyumlu, özel alaşımlı metal ve polietilen (plastik) parçalardan oluşan yapay eklemlerin (protezlerin) yerleştirilmesi işlemidir.</p>
      
      <h3>Modern ve Robotik Cerrahi Yaklaşımları</h3>
      <p>Kliniğimizde en güncel cerrahi teknikler kullanılmaktadır. Bilgisayar destekli ve robotik cerrahi sistemleri sayesinde protezin yerleşimi milimetrik hassasiyetle hesaplanır. Bu durum:</p>
      <ul>
        <li>Protezin ömrünü uzatır,</li>
        <li>Ameliyat sonrası ağrıyı minimize eder,</li>
        <li>Hastanın günlük hayata dönüş sürecini hızlandırır.</li>
      </ul>

      <h3>Ameliyat Sonrası İyileşme Süreci</h3>
      <p>Hastalarımız genellikle ameliyatın ertesi günü destek yardımıyla yürütülmeye başlanır. Ortalama 3-4 günlük hastane yatışının ardından taburcu edilirler. Düzenli fizik tedavi ve egzersiz programı ile birkaç hafta içinde bağımsız ve ağrısız bir şekilde yürümek mümkün hale gelir.</p>
    `,
  },
  {
    id: "spor-yaralanmalari",
    title: "Spor Yaralanmaları",
    shortDesc: "Menisküs yırtıkları, çapraz bağ kopmaları ve kıkırdak hasarlarının kapalı (artroskopik) tedavisi.",
    icon: "Activity",
    content: `
      <p>Spor yaparken veya günlük fiziksel aktiviteler sırasında meydana gelen kas, tendon, bağ ve eklem yaralanmaları "Spor Yaralanmaları" olarak adlandırılır. Erken ve doğru teşhis, sporcunun veya aktif bireyin sahalara ve günlük hayatına sorunsuz dönebilmesi için kritik öneme sahiptir.</p>
      
      <h3>Sık Karşılaşılan Spor Yaralanmaları</h3>
      <ul>
        <li><strong>Ön Çapraz Bağ (ÖÇB) Yırtıkları:</strong> Dizdeki stabiliteyi sağlayan en önemli bağlardan biridir. Genellikle ani dönüş, durma veya sıçrama sonrası kopar.</li>
        <li><strong>Menisküs Yırtıkları:</strong> Dizdeki şok emici kıkırdak yastıkçıkların zedelenmesidir.</li>
        <li><strong>Kıkırdak Hasarları:</strong> Eklem yüzeyini kaplayan kıkırdağın darbe veya aşınma sonucu zedelenmesidir.</li>
        <li><strong>Kas ve Tendon Yırtıkları:</strong> Aşil tendonu kopması, hamstring yırtıkları vb.</li>
      </ul>

      <h3>Tedavi Yaklaşımlarımız</h3>
      <p>Spor yaralanmalarında önceliğimiz her zaman koruyucu (konservatif) tedavilerdir. İstirahat, buz uygulaması, fizik tedavi ve PRP/Kök Hücre gibi biyolojik enjeksiyon tedavileri ilk seçeneklerimizdir.</p>
      <p>Cerrahi müdahale gereken durumlarda ise <strong>Artroskopik (Kapalı) Cerrahi</strong> yöntemlerini tercih ediyoruz. Küçük kesilerden kamera ile girilerek yapılan bu ameliyatlar sayesinde doku hasarı en aza indirilir, iyileşme süreci çok daha hızlı ve ağrısız olur.</p>
    `,
  },
  {
    id: "artroskopik-cerrahi",
    title: "Artroskopik Cerrahi",
    shortDesc: "Eklem içi sorunların kamera yardımıyla, küçük kesilerden girilerek teşhis ve tedavi edilmesi.",
    icon: "Stethoscope",
    content: `
      <p>Artroskopi, "eklemin içine bakmak" anlamına gelir. Kalem ucu kalınlığında bir kamera (artroskop) ve özel cerrahi aletler kullanılarak, eklem içinin monitörden detaylı bir şekilde incelenmesi ve aynı anda tedavi edilmesini sağlayan modern bir cerrahi yöntemdir.</p>
      
      <h3>Artroskopinin Avantajları Nelerdir?</h3>
      <p>Geleneksel açık ameliyatlara kıyasla artroskopik cerrahinin sunduğu başlıca avantajlar şunlardır:</p>
      <ul>
        <li><strong>Daha Küçük Kesiler:</strong> Genellikle 1 cm'den küçük, birkaç delik açılarak işlem yapılır. Estetik açıdan iz kalma riski çok düşüktür.</li>
        <li><strong>Daha Az Ağrı:</strong> Kas ve çevre dokular kesilmediği için ameliyat sonrası ağrı minimum düzeydedir.</li>
        <li><strong>Hızlı İyileşme:</strong> Hastalar genellikle aynı gün veya ertesi gün taburcu edilir. Günlük yaşama ve spora dönüş çok daha hızlıdır.</li>
        <li><strong>Düşük Enfeksiyon Riski:</strong> Eklem dış ortama açılmadığı için enfeksiyon riski açık ameliyatlara göre çok daha azdır.</li>
      </ul>

      <h3>Hangi Eklemlere Uygulanır?</h3>
      <p>En sık <strong>Diz</strong> (menisküs, çapraz bağ, kıkırdak) ve <strong>Omuz</strong> (kas yırtıkları, tekrarlayan çıkıklar) eklemlerine uygulanmakla birlikte; ayak bileği, kalça, dirsek ve el bileği eklemlerindeki problemlerin tedavisinde de başarıyla kullanılmaktadır.</p>
    `,
  },
  {
    id: "travma-cerrahisi",
    title: "Travma Cerrahisi",
    shortDesc: "Kırık, çıkık ve yumuşak doku yaralanmalarının acil ve planlı cerrahi müdahaleleri.",
    icon: "ShieldPlus",
    content: `
      <p>Ortopedik travma cerrahisi; trafik kazaları, düşmeler, iş kazaları veya spor müsabakaları sonucunda meydana gelen kemik kırıkları, eklem çıkıkları ve ciddi yumuşak doku (kas, tendon, bağ) yaralanmalarının tanı ve tedavisini kapsar.</p>
      
      <h3>Travma Cerrahisinin Amacı</h3>
      <p>Travma cerrahisinde temel hedef; kırılan veya hasar gören bölgenin anatomik yapısını en doğru şekilde eski haline getirmek ve hastanın fonksiyonlarını en kısa sürede geri kazanmasını sağlamaktır.</p>
      
      <h3>Tedavi Edilen Başlıca Durumlar</h3>
      <ul>
        <li>Kol ve bacaklardaki basit veya parçalı kemik kırıkları</li>
        <li>Eklem içi kırıklar (Diz, omuz, ayak bileği vb.)</li>
        <li>Eklem çıkıkları</li>
        <li>Pelvis (leğen kemiği) ve asetabulum kırıkları</li>
        <li>Kaynamayan veya yanlış kaynayan kırıkların düzeltilmesi (Revizyon cerrahisi)</li>
      </ul>

      <h3>Modern Tespit Yöntemleri</h3>
      <p>Kırık tedavisinde alçı ve atel gibi koruyucu yöntemlerin yanı sıra, gerekli durumlarda cerrahi müdahale ile titanyum plak, vida veya kemik içi çiviler (intramedüller çivi) kullanılarak kırık hattı sabitlenir. Kliniğimizde, hastanın en kısa sürede ayağa kalkıp hareket edebilmesini sağlayan modern ve biyolojik tespit yöntemleri uygulanmaktadır.</p>
    `,
  },
  {
    id: "omuz-ve-dirsek",
    title: "Omuz ve Dirsek Cerrahisi",
    shortDesc: "Omuz çıkıkları, kas yırtıkları ve dirsek çevresi rahatsızlıklarının modern tedavisi.",
    icon: "HeartPulse",
    content: `
      <p>Omuz ve dirsek eklemleri, kollarımızı üç boyutlu uzayda serbestçe kullanabilmemizi sağlayan karmaşık ve hareket açıklığı en yüksek eklemlerdir. Bu hareketliliğin bir bedeli olarak, yaralanmalara ve aşınmalara oldukça açıktırlar.</p>
      
      <h3>Omuz Rahatsızlıkları ve Tedavileri</h3>
      <ul>
        <li><strong>Rotator Manşet (Kas) Yırtıkları:</strong> Omuzu hareket ettiren kasların yırtılmasıdır. Genellikle kapalı (artroskopik) cerrahi ile dikilerek onarılır.</li>
        <li><strong>Tekrarlayan Omuz Çıkıkları:</strong> Omuz ekleminin yuvasından çıkması ve bağların yırtılması durumudur. Artroskopik stabilizasyon ameliyatları ile tedavi edilir.</li>
        <li><strong>Omuz Sıkışma Sendromu (İmpingement):</strong> Kolu havaya kaldırırken hissedilen ağrıdır.</li>
        <li><strong>Donuk Omuz:</strong> Omuz eklem kapsülünün kalınlaşarak hareketleri kısıtlamasıdır.</li>
        <li><strong>Omuz Kireçlenmesi (Artroz):</strong> İleri evrelerde omuz protezi ameliyatları ile tedavi edilir.</li>
      </ul>

      <h3>Dirsek Rahatsızlıkları</h3>
      <p>Tenisçi dirseği (lateral epikondilit), golfçü dirseği, dirsek çevresi kırıkları, sinir sıkışmaları (kübital tünel sendromu) ve dirsek kireçlenmeleri kliniğimizde başarıyla tedavi edilmektedir.</p>
    `,
  },
  {
    id: "ayak-ve-ayak-bilegi",
    title: "Ayak ve Ayak Bileği Cerrahisi",
    shortDesc: "Halluks valgus, topuk dikeni ve ayak bileği bağ yaralanmalarının tedavisi.",
    icon: "UserPlus",
    content: `
      <p>Ayak ve ayak bileği, tüm vücut ağırlığımızı taşıyan ve yürüme biyomekaniğinin temelini oluşturan yapılardır. Bu bölgedeki ağrılar ve deformiteler, kişinin günlük yaşam kalitesini doğrudan ve ciddi şekilde etkiler.</p>
      
      <h3>Sık Görülen Ayak ve Ayak Bileği Sorunları</h3>
      <ul>
        <li><strong>Halluks Valgus (Başparmak Çıkıntısı):</strong> Ayak başparmağının dışa doğru eğilmesi ve kemik çıkıntısı oluşmasıdır. Özel cerrahi tekniklerle düzeltilerek estetik ve ağrısız bir ayak elde edilir.</li>
        <li><strong>Aşil Tendonu Sorunları:</strong> Aşil tendonu iltihapları (tendinit) veya kopmaları. Kopma durumlarında cerrahi onarım uygulanır.</li>
        <li><strong>Ayak Bileği Bağ Yaralanmaları:</strong> Tekrarlayan ayak bileği burkulmaları sonucu oluşan kronik instabilite (gevşeklik) durumlarında bağ onarımı ameliyatları yapılır.</li>
        <li><strong>Topuk Dikeni ve Plantar Fasiit:</strong> Genellikle fizik tedavi, özel tabanlıklar ve enjeksiyonlarla (PRP, ESWT) tedavi edilir.</li>
        <li><strong>Ayak Bileği Kireçlenmesi:</strong> İleri evrelerde ayak bileği dondurma (artrodez) veya ayak bileği protezi ameliyatları uygulanır.</li>
      </ul>

      <p>Kliniğimizde ayak ve ayak bileği sorunlarına yönelik detaylı biyomekanik değerlendirmeler yapılarak, hastaya en uygun kişiselleştirilmiş tedavi planı (cerrahi veya cerrahi dışı) oluşturulmaktadır.</p>
    `,
  },
  {
    id: "omurga-cerrahisi",
    title: "Omurga Cerrahisi",
    shortDesc: "Bel ve boyun fıtıkları, skolyoz, kifoz ve omurga kırıklarının modern yöntemlerle tedavisi.",
    icon: "Bone",
    content: `
      <p>Omurga cerrahisi, bel ve boyun fıtıkları, omurga eğrilikleri (skolyoz ve kifoz), omurga kanal darlığı (spinal stenoz) ve omurga kırıklarının teşhis ve tedavisini kapsayan özel bir alandır.</p>
      
      <h3>Sık Karşılaşılan Omurga Sorunları</h3>
      <ul>
        <li><strong>Skolyoz ve Kifoz:</strong> Özellikle büyüme çağındaki çocuklarda görülen omurga eğrilikleri ve kamburluk.</li>
        <li><strong>Bel ve Boyun Fıtıkları:</strong> Omurları yastıklayan disklerin taşarak sinirlere baskı yapması.</li>
        <li><strong>Spinal Stenoz (Kanal Darlığı):</strong> Omurilik kanalının daralarak sinirleri sıkıştırması, yürüme zorluğu yapması.</li>
        <li><strong>Omurga Kırıkları:</strong> Travma veya osteoporoz (kemik erimesi) kaynaklı kırıklar.</li>
      </ul>
      
      <p>Kliniğimizde modern görüntüleme sistemleri ve nöromonitörizasyon eşliğinde en güvenli omurga cerrahisi uygulamaları gerçekleştirilmektedir.</p>
    `,
  },
  {
    id: "tumor-cerrahisi",
    title: "Tümör Cerrahisi",
    shortDesc: "İyi ve kötü huylu kemik ve yumuşak doku tümörlerinin teşhis ve cerrahi tedavisi.",
    icon: "Activity",
    content: `
      <p>Ortopedik onkoloji (Tümör Cerrahisi), kemiklerde, eklemlerde ve yumuşak dokularda (kas, yağ, bağ dokusu) oluşan iyi veya kötü huylu kitlelerin tedavisini kapsar.</p>
      
      <h3>Tümör Cerrahisi Yaklaşımı</h3>
      <p>Kemik ve yumuşak doku tümörlerinin tedavisi ekip işidir. Onkoloji, radyoloji ve patoloji uzmanlarıyla kurulan konseylerde her hastanın durumu detaylıca değerlendirilir. Amacımız; hastalıklı dokuyu tamamen temizlerken, uzvun (kol veya bacak) fonksiyonlarını maksimum düzeyde korumaktır.</p>
      
      <p>İleri evre vakalarda veya büyük kemik kayıplarında, kişiye özel üretilen <strong>tümör protezleri</strong> veya kemik nakilleri (greft) kullanılarak uzuv kurtarıcı cerrahiler başarıyla uygulanmaktadır.</p>
    `,
  },
  {
    id: "kemik-ve-eklem-enfeksiyonlari",
    title: "Kemik ve Eklem Enfeksiyonları",
    shortDesc: "Kemik iltihabı (osteomiyelit) ve protez enfeksiyonlarının çok disiplinli tedavisi.",
    icon: "ShieldPlus",
    content: `
      <p>Kemik (osteomiyelit) ve eklem (septik artrit) enfeksiyonları, tedavi edilmediğinde kalıcı hasarlara ve uzuv kayıplarına yol açabilen ciddi rahatsızlıklardır.</p>
      
      <h3>Enfeksiyon Tedavisinde Yaklaşımımız</h3>
      <p>Bu rahatsızlıkların tedavisi, güçlü antibiyotik protokolleri ve ardışık cerrahi müdahaleler gerektirebilir. Enfeksiyon cerrahisinde ölü (nekrotik) dokular tamamen temizlenir ve enfeksiyonun türüne göre lokal antibiyotik salgılayan özel malzemeler (çimentolar) bölgeye yerleştirilir.</p>
      
      <p>Daha önceden uygulanmış ancak <strong>enfekte olmuş protezlerin</strong> revizyon cerrahisi de (eski protezin çıkarılıp enfeksiyon temizlendikten sonra yeni protezin takılması) özel uzmanlık gerektiren ve kliniğimizde başarıyla uygulanan bir tedavi yöntemidir.</p>
    `,
  },
  {
    id: "pediatrik-ortopedi",
    title: "Pediatrik Ortopedi",
    shortDesc: "Çocukluk çağı kırıkları, doğuştan kalça çıkığı ve çarpık ayak (PEV) tedavisi.",
    icon: "UserPlus",
    content: `
      <p>Pediatrik (çocuk) ortopedisi; bebeklikten ergenlik döneminin sonuna kadar kas-iskelet sisteminde görülen hastalıkların tanı ve tedavisiyle ilgilenir. Çocukların kemikleri sürekli büyüme ve gelişim halinde olduğu için yetişkinlerden çok farklı bir tedavi yaklaşımı gerektirir.</p>
      
      <h3>Başlıca Tedavi Alanlarımız</h3>
      <ul>
        <li><strong>Gelişimsel Kalça Displazisi (Doğuştan Kalça Çıkığı):</strong> Erken teşhisle ameliyatsız tedavi edilebilir.</li>
        <li><strong>Pes Ekinovarus (Çarpık Ayak):</strong> Özel alçılama teknikleri (Ponseti yöntemi) ile düzeltilmesi.</li>
        <li><strong>Çocukluk Çağı Kırıkları:</strong> Büyüme kıkırdaklarına zarar vermeden tedavi planlanması.</li>
        <li><strong>Serebral Palsi (CP):</strong> Kasılmaları azaltıcı cerrahi müdahaleler ve botoks uygulamaları.</li>
      </ul>
    `,
  },
  {
    id: "deformite-cerrahisi",
    title: "Deformite Cerrahisi",
    shortDesc: "Doğuştan veya sonradan oluşan kemik eğriliklerinin düzeltilmesi ve ilizarov cerrahisi.",
    icon: "Activity",
    content: `
      <p>Deformite, kemik veya eklemlerdeki anormal şekil bozukluklarıdır. Doğuştan gelen genetik hastalıklar, eski kırıkların yanlış kaynaması veya kemik enfeksiyonları sonucu oluşabilir.</p>
      
      <h3>İlizarov ve Eksternal Fiksatörler</h3>
      <p>Özellikle ciddi eğriliklerin ve kemik kayıplarının tedavisinde "İlizarov" yöntemi (dışarıdan takılan çember şeklindeki cihazlar) veya bilgisayar destekli modern eksternal fiksatörler kullanılmaktadır. Bu sayede eğri kemikler kırılarak gün gün, milimetrik olarak düzeltilmekte ve doğru pozisyonda kaynaması sağlanmaktadır.</p>
    `,
  },
  {
    id: "kemik-ve-boy-uzatma-cerrahisi",
    title: "Kemik ve Boy Uzatma Cerrahisi",
    shortDesc: "Kemik kısalıkları ve eşitsizliklerinin modern yöntemlerle (manyetik çivi vb.) uzatılması.",
    icon: "HeartPulse",
    content: `
      <p>İki bacak arasındaki boy eşitsizliği (kısalık) durumları, hem kozmetik problemlere hem de ilerleyen yıllarda omurga eğriliklerine ve eklem kireçlenmelerine yol açar. Kemik uzatma cerrahisi ile bu fark tamamen ortadan kaldırılabilmektedir.</p>
      
      <h3>Modern Uzatma Yöntemleri</h3>
      <p>Eskiden sadece dışarıdan takılan demir cihazlarla yapılan uzatma işlemleri, günümüzde teknolojinin gelişmesiyle <strong>manyetik uzayabilen kemik içi çiviler</strong> ile dışarıdan hiçbir cihaz görünmeden, ağrısız ve çok daha konforlu bir şekilde yapılabilmektedir.</p>
      <p>Kliniğimizde hem tıbbi gereklilik (eşitsizlik) durumlarında hem de uygun vakalarda boy uzatma operasyonları başarıyla uygulanmaktadır.</p>
    `,
  }
];

export const getIconComponent = (iconName: string, className?: string) => {
  switch (iconName) {
    case "Bone": return <Bone className={className} />;
    case "Activity": return <Activity className={className} />;
    case "Stethoscope": return <Stethoscope className={className} />;
    case "ShieldPlus": return <ShieldPlus className={className} />;
    case "HeartPulse": return <HeartPulse className={className} />;
    case "UserPlus": return <UserPlus className={className} />;
    default: return <Activity className={className} />;
  }
};
