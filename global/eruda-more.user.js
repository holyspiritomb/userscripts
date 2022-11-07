// ==UserScript==
// @name        Eruda Mobile devtools customized
// @namespace   holyspiritomb
// @match       *://*/*
// @grant       none
// @grant       property:settings
// @version     1.1
// @author      holyspiritomb
// @require     https://cdn.jsdelivr.net/npm/eruda@2.5.0
// @connect     cdn.jsdelivr.net
// @connect     https://cdn.jsdelivr.net
// @description Eruda persistent mobile devtools, for troubleshooting on mobile. Targeting mobile Vivaldi via Adguard for Android. Inspired by the Andure userscript by 
// @noframes
// ==/UserScript==
/* globals eruda */
(function () {
    /* eslint-disable key-spacing, array-bracket-spacing, array-bracket-newline */
    eruda.init({
        tool: ['console', 'elements', 'info', 'resources', 'sources', 'snippets'],
        defaults: {theme: 'Dracula', displaySize:40, transparency:0.9}
    });
    /* eslint-enable key-spacing, array-bracket-spacing, array-bracket-newline */
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
    eruda.show("console");
    var winWidth = window.innerWidth;
    if (winWidth > 700) {
        eruda.scale(2);
    }
    eruda.position({x: 50, y: 50});
    console.log("width", window.innerWidth);
})();
