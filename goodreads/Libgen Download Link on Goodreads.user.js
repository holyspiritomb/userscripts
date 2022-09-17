// ==UserScript==
// @name        Libgen Download Link on Goodreads
// @namespace   https://github.com/holyspiritomb
// @match       *://www.goodreads.com/book/show/*
// @match       *://www.goodreads.com/review/list/*
// @match       *://www.goodreads.com/series/*
// @grant       none
// @version     1.0
// @license     MIT
// @run-at      document-end
// @author      holyspiritomb
// @require     https://code.jquery.com/jquery-latest.min.js
// @description Based on the firefox extension by Saeed Moqadam https://addons.mozilla.org/en-US/firefox/addon/libgen-download-link/ and tested with Adguard for Android (on Bromite, Kiwi Browser, and Android Vivaldi) and with Violentmonkey on Iceraven, desktop Firefox, and desktop Vivaldi.
// ==/UserScript==

console.log("I'm here");

function createURL(title) {
    title = title.replaceAll(' ', '+');
    title = title.replaceAll(/\(.*\)/g, '');
    title = title.replace('…', '');
    title = title.trim();
    let url = `http://libgen.gs/index.php?req=${title}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`;
    url = encodeURI(url);
    return url;
}

function addDownloadLink(bookElem) {
    if (bookElem == null) {
        return;
    }
    let bookTitle = bookElem.innerText;
    let link = document.createElement('a');
    link.href =  createURL(bookTitle);
	link.style.display = "inline-block";
	link.style.float = "right";
    link.style.height = "25px";
    link.style.width = "25px";
    link.style.color = "#ddd";
    link.style.textAlign = "center";
    link.style.backgroundColor = "#111";
    link.style.fontSize="20px";
    link.style.fontWeight="normal";
    link.innerHTML = "<span style='font-size:inherit !important;color:#111 !important;'>&darr;</span>";
	link.style.lineHeight = "25px";
	link.style.borderRadius = "50%";
	link.style.textDecoration = "none";
    link.style.filter = "invert(100%)";
    return(link);
}

// desktop
$('h1#bookTitle').each(function() {
    var dlLink = addDownloadLink( $(this) );
    $(this).before(dlLink);
});
// mobile single book pages
$('h1.bookTitle>cite[itemprop="name"]').each(function() {
    var dlLink = addDownloadLink( $(this)[0] );
    $(this).before(dlLink);
    $('div.pageContent.showBook').style.marginTop = "50px";
});
//mobile single book that's in a series
$('h1.bookTitle>span[itemprop="name"]').each(function() {
    var dlLink = addDownloadLink( $(this)[0] );
    $(this).before(dlLink);
});
//book author on mobile single book page
$('h2.bookAuthor span[itemprop="author"]>a.authorName').each(function() {
    var dlLink = addDownloadLink( $(this)[0] );
    nearestPlace = $(this).closest('span');
    nearestPlace.before(dlLink);
});
//mobile shelf pages
// $('li.book>cite[itemprop="name"]').each(function() {
//     var dlLink = addDownloadLink( $(this)[0] );
//     $(this).after(dlLink);
// });
// series pages
$('a[href^="/book/show"]>span[itemprop="name"]').each(function() {
    var dlLink = addDownloadLink( $(this)[0] );
    $(this).before(dlLink);
});
// new goodreads layout
setTimeout( function () {
    $('h1[data-testid="bookTitle"]').each(function() {
        var dlLink = addDownloadLink( $(this)[0] );
        $(this).before(dlLink);
    });
}, 5000);
