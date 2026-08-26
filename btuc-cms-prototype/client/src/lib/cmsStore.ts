export type SectionType = "hero" | "signals" | "about" | "principles" | "services" | "method" | "metrics" | "projects" | "gallery" | "faq" | "cta" | "contact";
export type UserRole = "مدير" | "محرر" | "مراجع";
export type PageStatus = "منشورة" | "مسودة" | "معطلة" | "محذوفة";
export type PageTemplate = "home" | "about" | "services" | "sectors" | "projects" | "project-detail" | "capabilities" | "faq" | "contact";
export type MediaCategory = "شعار" | "مشروع" | "موقع" | "شبكات" | "إنشاءات" | "هوية";

export type CmsMedia = { id: string; name: string; url: string; alt: string; category: MediaCategory };
export type CmsSection = { id: string; type: SectionType; label: string; title: string; description: string; imageId?: string; caption?: string; captionPosition?: "above" | "below"; ctaLabel?: string; ctaUrl?: string; enabled: boolean };
export type CmsPage = { id: string; title: string; slug: string; status: PageStatus; updatedAt: string; template: PageTemplate; navVisible: boolean; sections: CmsSection[] };
export type Post = { id: string; title: string; excerpt: string; status: PageStatus; updatedAt: string };
export type CmsUser = { id: string; name: string; username: string; password: string; role: UserRole; active: boolean };
export type CmsData = { pages: CmsPage[]; posts: Post[]; media: CmsMedia[]; users: CmsUser[] };
export type CmsSnapshot = { id: string; savedAt: string; reason: string; data: CmsData };

export const mediaCategories: MediaCategory[] = ["شعار", "مشروع", "موقع", "شبكات", "إنشاءات", "هوية"];
export const sectionLabels: Record<SectionType, string> = {
  hero: "واجهة البداية", signals: "شريط المؤشرات", about: "تعريف بالشركة", principles: "مبادئ التنفيذ", services: "مسارات الخدمات", method: "منهجية التنفيذ", metrics: "مؤشرات المشروع", projects: "سجل المشاريع", gallery: "معرض الصور", faq: "أسئلة شائعة", cta: "دعوة إجراء", contact: "التواصل والدعوة",
};

