// ==UserScript==
// @name         Anna's Archive Link on Goodreads
// @namespace    https://github.com/holyspiritomb
// @author       holyspiritomb
// @version      1.0.3
// @description  Based on the firefox extension by Saeed Moqadam https://addons.mozilla.org/en-US/firefox/addon/libgen-download-link/. Works with Violentmonkey and Adguard for Android (when used as a userscript manager).
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/goodreads/Annas%20Archive%20Link%20on%20Goodreads.user.js
// @license      MIT
// @match        *://www.goodreads.com/book/show/*
// @run-at       document-end
// @grant        none
// @require      https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function getAuthor() {
  const metadata = document.querySelector("head > script[type='application/ld+json']").text;
  const jsonData = JSON.parse(metadata);
  let authorName = jsonData.author[0].name;
  if (authorName != undefined) {
    return authorName
  } else {
    return " "
  }
}

function createURL(title, author) {
    title = title.trim();
    let searchTitle = title.replace(/\(.*\)/, "").replace(/^\s+|\s+$/g, '').replace(/[&|,]/g, ' ').replace(/: .*/, '').replace(/[ ]+/, ' ');
    searchTitle = searchTitle.trim()
    let searchString;
    if (author == " "){
      searchString = encodeURIComponent(searchTitle);
    } else {
      searchString = encodeURIComponent(`${author} ${searchTitle}`);
    }
    let url = `https://annas-archive.se/search?index=&page=1&q=${searchString}&sort=newest`
    return url;
}


function addDownloadLink(bookElem) {
    let bookTitle = document.querySelector('meta[property="og:title"]').content;
    let bookAuthor = getAuthor();
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
    const ns = "http://www.w3.org/2000/svg";
    let svgEl = document.createElementNS(ns, "svg");
    svgEl.setAttributeNS(null, "viewBox", "0 0 512 512");
    // let svgComment = document.createComment("Font Awesome Free 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc.");
    // svgEl.append(svgComment);
    let svgPath = document.createElementNS(ns, "path");
    svgPath.setAttributeNS(null, "fill", "var(--color-text-default)");
    svgPath.setAttributeNS(null, "d", "M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512s256-114.6 256-256S397.4 0 256 0zM127 297c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l71 71L232 120c0-13.3 10.7-24 24-24s24 10.7 24 24l0 214.1 71-71c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 409c-9.4 9.4-24.6 9.4-33.9 0L127 297z");
    svgEl.appendChild(svgPath);
    link.appendChild(svgEl);
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
