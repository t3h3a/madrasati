// تحديث سنة الفوتر
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// إظهار قائمة الموبايل
const navToggle = document.getElementById("navToggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

// Smooth scroll للانتقالات بين الصفحات
document.documentElement.style.scrollBehavior = "smooth";

const translations = {
    ar: {
        "nav.home": "الرئيسية",
        "nav.gallery": "معرض الإنجازات",
        "nav.btec": "نظام BTEC",
        "nav.calculator": "حاسبة المعدل",
        "nav.videos": "فيديوهات توعوية",
        "nav.ai": "المساعد الذكي",
        "hero.title": "أهلاً بك في <span>مدرستي</span><br> مسار مميّز مع نظام <span>BTEC Pearson</span>",
        "hero.desc": "منصة تعليمية حديثة تجمع بين التعليم المدرسي الأردني ونظام التعليم المهني البريطاني BTEC في تخصصي <strong>تكنولوجيا المعلومات</strong> و<strong>الضيافة الفندقية</strong>.",
        "hero.cta": "جرّب المساعد الذكي",
        "ach1.title": "مدرسة وادي موسى الثانوية",
        "ach1.desc": "تقع المدرسة في مدينة وادي موسى – لواء البتـراء، وتقدّم تعليماً شاملاً من الصف التاسع حتى التوجيهي، مع مسار مهني مميز ضمن نظام BTEC البريطاني.",
        "ach1.stat1": "كوادر تعليمية متمرسة في المسار المهني والأكاديمي",
        "ach1.stat2": "مشاريع عملية تعكس واقع سوق العمل",
        "ach1.stat3": "توجيه فردي للطلاب ودعم في اتخاذ القرار المهني",
        "ach2.title": "مدرسة وادي موسى الثانوية",
        "ach2.desc": "تشمل مدرسة وادي موسى الثانوية الشاملة للبنين تدريس النظام البرطاني الجديد (BTEC) أو ما يسمّى بالعربية",
        "ach2.stat1": "134 طالب في مسار BTEC",
        "ach2.stat2": "59 تخصص تكنولوجيا المعلومات",
        "ach2.stat3": "74 الضيافة الفندقية",
        "ach3.title": "حاسبة معدل النظام البرطاني (BTEC)",
        "ach3.desc": "هذه واجهة متكاملة لحساب معدل التقارير والواجبات الخاصة بالطلاب.",
        "ach3.stat1": "تقييم (P) يعادل النجاح",
        "ach3.stat2": "تقييم (M) يعادل التفوق",
        "ach3.stat3": "تقييم (D) يعادل الامتياز",
        "ach4.title": "مدرسة وادي موسى الثانوية",
        "ach4.desc": "فيديوهات توعوية عن نظام بتيك في مدرستنا وكيف يصفه طلاب التخصص.",
        "ach4.stat1": "معلومات عن تخصصات البتيك في مدرستنا",
        "ach4.stat2": "تجربة التخصص من منظور الطلاب",
        "ach4.stat3": "فيديوهات قصيرة تشرح النظام",
        "ach5.title": "مدرسة وادي موسى الثانوية",
        "ach5.desc": "تتضمن الصفحة مساعداً ذكياً يقدم معلومات عن التخصصات والأنشطة داخل المدرسة.",
        "ach5.stat1": "معلومات عن تخصصات BTEC",
        "ach5.stat2": "معلومات عن المدرسة ومعلميها",
        "ach5.stat3": "إجابات عامة عن استفسارات الطلاب",
        "social.title": "ابقَ على تواصل مع <span>مدرستك</span>",
        "social.subtitle": "تواصل مباشر مع الإدارة عبر الواتساب، وتابع آخر الأخبار والإنجازات عبر صفحة فيسبوك.",
        "social.whatsapp.title": "الواتساب الرسمي للمدرسة",
        "social.whatsapp.desc": "تواصل مع الإدارة للإستفسارات حول التسجيل، الدوام، والتخصصات المتاحة.",
        "social.whatsapp.number": "+962 7 7724 4572",
        "social.whatsapp.action": "افتح محادثة واتساب",
        "social.facebook.title": "صفحة المدرسة على فيسبوك",
        "social.facebook.desc": "شاهد أحدث الأخبار، الأنشطة، والإنجازات اليومية لطلاب المدرسة.",
        "social.facebook.handle": "@WadiMusaSecondarySchool",
        "social.facebook.action": "انتقل إلى الصفحة",
        "footer.copyright": "© <span id=\"year\"></span> مدرسة وادي موسى الثانوية الشاملة للبنين",
        "footer.dev": "تصميم وبرمجة  <strong>الطالب ثائر محمد السلامين</strong>",
        "footer.support": "دعم لوجستي <strong>الطالب عمر راجي الهلالات</strong>",
        "footer.supervisor": "بإشراف  <strong>المهندس حسن النوافلة</strong>",
        "videos.title": "🎥 مكتبة الفيديوهات التعليمية",
        "videos.subtitle": "فيديوهات تساعدك تفهم نظام BTEC من الطلاب ومعلمي الاختصاص.",
        "videos.card1.title": "🔶 فيديو تعريفي عن تخصص الضيافة",
        "videos.card1.desc": "شرح بسيط عن المسار، وين بيشتغل الطالب، ومحتوى الدروس العملية والنظرية.",
        "videos.card2.title": "💻 رأي طلاب IT في نظام BTEC",
        "videos.card2.desc": "طلاب IT يشرحون تجربتهم مع المشاريع وكيف ساعدهم النظام يطوّروا مهاراتهم.",
        "videos.card3.title": "🚀 مشاريع طلاب BTEC",
        "videos.card3.desc": "عرض سريع لأفضل مشاريع نظام BTEC في المدرسة.",
        "settings.title": "الإعدادات",
        "settings.eyebrow": "التحكم الكامل",
        "settings.heading": "خصص تجربتك",
        "settings.lead": "غيّر اللغة، الألوان، وجرّب تسجيل الدخول التجريبي لتوحيد الإعدادات في كل الصفحات.",
        "settings.login.eyebrow": "الحساب",
        "settings.login.tag": "عرض تجريبي",
        "settings.login.title": "تسجيل الدخول",
        "settings.login.note": "البيانات تحفظ محلياً لتجربة الواجهة فقط.",
        "settings.login.email": "البريد الإلكتروني",
        "settings.login.password": "كلمة المرور",
        "settings.login.submit": "تسجيل الدخول",
        "settings.login.google": "تسجيل الدخول مع Google",
        "settings.login.stub": "تم حفظ بيانات الدخول محلياً (عرض فقط).",
        "settings.login.signedOut": "أنت غير مسجل دخول حالياً",
        "settings.login.signedIn": "مسجّل دخول كـ {email}",
        "settings.logout": "تسجيل الخروج",
        "settings.colors.eyebrow": "الألوان",
        "settings.colors.title": "ألوان الصفحات",
        "settings.colors.tag": "متزامنة مع كل الصفحات",
        "settings.colors.note": "اختر لوحة هادئة تناسب ذوقك، وستطبق على كل الصفحات.",
        "settings.colors.classic": "أزرق مدرسي",
        "settings.colors.classicDesc": "اللون الأزرق مع برتقالي دافئ.",
        "settings.colors.oasis": "أخضر حكيم",
        "settings.colors.oasisDesc": "درجات نعناع ورمال مريحة.",
        "settings.colors.dusk": "سماء هادئة",
        "settings.colors.duskDesc": "سماوي مع وردي خفيف.",
        "settings.lang.eyebrow": "اللغة",
        "settings.lang.title": "اللغة",
        "settings.lang.tag": "ينطبق على كل الصفحات",
        "settings.lang.note": "بدّل بين العربية والإنجليزية لكل الواجهة.",
        "settings.lang.ar": "العربية",
        "settings.lang.en": "English"
    },
    en: {
        "nav.home": "Home",
        "nav.gallery": "Gallery",
        "nav.btec": "BTEC System",
        "nav.calculator": "GPA Calculator",
        "nav.videos": "Awareness Videos",
        "nav.ai": "AI Assistant",
        "hero.title": "Welcome to <span>Madrasati</span><br> A distinctive path with <span>BTEC Pearson</span>",
        "hero.desc": "A modern platform that blends Jordanian schooling with the British BTEC vocational track in <strong>Information Technology</strong> and <strong>Hospitality</strong>.",
        "hero.cta": "Try the smart assistant",
        "ach1.title": "Wadi Musa Secondary School",
        "ach1.desc": "Located in Wadi Musa – Petra district, offering education from 9th grade to Tawjihi with a standout BTEC vocational pathway.",
        "ach1.stat1": "Experienced educators in academic and vocational tracks",
        "ach1.stat2": "Hands-on projects that mirror real workplaces",
        "ach1.stat3": "Personal guidance to help students choose their path",
        "ach2.title": "Wadi Musa Secondary School",
        "ach2.desc": "The school teaches the British BTEC system for our male students.",
        "ach2.stat1": "134 students on the BTEC track",
        "ach2.stat2": "59 students in IT",
        "ach2.stat3": "74 students in Hospitality",
        "ach3.title": "BTEC GPA Calculator",
        "ach3.desc": "A complete interface to calculate coursework averages for students.",
        "ach3.stat1": "(P) grade equals Pass",
        "ach3.stat2": "(M) grade equals Merit",
        "ach3.stat3": "(D) grade equals Distinction",
        "ach4.title": "Wadi Musa Secondary School",
        "ach4.desc": "Awareness videos about BTEC from our students’ perspective.",
        "ach4.stat1": "Details about BTEC majors at our school",
        "ach4.stat2": "How students describe the experience",
        "ach4.stat3": "Extra clips and short explainers",
        "ach5.title": "Wadi Musa Secondary School",
        "ach5.desc": "A smart assistant that shares answers about majors, teachers, and school life.",
        "ach5.stat1": "Details about BTEC majors",
        "ach5.stat2": "Info about the school and teachers",
        "ach5.stat3": "General answers for students",
        "social.title": "Stay connected with your <span>school</span>",
        "social.subtitle": "Chat directly with administration on WhatsApp and follow daily updates on Facebook.",
        "social.whatsapp.title": "Official school WhatsApp",
        "social.whatsapp.desc": "Reach admin for questions on enrollment, schedules, and available majors.",
        "social.whatsapp.number": "+962 7 7724 4572",
        "social.whatsapp.action": "Open WhatsApp chat",
        "social.facebook.title": "School page on Facebook",
        "social.facebook.desc": "See the latest news, activities, and daily achievements.",
        "social.facebook.handle": "@WadiMusaSecondarySchool",
        "social.facebook.action": "Go to the page",
        "footer.copyright": "© <span id=\"year\"></span> Wadi Musa Comprehensive Secondary School for Boys",
        "footer.dev": "Designed & built by <strong>student Thaer Mohammad Al-Salamin</strong>",
        "footer.support": "Logistics support <strong>student Omar Raji Al-Helalat</strong>",
        "footer.supervisor": "Supervised by <strong>Eng. Hasan Al-Nawafleh</strong>",
        "videos.title": "🎥 Video Library",
        "videos.subtitle": "Clips that help you understand the BTEC system from students and teachers.",
        "videos.card1.title": "🔶 Intro to Hospitality",
        "videos.card1.desc": "A short overview of the track, workplaces, and course content.",
        "videos.card2.title": "💻 IT students talk BTEC",
        "videos.card2.desc": "How IT students used projects to grow their skills.",
        "videos.card3.title": "🚀 BTEC student projects",
        "videos.card3.desc": "A quick tour of standout BTEC projects at school.",
        "settings.title": "Settings",
        "settings.eyebrow": "Full control",
        "settings.heading": "Personalize your experience",
        "settings.lead": "Change language, colors, and try the mock sign-in so everything stays consistent across pages.",
        "settings.login.eyebrow": "Account",
        "settings.login.tag": "Demo only",
        "settings.login.title": "Sign in",
        "settings.login.note": "Data is stored locally for a front-end preview only.",
        "settings.login.email": "Email address",
        "settings.login.password": "Password",
        "settings.login.submit": "Sign in",
        "settings.login.google": "Continue with Google",
        "settings.login.stub": "Login details saved locally (UI only).",
        "settings.login.signedOut": "You are not signed in",
        "settings.login.signedIn": "Signed in as {email}",
        "settings.logout": "Sign out",
        "settings.colors.eyebrow": "Colors",
        "settings.colors.title": "Color themes",
        "settings.colors.tag": "Syncs across all pages",
        "settings.colors.note": "Pick a calm palette that fits every page.",
        "settings.colors.classic": "School blue",
        "settings.colors.classicDesc": "Blue with a warm orange accent.",
        "settings.colors.oasis": "Sage oasis",
        "settings.colors.oasisDesc": "Mint and sand for a soft vibe.",
        "settings.colors.dusk": "Calm sky",
        "settings.colors.duskDesc": "Sky blue with a gentle rose tone.",
        "settings.lang.eyebrow": "Language",
        "settings.lang.title": "Language",
        "settings.lang.tag": "Applies to all pages",
        "settings.lang.note": "Switch the full interface between Arabic and English.",
        "settings.lang.ar": "Arabic",
        "settings.lang.en": "English"
    }
};

const colorSchemes = {
    classic: {
        vars: {
            "--accent-primary": "#2563eb",
            "--accent-secondary": "#f97316",
            "--accent-soft": "rgba(37, 99, 235, 0.12)",
            "--bg-gradient-from": "#f7f9ff",
            "--bg-gradient-to": "#eef2ff",
            "--hero-overlay": "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
            "--surface-muted": "#f8fafc",
            "--surface-card": "#ffffff"
        }
    },
    oasis: {
        vars: {
            "--accent-primary": "#2a9d8f",
            "--accent-secondary": "#e9c46a",
            "--accent-soft": "rgba(42, 157, 143, 0.14)",
            "--bg-gradient-from": "#f1f8f5",
            "--bg-gradient-to": "#e9f1ec",
            "--hero-overlay": "linear-gradient(to bottom, rgba(13,94,84,0.55), rgba(6,45,38,0.8))",
            "--surface-muted": "#f4faf6",
            "--surface-card": "#ffffff"
        }
    },
    dusk: {
        vars: {
            "--accent-primary": "#0ea5e9",
            "--accent-secondary": "#fb7185",
            "--accent-soft": "rgba(14,165,233,0.16)",
            "--bg-gradient-from": "#f4f7ff",
            "--bg-gradient-to": "#e9f3ff",
            "--hero-overlay": "linear-gradient(to bottom, rgba(8,47,73,0.6), rgba(4,24,44,0.85))",
            "--surface-muted": "#f6f9ff",
            "--surface-card": "#ffffff"
        }
    }
};

function applyColorScheme(schemeKey) {
    const scheme = colorSchemes[schemeKey] || colorSchemes.classic;
    Object.entries(scheme.vars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem("colorSchemePreference", schemeKey);
    document.querySelectorAll("[data-color-scheme]").forEach(card => {
        card.classList.toggle("active", card.dataset.colorScheme === schemeKey);
    });
}

function applyLanguage(lang) {
    const targetLang = lang === "en" ? "en" : "ar";
    document.documentElement.lang = targetLang;
    document.documentElement.dir = targetLang === "en" ? "ltr" : "rtl";
    document.body.setAttribute("data-lang", targetLang);
    localStorage.setItem("appLanguage", targetLang);
    applyGoogleTranslate(targetLang);

    document.querySelectorAll("[data-i18n], [data-i18n-placeholder], [data-i18n-label], [data-i18n-title]").forEach(el => {
        const key = el.dataset.i18n;
        const placeholderKey = el.dataset.i18nPlaceholder;
        if (key && translations[targetLang]?.[key]) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.value = "";
                el.placeholder = translations[targetLang][key];
            } else {
                el.innerHTML = translations[targetLang][key];
            }
        }
        if (placeholderKey && translations[targetLang]?.[placeholderKey]) {
            el.placeholder = translations[targetLang][placeholderKey];
        }
        if (el.dataset.i18nLabel && translations[targetLang]?.[el.dataset.i18nLabel]) {
            el.setAttribute("aria-label", translations[targetLang][el.dataset.i18nLabel]);
        }
        if (el.dataset.i18nTitle && translations[targetLang]?.[el.dataset.i18nTitle]) {
            el.setAttribute("title", translations[targetLang][el.dataset.i18nTitle]);
        }
    });

    document.querySelectorAll(".language-switch button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === targetLang);
    });
}

