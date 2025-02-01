// ==UserScript==
// @name         Inter UI Everywhere
// @namespace    https://github.com/holyspiritomb
// @author       spiritomb
// @version      4.1.0
// @description  Use the Inter font everywhere. Version code matches inter font version code.
// @license      MIT
// @match        *://*/*
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        unsafeWindow
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/global/inter-ui-everywhere.user.js
// @resource     interReg https://cdn.jsdelivr.net/npm/inter-ui@4.1.0/web/Inter-Regular.woff2
// @resource     interRegIt https://cdn.jsdelivr.net/npm/inter-ui@4.1.0/web/Inter-Italic.woff2
// @resource     interMed https://cdn.jsdelivr.net/npm/inter-ui@4.1.0/web/Inter-Medium.woff2
// @resource     interMedIt https://cdn.jsdelivr.net/npm/inter-ui@4.1.0/web/Inter-MediumItalic.woff2
// @resource     interBold https://cdn.jsdelivr.net/npm/inter-ui@4.1.0/web/Inter-Bold.woff2
// @resource     interBoldIt https://cdn.jsdelivr.net/npm/inter-ui@4.1.0/web/Inter-BoldItalic.woff2
// ==/UserScript==

(function() {
    let interReg = GM_getResourceURL("interReg", false);
    let interIt = GM_getResourceURL("interRegIt", false);
    let interMed = GM_getResourceURL("interMed", false);
    let interMedIt = GM_getResourceURL("interMedIt", false);
    let interBold = GM_getResourceURL("interBold", false);
    let interBoldIt = GM_getResourceURL("interBoldIt", false);
    var css = "";
    css += `
    @font-face {
      font-family: 'Inter';
      font-style:  normal;
      font-weight: 400;
      font-display: swap;
      src: url(${interReg}) format("woff2");
    }
    @font-face {
      font-family: 'Inter';
      font-style:  italic;
      font-weight: 400;
      font-display: swap;
      src: url(${interIt}) format("woff2");
    }

    @font-face {
      font-family: 'Inter';
      font-style:  normal;
      font-weight: 500;
      font-display: swap;
      src: url(${interMed}) format("woff2");
    }
    @font-face {
      font-family: 'Inter';
      font-style:  italic;
      font-weight: 500;
      font-display: swap;
      src: url(${interMedIt}) format("woff2");
    }

    @font-face {
      font-family: 'Inter';
      font-style:  normal;
      font-weight: 700;
      font-display: swap;
      src: url(${interBold}) format("woff2");
    }
    @font-face {
      font-family: 'Inter';
      font-style:  italic;
      font-weight: 700;
      font-display: swap;
      src: url(${interBoldIt}) format("woff2");
    }

    html,body,:root { font-family: 'Inter', system-ui, sans-serif !important }`;
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
})();
