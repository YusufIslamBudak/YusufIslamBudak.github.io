// global-lang.js — Bilingual toggle system (TR / EN)
// Works on all pages. Call window.applyLanguage() at any time to re-apply translations.

(function () {
    // ── 1. State ────────────────────────────────────────────────────────────────
    let currentLang = localStorage.getItem('lang') || 'tr';

    // ── 2. Core translator (exported globally so inline scripts can call it) ───
    window.applyLanguage = window.updateLanguageDOM = function () {
        document.querySelectorAll('[data-tr]').forEach(function (el) {
            const val = currentLang === 'en' && el.hasAttribute('data-en')
                ? el.getAttribute('data-en')
                : el.getAttribute('data-tr');
            if (val !== null) el.innerHTML = val;
        });

        // Sync button label
        const btn = document.getElementById('lang-toggle');
        if (btn) btn.textContent = currentLang === 'tr' ? 'EN' : 'TR';

        document.documentElement.lang = currentLang;
    };

    // ── 3. Handle toggle button (Injected or Static) ──────────────────────────
    function setupToggleButton() {
        let btn = document.getElementById('lang-toggle');
        
        if (!btn) {
            const headerIcons = document.querySelector('#header .icons');
            if (headerIcons) {
                const li = document.createElement('li');
                li.innerHTML = `<button id="lang-toggle" aria-label="Toggle language">${currentLang === 'tr' ? 'EN' : 'TR'}</button>`;

                // Insert before theme toggle so order is: [LANG] [🌙] [GitHub] [LinkedIn]
                const themeLi = document.querySelector('#theme-toggle')?.closest('li');
                if (themeLi) {
                    headerIcons.insertBefore(li, themeLi);
                } else {
                    headerIcons.prepend(li);
                }
                btn = document.getElementById('lang-toggle');
            }
        }

        if (btn) {
            btn.addEventListener('click', function () {
                currentLang = currentLang === 'tr' ? 'en' : 'tr';
                localStorage.setItem('lang', currentLang);
                window.applyLanguage();
            });
        }
    }

    // ── 4. Boot ───────────────────────────────────────────────────────────────
    function boot() {
        setupToggleButton();
        window.applyLanguage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot(); 
    }
})();
