// ==UserScript==
// @name         Overdrive book link to Libby
// @namespace    https://github.com/holyspiritomb
// @author       spiritomb
// @version      0.0.5
// @description  Changes Overdrive book search result links to Libby links.
// @match        https://*.overdrive.com/*
// @run-at       document-idle
// @grant        none
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/overdrive/url-to-libby.user.js
// @icon         https://www.google.com/s2/favicons?domain=overdrive.com
// @require      https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// https://libraryweb.overdrive.com/media/9141385
function odToLibbyMedia(url) {
    let lUrl = url.replace("://", "://libbyapp.com/library/").replace(".overdrive.com/media", "");
    let book = url.slice(-7);
    let urlPrefix = lUrl.slice(0,-8);
    let libbyUrl = urlPrefix + "/similar-" + book + "/page-1/" + book;
    return libbyUrl
}

setTimeout( function () {
    $('h3.title-name a[href*="/media"]').each(function () {
        fullUrl = this.href;
        this.href = odToLibbyMedia(fullUrl);
    });
}, 5000);
