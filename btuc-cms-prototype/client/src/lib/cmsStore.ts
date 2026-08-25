/**
 * طبقة بيانات لوحة المحتوى: تستخدم التخزين المحلي في النموذج التجريبي،
 * ويمكن تحويلها إلى phpClient عند تفعيل واجهة PHP/MySQL.
 */
export type BlockType = "hero" | "richText" | "image" | "serviceGrid" | "callout";
export type Block = { id: string; type: BlockType; title: string; description: string; enabled: boolean };
export type PageStatus = "منشورة" | "مسودة";
export type CmsPage = { id: string; title: string; slug: string; status: PageStatus; updatedAt: string; blocks: Block[] };
export type Post = { id: string; title: string; excerpt: string; status: PageStatus; updatedAt: string };
export type Template = { id: string; name: string; type: BlockType; description: string; fields: string[] };
export type CmsData = { pages: CmsPage[]; posts: Post[]; templates: Template[] };

export const blockLabels: Record<BlockType, string> = {
  hero: "مقدمة رئيسية",
  richText: "نص تحريري",
  image: "صورة مع وصف",
  serviceGrid: "شبكة خدمات",
  callout: "نداء إجراء",
};

export const initialCmsData: CmsData = {
  pages: [
    {
      id: "home",
      title: "الصفحة الرئيسية",
      slug: "/",
      status: "منشورة",
      updatedAt: "الآن",
      blocks: [
        { id: "b-hero", type: "hero", title: "نصنع البنية التي تمضي بها المدن", description: "رسالة المقدمة الرئيسية للموقع.", enabled: true },
        { id: "b-services", type: "serviceGrid", title: "مسارات العمل", description: "عرض نطاقات الشركة وخدماتها الرئيسية.", enabled: true },
        { id: "b-contact", type: "callout", title: "لنتحدث عن مشروعك", description: "نداء الإجراء وبيانات التواصل.", enabled: true },
      ],
    },
    { id: "services", title: "مجالات العمل", slug: "/services", status: "منشورة", updatedAt: "اليوم", blocks: [{ id: "b-intro", type: "richText", title: "مقدمة الخدمات", description: "نص تعريفي يسبق الخدمات.", enabled: true }] },
    { id: "projects", title: "المشاريع", slug: "/projects", status: "مسودة", updatedAt: "مسودة جديدة", blocks: [{ id: "b-projects", type: "image", title: "معرض المشاريع", description: "صور ونبذة موجزة لكل مشروع.", enabled: true }] },
  ],
  posts: [
    { id: "post-1", title: "بدء مرحلة البنية التحتية لمشروع جديد", excerpt: "مستجدات من أعمال التنفيذ والخدمات المرتبطة بالموقع.", status: "مسودة", updatedAt: "منذ ساعتين" },
    { id: "post-2", title: "دليل مختصر لتهيئة الموقع", excerpt: "نظرة عملية على أعمال التجهيز قبل بدء التنفيذ.", status: "منشورة", updatedAt: "منذ يومين" },
  ],
  templates: [
    { id: "tpl-hero", name: "مقدمة رئيسية", type: "hero", description: "عنوان، وصف، دعوة إجراء، وصورة خلفية.", fields: ["العنوان", "الوصف", "النص الإجرائي", "الصورة"] },
    { id: "tpl-text", name: "نص تحريري", type: "richText", description: "عنوان ومحتوى غني بعرض واضح.", fields: ["العنوان", "المحتوى"] },
    { id: "tpl-grid", name: "شبكة خدمات", type: "serviceGrid", description: "بطاقات متكررة لمجالات العمل.", fields: ["العنوان", "البطاقات", "رابط الإجراء"] },
    { id: "tpl-callout", name: "نداء إجراء", type: "callout", description: "قسم ختامي لدفع الزائر إلى التواصل.", fields: ["العنوان", "الوصف", "الرابط"] },
  ],
};

const storageKey = "btuc-cms-studio-v1";

export function loadCmsData(): CmsData {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as CmsData) : initialCmsData;
  } catch {
    return initialCmsData;
  }
}

export function saveCmsData(data: CmsData) {
  window.localStorage.setItem(storageKey, JSON.stringify(data));
}

export function createBlock(type: BlockType): Block {
  return { id: `block-${Date.now()}`, type, title: `وحدة ${blockLabels[type]} جديدة`, description: "أضف الوصف والمحتوى من لوحة الخصائص.", enabled: true };
}
