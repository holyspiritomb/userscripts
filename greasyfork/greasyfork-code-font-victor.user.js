// ==UserScript==
// @name          Greasyfork Code Font: Victor Mono
// @namespace     https://github.com/holyspiritomb
// @license       MIT
// @author        holyspiritomb
// @version       1.5.6
// @description   Inspired by the public domain userstyle here: https://userstyles.org/styles/175353 Versions match Victor Mono npm pkg versions.
// @license       MIT
// @homepageURL   https://github.com/holyspiritomb/userscripts
// @updateURL     https://raw.githubusercontent.com/holyspiritomb/userscripts/main/greasyfork/greasyfork-code-font-victor.user.js
// @include       https://greasyfork.org/*
// @include       https://*.greasyfork.org/*
// @run-at        document-start
// @grant         GM_addStyle
// @grant         GM_getResourceURL
// @grant         unsafeWindow
// @resource      victorR https://cdn.jsdelivr.net/npm/victormono@1.5.6/dist/woff2/VictorMono-Regular.woff
// @resource      victorRW https://cdn.jsdelivr.net/npm/victormono@1.5.6/dist/woff2/VictorMono-Regular.woff2
// @resource      victorI https://cdn.jsdelivr.net/npm/victormono@1.5.6/dist/woff/VictorMono-Italic.woff
// @resource      victorIW https://cdn.jsdelivr.net/npm/victormono@1.5.6/dist/woff2/VictorMono-Italic.woff2
// ==/UserScript==
(function() {
    let victorRegular = GM_getResourceURL("victorR", false);
    let victorRegular2 = GM_getResourceURL("victorRW", false);
    let victorItalic = GM_getResourceURL("victorI", false);
    let victorItalic2 = GM_getResourceURL("victorIW", false);
    var css = "";
    css += `
            @font-face {
                font-family: "Victor Mono";
                src: url(${victorRegular2}) format("woff2"),
                    url(${victorRegular}) format("woff");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: "Victor Mono";
                src: url(${victorItalic2}) format("woff2"),
                    url(${victorItalic}) format("woff");
                font-weight: 400;
                font-style: italic;
                font-display: swap;
            }

            pre.prettyprint, #ace-editor, code,
            ol.linenums > li,
            ol.linenums > li > span {
                font-family: "Victor Mono" !important;
                font-size: 90%;
            }
            ol.linenums > li > span.com {
                font-family: "Victor Mono" !important;
                font-style: italic !important;
            }`;
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else {
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(css));
        (document.querySelector("head") || document.documentElement).appendChild(styleNode);
    }
})();
