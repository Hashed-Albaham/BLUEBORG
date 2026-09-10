# BLUEBORG — مواقع البرج الأزرق المتحدة

يضم هذا المستودع نسختين منفصلتين لموقع شركة البرج الأزرق المتحدة، لتبقى النسخة التعريفية الحالية مستقرة بينما تُطوّر لوحة إدارة المحتوى في مساحة اختبار مستقلة.

| المجلد | الغرض | التشغيل |
|---|---|---|
| `btuc-current` | النسخة التعريفية الحالية للموقع | `pnpm install` ثم `pnpm dev` |
| `btuc-cms-prototype` | نموذج لوحة إدارة المحتوى ومسار تكامل PHP/MySQL | `pnpm install` ثم `pnpm dev` ثم افتح `/admin` |

## المتطلبات

يلزم Node.js 22 أو أحدث وpnpm 10 أو أحدث. تثبت كل نسخة اعتمادياتها بصورة مستقلة داخل مجلدها.

```bash
git clone https://github.com/Hashed-Albaham/BLUEBORG.git
cd BLUEBORG

# شغّل النسخة التعريفية الحالية
cd btuc-current
pnpm install
pnpm dev
```

ولتجربة لوحة التحكم، افتح طرفية جديدة ثم نفّذ:

```bash
cd BLUEBORG/btuc-cms-prototype
pnpm install
pnpm dev
```

بعدها افتح `http://localhost:3000/admin`. تسمح لوحة الإدارة بإضافة الصفحات والمنشورات، واختيار القوالب، وإضافة الوحدات وتعديلها وترتيبها. في وضع التجربة تحفظ البيانات محليًا في المتصفح؛ ويوفّر مجلد `btuc-cms-prototype/php-api` مخطط MySQL وخدمة PHP مرجعية للربط اللاحق.

## النشر على Coolify / Koyeb

المستودع يحتوي مشروعين، لذلك لا يكفي أن يقرأ النظام `package.json` من الجذر. أضيف `Dockerfile` في جذر المستودع ليبني ويشغّل `btuc-cms-prototype` تلقائيًا، ويقرأ التطبيق المنفذ من `PORT` الذي توفره منصة الاستضافة.

في Coolify، اربط المستودع `Hashed-Albaham/BLUEBORG` بالفرع `main`، واترك **Build Pack = Dockerfile** و**Dockerfile Location = `/Dockerfile`** و**Build Context = `/`**. لا تضبط Root Directory على `btuc-cms-prototype` عند استخدام Dockerfile الجذري؛ فالـ Dockerfile يحتاج مجلدي المشروعين داخل سياق البناء. اترك حقل المنفذ على `3000` أو استخدم منفذ التطبيق الذي تعرضه Coolify، لأن الخادم يدعم `PORT` ديناميكيًا. أمر التشغيل مضمّن داخل Dockerfile ولا تحتاج إلى `start.sh`.

في حال اختيار Railpack بدل Dockerfile، اضبط Root Directory على `/btuc-cms-prototype`، وBuild Command على `pnpm install --frozen-lockfile && pnpm build`، وStart Command على `pnpm start`، وPort على `3000`. لكن خيار Dockerfile الجذري هو الأنسب لهذا المستودع متعدد المشاريع.

## فحص ما قبل النشر

نفّذ الأوامر التالية داخل أي مجلد مشروع قبل النشر:

```bash
pnpm check
pnpm build
pnpm start
```

> لا تُنشر ملفات `config.php` أو ملفات `.env` التي تحتوي على بيانات اتصال فعلية. استخدم ملفات الأمثلة المرفقة فقط، ثم أضف البيانات السرية إلى بيئة الاستضافة.
