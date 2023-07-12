// ==UserScript==
// @name          Github Code Font: Victor Mono
// @namespace     https://github.com/holyspiritomb
// @author        spiritomb
// @version       1.0.5
// @description   Makes Github's code font Victor Mono. Targets mobile Chrome-based browsers via Adguard for Android.
// @license       MIT
// @match         https://github.com/*
// @match         https://*.github.com/*
// @run-at        document-start
// @grant         GM_addStyle
// @grant         GM_getResourceURL
// @grant         unsafeWindow
// @homepageURL   https://github.com/holyspiritomb/userscripts
// @updateURL     https://raw.githubusercontent.com/holyspiritomb/userscripts/main/github/code-font.user.js
// @resource      victorR https://cdn.jsdelivr.net/npm/victormono@latest/dist/woff/VictorMono-Regular.woff
// @resource      victorRW https://cdn.jsdelivr.net/npm/victormono@latest/dist/woff2/VictorMono-Regular.woff2
// @resource      victorI https://cdn.jsdelivr.net/npm/victormono@latest/dist/woff/VictorMono-Italic.woff
// @resource      victorIW https://cdn.jsdelivr.net/npm/victormono@latest/dist/woff2/VictorMono-Italic.woff2
// ==/UserScript==
(function() {
    // this is hacky but it works?
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
            
            .CheckStep-line,
            .blob-code-inner,
            .commit-ref,
            code,
            pre,
            tt,
            .text-mono,
            kbd,
            code .link-gray,
            .markdown-body code,
            .markdown-body tt,
            .highlight pre,
            .markdown-body pre,
            .react-blob-print-hide,
            textarea#read-only-cursor-text-area,
            [class^='pl-']{
                font-family: "Victor Mono" !important;
            }
            .pl-c, .pl-c span{
                font-family: "Victor Mono" !important;
                font-style: italic !important;
            }
    `;
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else {
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(css));
        (document.querySelector("head") || document.documentElement).appendChild(styleNode);
    }
})();
