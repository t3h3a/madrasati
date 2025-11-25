// حارس الدخول: يمنع عرض الموقع بدون تسجيل دخول
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJDPg-KcDOrQN8VAGM0B7GEg2MgstGZKA",
    authDomain: "madrasati-9fd0b.firebaseapp.com",
    projectId: "madrasati-9fd0b",
    storageBucket: "madrasati-9fd0b.firebasestorage.app",
    messagingSenderId: "351776192308",
    appId: "1:351776192308:web:74985a6c9f1f8d4a339761",
    measurementId: "G-5V737P3M2L"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const txt = {
    ar: {
        title: "تسجيل الدخول مطلوب",
        sub: "الرجاء تسجيل الدخول للوصول إلى الموقع.",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        login: "تسجيل الدخول",
        google: "تسجيل الدخول مع Google",
        error: "فشل تسجيل الدخول، تحقق من البريد/كلمة المرور",
        logout: "تسجيل الخروج",
        secure: "شغّل الموقع عبر https أو localhost لأن Firebase Auth لا يعمل على http."
    },
    en: {
        title: "Sign-in required",
        sub: "Please sign in to access the site.",
        email: "Email",
        password: "Password",
        login: "Sign in",
        google: "Continue with Google",
        error: "Sign-in failed, check email/password",
        logout: "Sign out",
        secure: "Run the site over https or localhost; Firebase Auth blocks plain http."
    }
};

function currentLang() {
    const lang = document.body.dataset.lang || document.documentElement.lang || "ar";
    return lang === "en" ? "en" : "ar";
}

function injectGate() {
    if (document.body.dataset.page === "settings") return null; // السماح بصفحة الإعدادات
    if (document.getElementById("authGate")) return document.getElementById("authGate");

    const gate = document.createElement("div");
    gate.id = "authGate";
    gate.innerHTML = `
        <div class="auth-backdrop"></div>
        <div class="auth-card">
            <div class="auth-logo-row">
                <img src="assets/images/school-logo.png" alt="logo" class="auth-logo">
                <div class="auth-text">
                    <h2 id="authTitle"></h2>
                    <p id="authSub"></p>
                </div>
            </div>
            <form id="authForm" class="auth-form">
                <label>
                    <span id="authEmailLabel"></span>
                    <input type="email" name="email" required>
                </label>
                <label>
                    <span id="authPassLabel"></span>
                    <input type="password" name="password" required>
                </label>
                <button type="submit" class="auth-primary" id="authLoginBtn"></button>
            </form>
            <button type="button" class="auth-google" id="authGoogleBtn">
                <i class="fa-brands fa-google"></i>
                <span id="authGoogleText"></span>
            </button>
            <div class="auth-message" id="authMessage"></div>
        </div>
    `;
    document.body.appendChild(gate);
    document.body.classList.add("auth-locked");
    return gate;
}

function setGateTexts() {
    const lang = currentLang();
    const t = txt[lang];
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("authTitle", t.title);
    set("authSub", t.sub);
    set("authEmailLabel", t.email);
    set("authPassLabel", t.password);
    set("authLoginBtn", t.login);
    set("authGoogleText", t.google);
}

function showMessage(msgKey, customText) {
    const el = document.getElementById("authMessage");
    if (!el) return;
    const lang = currentLang();
    el.textContent = customText || txt[lang][msgKey] || msgKey;
    el.classList.add("show");
}

function clearMessage() {
    const el = document.getElementById("authMessage");
    if (el) el.textContent = "";
}

function lockPage() {
    document.body.classList.add("auth-locked");
    const gate = injectGate();
    if (gate) gate.style.display = "grid";
}

function unlockPage() {
    document.body.classList.remove("auth-locked");
    const gate = document.getElementById("authGate");
    if (gate) gate.style.display = "none";
}

function wireProfile(user) {
    const header = document.querySelector(".main-header .header-inner");
    if (!header) return;
    if (document.getElementById("userChip")) return;
    const chip = document.createElement("button");
    chip.id = "userChip";
    chip.className = "user-chip";
    const photo = user?.photoURL;
    chip.innerHTML = photo
        ? `<img src="${photo}" alt="user">`
        : `<span>${(user?.email || "?").charAt(0).toUpperCase()}</span>`;
    chip.title = user?.email || "";
    chip.addEventListener("click", () => signOut(auth));
    // أدخله قبل زر القائمة
    const navToggle = document.getElementById("navToggle");
    if (navToggle?.parentElement) {
        navToggle.parentElement.insertBefore(chip, navToggle);
    } else {
        header.appendChild(chip);
    }
}

function wireGate() {
    if (document.body.dataset.page === "settings") return; // لا حارس على صفحة الإعدادات

    injectGate();
    setGateTexts();

    const form = document.getElementById("authForm");
    const googleBtn = document.getElementById("authGoogleBtn");

    const isSecureOrigin = window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    onAuthStateChanged(auth, (user) => {
        if (user) {
            clearMessage();
            unlockPage();
            wireProfile(user);
        } else {
            lockPage();
            if (!isSecureOrigin) {
                showMessage("secure");
            }
        }
    });

    getRedirectResult(auth).then(result => {
        if (result?.user) {
            unlockPage();
            wireProfile(result.user);
        }
    }).catch(err => {
        console.error(err);
        showMessage("error");
    });

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            clearMessage();
            if (!isSecureOrigin) {
                showMessage("secure");
                return;
            }
            const data = new FormData(form);
            const email = data.get("email");
            const password = data.get("password");
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (err) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                } catch (err2) {
                    console.error(err2);
                    showMessage("error");
                }
            }
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener("click", async () => {
            clearMessage();
            if (!isSecureOrigin) {
                showMessage("secure");
                return;
            }
            try {
                await signInWithPopup(auth, provider);
            } catch (err) {
                if (err?.code === "auth/popup-blocked") {
                    try {
                        await signInWithRedirect(auth, provider);
                        return;
                    } catch (err2) {
                        console.error(err2);
                        showMessage("error", `${err2?.code || ""} ${err2?.message || ""}`.trim());
                        return;
                    }
                }
                console.error(err);
                showMessage("error", `${err?.code || ""} ${err?.message || ""}`.trim());
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // حاوية الترجمة المخفية لتجنب مشاكل جوجل ترانسليت
    if (!document.getElementById("google_translate_element")) {
        const holder = document.createElement("div");
        holder.id = "google_translate_element";
        holder.style.display = "none";
        document.body.appendChild(holder);
    }
    // حارس الدخول لكل الصفحات ما عدا الإعدادات
    wireGate();
});
