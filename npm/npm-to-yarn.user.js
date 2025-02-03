// ==UserScript==
// @name         NPM: Replace 'npm i' with 'yarn add'
// @namespace    https://github.com/holyspiritomb
// @author       holyspiritomb
// @version      0.0.1
// @description  Replaces 'npm i' with 'yarn add' on npmjs.com.
// @icon         https://www.google.com/s2/favicons?domain=npmjs.com
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @homepage     https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/npm/npm-to-yarn.user.js
// @downloadURL  https://raw.githubusercontent.com/holyspiritomb/userscripts/main/npm/npm-to-yarn.user.js
// @author       holyspiritomb
// @match        https://*.npmjs.com/package/*
// @run-at       document-idle
// @inject-into  auto
// @grant        none
// @require      https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function() {
    'use strict';
    $('.lh-copy.flex-row > p > code:has(+button[aria-label="Copy install command line"])').each( function() {
        const origTxt = this.innerText;
        const newTxt = origTxt.replace("npm i ", "yarn add ");
        this.textContent = newTxt;
    });
})();
