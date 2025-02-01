// ==UserScript==
// @name         Overdrive URL to Libby
// @namespace    https://github.com/holyspiritomb
// @author       spiritomb
// @version      0.0.3
// @description  Changes Overdrive library links to Libby links.
// @match        https://www.goodreads.com/book/show/*
// @match        https://www.goodreads.com/review/list/*
// @match        https://www.goodreads.com/list/*
// @match        https://www.goodreads.com/search*
// @run-at       document-end
// @grant        none
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/goodreads/Overdrive%20to%20Libby.user.js
// @icon         https://www.google.com/s2/favicons?domain=goodreads.com
// @require      https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function odToLibby(elem) {
    let url = elem.href;
    let libbyUrl = url.replace("http:", "https:").replace("://", "://libbyapp.com/search/").replace(".overdrive.com/search/title?query=", "/search/query-").replace("&creator=", "%20");
    libbyUrl = libbyUrl + "/page-1";
    return libbyUrl;
}

var timeout;
if (location.href.startsWith("https://www.goodreads.com/list")) {
    timeout = 15000;
} else if (location.href.startsWith("https://www.goodreads.com/review")) {
    timeout = 10000;
} else if (location.href.startsWith("https://www.goodreads.com/search")) {
    timeout = 10000;
} else {
    timeout = 5000;
}

setTimeout( function () {
    $('a[href*="overdrive.com/search"]').each(function () {
        this.href = odToLibby(this);
        console.log(this.href);
    });
    $('img.AGaudio').each(function() {
        this.before('\uD83C\uDFA7');
        this.style.display = "none";
    });
}, timeout);
