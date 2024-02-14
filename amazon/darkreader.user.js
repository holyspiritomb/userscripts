// ==UserScript==
// @name        Amazon DarkReader: Tokyo Night
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     1.1
// @description Use DarkReader's Tokyo Night colorscheme on Amazon without the DarkReader extension.
// @homepageURL https://github.com/holyspiritomb/userscripts/blob/main/amazon/darkreader.user.js
// @downloadURL https://raw.githubusercontent.com/holyspiritomb/userscripts/main/amazon/darkreader.user.js
// @license     MIT
// @match       *://amazon.tld/*
// @match       *://*.amazon.tld/*
// @run-at      document-start
// @grant       none
// @require     https://cdn.jsdelivr.net/npm/darkreader@4/darkreader.js
// ==/UserScript==
/* global DarkReader */
DarkReader.setFetchMethod(window.fetch);
DarkReader.enable(
    {
        mode: 1,
        brightness: 100,
        contrast: 100,
        stylesheet: "",
        darkSchemeBackgroundColor: "#1a1b26",
        darkSchemeTextColor: "#a9b1d6",
        selectionColor: "#ffaaff",
        darkColorScheme: "Tokyo Night"
    },
    {
        invert: [""],
        css: `button[data-mix-operations="selectTag"][class*="_books-tags-based-recommendations"] > span {color: #333 !important;}`,
        ignoreInlineStyle: [""],
        ignoreImageAnalysis: [""],
        disableStyleSheetsProxy: false,
    }
);
