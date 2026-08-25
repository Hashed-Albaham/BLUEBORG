/**
 * تصميم هذا الملف: «أفق البنية التحتية» — حداثة مؤسسية كحلية/حجرية
 * تستخدم المسارات الدقيقة والكتل التحريرية لإبراز الثقة والترابط التشغيلي.
 */
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Building2,
  Check,
  ChevronLeft,
  Cpu,
  Droplets,
  HardHat,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  RadioTower,
  Route,
  ShieldCheck,
  Sprout,
  X,
  Zap,
} from "lucide-react";

type SiteImages = typeof import("@/lib/siteImages").siteImages;

const services = [
  {
    number: "01",
    icon: Route,
    title: "الطرق والأعمال المدنية",
    description:
      "ننفذ البنية المدنية التي ترسم حركة المكان، من أعمال الطرق والشوارع والأرصفة إلى تهيئة المواقع والأساسات والأعمال المكملة للمشروع.",
    activities: ["إنشاء وصيانة الطرق", "تهيئة المواقع والأساسات", "الأرصفة ومسارات الحركة"],
    imageKey: "roadsCivil",
  },
  {
    number: "02",
    icon: Droplets,
    title: "شبكات المياه والري",
    description:
      "نطاق متكامل لشبكات نقل وتوزيع المياه، ومحطاتها وخطوطها الرئيسية، إضافة إلى قنوات الري وآبار التخزين وأعمال الصيانة المرتبطة بها.",
    activities: ["خطوط المياه الرئيسية", "محطات وشبكات التوزيع", "قنوات الري والتخزين"],
    imageKey: "waterNetworks",
  },
  {
    number: "03",
    icon: Network,
    title: "الصرف الصحي والمرافق",
    description:
      "نخدم مشاريع الصرف الصحي والمضخات وشبكات المجاري ضمن منظور تشغيلي يربط الإنشاء بالصيانة واستمرارية الخدمة.",
    activities: ["محطات الصرف الصحي", "الشبكات والمضخات", "تمديدات مرافق متعددة"],
    imageKey: "wastewater",
  },
  {
    number: "04",
    icon: Zap,
    title: "الطاقة والاتصالات",
    description:
      "خدمات للبنية الكهربائية والاتصالية تشمل المحطات والمحولات والأبراج والتمديدات، مع ربط منضبط بين أنظمة الطاقة والتواصل.",
    activities: ["محطات ومحولات كهربائية", "أبراج الاتصالات والرادار", "الأسلاك وأنظمة الإضاءة"],
    imageKey: "energyConnectivity",
  },
  {
    number: "05",
    icon: Building2,
    title: "الإنشاءات وتجهيز المواقع",
    description:
      "ننفذ الأعمال الإنشائية المساندة من الحفر والتسوية وسحب المياه الجوفية إلى القواعد والأساسات والسقالات، ضمن جاهزية ميدانية منظمة.",
    activities: ["الحفر والتسوية", "تجفيف المواقع", "القواعد والأساسات"],
    imageKey: "sitePreparation",
  },
  {
    number: "06",
    icon: Sprout,
    title: "المرافق وصيانة المواقع",
    description:
      "امتداد خدمي يعتني بمرحلة ما بعد التنفيذ؛ من صيانة المساحات العامة والطرق إلى خدمات التنظيف المتخصص والعناية بالمواقع.",
    activities: ["صيانة الحدائق والمواقع", "تنظيف الطرق والمباني", "تسليم جاهز للاستخدام"],
    imageKey: "facilitiesLandscape",
  },
  {
    number: "07",
    icon: Cpu,
    title: "الحلول التقنية المتكاملة",
    description:
      "نضيف بعدًا تقنيًا لمنظومات العمل من خلال تكامل الأنظمة والحلول الرقمية المتقدمة والتطبيقات والتقنيات الناشئة ذات الصلة.",
    activities: ["تكامل الأنظمة", "الحلول الرقمية", "تقنيات متقدمة"],
    imageKey: "digitalSolutions",
  },
] as const;

