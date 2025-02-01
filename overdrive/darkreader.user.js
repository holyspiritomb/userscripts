// ==UserScript==
// @name         DarkReader: Tokyo Night Overdrive
// @namespace    https://github.com/holyspiritomb
// @author       holyspiritomb
// @version      1.1
// @description  Apply DarkReader Tokyo Night theme to Overdrive sites.
// @homepageURL  https://github.com/holyspiritomb/userscripts/blob/main/overdrive/darkreader.user.js
// @downloadURL  https://raw.githubusercontent.com/holyspiritomb/userscripts/main/overdrive/darkreader.user.js
// @license      MIT
// @match        https://*.overdrive.com/*
// @run-at       document-start
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/darkreader@4/darkreader.js
// ==/UserScript==

/* global DarkReader */
DarkReader.setFetchMethod(window.fetch);
DarkReader.enable({
    mode: 1,
    brightness: 100,
    contrast: 100,
    stylesheet: "",
    darkSchemeBackgroundColor: "#1a1b26",
    darkSchemeTextColor: "#a9b1d6",
    selectionColor: "#ffaaff",
    darkColorScheme: "Tokyo Night"
});
