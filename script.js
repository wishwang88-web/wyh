document.addEventListener('DOMContentLoaded', () => {
    // 1. 英雄區塊副標題的打字機效果
    const subtitleElement = document.querySelector('.hero .subtitle');
    const originalText = subtitleElement.dataset.text; // 從 data-text 屬性獲取完整文字
    let i = 0;
    let typeSpeed = 70; // 每字元的打字速度 (毫秒)

    function typeWriter() {
        if (i < originalText.length) {
            subtitleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // 打字完成後，移除打字機游標的動畫，使其保持靜止
            subtitleElement.style.borderRight = 'none';
        }
    }

    // 初始清空內容，確保打字機效果從頭開始
    subtitleElement.textContent = '';
    setTimeout(typeWriter, 500); // 延遲一點時間開始打字效果

    // 2. 導覽列滾動效果 (背景變化與活躍連結)
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function updateNavbarOnScroll() {
        // 導覽列背景變化
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 活躍連結高亮
        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight; // 考慮導覽列高度
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(currentActive)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNavbarOnScroll);
    updateNavbarOnScroll(); // 頁面載入時執行一次，確保初始狀態正確

    // 3. 滾動揭示動畫 (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealItems = document.querySelectorAll('.reveal-item'); // 針對卡片類的小元素

    const observerOptions = {
        root: null, // 監聽 viewport
        rootMargin: '0px',
        threshold: 0.2 // 元素進入 viewport 20% 時觸發
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // 對於 project-card 類的 reveal-item 應用交錯動畫
                if (entry.target.classList.contains('reveal-item')) {
                    const index = Array.from(revealItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.15}s`; // 每個卡片延遲 0.15s
                }
                observer.unobserve(entry.target); // 一旦顯示就停止觀察
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
    revealItems.forEach(el => observer.observe(el));


    // 4. 回到頂部按鈕
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // 滾動超過 300px 顯示按鈕
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 導覽列平滑滾動至錨點
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默認跳轉行為
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // 手動更新活躍連結，因為 scroll 事件在滾動期間不會立即更新
            // 在 scrollIntoView 完成後，updateNavbarOnScroll 會自行處理
        });
    });
});