export const pageTemplates: Record<PageTemplate, { label: string; description: string; eyebrow: string }> = {
  home: { label: "الصفحة الرئيسية", description: "رحلة مؤسسية متكاملة تربط الشركة والخدمات والمنهجية والمشاريع والتواصل.", eyebrow: "هوية الشركة" },
  about: { label: "من نحن", description: "سرد مؤسسي يشرح الرؤية، المبادئ، القدرات ومنهجية التنفيذ.", eyebrow: "هوية ومصداقية" },
  services: { label: "الخدمات", description: "صفحة خدمات بمسارات تنفيذية متدرجة وصور ونقاط عمل واضحة.", eyebrow: "حلول متصلة" },
  sectors: { label: "قطاعات العمل", description: "عرض موجّه للقطاعات والمجالات مع مؤشرات ونماذج نطاقات عمل.", eyebrow: "مجالات متخصصة" },
  projects: { label: "المشاريع", description: "سجل أعمال بصري يقدّم المشاريع والصور والمؤشرات والدعوة للتواصل.", eyebrow: "أعمال مختارة" },
  "project-detail": { label: "دراسة حالة مشروع", description: "قالب دراسة حالة واسع لنطاق مشروع واحد ومنهجيته وصوره ومؤشراته.", eyebrow: "دراسة حالة" },
  capabilities: { label: "القدرات التنفيذية", description: "صفحة عن الكفاءات المهنية وتكامل التخصصات والجاهزية الميدانية.", eyebrow: "قدرات التنفيذ" },
  faq: { label: "الأسئلة الشائعة", description: "صفحة موجهة لتبسيط بداية التعاون والأسئلة العملية لمالك المشروع.", eyebrow: "وضوح البداية" },
  contact: { label: "التواصل", description: "صفحة اتصال مركزة لبداية احترافية وسريعة مع فريق BTUC.", eyebrow: "بدء التعاون" },
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
  { id: "signals", type: "signals", label: sectionLabels.signals, title: "مسارات متصلة للمشروع", description: "حلول متصلة للمشاريع والمرافق · نطاقات مدنية وتقنية متكاملة · الرياض، المملكة العربية السعودية", enabled: true },
  { id: "about", type: "about", label: sectionLabels.about, title: "شريك تنفيذ يرى المشروع كصورة مكتملة.", description: "تعمل شركة البرج الأزرق المتحدة في قطاعات الإنشاءات والبنية التحتية والخدمات المساندة والحلول التقنية، ضمن مسار تنفيذي موحد يربط الأعمال المدنية بالمرافق والطاقة والاتصالات.", imageId: "project-montage", enabled: true },
  { id: "principles", type: "principles", label: sectionLabels.principles, title: "وضوح تنفيذ. تكامل تخصصي. جاهزية ميدانية.", description: "نرتب نطاق العمل من البداية لتكون خطوات المشروع مفهومة ومتصلة · نقرّب المسافة بين الأعمال المدنية وشبكات الخدمات ضمن مسار واحد · نبدأ من واقع الموقع ومتطلباته نحو نتيجة قابلة للتشغيل", enabled: true },
  { id: "services", type: "services", label: sectionLabels.services, title: "سبعة مسارات. منظومة تشغيلية واحدة.", description: "ننظّم نطاقات العمل في مسارات تنفيذ واضحة، لتقود احتياج المشروع إلى الفريق والخبرة المرتبطين به دون تعقيد.", imageId: "telecom-tower", enabled: true },
  { id: "method", type: "method", label: sectionLabels.method, title: "مسار عمل يضع الترابط في المقدمة.", description: "في المشاريع المتداخلة، تبدأ الجودة من فهم العلاقة بين عناصر المشروع. لهذا يتدرج العمل بصورة منظمة من النطاق إلى الجاهزية.", imageId: "network-operations", enabled: true },
  { id: "metrics", type: "metrics", label: sectionLabels.metrics, title: "نطاق واضح من التخطيط إلى الجاهزية.", description: "تخطيط منضبط · فرق متخصصة · متابعة مترابطة · تسليم قابل للتشغيل", enabled: true },
  { id: "projects", type: "projects", label: sectionLabels.projects, title: "نماذج من أعمالنا", description: "سجل بصري قابل للتحديث يعرض نطاقات من أعمال الاتصالات والمرافق وتكامل الشبكات.", imageId: "project-montage", enabled: true },
  { id: "gallery", type: "gallery", label: sectionLabels.gallery, title: "الموقع، الشبكات، والجاهزية", description: "صور واقعية من نطاقات الأعمال والمشاريع المتصلة.", imageId: "field-cabinet", enabled: true },
  { id: "faq", type: "faq", label: sectionLabels.faq, title: "أسئلة تساعد على بدء النطاق بوضوح", description: "ما القطاعات التي تغطيها الشركة؟ · كيف يبدأ تقييم نطاق المشروع؟ · هل يمكن دمج أكثر من مجال تنفيذ؟", enabled: true },
  { id: "cta", type: "cta", label: sectionLabels.cta, title: "هل لديك نطاق مشروع يحتاج إلى مسار أوضح؟", description: "شاركنا احتياجك الأولي وسنساعدك في ترتيب نقطة البداية والخطوات المرتبطة بها.", imageId: "network-operations", enabled: true },
  { id: "contact", type: "contact", label: sectionLabels.contact, title: "لنضع مشروعك على مسار جاهز.", description: "شاركنا نطاق مشروعك، وسيتواصل معك فريق BTUC لبدء النقاش من المجال الأكثر صلة باحتياجك.", enabled: true },
];

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const withId = (section: CmsSection, suffix: string): CmsSection => ({ ...section, id: `${section.id}-${suffix}` });
const byType = (type: SectionType, suffix: string) => withId(homeSections.find((section) => section.type === type)!, suffix);
export const templateSectionTypes: Record<PageTemplate, SectionType[]> = {
  home: ["hero", "signals", "about", "principles", "services", "method", "projects", "contact"],
  about: ["hero", "about", "principles", "method", "metrics", "cta", "contact"],
  services: ["hero", "signals", "services", "method", "cta", "contact"],
  sectors: ["hero", "services", "metrics", "projects", "cta", "contact"],
  projects: ["hero", "projects", "gallery", "metrics", "cta", "contact"],
  "project-detail": ["hero", "about", "metrics", "method", "gallery", "cta", "contact"],
  capabilities: ["hero", "principles", "services", "method", "metrics", "cta", "contact"],
  faq: ["hero", "about", "faq", "cta", "contact"],
  contact: ["hero", "signals", "faq", "contact"],
};

