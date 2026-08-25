import { ArrowLeft, Building2, CheckCircle2, ChevronLeft, CircleHelp, ClipboardList, Contact, Layers3, LayoutGrid, MapPin } from "lucide-react";
import { useRoute } from "wouter";
import { blockLabels, loadCmsData, type Block } from "@/lib/cmsStore";
import { brandAssets } from "@/lib/brandAssets";
import "../cmsClient.css";

const icons = { hero: Building2, richText: ClipboardList, image: LayoutGrid, serviceGrid: Layers3, callout: Contact, featureList: CheckCircle2, process: ChevronLeft, projectGrid: LayoutGrid, faq: CircleHelp, contactPanel: MapPin };

function BlockRenderer({ block, index }: { block: Block; index: number }) {
  const Icon = icons[block.type];
  if (block.type === "hero") return <section className="client-hero"><span>البرج الأزرق المتحدة</span><h1>{block.title}</h1><p>{block.description}</p><a href="#client-content">استكشف المحتوى <ArrowLeft size={16} /></a></section>;
  if (block.type === "process") return <section className="client-process"><div><small>{String(index + 1).padStart(2, "0")}</small><h2>{block.title}</h2><p>{block.description}</p></div><ol><li>تخطيط نطاق العمل</li><li>تجهيز الموقع</li><li>تنفيذ ومتابعة</li><li>تسليم وتشغيل</li></ol></section>;
  if (block.type === "projectGrid") return <section className="client-projects"><div className="client-projects-heading"><small>{blockLabels[block.type]}</small><h2>{block.title}</h2><p>{block.description}</p></div><div className="client-project-grid"><figure><img src={brandAssets.telecomTower} alt="أعمال أبراج الاتصالات" /><figcaption>أعمال الاتصالات والشبكات</figcaption></figure><figure><img src={brandAssets.fieldCabinet} alt="أعمال الموقع والمرافق" /><figcaption>تهيئة المواقع والمرافق</figcaption></figure><figure><img src={brandAssets.networkOperations} alt="تكامل الشبكات والأنظمة" /><figcaption>تكامل الأنظمة والتشغيل</figcaption></figure></div></section>;
  return <section className={`client-block client-${block.type}`}><span className="client-block-icon"><Icon size={20} /></span><div><small>{blockLabels[block.type]}</small><h2>{block.title}</h2><p>{block.description}</p>{block.type === "serviceGrid" && <div className="client-chips"><i>مرافق</i><i>طرق</i><i>مياه</i><i>طاقة</i></div>}{block.type === "featureList" && <div className="client-points"><span>تنفيذ متكامل</span><span>حلول قابلة للتوسع</span><span>جاهزية تشغيلية</span></div>}{block.type === "faq" && <div className="client-points"><span>كيف نبدأ نطاق العمل؟</span><span>ما الخدمات المتاحة؟</span></div>}</div></section>;
}

export default function CmsPagePreview() {
  const [, params] = useRoute("/preview/:slug");
  const requested = params?.slug ?? "home";
  const page = loadCmsData().pages.find((candidate) => candidate.slug === (requested === "home" ? "/" : `/${requested}`));
  if (!page || page.status !== "منشورة") return <main className="client-empty" dir="rtl"><Building2 size={26} /><h1>هذه الصفحة غير متاحة للزوار</h1><p>يمكنك نشر الصفحة من لوحة الإدارة قبل عرضها في موقع العميل.</p><a href="/admin">العودة إلى لوحة الإدارة</a></main>;
  return <main className="client-page" dir="rtl"><header><a className="client-brand" href="/"><img src={brandAssets.logoMark} alt="شعار BTUC" /> <span>البرج الأزرق المتحدة<small>BTUC</small></span></a><nav><a href="/">الموقع الرئيسي</a><a href="/admin">لوحة الإدارة</a></nav></header><div id="client-content">{page.blocks.filter((block) => block.enabled).map((block, index) => <BlockRenderer block={block} index={index} key={block.id} />)}</div><footer>البرج الأزرق المتحدة — {page.title}</footer></main>;
}
