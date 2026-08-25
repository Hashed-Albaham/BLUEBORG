export type SectionType = "hero" | "signals" | "about" | "services" | "method" | "projects" | "contact";
export type UserRole = "مدير" | "محرر" | "مراجع";
export type PageStatus = "منشورة" | "مسودة" | "معطلة" | "محذوفة";
export type CmsMedia = { id: string; name: string; url: string; alt: string; category: "شعار" | "مشروع" | "موقع" | "شبكات" };
export type CmsSection = { id: string; type: SectionType; label: string; title: string; description: string; imageId?: string; enabled: boolean };
export type CmsPage = { id: string; title: string; slug: string; status: PageStatus; updatedAt: string; sections: CmsSection[] };
export type Post = { id: string; title: string; excerpt: string; status: PageStatus; updatedAt: string };
export type CmsUser = { id: string; name: string; username: string; password: string; role: UserRole; active: boolean };
export type CmsData = { pages: CmsPage[]; posts: Post[]; media: CmsMedia[]; users: CmsUser[] };
export type CmsSnapshot = { id: string; savedAt: string; reason: string; data: CmsData };

export const sectionLabels: Record<SectionType, string> = {
  hero: "واجهة البداية", signals: "شريط المؤشرات", about: "تعريف بالشركة", services: "مجالات العمل", method: "منهجية التنفيذ", projects: "معرض المشاريع", contact: "التواصل",
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
  { id: "signals", type: "signals", label: sectionLabels.signals, title: "مؤشرات الشركة", description: "حلول متصلة للمشاريع والمرافق · نطاقات مدنية وتقنية متكاملة · الرياض، المملكة العربية السعودية.", enabled: true },
  { id: "about", type: "about", label: sectionLabels.about, title: "شريك تنفيذ يرى المشروع كصورة مكتملة.", description: "تعمل شركة البرج الأزرق المتحدة في قطاعات الإنشاءات والبنية التحتية والخدمات المساندة والحلول التقنية، ضمن مسار تنفيذي موحد يربط الأعمال المدنية بالمرافق والطاقة والاتصالات.", imageId: "project-montage", enabled: true },
  { id: "services", type: "services", label: sectionLabels.services, title: "سبعة مسارات. منظومة تشغيلية واحدة.", description: "الطرق والأعمال المدنية، المياه والري، الصرف والمرافق، الطاقة والاتصالات، تجهيز المواقع، الصيانة، والحلول التقنية المتكاملة.", imageId: "telecom-tower", enabled: true },
  { id: "method", type: "method", label: sectionLabels.method, title: "مسار عمل يضع الترابط في المقدمة.", description: "تحديد النطاق، تجهيز الموقع، تنفيذ مترابط، وتسليم واستمرارية. خطوات واضحة من الفكرة إلى جاهزية التشغيل.", imageId: "network-operations", enabled: true },
  { id: "projects", type: "projects", label: sectionLabels.projects, title: "نماذج من أعمالنا", description: "معرض افتراضي قابل للتحديث يعرض نطاقات من أعمال الاتصالات والمرافق وتكامل الشبكات.", imageId: "project-montage", enabled: true },
  { id: "contact", type: "contact", label: sectionLabels.contact, title: "لنبدأ نطاق مشروعك", description: "يتلقى الفريق استفسارات المشاريع عبر البريد info@btuc.com.sa أو الهاتف +966 55 519 9797.", enabled: true },
];

export const initialCmsData: CmsData = {
  media: defaultMedia,
  pages: [
    { id: "home", title: "الصفحة الرئيسية", slug: "/", status: "منشورة", updatedAt: "الآن", sections: homeSections },
    { id: "services", title: "مجالات العمل", slug: "/services", status: "منشورة", updatedAt: "اليوم", sections: [homeSections[0], homeSections[3], homeSections[6]].map((item) => ({ ...item, id: `${item.id}-services` })) },
    { id: "projects", title: "المشاريع", slug: "/projects", status: "مسودة", updatedAt: "مسودة جديدة", sections: [homeSections[0], homeSections[5], homeSections[6]].map((item) => ({ ...item, id: `${item.id}-projects` })) },
  ],
  posts: [
    { id: "post-1", title: "بدء مرحلة البنية التحتية لمشروع جديد", excerpt: "مستجدات من أعمال التنفيذ والخدمات المرتبطة بالموقع.", status: "مسودة", updatedAt: "منذ ساعتين" },
  ],
  users: [
    { id: "admin-1", name: "مدير BTUC", username: "btuc-admin", password: "BTUC-Admin-2026", role: "مدير", active: true },
    { id: "editor-1", name: "محرر المحتوى", username: "btuc-editor", password: "BTUC-Editor-2026", role: "محرر", active: true },
    { id: "reviewer-1", name: "مراجع المحتوى", username: "btuc-review", password: "BTUC-Review-2026", role: "مراجع", active: true },
  ],
};

const storageKey = "btuc-cms-studio-v6";
const historyKey = "btuc-cms-studio-history-v6";
const sessionKey = "btuc-cms-studio-session-v6";
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
export const stamp = () => new Date().toLocaleString("ar-SA");
export const getMedia = (data: CmsData, mediaId?: string) => data.media.find((item) => item.id === mediaId);

export function loadCmsData(): CmsData { try { const saved = window.localStorage.getItem(storageKey); return saved ? JSON.parse(saved) as CmsData : clone(initialCmsData); } catch { return clone(initialCmsData); } }
export function loadCmsHistory(): CmsSnapshot[] { try { return JSON.parse(window.localStorage.getItem(historyKey) ?? "[]") as CmsSnapshot[]; } catch { return []; } }
export function saveCmsData(data: CmsData, reason = "تحديث المحتوى") { const previous = window.localStorage.getItem(storageKey); if (previous && previous !== JSON.stringify(data)) { const history = loadCmsHistory(); history.unshift({ id: `snapshot-${Date.now()}`, savedAt: stamp(), reason, data: JSON.parse(previous) as CmsData }); window.localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 20))); } window.localStorage.setItem(storageKey, JSON.stringify(data)); }
export function restoreCmsSnapshot(id: string): CmsData | null { const snapshot = loadCmsHistory().find((item) => item.id === id); return snapshot ? clone(snapshot.data) : null; }
export function createSection(type: SectionType): CmsSection { const source = homeSections.find((section) => section.type === type); return source ? { ...source, id: `${type}-${Date.now()}`, title: `${source.label} جديد`, enabled: true } : { id: `section-${Date.now()}`, type, label: sectionLabels[type], title: "قسم جديد", description: "أضف محتوى هذا القسم من لوحة الخصائص.", enabled: true }; }
export function getSessionUser(): CmsUser | null { try { const id = window.localStorage.getItem(sessionKey); return loadCmsData().users.find((user) => user.id === id && user.active) ?? null; } catch { return null; } }
export function startSession(userId: string) { window.localStorage.setItem(sessionKey, userId); }
export function endSession() { window.localStorage.removeItem(sessionKey); }
