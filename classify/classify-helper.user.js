// ==UserScript==
// @name        Classify helper
// @namespace   https://github.com/holyspiritomb
// @match       *://classify.oclc.org/classify2/ClassifyDemo*
// @grant       GM_setClipboard
// @version     1.2
// @author      holyspiritomb
// @run-at      document-idle
// @updateURL   https://raw.githubusercontent.com/holyspiritomb/userscripts/main/classify/classify-helper.user.js
// @require     https://code.jquery.com/jquery-latest.min.js
// @description Make using the web demo easier for copying data into Calibre.
// ==/UserScript==

$('div#display-Summary').after(`
    <div id="classifyHelper"><h2>Classify Helper</h2></div>
`);

let owilink = $('a[href^="http://classify.oclc.org/classify2/ClassifyDemo?owi="]');
let owi = owilink[0].href.split('=')[1];
let owiId = `oclc-owi:${owi}`;

$('div#classifyHelper').append(`
<div id="OWI"><b id="oclcOwi">OWI</b>: <span>${owi}</span></div>
`);

$("div#OWI>span").on('click', function(){
    GM_setClipboard(owi);
    this.append(' \u2713');
});

$('b#oclcOwi').on('click', function(){
    GM_setClipboard(owiId);
    alert(`copied ${owiId} to clipboard`);
});

const fastTags = [];

$('a[href^="/classify2/ClassifyDemo?search-subhead-txt="]').each(function() {
    //append each to fastTags
    let fastTag = this.innerText;
    fastTag = fastTag.replace(/,\s*/g, "--");
    fastTags.push(fastTag);
});

console.log(fastTags);
let fastTagsStr = fastTags.toString();

$('div#classifyHelper').append(`
<div id="fast_tags"><b>FAST</b>: ${fastTags}</div>
`);

$("div#fast_tags").on('click', function(){
    GM_setClipboard(fastTagsStr);
    this.append(' \u2713');
});

let lcc = "";
let lcclink = $('a[href*="https://classweb.org/min"]');
if (lcclink != null){
    let lccrow = $('a[href*="https://classweb.org/min"]').closest("tr");
    let lccelem = lccrow[0].children[1];
    lcc = lccelem.innerText;
    $('div#classifyHelper>h2').after(`
    <div id="LOC"><b>LCC</b>: ${lcc}</div>
    </div>
    `);

    $("div#LOC").on('click', function(){
        GM_setClipboard(lcc);
        this.append(' \u2713');
    });
}
