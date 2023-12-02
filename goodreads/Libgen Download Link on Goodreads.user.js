// ==UserScript==
// @name        Libgen Download Link on Goodreads
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     1.4.0
// @description Based on the firefox extension by Saeed Moqadam https://addons.mozilla.org/en-US/firefox/addon/libgen-download-link/ and tested with Adguard for Android (on Kiwi Browser and Android Vivaldi) and with Violentmonkey on Iceraven, desktop Firefox, and desktop Vivaldi.
// @homepageURL https://github.com/holyspiritomb/userscripts
// @updateURL   https://raw.githubusercontent.com/holyspiritomb/userscripts/main/goodreads/Libgen%20Download%20Link%20on%20Goodreads.user.js
// @license     MIT
// @match       *://www.goodreads.com/book/show/*
// @run-at      document-end
// @grant       none
// @require     https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function createURL(title, author) {
    title = title.trim();
    let searchTitle = title.replace(/\(.*\)/, "").replace(/^\s+|\s+$/g, '').replace(/[&|,]/g, ' ').replace(/: .*/, '').replace(/[ ]+/, ' ');
    let searchString = encodeURIComponent(author) + "%20" + encodeURIComponent(searchTitle);
    let url = `https://libgen.is/search.php?req=${searchString}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`;
    console.log(url);
    return url;
}

function addDownloadLink(bookElem) {
    let bookTitle = document.querySelector('h1[data-testid="bookTitle"]').innerText;
    let bookAuthor = document.querySelector("span.ContributorLink__name").innerText;
    let link = document.createElement('a');
    link.href =  createURL(bookTitle, bookAuthor);
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

setTimeout( function () {
    $('h1#bookTitle').each(function() {
        addDownloadLink( $(this)[0] );
    });
    $('h1[data-testid="bookTitle"]').each(function () {
        addDownloadLink( $(this)[0] );
    });
}, 6000);
