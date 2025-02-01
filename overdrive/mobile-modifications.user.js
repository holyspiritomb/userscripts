// ==UserScript==
// @name         Overdrive Mobile Mods
// @namespace    https://github.com/holyspiritomb
// @author       holyspiritomb
// @version      0.0.1
// @description  Modify overdrive pages for my specific preferences.
// @homepageURL  https://github.com/holyspiritomb/userscripts/blob/main/overdrive/mobile-modifications.user.js
// @downloadURL  https://raw.githubusercontent.com/holyspiritomb/userscripts/main/overdrive/mobile-modifications.user.js
// @license      MIT
// @match        https://*.overdrive.com/*
// @run-at       document-idle
// @grant        none
// @require      https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// if document.location.pathname ends with "/content/account/loans"
// maybe use waitForKeyElements or a timeout?
$("a[href^='#havingTroublePanel']").each(function () {
    this.click();
});
