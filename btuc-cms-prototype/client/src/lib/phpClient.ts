/** عميل REST جاهز لربط لوحة الإدارة بخدمة PHP/MySQL بعد تعيين VITE_CMS_API_BASE_URL. */
import type { CmsData } from "./cmsStore";

const apiBase = import.meta.env.VITE_CMS_API_BASE_URL?.replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiBase) throw new Error("لم يُضبط عنوان واجهة PHP بعد.");
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    credentials: "include",
  });
  if (!response.ok) throw new Error("تعذر الاتصال بخدمة المحتوى.");
  return response.json() as Promise<T>;
}

export const phpClient = {
  health: () => request<{ ok: boolean }>("/health"),
  getContent: () => request<CmsData>("/content"),
  saveContent: (data: CmsData) => request<CmsData>("/content", { method: "PUT", body: JSON.stringify(data) }),
};