/* ===================== Google Translate (ar/en) ===================== */
let googleScriptRequested = false;
let googleInitialized = false;

function setTranslateCookie(lang) {
    const domain = window.location.hostname;
    const base = `googtrans=/ar/${lang}`;
    document.cookie = `${base};path=/;`;
    if (domain && domain !== "localhost") {
        document.cookie = `${base};domain=${domain};path=/;`;
    }
}

function applyGoogleTranslate(lang) {
    const target = lang === "en" ? "en" : "ar";
    setTranslateCookie(target);
    if (target === "ar") return;
    loadGoogleTranslate();
}

function loadGoogleTranslate() {
    if (googleInitialized || googleScriptRequested) return;
    googleScriptRequested = true;
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=__googleTranslateInit";
    script.async = true;
    document.head.appendChild(script);

    window.__googleTranslateInit = function () {
        googleInitialized = true;
        if (!document.getElementById("google_translate_element")) {
            const holder = document.createElement("div");
            holder.id = "google_translate_element";
            holder.style.display = "none";
            document.body.appendChild(holder);
        }
        new google.translate.TranslateElement({
            pageLanguage: "ar",
            includedLanguages: "ar,en",
            autoDisplay: false
        }, "google_translate_element");
    };
}

function initSettingsPage() {
    if (document.body.dataset.page !== "settings") return;

    const loginForm = document.getElementById("settingsLogin");
    const logoutBtn = document.getElementById("logoutBtn");
    const statusEl = document.getElementById("settingsStatus");
    const googleMock = document.getElementById("googleMock");
    const paletteCards = document.querySelectorAll("[data-color-scheme]");
    const langButtons = document.querySelectorAll(".settings-lang button");

    if (googleMock) {
        googleMock.setAttribute("disabled", "disabled");
    }

    paletteCards.forEach(card => {
        card.addEventListener("click", () => applyColorScheme(card.dataset.colorScheme));
    });

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => applyLanguage(btn.dataset.lang || "ar"));
    });
}

