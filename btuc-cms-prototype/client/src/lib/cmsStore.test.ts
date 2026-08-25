import { describe, expect, it } from "vitest";
import { createSection, initialCmsData, sectionLabels } from "./cmsStore";

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
});
