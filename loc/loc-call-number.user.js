// ==UserScript==
// @name        LOC call number copy
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     0.1.0
// @description Copy the call number.
// @homepageURL https://github.com/holyspiritomb/userscripts
// @updateURL   https://raw.githubusercontent.com/holyspiritomb/userscripts/main/loc/loc-call-number.user.js
// @license     MIT
// @match       https://id.loc.gov/resources/works/*
// @run-at      document-idle
// @grant       unsafeWindow
// @grant       GM_setClipboard
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @require     https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var lccNumber;
var firstPart;
var workTitle;
var authorName;

let valueArrayList = GM_listValues();

if (!valueArrayList) {
    GM_setValue("debug", false);
}

var debug = GM_getValue("debug");

function logger(logMsg){
    if (debug){
        console.log(logMsg);
    } else {
        return
    }
}

workTitle = $("dt[title='bf:Title'] + dd")[0].innerText.replace(" : ", ": ");

//if ($("div.bf-display-contribution a[href*='/authorities/names/']").length == 1){
//    authorName = $("div.bf-display-contribution a[href*='/authorities/names/']").text();
//    alert(authorName);
//}


$("div.bf-display-classification > dd").each(
    function() {
        let wholeThing = this.childNodes[0].wholeText;
        let catalogType = this.childNodes[0].wholeText.split(":")[0];
        let year = wholeThing.slice(-5);
        logger(wholeThing)
        logger(catalogType)
        logger(year)
        if (catalogType == "LCC") { // perhaps: if (wholeThing.startsWith("LCC"))
            logger(this)
            let callNumber = wholeThing.replace("LCC: ", "").replace("  ", "");
            logger(callNumber);
            lccNumber = callNumber;
            firstPart = callNumber.split(" ")[0];
            logger(lccNumber);
            logger(firstPart);
            // lccNumber = this.innerText.replace("LCC: ", "").replace(" (Assigner: dlc)", "");
            $("h1").after(`<div id="callnumber">${lccNumber} <span> </span></div>`);
            $("h1").after(`<div id="callnumber2">${firstPart} <span> </span></div>`);
            $("div#callnumber > span").append('\u{1F4CB}'); //clipboard emoji
            $("div#callnumber2 > span").append('\u{1F4CB}'); //clipboard emoji
        }
});

if (lccNumber != null) {
    $("div#callnumber > span").on('click', function(){
        GM_setClipboard(lccNumber);
        this.innerHTML = "";
        // this.append('\u2713');
        this.append('\u{1f44d}'); //thumbs up emoji
        $("div#callnumber2 > span").text = '\u{1f4cb}';
    });
    $("div#callnumber2 > span").on('click', function(){
        GM_setClipboard(firstPart);
        this.innerHTML = "";
        this.append('\u{1f44d}'); //thumbs up emoji
        $("div#callnumber > span").text = '\u{1f4cb}';
    });
}

$("h1").after(`<div id="workTitle">${workTitle}</div>`);
// $("div#workTitle").on('click', function(){
//     GM_setClipboard(workTitle);
//     this.append('\u2713');
// });
