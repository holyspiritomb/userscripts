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

function createURL(title) {
    title = title.replaceAll(' ', '+');
    title = title.replaceAll(/\(.*\)/g, '');
    title = title.replace('…', '');
    title = title.trim();
    title = encodeURI(title);
    let url = `http://libgen.gs/index.php?req=${title}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`;
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
    link.style.color = "#ddd";
    link.style.textAlign = "center";
    link.style.backgroundColor = "#111";
    link.style.fontSize="20px";
    link.style.fontWeight="normal";
    link.innerHTML = "<span style='font-size:inherit !important;color:#ddd'>&darr;</span>";
	link.style.lineHeight = "25px";
	link.style.borderRadius = "50%";
	link.style.textDecoration = "none";
    link.style.filter = "invert(100%)";
    bookElem.before(link);
    //return(link);
}

// desktop, old
// mobile single book pages, old
$('h1.bookTitle>cite[itemprop="name"]').each(function() {
    addDownloadLink( $(this)[0] );
    //$('div.pageContent.showBook').style.marginTop = "50px";
});
//mobile single book that's in a series, old
$('h1.bookTitle>span[itemprop="name"]').each(function() {
    addDownloadLink( $(this)[0] );
});
//book author on mobile single book page, old
$('h2.bookAuthor span[itemprop="author"]>a.authorName').each(function() {
    let nearestPlace = $(this).closest('span');
    addDownloadLink(nearestPlace);
});
//mobile shelf pages
// $('li.book>cite[itemprop="name"]').each(function() {
//     var dlLink = addDownloadLink( $(this)[0] );
//     $(this).after(dlLink);
// });
// series pages
$('a[href^="/book/show"]>span[itemprop="name"]').each(function() {
    addDownloadLink( $(this)[0] );
});
// new goodreads layout
setTimeout( function () {
    $('h1[data-testid="bookTitle"]').each(function() {
        addDownloadLink( $(this)[0] );
    });
    $('h1#bookTitle').each(function() {
        console.log("hi tjere");
        addDownloadLink( $(this) );
    });
}, 10000);
