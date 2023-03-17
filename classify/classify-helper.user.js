// ==UserScript==
// @name        Classify helper
// @namespace   https://github.com/holyspiritomb
// @match       *://classify.oclc.org/classify2/ClassifyDemo*
// @grant       GM_setClipboard
// @version     1.1
// @author      holyspiritomb
// @require     https://code.jquery.com/jquery-latest.min.js
// @description Make using the web demo easier for copying data into Calibre.
// ==/UserScript==


let owilink = $('a[href^="http://classify.oclc.org/classify2/ClassifyDemo?owi="]');
//console.log(owilink[0]);
let owi = owilink[0].href.split('=')[1];
let owiId = `oclc-owi:${owi}`;
//console.debug(owi);



let lccrow = $('a[href*="https://classweb.org/min"]').closest("tr");
//console.debug(lccrow);
let lccelem = lccrow[0].children[1];
//console.debug(lccelem);
let lcc = lccelem.innerText;
//console.debug(lcc);

const fastTags = [];

$('a[href^="/classify2/ClassifyDemo?search-subhead-txt="]').each(function() {
    //append each to fastTags
    let fastTag = this.innerText;
    fastTag = fastTag.replace(/,\s*/g, "--");
    fastTags.push(fastTag);
    //console.debug(fastTag);
});

console.log(fastTags);
let fastTagsStr = fastTags.toString();

$('div#display-Summary').after(`
<div id="LOC"><b>LCC</b>: ${lcc}</div>
<div id="OWI"><b id="oclcOwi">OWI</b>: <span>${owi}</span></div>
<div id="fast_tags"><b>FAST</b>: ${fastTags}</div>
`);

$("div#LOC").on('click', function(){
    GM_setClipboard(lcc);
    this.append(' \u2713');
});
$("div#OWI>span").on('click', function(){
    GM_setClipboard(owi);
    this.append(' \u2713');
});
$("div#fast_tags").on('click', function(){
    GM_setClipboard(fastTagsStr);
    this.append(' \u2713');
});

$('b#oclcOwi').on('click', function(){
    GM_setClipboard(owiId);
    alert(`copied ${owiId} to clipboard`);
});

