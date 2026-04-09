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

    // ── 3. Inject toggle button ───────────────────────────────────────────────
    function injectButton() {
        if (document.getElementById('lang-toggle')) return; // already exists

        const headerIcons = document.querySelector('#header .icons');
        if (!headerIcons) return;

        const li = document.createElement('li');
        li.innerHTML = `<button
            id="lang-toggle"
            aria-label="Toggle language"
            style="
                border: none;
                background: transparent;
                cursor: pointer;
                color: var(--text-soft);
                font-weight: 700;
                font-family: 'Inter', sans-serif;
                box-shadow: none;
                min-width: auto;
                width: auto;
                height: auto;
                line-height: inherit;
                padding: 0 0.5rem;
                font-size: 0.85rem;
                letter-spacing: 0.05em;
            "
        >${currentLang === 'tr' ? 'EN' : 'TR'}</button>`;

        // Insert before theme toggle so order is: [LANG] [🌙] [GitHub] [LinkedIn]
        const themeLi = document.querySelector('#theme-toggle')?.closest('li');
        if (themeLi) {
            headerIcons.insertBefore(li, themeLi);
        } else {
            headerIcons.prepend(li);
        }

        li.querySelector('#lang-toggle').addEventListener('click', function () {
            currentLang = currentLang === 'tr' ? 'en' : 'tr';
            localStorage.setItem('lang', currentLang);
            window.applyLanguage();
        });
    }

    // ── 4. Boot ───────────────────────────────────────────────────────────────
    function boot() {
        injectButton();
        window.applyLanguage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot(); // DOM already ready (script loaded at end of body)
    }
})();
