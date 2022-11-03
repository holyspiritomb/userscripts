// ==UserScript==
// @name         Github: Victor Mono
// @namespace    https://github.com/holyspiritomb
// @version      1.0.0
// @license      MIT
// @description  Makes Github's code font Victor Mono.
// @author       holyspiritomb
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @run-at       document-start
// @match        https://github.com/*
// @match        https://*.github.com/*
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        unsafeWindow
// @resource     victorR https://cdn.jsdelivr.net/npm/victormono@latest/dist/woff/VictorMono-Regular.woff
// @resource     victorRW https://cdn.jsdelivr.net/npm/victormono@latest/dist/woff2/VictorMono-Regular.woff2
// @resource     victorI https://cdn.jsdelivr.net/npm/victormono@latest/dist/woff/VictorMono-Italic.woff
// @resource     victorIW https://cdn.jsdelivr.net/npm/victormono@latest/dist/woff2/VictorMono-Italic.woff2
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
            .markdown-body pre {
                font-family: "Victor Mono" !important;
            }
            .pl-c, .pl-c span{
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
