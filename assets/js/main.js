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

// وظائف عامة تُطبّق على كل الصفحات: تمييز كلمات العلامات وسلوك البطاقات الآمن للموبايل
document.addEventListener('DOMContentLoaded', () => {
    // التحكم في حجم الخط (صغير / عادي / كبير / كبير جداً) مع حفظ الإعداد
    const fontSizes = ["small", "medium", "large", "xlarge"];
    const storedFont = localStorage.getItem("fontSizePreference") || "medium";

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
