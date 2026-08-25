/**
 * تصميم لوحة الإدارة: «المحرر التنفيذي» — مساحة هادئة ذات تسلسل عمل واضح.
 * تُدار الصفحات والوحدات كطبقات محتوى قابلة للإضافة والترتيب والتعديل.
 */
import { useEffect, useMemo, useState } from "react";
import "../admin.css";
import {
  ArrowDown,
  ArrowUp,
  Blocks,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  FilePlus2,
  FileText,
  LayoutTemplate,
  Menu,
  MoreHorizontal,
  Newspaper,
  PanelRightClose,
  Plus,
  Save,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { blockLabels, createBlock, loadCmsData, saveCmsData, type BlockType, type CmsData, type CmsPage } from "@/lib/cmsStore";

type AdminView = "overview" | "pages" | "posts" | "templates" | "settings";

const navItems: Array<{ id: AdminView; label: string; icon: typeof ClipboardList }> = [
  { id: "overview", label: "نظرة عامة", icon: ClipboardList },
  { id: "pages", label: "الصفحات", icon: FileText },
  { id: "posts", label: "المنشورات", icon: Newspaper },
  { id: "templates", label: "مكتبة القوالب", icon: LayoutTemplate },
  { id: "settings", label: "التكامل والإعدادات", icon: Settings2 },
];

function updateSelectedPage(data: CmsData, pageId: string, updater: (page: CmsPage) => CmsPage) {
  return { ...data, pages: data.pages.map((page) => (page.id === pageId ? updater(page) : page)) };
}

export default function AdminStudio() {
  const [data, setData] = useState<CmsData>(() => loadCmsData());
  const [view, setView] = useState<AdminView>("overview");
  const [selectedPageId, setSelectedPageId] = useState("home");
  const [blockType, setBlockType] = useState<BlockType>("richText");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("تم تحميل مساحة العمل المحلية.");

  const selectedPage = useMemo(() => data.pages.find((page) => page.id === selectedPageId) ?? data.pages[0], [data.pages, selectedPageId]);

  useEffect(() => { saveCmsData(data); }, [data]);

  const persist = (next: CmsData, message: string) => {
    setData(next);
    setNotice(message);
  };

  const addPage = () => {
    const id = `page-${Date.now()}`;
    const page: CmsPage = { id, title: "صفحة جديدة", slug: "/new-page", status: "مسودة", updatedAt: "الآن", blocks: [] };
    persist({ ...data, pages: [...data.pages, page] }, "أُنشئت صفحة جديدة كمسودة.");
    setSelectedPageId(id);
    setView("pages");
  };

  const addBlock = () => {
    const next = updateSelectedPage(data, selectedPage.id, (page) => ({ ...page, blocks: [...page.blocks, createBlock(blockType)], updatedAt: "الآن" }));
    persist(next, `أُضيف قالب «${blockLabels[blockType]}» إلى الصفحة.`);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const next = updateSelectedPage(data, selectedPage.id, (page) => {
      const target = index + direction;
      if (target < 0 || target >= page.blocks.length) return page;
      const blocks = [...page.blocks];
      [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
      return { ...page, blocks, updatedAt: "الآن" };
    });
    persist(next, "تم تحديث ترتيب الوحدات.");
  };

  const updateBlock = (blockId: string, field: "title" | "description" | "enabled", value: string | boolean) => {
    const next = updateSelectedPage(data, selectedPage.id, (page) => ({
      ...page,
      blocks: page.blocks.map((block) => (block.id === blockId ? { ...block, [field]: value } : block)),
      updatedAt: "الآن",
    }));
    setData(next);
  };

  const deleteBlock = (blockId: string) => persist(updateSelectedPage(data, selectedPage.id, (page) => ({ ...page, blocks: page.blocks.filter((block) => block.id !== blockId), updatedAt: "الآن" })), "حُذفت الوحدة من الصفحة.");

  const updatePageField = (field: "title" | "slug", value: string) => setData(updateSelectedPage(data, selectedPage.id, (page) => ({ ...page, [field]: value, updatedAt: "الآن" })));
  const publishPage = () => persist(updateSelectedPage(data, selectedPage.id, (page) => ({ ...page, status: "منشورة", updatedAt: "الآن" })), "نُشرت الصفحة في مساحة المحتوى.");

  const addPost = () => {
    persist({ ...data, posts: [{ id: `post-${Date.now()}`, title: "منشور جديد", excerpt: "اكتب ملخصًا موجزًا للمنشور.", status: "مسودة", updatedAt: "الآن" }, ...data.posts] }, "أُنشئ منشور جديد كمسودة.");
    setView("posts");
  };

  return (
    <div className="cms-studio" dir="rtl">
      <aside className={`cms-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="cms-brand"><span className="cms-mark"><Blocks size={18} /></span><div><b>BTUC CMS</b><small>مساحة المحتوى</small></div><button type="button" className="cms-mobile-close" onClick={() => setSidebarOpen(false)} aria-label="إغلاق القائمة"><X size={19} /></button></div>
        <a className="cms-site-link" href="/">عرض الموقع العام <ChevronLeft size={15} /></a>
        <nav className="cms-nav" aria-label="تنقل لوحة الإدارة">
          {navItems.map((item) => { const Icon = item.icon; return <button type="button" className={view === item.id ? "is-active" : ""} key={item.id} onClick={() => { setView(item.id); setSidebarOpen(false); }}><Icon size={18} />{item.label}</button>; })}
        </nav>
        <div className="cms-sidebar-note"><Sparkles size={16} /><p><b>وضع تجريبي</b>يحفظ التعديل محليًا إلى حين وصل خدمة المحتوى.</p></div>
      </aside>

      <main className="cms-main">
        <header className="cms-topbar"><button className="cms-menu" type="button" onClick={() => setSidebarOpen(true)} aria-label="فتح القائمة"><Menu size={21} /></button><div><span className="cms-breadcrumb">لوحة الإدارة / {navItems.find((item) => item.id === view)?.label}</span><h1>{view === "pages" ? selectedPage.title : navItems.find((item) => item.id === view)?.label}</h1></div><div className="cms-top-actions"><span className="cms-sync"><CheckCircle2 size={15} />محفوظ محليًا</span><button className="cms-primary" type="button" onClick={view === "posts" ? addPost : addPage}><Plus size={17} />{view === "posts" ? "منشور جديد" : "صفحة جديدة"}</button></div></header>
        <div className="cms-notice"><CheckCircle2 size={15} />{notice}</div>

        {view === "overview" && <section className="cms-content cms-overview"><div className="cms-hero-card"><div><span className="cms-eyebrow">BTUC CMS STUDIO</span><h2>أدِر الموقع <em>بوحدات مرنة.</em></h2><p>أضف صفحة أو منشورًا، ثم رتّب القوالب داخلها لتنشئ تجربة محتوى متماسكة من دون إعادة بناء الواجهة كل مرة.</p><button className="cms-inverse" type="button" onClick={() => setView("pages")}>ابدأ من الصفحات <ChevronLeft size={16} /></button></div><div className="cms-hero-stats"><span>الصفحات<b>{data.pages.length}</b></span><span>المنشورات<b>{data.posts.length}</b></span><span>القوالب<b>{data.templates.length}</b></span></div></div><div className="cms-kpi-grid"><article><span>الصفحات المنشورة</span><b>{data.pages.filter((page) => page.status === "منشورة").length}</b><small>قابلة للإدارة عبر الوحدات</small></article><article><span>الوحدات النشطة</span><b>{data.pages.reduce((total, page) => total + page.blocks.filter((block) => block.enabled).length, 0)}</b><small>مرتبة داخل الصفحات</small></article><article><span>مسودات تنتظر المراجعة</span><b>{data.posts.filter((post) => post.status === "مسودة").length}</b><small>منشورات وصفحات</small></article></div><section className="cms-recent"><div className="cms-section-heading"><div><span>المحتوى الأخير</span><h3>تابع ما يحتاج إلى مراجعة</h3></div><button type="button" onClick={() => setView("posts")}>كل المنشورات <ChevronLeft size={15} /></button></div>{data.posts.map((post) => <article key={post.id}><span className="cms-file-icon"><Newspaper size={17} /></span><div><b>{post.title}</b><p>{post.excerpt}</p></div><small className={post.status === "منشورة" ? "status-published" : "status-draft"}>{post.status}</small><time>{post.updatedAt}</time><MoreHorizontal size={19} /></article>)}</section></section>}

        {view === "pages" && <section className="cms-content cms-pages-layout"><div className="cms-page-list"><div className="cms-panel-title"><div><span>الصفحات</span><h3>هيكل الموقع</h3></div><button type="button" onClick={addPage} aria-label="إضافة صفحة"><Plus size={18} /></button></div>{data.pages.map((page) => <button type="button" key={page.id} className={page.id === selectedPage.id ? "is-selected" : ""} onClick={() => setSelectedPageId(page.id)}><FileText size={17} /><span><b>{page.title}</b><small>{page.slug}</small></span><i className={page.status === "منشورة" ? "status-published" : "status-draft"}>{page.status}</i></button>)}</div><div className="cms-page-editor"><div className="cms-editor-heading"><div><span>تحرير الصفحة</span><h2>{selectedPage.title}</h2></div><button className="cms-primary" type="button" onClick={publishPage}><Save size={16} />نشر التحديثات</button></div><div className="cms-page-fields"><label>عنوان الصفحة<input value={selectedPage.title} onChange={(event) => updatePageField("title", event.target.value)} /></label><label>المسار<input dir="ltr" value={selectedPage.slug} onChange={(event) => updatePageField("slug", event.target.value)} /></label></div><div className="cms-builder-title"><div><span>منشئ الصفحة</span><h3>وحدات الصفحة</h3></div><div className="cms-add-block"><select value={blockType} onChange={(event) => setBlockType(event.target.value as BlockType)}>{Object.entries(blockLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><button type="button" onClick={addBlock}><Plus size={15} />إضافة وحدة</button></div></div><div className="cms-blocks">{selectedPage.blocks.length === 0 && <div className="cms-empty"><Blocks size={24} /><b>لا توجد وحدات بعد</b><span>اختر قالبًا ثم أضفه لبدء بناء الصفحة.</span></div>}{selectedPage.blocks.map((block, index) => <article className={`cms-block ${block.enabled ? "" : "is-disabled"}`} key={block.id}><div className="cms-block-handle"><Blocks size={17} /></div><div className="cms-block-main"><div className="cms-block-meta"><span>{blockLabels[block.type]}</span><label className="cms-switch"><input type="checkbox" checked={block.enabled} onChange={(event) => updateBlock(block.id, "enabled", event.target.checked)} /><i /></label></div><input value={block.title} aria-label="عنوان الوحدة" onChange={(event) => updateBlock(block.id, "title", event.target.value)} /><textarea value={block.description} aria-label="وصف الوحدة" onChange={(event) => updateBlock(block.id, "description", event.target.value)} /></div><div className="cms-block-actions"><button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} aria-label="نقل للأعلى"><ArrowUp size={16} /></button><button type="button" onClick={() => moveBlock(index, 1)} disabled={index === selectedPage.blocks.length - 1} aria-label="نقل للأسفل"><ArrowDown size={16} /></button><button type="button" onClick={() => deleteBlock(block.id)} aria-label="حذف الوحدة"><Trash2 size={16} /></button></div></article>)}</div></div><aside className="cms-inspector"><div className="cms-panel-title"><div><span>خصائص الصفحة</span><h3>ملخص التنفيذ</h3></div><SlidersHorizontal size={17} /></div><dl><div><dt>الحالة</dt><dd className={selectedPage.status === "منشورة" ? "status-published" : "status-draft"}>{selectedPage.status}</dd></div><div><dt>آخر تحديث</dt><dd>{selectedPage.updatedAt}</dd></div><div><dt>عدد الوحدات</dt><dd>{selectedPage.blocks.length}</dd></div></dl><div className="cms-inspector-note"><BookOpen size={16} /><p>يمكن تغيير ترتيب الوحدات من الأسهم، أو إخفاؤها مؤقتًا دون حذف بياناتها.</p></div></aside></section>}

        {view === "posts" && <section className="cms-content"><div className="cms-section-heading"><div><span>إدارة المنشورات</span><h2>المحتوى التحريري</h2></div><button className="cms-primary" type="button" onClick={addPost}><FilePlus2 size={16} />منشور جديد</button></div><div className="cms-post-table"><div className="cms-table-head"><span>العنوان</span><span>الحالة</span><span>آخر تحديث</span><span /></div>{data.posts.map((post) => <article key={post.id}><div><b>{post.title}</b><p>{post.excerpt}</p></div><i className={post.status === "منشورة" ? "status-published" : "status-draft"}>{post.status}</i><time>{post.updatedAt}</time><button type="button" onClick={() => setNotice("يمكن توسيع محرر المنشور بإضافة حقول الصور وSEO عند ربط قاعدة البيانات.")}><MoreHorizontal size={19} /></button></article>)}</div></section>}

        {view === "templates" && <section className="cms-content"><div className="cms-section-heading"><div><span>وحدات قابلة لإعادة الاستخدام</span><h2>مكتبة القوالب</h2></div><button className="cms-primary" type="button" onClick={() => { setBlockType("richText"); setView("pages"); setNotice("اخترت قالب النص التحريري لإضافته إلى الصفحة."); }}><Plus size={16} />استخدام قالب</button></div><div className="cms-template-grid">{data.templates.map((template) => <article key={template.id}><span className="cms-template-icon"><LayoutTemplate size={19} /></span><h3>{template.name}</h3><p>{template.description}</p><div>{template.fields.map((field) => <small key={field}>{field}</small>)}</div><button type="button" onClick={() => { setBlockType(template.type); setView("pages"); setNotice(`قالب «${template.name}» جاهز للإضافة.`); }}>إضافة إلى صفحة <ChevronLeft size={15} /></button></article>)}</div></section>}

        {view === "settings" && <section className="cms-content cms-settings"><div className="cms-section-heading"><div><span>قابلية الربط</span><h2>تكامل PHP وMySQL</h2></div></div><div className="cms-integration-card"><div><span className="cms-file-icon"><PanelRightClose size={18} /></span><h3>طبقة بيانات قابلة للتبديل</h3><p>النموذج يستخدم التخزين المحلي للتجربة، ويضم عميل REST في <code>client/src/lib/phpClient.ts</code> لتفعيل خدمة PHP عند توفير عنوان الواجهة.</p></div><span className="cms-ready-badge"><CheckCircle2 size={15} />جاهز للربط</span></div><div className="cms-endpoints"><h3>عقد الواجهة المقترح</h3><article><b>GET <code>/health</code></b><span>فحص جاهزية خدمة المحتوى.</span></article><article><b>GET <code>/content</code></b><span>قراءة الصفحات والمنشورات والقوالب.</span></article><article><b>PUT <code>/content</code></b><span>حفظ بنية المحتوى كاملة بشكل آمن.</span></article></div><div className="cms-inspector-note"><Settings2 size={16} /><p>ستجد نموذج API وخطّة قاعدة البيانات في مجلد <code>php-api</code> عند تصدير المشروع. تحتاج الاستضافة النهائية إلى PHP 8.2+ وMySQL 8.0+ أو MariaDB 10.6+.</p></div></section>}
      </main>
    </div>
  );
}
