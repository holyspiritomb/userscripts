// ==UserScript==
// @name        Overdrive: Goodreads link
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     1.1
// @description Injects a link to goodreads under the rating on Overdrive library pages.
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

var isbn = getIsbn('#title-format-details');

function addGrLink(el) {
    let link = document.createElement('a');
    link.style.display = "block";
    link.style.fontWeight = "normal";
    link.style.textAlign = "center";
    link.style.textDecoration = "underline";
    link.href = `https://www.goodreads.com/book/isbn?isbn=${isbn}`;
    link.innerHTML = "Query on Goodreads";
    el.after(link);
}


$('div.TitleDetailsHeading').each(function () {
    addGrLink(this);
});
