const VH_API = "https://workers.dev";


window.VH = {
  api: VH_API,
  prices: null,

  // Загрузка живых цен с сервера (с кэшем на 5 минут в браузере)
  async getPrices() {
    if (this.prices) return this.prices;
    try {
      const cached = sessionStorage.getItem("vh_prices");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.ts < 5 * 60 * 1000) {
          this.prices = parsed.data;
          return this.prices;
        }
      }
      const res = await fetch(`${VH_API}/api/prices`);
      const data = await res.json();
      if (data && data.prices) {
        this.prices = data;
        sessionStorage.setItem("vh_prices", JSON.stringify({ ts: Date.now(), data }));
        return data;
      }
    } catch (e) {
      console.warn("VALVEHUB API offline, using fallback:", e);
    }
    return null;
  },

  // Проверка статуса PRO-доступа
  isPro() {
    return localStorage.getItem("vh_pro_active") === "1";
  },

  // Серверная активация одноразового PRO-ключа
  async activateKey(rawKey) {
    const key = (rawKey || "").trim().toUpperCase();
    if (!key) return { valid: false, error: "Введите ключ доступа" };
    try {
      const res = await fetch(`${VH_API}/api/verify-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key })
      });
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem("vh_pro_active", "1");
        localStorage.setItem("vh_pro_key", key);
      }
      return data;
    } catch (e) {
      return { valid: false, error: "Нет связи с сервером проверки" };
    }
  },

  // Трекинг посещаемости страницы
  trackPage() {
    const page = location.pathname.split("/").pop() || "index.html";
    fetch(`${VH_API}/api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page })
    }).catch(() => {});
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.VH.trackPage();

  // Автоматическое обновление бейджей PRO в шапке
  const proBadge = document.getElementById("nav-pro-status");
  if (proBadge && window.VH.isPro()) {
    proBadge.textContent = "PRO АКТИВЕН";
    proBadge.style.color = "#4ade80";
  }
});
