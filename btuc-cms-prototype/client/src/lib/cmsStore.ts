export type SectionType = "hero" | "signals" | "about" | "services" | "method" | "projects" | "contact";
export type UserRole = "مدير" | "محرر" | "مراجع";
export type PageStatus = "منشورة" | "مسودة" | "معطلة" | "محذوفة";
export type PageTemplate = "home" | "about" | "services" | "projects" | "project-detail" | "contact";

export type CmsMedia = { id: string; name: string; url: string; alt: string; category: "شعار" | "مشروع" | "موقع" | "شبكات" };
export type CmsSection = { id: string; type: SectionType; label: string; title: string; description: string; imageId?: string; enabled: boolean };
export type CmsPage = { id: string; title: string; slug: string; status: PageStatus; updatedAt: string; template: PageTemplate; navVisible: boolean; sections: CmsSection[] };
export type Post = { id: string; title: string; excerpt: string; status: PageStatus; updatedAt: string };
export type CmsUser = { id: string; name: string; username: string; password: string; role: UserRole; active: boolean };
export type CmsData = { pages: CmsPage[]; posts: Post[]; media: CmsMedia[]; users: CmsUser[] };
export type CmsSnapshot = { id: string; savedAt: string; reason: string; data: CmsData };

export const sectionLabels: Record<SectionType, string> = {
  hero: "واجهة البداية", signals: "مؤشرات مختصرة", about: "سرد الشركة", services: "حلول وخدمات", method: "منهجية التنفيذ", projects: "مشاريع مختارة", contact: "التواصل والدعوة",
};

export const pageTemplates: Record<PageTemplate, { label: string; description: string; eyebrow: string }> = {
  home: { label: "الصفحة الرئيسية", description: "صفحة تعريفية متكاملة تعرض الموقع، الخبرة، الحلول، المشاريع والتواصل ضمن رحلة واحدة.", eyebrow: "هوية الشركة" },
  about: { label: "من نحن", description: "صفحة سردية تعرّف بالشركة ومنهجها وقدرتها التنفيذية ومؤشرات الثقة.", eyebrow: "هوية ومصداقية" },
  services: { label: "الخدمات", description: "صفحة حلول تركّز على مجالات العمل وبطاقات الخدمة وخطوات التنفيذ.", eyebrow: "حلول متصلة" },
  projects: { label: "المشاريع", description: "صفحة معرض أعمال ذات سرد بصري لعرض القطاعات ونماذج المشاريع.", eyebrow: "أعمال مختارة" },
  "project-detail": { label: "تفاصيل مشروع", description: "قالب دراسة حالة لمشروع واحد مع نطاق العمل والتنفيذ والنتائج البصرية.", eyebrow: "دراسة حالة" },
  contact: { label: "التواصل", description: "صفحة اتصال مركزة تساعد العميل على بدء نطاق مشروعه بوضوح وسرعة.", eyebrow: "بدء التعاون" },
};

const defaultMedia: CmsMedia[] = [
  { id: "brand-mark", name: "شعار BTUC", url: "/assets/btuc-logo-mark.jpg", alt: "شعار البرج الأزرق المتحدة", category: "شعار" },
  { id: "field-cabinet", name: "أعمال الموقع والمرافق", url: "/assets/btuc-field-cabinet.jpg", alt: "أعمال ميدانية للمرافق", category: "موقع" },
  { id: "telecom-tower", name: "برج الاتصالات", url: "/assets/btuc-telecom-tower.jpg", alt: "أعمال أبراج الاتصالات", category: "شبكات" },
  { id: "network-operations", name: "تكامل الشبكات", url: "/assets/btuc-network-operations.jpg", alt: "تكامل الشبكات والأنظمة", category: "شبكات" },
  { id: "project-montage", name: "معرض الأعمال", url: "/assets/btuc-project-montage.jpg", alt: "عرض نماذج من أعمال الشركة", category: "مشروع" },
];

