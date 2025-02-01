// ==UserScript==
// @name         Tumblr: Close anti-adblocking message on dashboard
// @namespace    https://github.com/holyspiritomb
// @match        https://www.tumblr.com/*
// @grant        none
// @license      MIT
// @version      1.0
// @author       holyspiritomb
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/tumblr/tumblr-dismiss-anti-adblock-message.user.js
// @description  Quick and dirty userscript to automatically click the close button on the anti-adblock message that pops up on tumblr.
// @run-at       document-end
// @require      https://greasyfork.org/scripts/446257-waitforkeyelements-utility-function/code/waitForKeyElements%20utility%20function.js?version=1059316
// @inject-into  page
// ==/UserScript==

/* globals waitForKeyElements */
waitForKeyElements("button.TRX6J[aria-label='Close']", function() {
    let adblockMsgClose = document.querySelector("button.TRX6J[aria-label='Close']");
    adblockMsgClose.click();
    console.log("Userscript successfully clicked the 'close' button on the anti-adblock message");
}, true, 200, 50);
