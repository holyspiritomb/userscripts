// ==UserScript==
// @name        DarkReader: Tokyo Night Overdrive
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     1.0
// @description Apply DarkReader Tokyo Night theme to Overdrive sites.
// @license     MIT
// @match       https://*.overdrive.com/*
// @run-at      document-start
// @grant       none
// @require     https://cdn.jsdelivr.net/npm/darkreader@4/darkreader.js
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
