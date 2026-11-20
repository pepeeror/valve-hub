document.addEventListener("DOMContentLoaded", () => {
    // 1. Обновление навигации
    const header = document.querySelector("header");
    if (header) {
        let navLinks = header.querySelector(".nav-links");
        if (!navLinks) {
            const navContainer = header.querySelector(".nav-container");
            if (navContainer) {
                navLinks = document.createElement("ul");
                navLinks.className = "nav-links";
                navContainer.appendChild(navLinks);
            }
        }

        if (navLinks) {
            // Полный список страниц портала
            const pages = [
                { name: "Главная", url: "index.html" },
                { name: "Пополнение Steam", url: "steam-topup.html" },
                { name: "Конвертер TF2", url: "tf2-converter.html" },
                { name: "Крафт TF2", url: "tf2-craft.html" },
                { name: "Конфиги TF2", url: "tf2-config.html" },
                { name: "Контракты CS2", url: "cs2-tradeup.html" },
                { name: "Конфиги CS2", url: "cs2-config.html" },
                { name: "Оценка инвентаря", url: "inventory-value.html" },
                { name: "Dota 2 ММР", url: "dota2-tools.html" },
                { name: "Dota 2 Тайминги", url: "dota2-timings.html" },
                { name: "Dota 2 EHP", url: "dota2-ehp.html" },
                { name: "Dota 2 PRO", url: "dota2-pro-scanner.html" },
                { name: "CS2 Sens", url: "cs2-sens.html" },
                { name: "PRO Сканер CS2", url: "cs2-pro-scanner.html" },
                { name: "PRO Сканер TF2", url: "tf2-pro-scanner.html" }
            ];

            let currentPath = window.location.pathname;
            let currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);
            if (currentPage === "" || currentPage === "/") {
                currentPage = "index.html";
            }

            let html = "";
            pages.forEach(page => {
                const isActive = (currentPage === page.url) ? "active" : "";
                html += `<li><a href="${page.url}" class="${isActive}">${page.name}</a></li>`;
            });
            
            navLinks.innerHTML = html;
        }
    }

    // 2. Обновление года в подвале
    const footer = document.querySelector("footer p");
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace(/©\s*\d{4}/g, "© 2026");
    }
});