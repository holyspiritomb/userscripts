// ==UserScript==
// @name        LOC call number copy
// @namespace   https://github.com/holyspiritomb
// @author      holyspiritomb
// @version     0.0.2
// @description Copy the call number 
// @homepageURL https://github.com/holyspiritomb/userscripts
// @license     MIT
// @match       https://id.loc.gov/resources/works/*
// @run-at      document-idle
// @grant       GM_setClipboard
// @grant       unsafeWindow
// @require     https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var lccNumber;
var workTitle;
var authorName;

workTitle = $("dt[title='bf:Title'] + dd")[0].innerText.replace(" : ", ": ");

//if ($("div.bf-display-contribution a[href*='/authorities/names/']").length == 1){
//    authorName = $("div.bf-display-contribution a[href*='/authorities/names/']").text();
//    alert(authorName);
//}

$("div.bf-display-classification > dd").each(
    function() {
        let catalogType = this.childNodes[0].innerText;
        if (catalogType == "LCC: ") {
            lccNumber = this.childNodes[1].wholeText;
            $("h1").after(`<div id="callnumber">${lccNumber} <span></span></div>`);
            $("div#callnumber > span").append('\u{1F4CB}');
        }
});

if (lccNumber != null) {
    $("div#callnumber > span").on('click', function(){
        lccNumber.replace("  ","");
        GM_setClipboard(lccNumber);
        this.innerHTML = "";
        this.append('\u2713');
    });
}

$("h1").after(`<div id="workTitle">${workTitle} </div>`);
$("div#workTitle").on('click', function(){
    GM_setClipboard(workTitle);
    this.append('\u2713');
});
