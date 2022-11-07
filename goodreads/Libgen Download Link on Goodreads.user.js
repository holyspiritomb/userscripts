// ==UserScript==
// @name        Libgen Download Link on Goodreads
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     1.1
// @description Based on the firefox extension by Saeed Moqadam https://addons.mozilla.org/en-US/firefox/addon/libgen-download-link/ and tested with Adguard for Android (on Bromite, Kiwi Browser, and Android Vivaldi) and with Violentmonkey on Iceraven, desktop Firefox, and desktop Vivaldi.
// @homepageURL https://github.com/holyspiritomb/userscripts
// @license     MIT
// @match       *://www.goodreads.com/book/show/*
// @match       *://www.goodreads.com/review/list/*
// @match       *://www.goodreads.com/series/*
// @run-at      document-end
// @grant       none
// @require     https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function createURL(title) {
    title = title.replaceAll(' ', '+');
    title = title.replaceAll(/\(.*\)/g, '');
    title = title.replace('…', '');
    title = title.trim();
    title = encodeURI(title);
    let url = `https://libgen.gs/index.php?req=${title}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`;
    console.log(url);
    return url;
}

function addDownloadLink(bookElem) {
    let bookTitle = document.querySelector("meta[property='og:title']").content;
    console.log(bookTitle);
    let link = document.createElement('a');
    link.href =  createURL(bookTitle);
    link.style.display = "inline-block";
    link.style.float = "right";
    link.style.height = "25px";
    link.style.width = "25px";
    link.style.textAlign = "center";
    link.style.fontSize = "20px";
    link.style.lineHeight = "25px";
    link.style.fontWeight = "normal";
    link.style.textDecoration = "none";
    link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <!--! Font Awesome Free 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
        <path fill="#222" d="M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512s256-114.6 256-256S397.4 0 256 0zM127 297c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l71 71L232 120c0-13.3 10.7-24 24-24s24 10.7 24 24l0 214.1 71-71c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 409c-9.4 9.4-24.6 9.4-33.9 0L127 297z"/>
        </svg>`;
    bookElem.before(link);
}

// desktop, old
// mobile single book pages, old
$('h1.bookTitle>cite[itemprop="name"]').each(function () {
    addDownloadLink( $(this)[0] );
    //$('div.pageContent.showBook').style.marginTop = "50px";
});
//mobile single book that's in a series, old
$('h1.bookTitle>span[itemprop="name"]').each(function () {
    addDownloadLink( $(this)[0] );
});
//book author on mobile single book page, old
$('h2.bookAuthor span[itemprop="author"]>a.authorName').each(function () {
    let nearestPlace = $(this).closest('span');
    addDownloadLink(nearestPlace);
});
//mobile shelf pages
// $('li.book>cite[itemprop="name"]').each(function() {
//     var dlLink = addDownloadLink( $(this)[0] );
//     $(this).after(dlLink);
// });
// series pages
$('a[href^="/book/show"]>span[itemprop="name"]').each(function () {
    addDownloadLink( $(this)[0] );
});
// new goodreads layout
setTimeout( function () {
    $('h1#bookTitle').each(function() {
        addDownloadLink( $(this)[0] );
    });
    $('h1[data-testid="bookTitle"]').each(function () {
        addDownloadLink( $(this)[0] );
    });
}, 5000);
