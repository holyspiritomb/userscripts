// ==UserScript==
// @name        Eruda Mobile devtools
// @namespace   holyspiritomb
// @match       *://*/*
// @grant       unsafeWindow
// @version     1.0
// @author      holyspiritomb
// @run-at      document-start
// @require     https://cdn.jsdelivr.net/npm/eruda
// @require     https://cdn.jsdelivr.net/npm/eruda-code
// @require     https://cdn.jsdelivr.net/npm/eruda-dom
// @description 9/7/2022, 5:21:16 PM
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
    let console = eruda.get('console');
    eruda.show();
    console.log('eruda is a console for %s.', 'mobile browsers');
    console.table([{test: 1}, {test: 2}, {test2: 3}], 'test');
    console.error(new Error('eruda'));
})();
