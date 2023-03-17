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
let owi = owilink.href.split('=')[1];



let lccrow = $('a[href*="https://classweb.org/min"]').closest("tr");
let lccelem = lccrow.children[1];

var fastTags;

$('a[href^="/classify2/ClassifyDemo?search-subhead-txt="]').each(function() {
    //append each to fastTags
});
