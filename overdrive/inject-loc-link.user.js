// ==UserScript==
// @name        Overdrive: LOC search link
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     0.0.1
// @description Injects a link to LOC search results under the rating on Overdrive library pages.
// @homepageURL https://github.com/holyspiritomb/userscripts
// @downloadURL https://raw.githubusercontent.com/holyspiritomb/userscripts/main/overdrive/inject-loc-link.user.js
// @license     MIT
// @match       https://*.overdrive.com/*/content/media/*
// @run-at      document-end
// @require     https://code.jquery.com/jquery-latest.min.js
// @grant       none
// ==/UserScript==
// https://id.loc.gov/search/?q=${searchquery}&q=cs%3Ahttp%3A%2F%2Fid.loc.gov%2Fresources%2Fworks

var author;
var title;
var format;

function getAuthors(el) {
    let authRegex = /Author/;
    author = document.querySelector(el).textContent.match(authRegex);
    isbn = encodeURI(author);
    console.log(isbn);
    return isbn;
}

function getFormat() {
    bookFormat = document.querySelectorAll('div.TitleDetailsHeading > span.TitleDetailsHeading-formatBadge > span.u-allCaps')[0].textContent;
    return bookFormat;
}

function getQuery() {
    title = document.querySelector('head > meta[property="og:title"]').content;
    let creators = document.querySelectorAll('div#creators-panel > ul > li > a.TitleDetailsAccordion-creatorLink').length;
    if (creators == 1) {
        author = document.querySelector('div#creators-panel > ul.TitleDetailsAccordion-creatorList > li > a.TitleDetailsAccordion-creatorLink').textContent;
    } else {
        author = document.querySelectorAll('div#creators-panel > ul.TitleDetailsAccordion-creatorList > li > a.TitleDetailsAccordion-creatorLink')[0].textContent;
    }
    author = encodeURI(author);
    var search = encodeURI(title);
    return search;
}

var searchQuery = getQuery();

function addGrLink(el) {
    let link = document.createElement('a');
    link.style.display = "block";
    link.style.fontWeight = "normal";
    link.style.textAlign = "center";
    link.style.textDecoration = "underline";
    link.href = `https://id.loc.gov/search/?q=${searchquery}&q=cs%3Ahttp%3A%2F%2Fid.loc.gov%2Fresources%2Fworks`;
    link.innerHTML = "View on Goodreads";
    el.after(link);
}


$('.js-starRatingsContainer').each(function () {
    addGrLink(this);
});