export function createTemplateSections(template: PageTemplate, suffix = Date.now().toString()) {
  const sections = templateSectionTypes[template].map((type) => byType(type, `${suffix}-${type}`));
  const hero = sections.find((section) => section.type === "hero");
  if (hero) {
    const copy: Partial<Record<PageTemplate, Pick<CmsSection, "title" | "description" | "imageId">>> = {
      about: { title: "خبرة تنفيذية تصنع فرقًا في كل نطاق.", description: "نتعامل مع المشاريع بعين واحدة ترى الأثر المدني والتشغيلي والتقني، لتسليم نطاقات مترابطة وقابلة للاستمرار.", imageId: "project-montage" },
      services: { title: "حلول تنفيذية متصلة من الموقع إلى الجاهزية.", description: "نربط الأعمال المدنية بالمرافق والطاقة والاتصالات لنقدّم نطاقًا واضحًا ومسارًا عمليًا للتنفيذ.", imageId: "telecom-tower" },
      sectors: { title: "قطاعات تنفيذية تعمل ضمن منظومة واحدة.", description: "من الموقع والإنشاءات إلى الشبكات والطاقة والمرافق؛ نطاقات متخصصة تتصل في تنفيذ واحد.", imageId: "network-operations" },
      projects: { title: "مشاريع تبدأ من النطاق وتُقاس بالجاهزية.", description: "نماذج من مجالات عمل تجمع البناء والمرافق والأنظمة ضمن تنفيذ ميداني منضبط.", imageId: "network-operations" },
      "project-detail": { title: "عنوان مشروع يشرح قيمة التنفيذ.", description: "اعرض هنا نطاق المشروع والتحدي وخطوات التسليم بلغة تنفيذية واضحة وصور مرتبطة بالعمل.", imageId: "field-cabinet" },
      capabilities: { title: "قدرات تنفيذية تبدأ من الموقع وتصل إلى الجاهزية.", description: "فرق ومهارات مترابطة تجمع التنظيم الميداني والأعمال المدنية والأنظمة المتخصصة.", imageId: "project-montage" },
      faq: { title: "إجابات عملية قبل أن يبدأ نطاق المشروع.", description: "نساعد أصحاب المشاريع على فهم المسار الصحيح للتواصل وتحديد نطاق العمل قبل البداية.", imageId: "telecom-tower" },
      contact: { title: "نحوّل نطاق المشروع إلى خطوة تنفيذية واضحة.", description: "شاركنا احتياجك الأولي، وسنساعدك في بناء بداية منظمة لنطاق العمل والتواصل.", imageId: "project-montage" },
    };
    Object.assign(hero, copy[template]);
  }
  return sections;
}

export function createPageFromTemplate(template: PageTemplate): CmsPage {
  const id = `page-${Date.now()}`; const meta = pageTemplates[template];
  return { id, title: meta.label, slug: `/${template}-${id.slice(-5)}`, status: "مسودة", updatedAt: stamp(), template, navVisible: true, sections: createTemplateSections(template, id) };
}

export const initialCmsData: CmsData = {
  media: defaultMedia,
  pages: [
    { id: "home", title: "الصفحة الرئيسية", slug: "/", status: "منشورة", updatedAt: "الآن", template: "home", navVisible: false, sections: clone(homeSections.filter((section) => !["gallery", "faq", "cta", "metrics"].includes(section.type))) },
    { id: "services", title: "الخدمات", slug: "/services", status: "منشورة", updatedAt: "اليوم", template: "services", navVisible: true, sections: createTemplateSections("services", "services") },
    { id: "projects", title: "المشاريع", slug: "/projects", status: "مسودة", updatedAt: "مسودة جديدة", template: "projects", navVisible: true, sections: createTemplateSections("projects", "projects") },
  ],
  posts: [{ id: "post-1", title: "بدء مرحلة البنية التحتية لمشروع جديد", excerpt: "مستجدات من أعمال التنفيذ والخدمات المرتبطة بالموقع.", status: "مسودة", updatedAt: "منذ ساعتين" }],
  users: [{ id: "admin-1", name: "مدير BTUC", username: "btuc-admin", password: "BTUC-Admin-2026", role: "مدير", active: true }, { id: "editor-1", name: "محرر المحتوى", username: "btuc-editor", password: "BTUC-Editor-2026", role: "محرر", active: true }, { id: "reviewer-1", name: "مراجع المحتوى", username: "btuc-review", password: "BTUC-Review-2026", role: "مراجع", active: true }],
};

