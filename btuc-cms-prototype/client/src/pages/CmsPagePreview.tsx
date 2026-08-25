import { useMemo, useState } from "react";
import { ArrowLeft, Building2, Check, ChevronLeft, Droplets, Mail, MapPin, Network, Phone, RadioTower, Route, ShieldCheck, Zap } from "lucide-react";
import { getMedia, loadCmsData, type CmsData, type CmsSection } from "@/lib/cmsStore";
import { brandAssets } from "@/lib/brandAssets";
import "../cmsClient.css";

const serviceCards = [["الطرق والأعمال المدنية", Route], ["شبكات المياه والري", Droplets], ["الصرف الصحي والمرافق", Network], ["الطاقة والاتصالات", Zap], ["الإنشاءات وتجهيز المواقع", Building2], ["المرافق وصيانة المواقع", ShieldCheck], ["الحلول التقنية", RadioTower]] as const;
const methodSteps = ["تحديد النطاق", "تجهيز الموقع", "تنفيذ مترابط", "تسليم واستمرارية"];

function Section({ section, data }: { section: CmsSection; data: CmsData }) {
  const image = getMedia(data, section.imageId);
  if (section.type === "hero") return <section className="btuc-hero"><div className="btuc-hero-copy"><span>البنية التحتية والإنشاءات المتكاملة</span><h1>{section.title}</h1><p>{section.description}</p><a href="#services">استكشف مجالات العمل <ArrowLeft size={16} /></a></div><div className="btuc-hero-image" style={{ backgroundImage: `linear-gradient(135deg, rgba(3,37,63,.18), rgba(2,28,48,.65)), url(${image?.url ?? brandAssets.fieldCabinet})` }}><i>01 / المدنية</i><i>02 / المرافق</i><i>03 / الجاهزية</i></div></section>;
  if (section.type === "signals") return <section className="btuc-signals">{["حلول متصلة للمشاريع والمرافق", "نطاقات مدنية وتقنية متكاملة", "الرياض، المملكة العربية السعودية"].map((item, index) => <div key={item}><b>{String.fromCharCode(65 + index)}</b><span>{item}</span></div>)}</section>;
  if (section.type === "about") return <section className="btuc-about"><div><small>تعريف بالشركة</small><h2>{section.title}</h2></div><div><p>{section.description}</p><a href="#contact">ابدأ من نطاق مشروعك <ChevronLeft size={16} /></a></div></section>;
  if (section.type === "services") return <section className="btuc-services" id="services"><header><small>مجالات العمل</small><h2>{section.title}</h2><p>{section.description}</p></header><div>{serviceCards.map(([label, Icon], index) => <article key={label}><span>{String(index + 1).padStart(2, "0")}</span><Icon size={22} /><h3>{label}</h3><p>نطاق تنفيذ متصل ضمن منظومة أعمال الشركة.</p><a href="#contact">ناقش نطاق التنفيذ <ArrowLeft size={14} /></a></article>)}</div></section>;
  if (section.type === "method") return <section className="btuc-method"><header><small>طريقة العمل</small><h2>{section.title}</h2><p>{section.description}</p></header><ol>{methodSteps.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span><p>خطوة واضحة ضمن مسار تنفيذ متكامل.</p></li>)}</ol></section>;
  if (section.type === "projects") { const media = [getMedia(data, "telecom-tower"), getMedia(data, "field-cabinet"), getMedia(data, "network-operations")]; return <section className="btuc-projects"><header><small>معرض الأعمال</small><h2>{section.title}</h2><p>{section.description}</p></header><div>{media.map((item, index) => <figure key={item?.id ?? index}><img src={item?.url} alt={item?.alt} /><figcaption>{["أعمال الاتصالات والشبكات", "تهيئة المواقع والمرافق", "تكامل الأنظمة والتشغيل"][index]}</figcaption></figure>)}</div></section>; }
  return <section className="btuc-contact" id="contact"><div><small>تواصل معنا</small><h2>{section.title}</h2><p>{section.description}</p></div><div><a href="tel:+966555199797"><Phone size={16} />+966 55 519 9797</a><a href="mailto:info@btuc.com.sa"><Mail size={16} />info@btuc.com.sa</a><a href="#top"><MapPin size={16} />الرياض، المملكة العربية السعودية</a></div></section>;
}

export default function CmsPagePreview() {
  const [data] = useState(() => loadCmsData()); const page = useMemo(() => { const requested = window.location.pathname.replace(/^\/preview/, "") || "/"; const slug = requested === "/home" ? "/" : requested; return data.pages.find((item) => item.slug === slug) ?? data.pages.find((item) => item.slug === "/") ?? data.pages[0]; }, [data]);
  if (!page || page.status !== "منشورة") return <main className="btuc-not-found" dir="rtl"><h1>هذه الصفحة غير متاحة للزوار.</h1><a href="/admin">العودة إلى الإدارة</a></main>;
  return <main className="btuc-preview" dir="rtl" id="top"><header><a className="btuc-preview-brand" href="/"><img src={brandAssets.logoMark} alt="شعار البرج الأزرق المتحدة" /><span>البرج الأزرق المتحدة<small>Blue Tower United Co.</small></span></a><nav><a href="/">الموقع الرئيسي</a><a href="/admin">لوحة الإدارة</a></nav></header>{page.sections.filter((item) => item.enabled).map((section) => <Section key={section.id} section={section} data={data} />)}<footer>البرج الأزرق المتحدة — نسخة معاينة للمحتوى المُدار</footer></main>;
}
