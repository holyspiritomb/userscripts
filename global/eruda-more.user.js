// ==UserScript==
// @name         Eruda Mobile devtools customized
// @namespace    holyspiritomb
// @match        *://*/*
// @grant        none
// @grant        property:settings
// @version      1.3
// @author       holyspiritomb
// @icon         https://www.google.com/s2/favicons?domain=eruda.liriliri.io
// @require      https://cdn.jsdelivr.net/npm/eruda
// @connect      cdn.jsdelivr.net
// @connect      https://cdn.jsdelivr.net
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @homepage     https://github.com/holyspiritomb/userscripts
// @description  Eruda persistent mobile devtools, for troubleshooting on mobile. Targeting mobile Vivaldi via Adguard for Android.
// @noframes
// ==/UserScript==

/* globals eruda */
(function () {

    eruda.init({
        tool: [
            'console', 'elements', 'info', 'resources', 'sources', 'snippets',
        ],
        defaults: {theme: 'Dracula', displaySize: 40, transparency: 0.9},
    });

    eruda.position({x: 50, y: 50});
    let console = eruda.get('console');
    console.config.set('displayExtraInfo', true);
    console.config.set('displayIfErr', true);
    let resources = eruda.get('resources');
    resources.config.set('hideErudaSetting', false);
    let snippets = eruda.get('snippets');
    snippets.add('enhuge', function () {
        eruda.scale(2);
    }, 'Make eruda big');
    snippets.add('debiggerize', function () {
        eruda.scale(1);
    }, 'Make eruda original size');
    snippets.add('Shut down eruda', function () {
        eruda.destroy();
    }, 'Close eruda');
    snippets.add('Reset icon position', function () {
        eruda.position({x: 50, y: 50});
    }, 'Yep');
    let info = eruda.get('info');
    info.add('viewportWidth', window.innerWidth);
    info.add('viewportHeight', window.innerHeight);
    eruda.show();
    var winWidth = window.innerWidth;
    if (winWidth > 700) {
        eruda.scale(2);
    }
    eruda.show("elements");
})();