const homeSections: CmsSection[] = [
  { id: "hero", type: "hero", label: sectionLabels.hero, title: "نصنع البنية التي تمضي بها المدن.", description: "شركة البرج الأزرق المتحدة تجمع خبرات الإنشاءات والمرافق والطاقة والاتصالات ضمن منظومة تنفيذ مترابطة، من تهيئة الموقع حتى جاهزية التشغيل.", imageId: "field-cabinet", enabled: true },
  { id: "signals", type: "signals", label: sectionLabels.signals, title: "خبرة محلية. تنفيذ مترابط. جاهزية محسوبة.", description: "حلول متصلة للمشاريع والمرافق · نطاقات مدنية وتقنية متكاملة · الرياض، المملكة العربية السعودية.", enabled: true },
  { id: "about", type: "about", label: sectionLabels.about, title: "شريك تنفيذ يرى المشروع كصورة مكتملة.", description: "تعمل شركة البرج الأزرق المتحدة في قطاعات الإنشاءات والبنية التحتية والخدمات المساندة والحلول التقنية، ضمن مسار تنفيذي موحد يربط الأعمال المدنية بالمرافق والطاقة والاتصالات.", imageId: "project-montage", enabled: true },
  { id: "services", type: "services", label: sectionLabels.services, title: "سبعة مسارات. منظومة تشغيلية واحدة.", description: "الطرق والأعمال المدنية، المياه والري، الصرف والمرافق، الطاقة والاتصالات، تجهيز المواقع، الصيانة، والحلول التقنية المتكاملة.", imageId: "telecom-tower", enabled: true },
  { id: "method", type: "method", label: sectionLabels.method, title: "مسار عمل يضع الترابط في المقدمة.", description: "تحديد النطاق، تجهيز الموقع، تنفيذ مترابط، وتسليم واستمرارية. خطوات واضحة من الفكرة إلى جاهزية التشغيل.", imageId: "network-operations", enabled: true },
  { id: "projects", type: "projects", label: sectionLabels.projects, title: "نماذج من أعمالنا", description: "معرض احترافي قابل للتحديث يعرض نطاقات من أعمال الاتصالات والمرافق وتكامل الشبكات.", imageId: "project-montage", enabled: true },
  { id: "contact", type: "contact", label: sectionLabels.contact, title: "لنبدأ نطاق مشروعك", description: "يتلقى الفريق استفسارات المشاريع عبر البريد info@btuc.com.sa أو الهاتف +966 55 519 9797.", enabled: true },
];

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const withId = (section: CmsSection, suffix: string): CmsSection => ({ ...section, id: `${section.id}-${suffix}` });
const byType = (type: SectionType, suffix: string) => withId(homeSections.find((section) => section.type === type)!, suffix);

export function createTemplateSections(template: PageTemplate, suffix = Date.now().toString()) {
  const types: Record<PageTemplate, SectionType[]> = {
    home: ["hero", "signals", "about", "services", "method", "projects", "contact"],
    about: ["hero", "about", "signals", "method", "contact"],
    services: ["hero", "services", "method", "signals", "contact"],
    projects: ["hero", "projects", "signals", "contact"],
    "project-detail": ["hero", "about", "method", "projects", "contact"],
    contact: ["hero", "signals", "contact"],
  };
  const sections = types[template].map((type) => byType(type, `${suffix}-${type}`));
  const hero = sections.find((section) => section.type === "hero");
  if (hero) {
    const copy: Partial<Record<PageTemplate, Pick<CmsSection, "title" | "description" | "imageId">>> = {
      about: { title: "خبرة تنفيذية تصنع فرقًا في كل نطاق.", description: "نتعامل مع المشاريع بعين واحدة ترى الأثر المدني والتشغيلي والتقني، لتسليم نطاقات مترابطة وقابلة للاستمرار.", imageId: "project-montage" },
      services: { title: "حلول تنفيذية متصلة من الموقع إلى الجاهزية.", description: "نربط الأعمال المدنية بالمرافق والطاقة والاتصالات لنقدّم نطاقًا واضحًا ومسارًا عمليًا للتنفيذ.", imageId: "telecom-tower" },
      projects: { title: "مشاريع تبدأ من النطاق وتُقاس بالجاهزية.", description: "نماذج من مجالات عمل تجمع البناء والمرافق والأنظمة ضمن تنفيذ ميداني منضبط.", imageId: "network-operations" },
      "project-detail": { title: "عنوان مشروع يشرح قيمة التنفيذ.", description: "اعرض هنا نطاق المشروع والتحدي وخطوات التسليم بلغة تنفيذية واضحة وصور مرتبطة بالعمل.", imageId: "field-cabinet" },
      contact: { title: "نحوّل نطاق المشروع إلى خطوة تنفيذية واضحة.", description: "شاركنا احتياجك الأولي، وسنساعدك في بناء بداية منظمة لنطاق العمل والتواصل.", imageId: "project-montage" },
    };
    Object.assign(hero, copy[template]);
  }
  return sections;
}