// وظائف عامة تُطبّق على كل الصفحات: تمييز كلمات العلامات وسلوك البطاقات الآمن للموبايل
document.addEventListener('DOMContentLoaded', () => {
    // التحكم في حجم الخط (صغير / عادي / كبير / كبير جداً) مع حفظ الإعداد
    const fontSizes = ["small", "medium", "large", "xlarge"];
    const storedFont = localStorage.getItem("fontSizePreference") || "medium";
    const storedLang = localStorage.getItem("appLanguage") || document.documentElement.lang || "ar";
    const storedScheme = localStorage.getItem("colorSchemePreference") || "classic";

    applyLanguage(storedLang);
    applyColorScheme(storedScheme);

    // حاوية مخفية لترجمة جوجل إن لم تكن موجودة
    if (!document.getElementById("google_translate_element")) {
        const holder = document.createElement("div");
        holder.id = "google_translate_element";
        holder.style.display = "none";
        document.body.appendChild(holder);
    }

    function setFontSize(size) {
        if (!fontSizes.includes(size)) return;
        if (size === "medium") {
            document.documentElement.removeAttribute("data-font-size");
        } else {
            document.documentElement.setAttribute("data-font-size", size);
        }
        localStorage.setItem("fontSizePreference", size);
        document.querySelectorAll(".font-size-toggle button").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.size === size);
        });
    }

    // وضع الإعداد المخزن مباشرة عند التحميل
    setFontSize(storedFont);

    // إنشاء أزرار التبديل وحقنها في الهيدر
    (function injectFontSizeToggle() {
        const themeToggle = document.getElementById("themeToggle");
        const navToggleBtn = document.getElementById("navToggle");
        if (!themeToggle || !navToggleBtn) return;

        const wrapper = document.createElement("div");
        wrapper.className = "font-size-toggle";
        wrapper.innerHTML = `
            <button type="button" class="fs-trigger" aria-label="تغيير حجم الخط">T</button>
            <div class="fs-menu" role="menu">
                <button type="button" class="fs-option" data-size="small" role="menuitem"><span>-</span>صغير</button>
                <button type="button" class="fs-option" data-size="medium" role="menuitem"><span>T</span>عادي</button>
                <button type="button" class="fs-option" data-size="large" role="menuitem"><span>+</span>كبير</button>
                <button type="button" class="fs-option" data-size="xlarge" role="menuitem"><span>+</span>كبير جداً</button>
            </div>
        `;

        const trigger = wrapper.querySelector(".fs-trigger");
        const menu = wrapper.querySelector(".fs-menu");
        const options = wrapper.querySelectorAll(".fs-option");

        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            wrapper.classList.toggle("open");
        });

        options.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                setFontSize(btn.dataset.size);
                wrapper.classList.remove("open");
            });
        });

        document.addEventListener("click", () => wrapper.classList.remove("open"));

        themeToggle.parentElement.insertBefore(wrapper, navToggleBtn);
        setFontSize(storedFont);
    })();

    initSettingsPage();
    // إزالة شريط ترجمة جوجل إذا ظهر
    setTimeout(() => {
        document.querySelectorAll(".goog-te-banner-frame, .goog-te-gadget, .skiptranslate").forEach(el => {
            el.style.display = "none";
        });
        document.body.style.top = "0px";
    }, 500);
    // --- تمييز الكلمات (BTEC / بتيك) و (Pearson / بيرسون) ---
    function highlightKeywords(root = document.body) {
        const patterns = [
            {re: /\b(BTEC|بتيك)\b/gi, cls: 'kw-btec'},
            {re: /\b(Pearson|بيرسون)\b/gi, cls: 'kw-pearson'}
        ];

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentNode;
                if (!parent) return NodeFilter.FILTER_REJECT;
                const skipTags = ['SCRIPT','STYLE','CODE','A','BUTTON','TEXTAREA','INPUT','NOSCRIPT'];
                if (skipTags.includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(textNode => {
            let text = textNode.nodeValue;
            let matched = false;
            patterns.forEach(p => { p.re.lastIndex = 0; if (p.re.test(text)) matched = true; });
            if (!matched) return;

            let replaced = text;
            patterns.forEach(p => {
                replaced = replaced.replace(p.re, match => `<span class="${p.cls}">${match}</span>`);
            });

            const wrapper = document.createElement('span');
            wrapper.innerHTML = replaced;
            textNode.parentNode.replaceChild(wrapper, textNode);
        });
    }

    highlightKeywords();

    // --- سلوك البطاقات: تأثير للماوس فقط، ولمس (tap) بسيط للموبايل دون تعطيل التمرير ---
    const cards = document.querySelectorAll('.info-card, .major-card, .level-box, .project-card');

    cards.forEach(card => {
        // سلوك ثابت بلا تحريك للبطاقات لضمان سلاسة التمرير خصوصاً على الموبايل
        card.style.willChange = 'auto';
    });

    // --- سلايدر خاص بصفحة BTEC إذا كانت موجودة ---
    const btecSlides = document.querySelectorAll('.btec-hero-slider .btec-slide');
    if (btecSlides.length > 0) {
        let btecSliderIndex = 0;
        function switchBtecBackground() {
            btecSlides.forEach((slide, i) => {
                if (i === btecSliderIndex) slide.classList.add('active'); else slide.classList.remove('active');
            });
            btecSliderIndex = (btecSliderIndex + 1) % btecSlides.length;
        }
        switchBtecBackground();
        setInterval(switchBtecBackground, 5000);
    }
});
