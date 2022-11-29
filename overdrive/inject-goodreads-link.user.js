// ==UserScript==
// @name        Overdrive: Goodreads link
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     1.4
// @description Injects links to goodreads under the book format on Overdrive library pages.
// @homepageURL https://github.com/holyspiritomb/userscripts
// @downloadURL https://raw.githubusercontent.com/holyspiritomb/userscripts/main/overdrive/inject-goodreads-link.user.js
// @license     MIT
// @match       https://*.overdrive.com/*/content/media/*
// @run-at      document-end
// @require     https://code.jquery.com/jquery-latest.min.js
// @grant       none
// ==/UserScript==

function getIsbn(el) {
    let isbnRegex = /[0-9]{11,13}/;
    let isbn = document.querySelector(el).textContent.match(isbnRegex);
    isbn = encodeURI(isbn);
    console.log(isbn);
    return isbn;
}

var rawtitle = document.querySelector("meta[property='og:title']").content;
let title = encodeURI(rawtitle);
var isbn = getIsbn('#title-format-details');

function addGrLink(el, term) {
    let link = document.createElement('a');
    link.style.display = "block";
    link.style.fontWeight = "normal";
    link.style.textAlign = "center";
    link.style.textDecoration = "underline";
    link.style.marginBottom = "25px";
    link.href = `https://www.goodreads.com/book/isbn?isbn=${term}`;
    link.innerHTML = `Query ${term} on Goodreads`;
    el.after(link);
}


$('div.TitleDetailsHeading > span.TitleDetailsHeading-formatBadge').each(function () {
    addGrLink(this, isbn);
    addGrLink(this, title);
});
