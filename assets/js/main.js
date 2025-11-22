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
