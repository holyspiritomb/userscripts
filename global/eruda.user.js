// ==UserScript==
// @name        Eruda Mobile devtools
// @namespace   holyspiritomb
// @match       *://*/*
// @grant       unsafeWindow
// @version     1.1
// @author      holyspiritomb
// @run-at      document-start
// @require     https://cdn.jsdelivr.net/npm/eruda@2.5.0
// @require     https://cdn.jsdelivr.net/npm/eruda-code@2.0.0
// @require     https://cdn.jsdelivr.net/npm/eruda-dom@2.0.0
// @description Eruda mobile devtools as a userscript, for troubleshooting on mobile, targeting Vivaldi on Android via Adguard for Android.
// ==/UserScript==

(function () {
    // if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    eruda.init({
        tool: ['console', 'elements', 'info', 'resources', 'snippets'],
        autoScale: true,
        defaults: {
            displaySize: 40,
            transparency: 0.8,
            theme: 'Dracula'
        }
    });
    eruda.position({x: 20, y: 20});
    eruda.show();
    eruda.show('console');
})();
