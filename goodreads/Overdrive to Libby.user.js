// ==UserScript==
// @name        Overdrive URL to Libby
// @namespace   https://github.com/holyspiritomb
// @author      spiritomb
// @version     0.0.1
// @description Changes Overdrive library links to Libby links.
// @match       https://www.goodreads.com/book/show/*
// @match       https://www.goodreads.com/review/list/*
// @run-at      document-end
// @grant       none
// @homepageURL https://github.com/holyspiritomb/userscripts
// @icon        https://www.google.com/s2/favicons?domain=goodreads.com
// @require     https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function odToLibby(a) {
    let url = a.href;
    let libbyUrl = url.replace("http:", "https:").replace("://", "://libbyapp.com/search/").replace(".overdrive.com/search/title?query=", "/search/query-").replace("&creator=", "%20");
    libbyUrl = libbyUrl + "/page-1";
    return libbyUrl;
}

setTimeout( function () {
    $('a[href*="overdrive.com/search"]').each(function () {
        this.href = odToLibby(this);
        console.log(this.href);
    });
}, 5000);
