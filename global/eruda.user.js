// ==UserScript==
// @name         Eruda Mobile devtools (basic)
// @namespace    holyspiritomb
// @match        *://*/*
// @grant        none
// @grant        property:settings
// @version      1.2
// @author       holyspiritomb
// @require      https://cdn.jsdelivr.net/npm/eruda@2.5.0
// @connect      cdn.jsdelivr.net
// @connect      https://cdn.jsdelivr.net
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @description  Eruda persistent mobile devtools, for troubleshooting on mobile. Targeting mobile Vivaldi via Adguard for Android. 
// @noframes
// ==/UserScript==

/* globals eruda */
(function () {
     
    eruda.init({
        tool: [
            'console', 'elements', 'info', 'resources', 'snippets'
        ],
        defaults: {displaySize: 40, transparency: 0.8, theme: 'Dracula'}
    });
     
    eruda.position({x: 20, y: 20});
    eruda.show('console');
})();