const storageKey = "btuc-cms-studio-v8"; const historyKey = "btuc-cms-studio-history-v8"; const sessionKey = "btuc-cms-studio-session-v8";
export const maxInlineImageBytes = 350 * 1024;
export const stamp = () => new Date().toLocaleString("ar-SA");
export const getMedia = (data: CmsData, mediaId?: string) => data.media.find((item) => item.id === mediaId);
export const mediaUsage = (data: CmsData, mediaId: string) => data.pages.flatMap((page) => page.sections.filter((section) => section.imageId === mediaId).map((section) => ({ pageTitle: page.title, sectionTitle: section.label })));
function normalizePage(page: CmsPage): CmsPage { const inferred: PageTemplate = page.slug === "/" ? "home" : page.slug.includes("project") ? "projects" : page.slug.includes("service") ? "services" : page.slug.includes("contact") ? "contact" : "about"; return { ...page, template: page.template ?? inferred, navVisible: page.navVisible ?? page.slug !== "/" }; }
function normalizeData(data: CmsData): CmsData { const media = data.media.filter((item) => !item.url.startsWith("data:") || item.url.length <= maxInlineImageBytes * 1.4); const mediaIds = new Set(media.map((item) => item.id)); return { ...data, media, pages: data.pages.map((page) => ({ ...normalizePage(page), sections: page.sections.map((section) => section.imageId && !mediaIds.has(section.imageId) ? { ...section, imageId: undefined } : section) })) }; }
function snapshotData(data: CmsData): CmsData { return { ...data, media: data.media.map((item) => item.url.startsWith("data:") ? { ...item, url: "__inline_media__" } : item) }; }
function restoreSnapshotMedia(data: CmsData): CmsData { const current = loadCmsData(); const byId = new Map(current.media.map((item) => [item.id, item])); return { ...data, media: data.media.map((item) => item.url === "__inline_media__" ? byId.get(item.id) ?? item : item) }; }
export function loadCmsData(): CmsData { try { const v8 = window.localStorage.getItem(storageKey); const saved = v8 ?? window.localStorage.getItem("btuc-cms-studio-v7") ?? window.localStorage.getItem("btuc-cms-studio-v6"); const normalized = saved ? normalizeData(JSON.parse(saved) as CmsData) : clone(initialCmsData); if (!v8) window.localStorage.setItem(storageKey, JSON.stringify(normalized)); return normalized; } catch { return clone(initialCmsData); } }
export function loadCmsHistory(): CmsSnapshot[] { try { return JSON.parse(window.localStorage.getItem(historyKey) ?? "[]") as CmsSnapshot[]; } catch { return []; } }
export function saveCmsData(data: CmsData, reason = "تحديث المحتوى") { const normalized = normalizeData(data); const previous = window.localStorage.getItem(storageKey); if (previous && previous !== JSON.stringify(normalized)) { const history = loadCmsHistory(); history.unshift({ id: `snapshot-${Date.now()}`, savedAt: stamp(), reason, data: snapshotData(JSON.parse(previous) as CmsData) }); window.localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 12))); } window.localStorage.setItem(storageKey, JSON.stringify(normalized)); return normalized; }
export function restoreCmsSnapshot(id: string): CmsData | null { const snapshot = loadCmsHistory().find((item) => item.id === id); return snapshot ? normalizeData(restoreSnapshotMedia(clone(snapshot.data))) : null; }
export function createSection(type: SectionType): CmsSection { const source = homeSections.find((section) => section.type === type); return source ? { ...source, id: `${type}-${Date.now()}`, title: `${source.label} جديد`, enabled: true } : { id: `section-${Date.now()}`, type, label: sectionLabels[type], title: "قسم جديد", description: "أضف محتوى هذا القسم من لوحة الخصائص.", enabled: true }; }
export function getSessionUser(): CmsUser | null { try { const id = window.localStorage.getItem(sessionKey) ?? window.localStorage.getItem("btuc-cms-studio-session-v7") ?? window.localStorage.getItem("btuc-cms-studio-session-v6"); return loadCmsData().users.find((user) => user.id === id && user.active) ?? null; } catch { return null; } }
export function startSession(userId: string) { window.localStorage.setItem(sessionKey, userId); }
export function endSession() { window.localStorage.removeItem(sessionKey); }
