// ==UserScript==
// @name         NPM: Replace 'npm i' with 'yarn add'
// @namespace    https://github.com/holyspiritomb
// @author       holyspiritomb
// @version      0.1.0
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
// @require      https://greasyfork.org/scripts/446257-waitforkeyelements-utility-function/code/waitForKeyElements%20utility%20function.js?version=1059316
// ==/UserScript==

/* global waitForKeyElements */

'use strict';
waitForKeyElements("button[aria-label='Copy install command line']", function() {
    $('.lh-copy.flex-row > p > code:has(+button[aria-label="Copy install command line"])').each( function() {
        const origTxt = this.innerText;
        const newTxt = origTxt.replace("npm i ", "yarn add ");
        this.textContent = newTxt;
    });
    $('div.highlight-source-shell > pre').each( function() {
        const origTxt = this.innerText;
        var newTxt;
        if (origTxt.match("npm i ")) {
            newTxt = origTxt.replace("npm i ", "yarn add ");
        } else if (origTxt.match("npm install --save-dev ")) {
            newTxt = origTxt.replace("npm install --save-dev ", "yarn add -D ");
        } else if (origTxt.match("npm install --save ")) {
            newTxt = origTxt.replace("npm install --save ", "yarn add ");
        } else if (origTxt.match("npm install ")) {
            newTxt = origTxt.replace("npm install ", "yarn add ");
        } else {
            newTxt = origTxt;
        }
        this.textContent = newTxt;
    });
}, false, 5000, 5);
