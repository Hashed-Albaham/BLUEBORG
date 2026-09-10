# GitHub Pages live check

Checked on 2026-09-10 after workflow run `34490463571` for commit `a6779a0`.

- URL: https://hashed-albaham.github.io/BLUEBORG/
- The response still begins with Jekyll SEO HTML and the repository README title (`BLUEBORG — مواقع البرج الأزرق المتحدة | BLUEBORG`), not the CMS Vite artifact.
- URL: https://hashed-albaham.github.io/BLUEBORG/404.html
- The response is GitHub Pages' generic `Page not found` document.
- GitHub Actions reported a successful artifact deployment and evaluated environment URL `https://hashed-albaham.github.io/BLUEBORG/`.

This indicates the repository Pages source is still serving the branch/Jekyll site or has not switched the active Pages source to the Actions deployment. The workflow itself builds `btuc-cms-prototype/dist/public` successfully and uploads the artifact.