export function createPageFromTemplate(template: PageTemplate): CmsPage {
  const id = `page-${Date.now()}`;
  const meta = pageTemplates[template];
  return { id, title: meta.label, slug: `/${template}-${id.slice(-5)}`, status: "مسودة", updatedAt: stamp(), template, navVisible: true, sections: createTemplateSections(template, id) };
}

export const initialCmsData: CmsData = {
  media: defaultMedia,
  pages: [
    { id: "home", title: "الصفحة الرئيسية", slug: "/", status: "منشورة", updatedAt: "الآن", template: "home", navVisible: false, sections: clone(homeSections) },
    { id: "services", title: "الخدمات", slug: "/services", status: "منشورة", updatedAt: "اليوم", template: "services", navVisible: true, sections: createTemplateSections("services", "services") },
    { id: "projects", title: "المشاريع", slug: "/projects", status: "مسودة", updatedAt: "مسودة جديدة", template: "projects", navVisible: true, sections: createTemplateSections("projects", "projects") },
  ],
  posts: [{ id: "post-1", title: "بدء مرحلة البنية التحتية لمشروع جديد", excerpt: "مستجدات من أعمال التنفيذ والخدمات المرتبطة بالموقع.", status: "مسودة", updatedAt: "منذ ساعتين" }],
  users: [
    { id: "admin-1", name: "مدير BTUC", username: "btuc-admin", password: "BTUC-Admin-2026", role: "مدير", active: true },
    { id: "editor-1", name: "محرر المحتوى", username: "btuc-editor", password: "BTUC-Editor-2026", role: "محرر", active: true },
    { id: "reviewer-1", name: "مراجع المحتوى", username: "btuc-review", password: "BTUC-Review-2026", role: "مراجع", active: true },
  ],
};

const storageKey = "btuc-cms-studio-v7";
const historyKey = "btuc-cms-studio-history-v7";
const sessionKey = "btuc-cms-studio-session-v7";
export const stamp = () => new Date().toLocaleString("ar-SA");
export const getMedia = (data: CmsData, mediaId?: string) => data.media.find((item) => item.id === mediaId);

function normalizePage(page: CmsPage): CmsPage {
  const inferred: PageTemplate = page.slug === "/" ? "home" : page.slug.includes("project") ? "projects" : page.slug.includes("service") ? "services" : page.slug.includes("contact") ? "contact" : "about";
  return { ...page, template: page.template ?? inferred, navVisible: page.navVisible ?? page.slug !== "/" };
}
function normalizeData(data: CmsData): CmsData { return { ...data, pages: data.pages.map(normalizePage) }; }
export function loadCmsData(): CmsData { try { const saved = window.localStorage.getItem(storageKey) ?? window.localStorage.getItem("btuc-cms-studio-v6"); return saved ? normalizeData(JSON.parse(saved) as CmsData) : clone(initialCmsData); } catch { return clone(initialCmsData); } }
export function loadCmsHistory(): CmsSnapshot[] { try { return JSON.parse(window.localStorage.getItem(historyKey) ?? "[]") as CmsSnapshot[]; } catch { return []; } }
export function saveCmsData(data: CmsData, reason = "تحديث المحتوى") { const previous = window.localStorage.getItem(storageKey); if (previous && previous !== JSON.stringify(data)) { const history = loadCmsHistory(); history.unshift({ id: `snapshot-${Date.now()}`, savedAt: stamp(), reason, data: JSON.parse(previous) as CmsData }); window.localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 20))); } window.localStorage.setItem(storageKey, JSON.stringify(data)); }
export function restoreCmsSnapshot(id: string): CmsData | null { const snapshot = loadCmsHistory().find((item) => item.id === id); return snapshot ? normalizeData(clone(snapshot.data)) : null; }
export function createSection(type: SectionType): CmsSection { const source = homeSections.find((section) => section.type === type); return source ? { ...source, id: `${type}-${Date.now()}`, title: `${source.label} جديد`, enabled: true } : { id: `section-${Date.now()}`, type, label: sectionLabels[type], title: "قسم جديد", description: "أضف محتوى هذا القسم من لوحة الخصائص.", enabled: true }; }
export function getSessionUser(): CmsUser | null { try { const id = window.localStorage.getItem(sessionKey) ?? window.localStorage.getItem("btuc-cms-studio-session-v6"); return loadCmsData().users.find((user) => user.id === id && user.active) ?? null; } catch { return null; } }
export function startSession(userId: string) { window.localStorage.setItem(sessionKey, userId); }
export function endSession() { window.localStorage.removeItem(sessionKey); }
