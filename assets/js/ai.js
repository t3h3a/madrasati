// عناصر DOM
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

// API Worker تبعك
const API_URL = "https://patient-river-127d.popoytydhdt.workers.dev/";


// ====== دالة إضافة الرسائل مع الفقاعة حسب CSS تبعك ======
function addMessage(text, sender = "bot") {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message", sender);
    wrapper.textContent = text;

    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
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
