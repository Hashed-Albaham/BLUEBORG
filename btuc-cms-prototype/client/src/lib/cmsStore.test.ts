import { describe, expect, it } from "vitest";
import { createPageFromTemplate, createSection, createTemplateSections, initialCmsData, pageTemplates, sectionLabels } from "./cmsStore";

describe("نموذج محتوى BTUC", () => {
  it("يبدأ بالصفحة الرئيسية المنشورة وبالأقسام السبعة المطابقة للموقع", () => {
    const home = initialCmsData.pages.find((page) => page.id === "home");
    expect(home?.status).toBe("منشورة");
    expect(home?.sections.map((section) => section.type)).toEqual([
      "hero", "signals", "about", "services", "method", "projects", "contact",
    ]);
  });

  it("ينشئ قالبًا جديدًا بالاسم الصحيح ومعرّف مستقل", () => {
    const section = createSection("projects");
    expect(section.label).toBe(sectionLabels.projects);
    expect(section.title).toContain("جديد");
    expect(section.enabled).toBe(true);
    expect(section.id).toMatch(/^projects-/);
  });

  it("ينشئ صفحة تفاصيل مشروع بأقسام مؤسسية قابلة للتحرير وإعداد ترويسة", () => {
    const page = createPageFromTemplate("project-detail");
    expect(page.template).toBe("project-detail");
    expect(page.navVisible).toBe(true);
    expect(page.title).toBe(pageTemplates["project-detail"].label);
    expect(page.sections.map((section) => section.type)).toEqual(["hero", "about", "method", "projects", "contact"]);
  });

  it("يحافظ قالب الخدمات على تسلسل صفحة حلول متكاملة", () => {
    expect(createTemplateSections("services", "test").map((section) => section.type)).toEqual(["hero", "services", "method", "signals", "contact"]);
  });

  it("يوفر أقسامًا مستقلة لكل قالب صفحة احترافي", () => {
    (["home", "about", "services", "projects", "project-detail", "contact"] as const).forEach((template) => {
      const sections = createTemplateSections(template, template);
      expect(sections.length).toBeGreaterThanOrEqual(3);
      expect(sections[0].type).toBe("hero");
      expect(new Set(sections.map((section) => section.id)).size).toBe(sections.length);
    });
  });
});
