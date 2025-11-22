// عناصر DOM
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

// تمرير الشاشة تلقائياً عند التركيز على حقل الإدخال (للموبايل)
if (userInput) {
    const chatContainer = document.querySelector('.ai-chat-container');
    const inputArea = document.querySelector('.chat-input-area');
    const chatBox = document.getElementById('chatBox');
    
    // دالة لضبط موضع منطقة الإدخال فوق الكيبورد
    function adjustInputPosition() {
        if (!inputArea || !chatContainer) return;
        
        // استخدام visualViewport إذا كان متاحاً (للكيبورد)
        if (window.visualViewport) {
            const viewportHeight = window.visualViewport.height;
            const inputRect = inputArea.getBoundingClientRect();
            const inputTop = inputRect.top;
            const inputBottom = inputRect.bottom;
            
            // إذا كان حقل الإدخال تحت الكيبورد أو قريب جداً منه
            if (inputBottom > viewportHeight - 10) {
                const scrollAmount = inputBottom - viewportHeight + 30; // 30px مسافة إضافية
                // تمرير صندوق الرسائل بدلاً من الصفحة
                if (chatBox) {
                    chatBox.scrollTop += scrollAmount;
                }
            }
        } else {
            // طريقة بديلة للأجهزة التي لا تدعم visualViewport
            if (chatBox) {
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }
    }
    
    // عند التركيز على حقل الإدخال
    userInput.addEventListener('focus', function() {
        // انتظر حتى يظهر الكيبورد ثم اضبط الموضع
        setTimeout(() => {
            adjustInputPosition();
        }, 300);
        
        // أيضاً بعد ظهور الكيبورد مباشرة
        setTimeout(() => {
            adjustInputPosition();
        }, 600);
    });

    // عند الكتابة (للتأكد من أن الحقل مرئي)
    userInput.addEventListener('input', function() {
        if (document.activeElement === userInput) {
            setTimeout(() => {
                adjustInputPosition();
            }, 50);
        }
    });
    
    // مراقبة تغييرات visualViewport (للكيبورد)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', function() {
            if (document.activeElement === userInput) {
                setTimeout(() => {
                    adjustInputPosition();
                }, 100);
            }
        });
    }
    
    // عند فقدان التركيز، إرجاع التمرير للوضع الطبيعي
    userInput.addEventListener('blur', function() {
        // إرجاع تلقائي للتمرير بعد إخفاء الكيبورد
        setTimeout(() => {
            if (chatBox) {
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }, 300);
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
