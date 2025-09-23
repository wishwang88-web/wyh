document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 深淺色模式切換 ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // 檢查 localStorage 中是否有已保存的主題偏好
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        // 將用戶的選擇保存到 localStorage
        let theme = 'dark-mode'; // 預設
        if (body.classList.contains('light-mode')) {
            theme = 'light-mode';
        }
        localStorage.setItem('theme', theme);
    });

    // --- 2. 導覽列滾動效果 ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. 高效能的滾動揭示動畫 (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, // 監聽 viewport
        rootMargin: '0px',
        threshold: 0.1 // 元素進入 viewport 10% 時觸發
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 讀取 data-reveal-delay 屬性來設定延遲
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                
                // 元素出現後就停止觀察，避免重複觸發
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
