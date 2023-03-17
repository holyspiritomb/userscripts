// ==UserScript==
// @name        Classify helper
// @namespace   https://github.com/holyspiritomb
// @match       *://classify.oclc.org/classify2/ClassifyDemo*
// @grant       GM_setClipboard
// @version     1.0
// @author      holyspiritomb
// @require     https://code.jquery.com/jquery-latest.min.js
// @description Make using the web demo easier for copying data.
// ==/UserScript==


let owilink = $('a[href^="http://classify.oclc.org/classify2/ClassifyDemo?owi="]');
console.log(owilink[0]);
let owi = owilink[0].href.split('=')[1];
console.debug(owi);



let lccrow = $('a[href*="https://classweb.org/min"]').closest("tr");
console.debug(lccrow);
let lccelem = lccrow[0].children[1];
console.debug(lccelem);
let lcc = lccelem.innerText;
console.debug(lcc);

var fastTags;

$('a[href^="/classify2/ClassifyDemo?search-subhead-txt="]').each(function() {
    //append each to fastTags
    let fastTag = this.innerText;
    fastTag = fastTag.re(",", ";");
    console.debug(fastTag);
});
