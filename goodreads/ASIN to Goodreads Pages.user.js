// ==UserScript==
// @name         ASIN to Goodreads Pages
// @namespace    https://github.com/holyspiritomb
// @author       spiritomb
// @version      2.0.2
// @description  Adds mobi-asin to individual book pages and copies it to the clipboard when clicked. Clicking "mobi-asin:" will copy the asin to the clipboard with "mobi-asin:" as a prefix.
// @match        https://www.goodreads.com/book/show/*
// @run-at       document-end
// @grant        GM_setClipboard
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/goodreads/ASIN%20to%20Goodreads%20Pages.user.js
// @icon         https://www.google.com/s2/favicons?domain=goodreads.com
// ==/UserScript==

// Inspired by CH Amazon ASIN Adder by clickhappier: https://greasyfork.org/en/scripts/6862-ch-amazon-asin-adder

function matchASIN(href) { // adapted from getASIN function in clickhappier's userscript
    var asinMatch;
    if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i) }
    if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i) }
    if (!asinMatch) { return null }
    return asinMatch[1];
}

function findBookInfo(obj){
    let keys = [];
    for (let key in obj) {
        if (key.startsWith("Book:")) {
            if (obj[key]["details"]){
                keys.push(key);
            }
        }
    }
    return keys;
}

function addAsin(element, asin) {
    let asinWrapper = document.createElement("span");
    asinWrapper.style.fontSize = "90%";
    asinWrapper.id = "asinwrapper";
    let asinPrefix = document.createElement("span");
    asinPrefix.id = "calibreprefix";
    asinPrefix.append("mobi-asin:");
    asinWrapper.append(asinPrefix);
    let asinForReal = document.createElement("span");
    asinForReal.id = "mobiasin";
    asinForReal.append(asin);
    asinWrapper.append(asinForReal);

    if (asin != null){
        console.log(asin);
        element.after(asinWrapper);
        document.getElementById('calibreprefix').addEventListener('click', function(){
            let clippedText = `mobi-asin:${asin}`;
            GM_setClipboard(clippedText);
            alert(`Copied "${clippedText}" to clipboard`);
        });
        document.getElementById('mobiasin').addEventListener('click', function(){
            GM_setClipboard(asin);
            alert(`Copied ${asin} to clipboard`);
        });
    } else {
        console.log("no asin found");
    }
}

var asin;

setTimeout( function () {
    const jsonstring = document.querySelector("script#__NEXT_DATA__").text;
    const jsonobj = JSON.parse(jsonstring);
    const bookId = findBookInfo(jsonobj.props.pageProps.apolloState);
    const bookInfo = jsonobj.props.pageProps.apolloState[bookId];
    if (bookInfo["details"]["format"] === "Kindle Edition"){
        asin = bookInfo["details"]["asin"];
    } else {
        let primaryLink = bookInfo["links({})"]["primaryAffiliateLink"];
        if (primaryLink["ref"] === "x_gr_bb_kindle"){
            asin = matchASIN(primaryLink["url"]);
        } else {
            asin = null;
        }
    }
    let titleNode = document.querySelector("h1[data-testid='bookTitle']");
    addAsin(titleNode, asin);
}, 5000);
