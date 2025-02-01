// ==UserScript==
// @name         ASIN on Audible Pages
// @namespace    https://github.com/holyspiritomb
// @author       holyspiritomb
// @version      1.0.0
// @description  Makes cataloguing my audiobooks easier.
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/amazon/asin_on_audible.user.js
// @license      MIT
// @match        *://www.audible.com/*
// @run-at       document-end
// @grant        none
// @require      https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


function getAsinfromEl(elem) {
    let asin;
    let elId = elem.id;

    let asinsplit = elId.split('-');
    asin = asinsplit[4];
    return asin;
}

function getAsinfromUrl() {
    let asin;
    let url = location.href;

    asin = url.split("/")[5];
    asin = asin.split("?")[0];
    console.log(asin);
    return asin;
}

function addAsin(asin) {
    let asinEl = document.createElement("div");
    asinEl.append(asin);
    return asinEl;
}

if (location.href.startsWith("https://www.audible.com/search?")) {
    $("li.titleLabel > a[href^='/pd/'] > h3").each(function() {
        console.log(this);
        let asin = getAsinfromEl($(this)[0]);
        let appendedEl = addAsin(asin);
        console.log($(this)[0]);
        $(this)[0].parentElement.after(appendedEl);
    });
} else if (location.href.startsWith("https://www.audible.com/pd/")) {
    let asin = getAsinfromUrl();
    let newEl = addAsin(asin);
    $("h1.bc-heading").after(newEl);
}
