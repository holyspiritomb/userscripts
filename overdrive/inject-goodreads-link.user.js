// ==UserScript==
// @name        Overdrive: Goodreads link
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     1.9
// @description Injects links to goodreads under the book format on Overdrive library pages.
// @homepageURL https://github.com/holyspiritomb/userscripts
// @downloadURL https://raw.githubusercontent.com/holyspiritomb/userscripts/main/overdrive/inject-goodreads-link.user.js
// @license     MIT
// @match       https://*.overdrive.com/*/content/media/*
// @run-at      document-end
// @require     https://code.jquery.com/jquery-latest.min.js
// @grant       none
// ==/UserScript==

// prototype url for broader search
// https://www.goodreads.com/search?utf8=%E2%9C%93&q={author}+{title}&search_type=books&search%5Bfield%5D=on

function getIsbn(el) {
    let isbnRegex = /[0-9]{11,13}/;
    let isbn = document.querySelector(el).textContent.match(isbnRegex);
    isbn = encodeURI(isbn);
    console.log(isbn);
    return isbn;
}

var rawtitle;
rawtitle = document.querySelector("meta[property='og:title']").content;
var title;
title = encodeURI(rawtitle);
var isbn;
isbn = getIsbn('#title-format-details');

function addGrLink(el, metaterm, searchTerm) {
    let link = document.createElement('a');
    link.id = `gr-${metaterm}`;
    link.style.display = "block";
    link.style.fontWeight = "normal";
    link.style.textAlign = "center";
    link.style.textDecoration = "underline";
    link.href = `https://www.goodreads.com/book/${metaterm}?${metaterm}=${searchTerm}`;
    link.innerHTML = `Query ${metaterm} on Goodreads`;
    el.after(link);
}


$('div.TitleDetailsHeading > span.TitleDetailsHeading-formatBadge').each(function () {
    let anchorElem = this;
    if (isbn != null) {
        addGrLink(anchorElem, "isbn", isbn);
    }
    addGrLink(anchorElem, "title", title);
});

$('div.TitleDetailsHeading').each(function () {
    this.style.marginBottom = "25px";
});

$('div.TitleDetailsHeading > div.TitleDetailsHeading-creator > a.TitleDetailsHeading-creatorLink').each(function () {
    let auth = this.textContent;
    let author = encodeURI(auth);
    this.href = `https://www.goodreads.com/book/author?author=${author}`;
});
