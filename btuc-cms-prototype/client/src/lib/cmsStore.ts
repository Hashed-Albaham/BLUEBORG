export type BlockType = "hero" | "richText" | "image" | "serviceGrid" | "callout" | "featureList" | "process" | "projectGrid" | "faq" | "contactPanel";
export type Block = { id: string; type: BlockType; title: string; description: string; enabled: boolean };
export type PageStatus = "منشورة" | "مسودة" | "معطلة" | "محذوفة";
export type CmsPage = { id: string; title: string; slug: string; status: PageStatus; updatedAt: string; blocks: Block[] };
export type Post = { id: string; title: string; excerpt: string; status: PageStatus; updatedAt: string };
export type Template = { id: string; name: string; type: BlockType; description: string; fields: string[] };
export type CmsData = { pages: CmsPage[]; posts: Post[]; templates: Template[] };
export type CmsSnapshot = { id: string; savedAt: string; reason: string; data: CmsData };

export const blockLabels: Record<BlockType, string> = {
  hero: "مقدمة رئيسية", richText: "نص تحريري", image: "صورة مع وصف", serviceGrid: "شبكة خدمات", callout: "نداء إجراء",
  featureList: "مزايا ومؤشرات", process: "مراحل التنفيذ", projectGrid: "شبكة المشاريع", faq: "أسئلة شائعة", contactPanel: "لوحة تواصل",
};

const templates: Template[] = [
  ["tpl-hero", "مقدمة رئيسية", "hero", "عنوان، وصف، زر إجراء وصورة خلفية.", ["العنوان", "الوصف", "زر الإجراء"]],
  ["tpl-text", "نص تحريري", "richText", "فقرة مؤسسية لشرح فكرة أو خدمة.", ["العنوان", "المحتوى"]],
  ["tpl-grid", "شبكة خدمات", "serviceGrid", "بطاقات متكررة لمجالات العمل.", ["العنوان", "البطاقات"]],
  ["tpl-features", "مزايا ومؤشرات", "featureList", "مؤشرات تنفيذية أو مزايا تنافسية.", ["العنوان", "المؤشرات"]],
  ["tpl-process", "مراحل التنفيذ", "process", "خطوات منظمة من البداية حتى التسليم.", ["العنوان", "المراحل"]],
  ["tpl-projects", "شبكة المشاريع", "projectGrid", "عرض مشاريع الشركة بمربعات مرنة.", ["العنوان", "المشاريع"]],
  ["tpl-faq", "أسئلة شائعة", "faq", "إجابات منظمة للأسئلة المتكررة.", ["العنوان", "الأسئلة"]],
  ["tpl-contact", "لوحة تواصل", "contactPanel", "قسم تواصل ختامي واضح ومباشر.", ["العنوان", "وسيلة التواصل"]],
].map(([id, name, type, description, fields]) => ({ id: id as string, name: name as string, type: type as BlockType, description: description as string, fields: fields as string[] }));

export const initialCmsData: CmsData = {
  pages: [
    { id: "home", title: "الصفحة الرئيسية", slug: "/", status: "منشورة", updatedAt: "الآن", blocks: [
      { id: "b-hero", type: "hero", title: "نصنع البنية التي تمضي بها المدن", description: "منظومة تنفيذ مترابطة تجمع الإنشاءات والمرافق والطاقة والاتصالات.", enabled: true },
      { id: "b-services", type: "serviceGrid", title: "مسارات العمل", description: "خدمات مترابطة تبدأ من الموقع وتنتهي بجهوزية التشغيل.", enabled: true },
      { id: "b-process", type: "process", title: "منهجية تنفيذ واضحة", description: "تخطيط، تجهيز، تنفيذ، وتسليم ضمن رؤية تشغيلية واحدة.", enabled: true },
      { id: "b-projects", type: "projectGrid", title: "نماذج من أعمالنا", description: "معرض افتراضي يعرض نطاقات من أعمال الاتصالات والمرافق وتكامل الشبكات.", enabled: true },
      { id: "b-contact", type: "contactPanel", title: "لنتحدث عن مشروعك", description: "تواصل مع فريق البرج الأزرق المتحدة لبدء نطاق العمل.", enabled: true },
    ] },
    { id: "services", title: "مجالات العمل", slug: "/services", status: "منشورة", updatedAt: "اليوم", blocks: [
      { id: "b-intro", type: "richText", title: "حلول متكاملة للبنية التحتية", description: "نعمل ضمن نطاقات إنشائية ومرافق متكاملة تخدم المدن والمشاريع.", enabled: true },
      { id: "b-feature", type: "featureList", title: "نطاقات تشغيل متصلة", description: "المياه، الصرف، الطاقة، الاتصالات، والطرق ضمن مسار تنفيذ موحد.", enabled: true },
    ] },
    { id: "projects", title: "المشاريع", slug: "/projects", status: "مسودة", updatedAt: "مسودة جديدة", blocks: [{ id: "b-projects", type: "projectGrid", title: "معرض المشاريع", description: "صور ونبذة موجزة لكل مشروع عند اعتماد المحتوى.", enabled: true }] },
  ],
  posts: [
    { id: "post-1", title: "بدء مرحلة البنية التحتية لمشروع جديد", excerpt: "مستجدات من أعمال التنفيذ والخدمات المرتبطة بالموقع.", status: "مسودة", updatedAt: "منذ ساعتين" },
    { id: "post-2", title: "دليل مختصر لتهيئة الموقع", excerpt: "نظرة عملية على أعمال التجهيز قبل بدء التنفيذ.", status: "منشورة", updatedAt: "منذ يومين" },
  ], templates,
};

const storageKey = "btuc-cms-studio-v3";
const historyKey = "btuc-cms-studio-history-v3";
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export function loadCmsData(): CmsData {
  try { const saved = window.localStorage.getItem(storageKey); return saved ? JSON.parse(saved) as CmsData : clone(initialCmsData); } catch { return clone(initialCmsData); }
}
export function loadCmsHistory(): CmsSnapshot[] { try { return JSON.parse(window.localStorage.getItem(historyKey) ?? "[]") as CmsSnapshot[]; } catch { return []; } }
export function saveCmsData(data: CmsData, reason = "تحديث المحتوى") {
  const previous = window.localStorage.getItem(storageKey);
  if (previous && previous !== JSON.stringify(data)) {
    const history = loadCmsHistory();
    history.unshift({ id: `snapshot-${Date.now()}`, savedAt: new Date().toLocaleString("ar-SA"), reason, data: JSON.parse(previous) as CmsData });
    window.localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 15)));
  }
  window.localStorage.setItem(storageKey, JSON.stringify(data));
}
export function restoreCmsSnapshot(id: string): CmsData | null { const snapshot = loadCmsHistory().find((item) => item.id === id); return snapshot ? clone(snapshot.data) : null; }
export function createBlock(type: BlockType): Block { return { id: `block-${Date.now()}`, type, title: `وحدة ${blockLabels[type]} جديدة`, description: "أضف العنوان والوصف من لوحة الخصائص ثم انشر الصفحة عند جاهزيتها.", enabled: true }; }
