// ==UserScript==
// @name        LOC classification helper
// @namespace   https://github.com/holyspiritomb
// @match       *://id.loc.gov/authorities/classification/*
// @grant       GM_setClipboard
// @version     1.0
// @author      holyspiritomb
// @require     https://code.jquery.com/jquery-latest.min.js
// @description 12/16/2022, 9:21:36 PM
// ==/UserScript==

let locCode = document.querySelector("span[property='madsrdf:code skos:notation']").innerText;
var locSubj;
if (document.querySelector("span[property='madsrdf:authoritativeLabel skos:prefLabel']")) {
	locSubj = document.querySelector("span[property='madsrdf:authoritativeLabel skos:prefLabel']").innerText;
} else {
	locSubj = document.querySelector("h1 > span:last-child").innerText;
}
let locDescCall = locCode + " " + locSubj;
console.log(locDescCall);

let inj = document.createElement("div");
inj.id = "injectedElem"
inj.innerHTML = `<span>${locDescCall}</span>`;

document.querySelector("div[about] > div").after(inj);
$("#injectedElem").on("click",function(){
	GM_setClipboard(locDescCall);
	alert(`copied ${locDescCall}`);
});
