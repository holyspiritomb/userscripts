// ==UserScript==
// @name         My Very Cool userstyle as a userscript
// @namespace    https://github.com/holyspiritomb
// @description  A very cool userstyle
// @author       spiritomb
// @homepageURL  https://github.com/holyspiritomb
// @downloadURL  x
// @updateURL    x
// @supportURL   x
// @license      MIT
// @version      1.0
// @match        {regex}
// @include      {regex}
// @exclude      {regex}
// @run-at       document-start
// @grant        GM_addStyle
// @grant        unsafeWindow // possibly needed for adguard
// @require       
// @resource      
// ==/UserScript==

(function() {
    var css = "";

    // change nothing above this line
    if (location.href.startsWith("https://")) {
        // css goes here
        css += ``;
    }
    // change nothing below
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else {
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(css));
        (document.querySelector("head") || document.documentElement).appendChild(styleNode);
    }
})();