const stages = [
  ["01", "تحديد النطاق", "نفهم احتياج المشروع ونرسم مسار العمل بوضوح."],
  ["02", "تجهيز الموقع", "نؤسس الجاهزية الميدانية بترتيب وانضباط."],
  ["03", "تنفيذ مترابط", "ننسق بين الأعمال المدنية وشبكات الخدمات."],
  ["04", "تسليم واستمرارية", "نُهيئ النتيجة للتشغيل والصيانة عند الحاجة."],
] as const;

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand-mark" href="#top" aria-label="شركة البرج الأزرق المتحدة">
      <svg className="brand-symbol" viewBox="0 0 48 48" role="img" aria-label="رمز البرج الأزرق المتحدة">
        <path d="M9 39.5V8.5h11.5v21.3l6-7.1 5.6 6.1V8.5H39v31" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="miter" />
        <path d="M6.5 39.5h35M15.4 14.2h.1M34 14.2h.1M26.3 22.6v16.9" fill="none" stroke="#B87936" strokeWidth="2.2" strokeLinecap="square" />
      </svg>
      <span className="brand-connector" aria-hidden="true" />
      {!compact && (
        <span className="brand-name">
          <strong>البرج الأزرق</strong>
          <small>المتحدة للبنية التحتية والإنشاءات</small>
        </span>
      )}
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [images, setImages] = useState<SiteImages | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      import("@/lib/siteImages").then(({ siteImages }) => setImages(siteImages));
    }, 280);
    return () => window.clearTimeout(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top" className="site-shell" dir="rtl">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            <a href="#about">عن الشركة</a>
            <a href="#services">مجالات العمل</a>
            <a href="#method">منهجية التنفيذ</a>
            <a href="#contact">تواصل معنا</a>
          </nav>
          <a className="header-cta" href="#contact">
            <span>اطلب تواصلاً</span>
            <ArrowUpLeft size={16} strokeWidth={2.25} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={23} />}
          </button>
        </div>
        <div className={`mobile-panel ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label="التنقل على الجوال">
            <a href="#about" onClick={closeMenu}>عن الشركة</a>
            <a href="#services" onClick={closeMenu}>مجالات العمل</a>
            <a href="#method" onClick={closeMenu}>منهجية التنفيذ</a>
            <a href="#contact" onClick={closeMenu}>تواصل معنا</a>
          </nav>
        </div>
      </header>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-gridline hero-gridline-a" />
        <div className="hero-gridline hero-gridline-b" />
        <div className="hero-content">
          <div className="eyebrow light-eyebrow"><span /> البنية التحتية والإنشاءات المتكاملة</div>
          <h1 id="hero-title">نصنعُ البنية التي <em>تمضي</em> بها المدن.</h1>
          <p>
            شركة البرج الأزرق المتحدة تجمع خبرات الإنشاءات والمرافق والطاقة والاتصالات ضمن منظومة تنفيذ مترابطة، من تهيئة الموقع حتى جاهزية التشغيل.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#services">
              استكشف مجالات العمل <ArrowLeft size={18} />
            </a>
            <a className="text-link light-link" href="#about">
              تعرّف على الشركة <ChevronLeft size={17} />
            </a>
          </div>
          <div className="hero-tags" aria-label="تخصصات الشركة">
            <span>أعمال مدنية</span><span>شبكات ومرافق</span><span>حلول متكاملة</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          {images && <img src={images.hero} alt="" decoding="async" />}
          <div className="hero-schematic">
            <span className="schematic-arc arc-one" />
            <span className="schematic-arc arc-two" />
            <span className="schematic-arc arc-three" />
            <span className="schematic-route route-one" />
            <span className="schematic-route route-two" />
            <span className="schematic-node node-one" />
            <span className="schematic-node node-two" />
            <span className="schematic-node node-three" />
            <span className="schematic-label label-one">01 / المدنية</span>
            <span className="schematic-label label-two">02 / المرافق</span>
            <span className="schematic-label label-three">03 / الجاهزية</span>
          </div>
          <div className="hero-visual-overlay" />
          <div className="survey-card">
            <span className="survey-dot" />
            <div><b>نطاق متصل</b><small>تنفيذ يربط التخصصات</small></div>
          </div>
        </div>
        <div className="hero-footnote">الرياض · المملكة العربية السعودية</div>
      </section>

      <section className="signal-bar" aria-label="مؤشرات الشركة">
        <div><span className="signal-index">A</span><p>حلول متصلة<br /><b>للمشاريع والمرافق</b></p></div>
        <div><span className="signal-index">B</span><p>نطاقات عمل<br /><b>مدنية وتقنية متكاملة</b></p></div>
        <div><span className="signal-index">C</span><p>مقر العمليات<br /><b>الرياض، المملكة العربية السعودية</b></p></div>
      </section>

      <section id="about" className="about-section section-wrap">
        <div className="section-kicker"><span>01</span> تعريف بالشركة</div>
        <div className="about-layout">
          <div className="about-title">
            <div className="eyebrow"><span /> من رؤية ميدانية إلى منظومة عمل</div>
            <h2>شريك تنفيذ يرى المشروع <em>كصورة مكتملة.</em></h2>
          </div>
          <div className="about-copy">
            <p>
              تعمل <strong>شركة البرج الأزرق المتحدة</strong> في قطاعات الإنشاءات والبنية التحتية والخدمات المساندة والحلول التقنية. ويقوم نهجها على جمع المسارات المتخصصة في إطار تنفيذي واحد، بحيث تتكامل الأعمال المدنية مع شبكات المياه والطاقة والاتصالات وتجهيز المواقع.
            </p>
            <p>
              صُمم هذا الموقع ليقدم صورة واضحة عن نطاقات العمل، مع لغة عملية تسهّل على أصحاب المشاريع تحديد مجال الخدمة المناسب وبدء التواصل مباشرة.
            </p>
            <a className="text-link" href="#contact">ابدأ من نطاق مشروعك <ChevronLeft size={17} /></a>
          </div>
        </div>
        <div className="principles-grid">
          <article><ShieldCheck size={22} /><h3>وضوح تنفيذي</h3><p>نرتب نطاق العمل من البداية لتكون خطوات المشروع مفهومة ومتصلة.</p></article>
          <article><Network size={22} /><h3>تكامل تخصصي</h3><p>نقرّب المسافة بين الأعمال المدنية وشبكات الخدمات ضمن مسار واحد.</p></article>
          <article><HardHat size={22} /><h3>جاهزية ميدانية</h3><p>نبدأ من واقع الموقع ومتطلباته، ونوجّه الجهد نحو نتيجة قابلة للتشغيل.</p></article>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="services-intro section-wrap">
          <div className="section-kicker on-dark"><span>02</span> مجالات العمل</div>
          <div className="services-heading"><h2>سبعة مسارات.<br /><em>منظومة تشغيلية واحدة.</em></h2><p>ننظّم نطاقات العمل في مسارات تنفيذ واضحة، لتقود احتياج المشروع إلى الفريق والخبرة المرتبطين به دون تعقيد.</p></div>
        </div>
        <div className="service-rail" role="list">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.number} role="listitem">
                <div className="service-image-wrap">{images ? <img src={images[service.imageKey]} alt="" loading="lazy" decoding="async" /> : <div className="service-image-placeholder" />}<div className="image-wash" /><span className="service-number"><small>مسار</small>{service.number}</span></div>
                <div className="service-body">
                  <div className="service-icon"><Icon size={21} strokeWidth={1.8} /></div>
                  <div className="service-route-meta"><span>نطاق تنفيذ مترابط</span><i /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="activity-list" aria-label={`مجالات ${service.title}`}>
                    {service.activities.map((activity) => <span key={activity}><Check size={13} />{activity}</span>)}
                  </div>
                  <a className="service-link" href="#contact">ناقش نطاق التنفيذ <ArrowLeft size={16} /></a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="method" className="method-section section-wrap">
        <div className="method-lead">
          <div className="section-kicker"><span>03</span> طريقة العمل</div>
          <h2>مسار عملٍ يضع <em>الترابط</em> في المقدمة.</h2>
          <p>في المشاريع المتداخلة، تبدأ الجودة من فهم العلاقة بين عناصر المشروع. لهذا يتدرج العمل بصورة منظمة من النطاق إلى الجاهزية.</p>
        </div>
        <div className="stages" role="list">
          {stages.map(([number, title, copy]) => <article key={number} role="listitem"><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
        <div className="method-image">{images ? <img src={images.constructionCivil} alt="مشهد إنشائي يعبر عن الأعمال المدنية" loading="lazy" decoding="async" /> : <div className="method-image-placeholder" />}<div><span>منهجية مترابطة</span><b>كل مرحلة تمهّد لما بعدها.</b></div></div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-mapline" />
        <div className="contact-inner section-wrap">
          <div>
            <div className="eyebrow light-eyebrow"><span /> لنبدأ من احتياجك</div>
            <h2>لنضع مشروعك على<br /><em>مسارٍ جاهز.</em></h2>
            <p>شاركنا نطاق مشروعك، وسنتواصل معك لبدء النقاش من المجال الأكثر صلة باحتياجك.</p>
          </div>
          <div className="contact-card">
            <a href="tel:+966555199797"><span><Phone size={18} /></span><div><small>اتصال مباشر</small><b dir="ltr">+966 55 519 9797</b></div><ArrowUpLeft size={17} /></a>
            <a href="mailto:info@btuc.com.sa"><span><Mail size={18} /></span><div><small>البريد الإلكتروني</small><b>info@btuc.com.sa</b></div><ArrowUpLeft size={17} /></a>
            <a href="https://btuc.com.sa" target="_blank" rel="noreferrer"><span><MapPin size={18} /></span><div><small>الموقع الإلكتروني</small><b>btuc.com.sa</b></div><ArrowUpLeft size={17} /></a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main"><BrandMark /><p>شركة البرج الأزرق المتحدة<br />الرياض، المملكة العربية السعودية</p><a href="#top">العودة إلى الأعلى <ChevronLeft size={16} /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} شركة البرج الأزرق المتحدة</span><span>إنشاءات · بنية تحتية · حلول متكاملة</span></div>
      </footer>
    </main>
  );
}
