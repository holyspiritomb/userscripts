// ==UserScript==
// @name        ASIN to Goodreads Pages
// @namespace   https://github.com/holyspiritomb
// @author      spiritomb
// @version     1.0.2
// @description Adds mobi-asin to individual book pages and copies it to the clipboard when clicked. Clicking "mobi-asin:" will copy the asin to the clipboard with "mobi-asin:" as a prefix for easy pasting into Calibre ebook library software. Works on book pages that have a button to buy from the Kindle Store or are listed under the book details as a Kindle edition. Works with new layout! Inspired by CH Amazon ASIN Adder by clickhappier: https://greasyfork.org/en/scripts/6862-ch-amazon-asin-adder
// @match       https://www.goodreads.com/book/show/*
// @run-at      document-end
// @grant       GM_setClipboard
// @homepageURL https://github.com/holyspiritomb/userscripts
// @require     https://code.jquery.com/jquery-latest.min.js
// @icon        https://www.google.com/s2/favicons?domain=goodreads.com
// ==/UserScript==

function matchASIN(href) { // adapted from getASIN function in clickhappier's userscript
    var asinMatch;
    if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i) }
    if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i) }
    if (!asinMatch) { return null }
    return asinMatch[1];
}

function isKindleEd() {
    let bookFormat = $('span[itemprop=bookFormat]')[0].innerText;
    if (bookFormat == "Kindle Edition"){
        return bookFormat;
    } else {
        return null;
    }
}

function addAsin(element, asin) {
    let asinWrapper = document.createElement("span");
    asinWrapper.style.fontSize = "90%";
    asinWrapper.id = "asinwrapper";
    let asinPrefix = document.createElement("span");
    asinPrefix.id = "calibreprefix";
    asinPrefix.innerHTML = "mobi-asin:";
    asinWrapper.append(asinPrefix);
    let asinForReal = document.createElement("span");
    asinForReal.id = "mobiasin";
    asinForReal.innerHTML = asin;
    asinWrapper.append(asinForReal);
    

    if (asin != null){
        console.log(asin);
        element.after(asinWrapper);
        $('span#calibreprefix').on('click', function(){
            let clippedText = `mobi-asin:${asin}`;
            GM_setClipboard(clippedText);
            alert(`Copied "${clippedText}" to clipboard`);
        });
        $('span#mobiasin').on('click', function(){
            GM_setClipboard(asin);
            alert(`Copied ${asin} to clipboard`);
        });
    } else {
        console.log("no asin found");
    }
}

var asin;

$('h1#bookTitle').each(function(){
    if ( isKindleEd() != null ){
        asin = $('div[itemprop=isbn]')[0].innerText;
    } else {
        asin = $('a.buttonBar[data-asin]').attr('data-asin');
    }
    if (asin != null){
        addAsin(this, asin);
    }
});

$('h1.bookTitle').each(function(){
    if ( isKindleEd() != null ){
        asin = $('dd.bookAsin')[0].innerText;
    } else {
        asin = matchASIN( $('a.glideButton').attr('href') );
    }
    if (asin != null){
        addAsin(this, asin);
    }
});

if (  $("link[rel = 'stylesheet'][href *= '_next']") ) {
    setTimeout( function () {
        // var editionsURL;
        var work;
        var bookData = document.querySelector("body > script#__NEXT_DATA__").textContent;
        bookData = JSON.parse(bookData);
        var apollo = bookData.props.pageProps.apolloState;
        let legacyBookId = bookData.query.book_id;
        legacyBookId = JSON.stringify(legacyBookId);
        legacyBookId = legacyBookId.split("-")[0];
        legacyBookId = legacyBookId.replace("\"", "");
        let fancyBookId = apollo.ROOT_QUERY[`getBookByLegacyId({"legacyId":"${legacyBookId}"})`].__ref;
        console.log(Object.keys(apollo.ROOT_QUERY));
        var details = apollo[`${fancyBookId}`].details;
        let bookFormat = details.format;
        if (bookFormat == "Kindle Edition") {
            asin = details.asin;
        } else {
            for (const i of Object.keys(apollo)){
                work = i.match(/^Work.+/i);
                if (work != null){
                    break;
                }
            }
            work = work[0];
            let editionsURL = apollo[`${work}`].editions["webUrl"];
            let bestBookRef = apollo[`${work}`].bestBook["__ref"];
            //bestBookRef = JSON.stringify(bestBookRef);
            let bestBookPrimary = apollo[`${bestBookRef}`];
            let bestBookLinks = bestBookPrimary["links({})"];
            let bestBookType = bestBookLinks.primaryAffiliateLink.__typename;
            if (bestBookType == "KindleLink"){
                var amazURL = bestBookLinks.primaryAffiliateLink.url;
                asin = matchASIN(amazURL);
            } else {
                console.log("The best book according to the data isn't a Kindle link. Try viewing another edition's page.");
                console.log(editionsURL);
                asin = null;
            }
        }
        $("h1[data-testid='bookTitle']").each(function() {
            addAsin(this, asin);
        });
    }, 5000);
}
