// عناصر DOM
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

// تمرير الشاشة تلقائياً عند التركيز على حقل الإدخال (للموبايل)
if (userInput) {
    // عند التركيز على حقل الإدخال
    userInput.addEventListener('focus', function() {
        // انتظر حتى يظهر الكيبورد ثم مرر الشاشة
        setTimeout(() => {
            // استخدام visualViewport إذا كان متاحاً (للكيبورد)
            if (window.visualViewport) {
                const inputArea = document.querySelector('.chat-input-area');
                if (inputArea) {
                    // حساب المسافة المطلوبة ليكون حقل الإدخال فوق الكيبورد
                    const viewportHeight = window.visualViewport.height;
                    const inputRect = inputArea.getBoundingClientRect();
                    const inputBottom = inputRect.bottom;
                    
                    // إذا كان حقل الإدخال تحت الكيبورد، مرر الشاشة
                    if (inputBottom > viewportHeight) {
                        const scrollAmount = inputBottom - viewportHeight + 20; // 20px مسافة إضافية
                        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                    }
                }
            } else {
                // طريقة بديلة للأجهزة التي لا تدعم visualViewport
                const inputArea = document.querySelector('.chat-input-area');
                if (inputArea) {
                    inputArea.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                }
            }
        }, 500); // زيادة الوقت لانتظار ظهور الكيبورد
    });

    // أيضاً عند الكتابة (للتأكد من أن الحقل مرئي)
    userInput.addEventListener('input', function() {
        if (document.activeElement === userInput) {
            setTimeout(() => {
                if (window.visualViewport) {
                    const inputArea = document.querySelector('.chat-input-area');
                    if (inputArea) {
                        const viewportHeight = window.visualViewport.height;
                        const inputRect = inputArea.getBoundingClientRect();
                        const inputBottom = inputRect.bottom;
                        
                        if (inputBottom > viewportHeight) {
                            const scrollAmount = inputBottom - viewportHeight + 20;
                            window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                        }
                    }
                }
            }, 100);
        }
    });
}

// API Worker تبعك
const API_URL = "https://patient-river-127d.popoytydhdt.workers.dev/";


// ====== دالة إضافة الرسائل مع الفقاعة حسب CSS تبعك ======
function addMessage(text, sender = "bot") {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message", sender);
    wrapper.textContent = text;

    chatBox.appendChild(wrapper);
    // التمرير تلقائياً للأسفل عند إضافة رسالة جديدة
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
}


// ====== رسالة ترحيب تلقائية ======
setTimeout(() => {
    addMessage("مرحباً بك في المساعد الذكي! كيف يمكنني مساعدتك؟ 🤖🔥", "bot");
}, 300);


// ====== عند إرسال الرسالة ======
chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = userInput.value.trim();
    if (!text) return;

    // رسالة المستخدم
    addMessage(text, "user");
    userInput.value = "";

    // رسالة الانتظار
    const loading = document.createElement("div");
    loading.classList.add("message", "bot");
    loading.textContent = "⏳ جاري التفكير...";
    chatBox.appendChild(loading);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: text })
        });

        const data = await response.json();
        loading.remove();

        const reply =
            data?.choices?.[0]?.message?.content ||
            "لم أفهم سؤالك، هل يمكنك توضيحه؟ 😊";

        addMessage(reply, "bot");

    } catch (err) {
        loading.remove();
        addMessage("⚠️ لا يوجد اتصال، تأكد من الإنترنت.", "bot");
    }
});
