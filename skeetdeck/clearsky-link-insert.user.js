// ==UserScript==
// @name         ClearSky links on skeetdeck.pages.dev
// @namespace    https://github.com/holyspiritomb
// @description  Adds unobtrusive 🔍 links to clearsky when viewing a user's profile.
// @match        https://skeetdeck.pages.dev/*
// @grant        none
// @version      1.0
// @author       holyspiritomb
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?domain=skeetdeck.pages.dev
// @require      https://code.jquery.com/jquery-latest.min.js
// @require      https://greasyfork.org/scripts/446257-waitforkeyelements-utility-function/code/waitForKeyElements%20utility%20function.js?version=1059316
// ==/UserScript==

/* global waitForKeyElements */

"use strict";
function clearskyLink(handle) {
    let cHref = "https://clearsky.app/" + handle;
    let cLink = document.createElement("a");
    cLink.href = cHref;
    cLink.target = "_blank";
    cLink.text = "🔍";
    cLink.style.marginLeft = "5px";
    return cLink;
}
waitForKeyElements("button.h-20.w-20 > img[src*='avatar']:not(.clearsky-seen)", function() {
    $("button.h-20.w-20 > img[src*='avatar']").addClass("clearsky-seen");
    $("button.overflow-hidden.text-ellipsis.break-words.text-left").each(
        function() {
            let user;
            let buttonText = $(this)[0].innerText;
            let cLinkEl;
            if ( buttonText.startsWith("@") ) {
                user = buttonText;
                cLinkEl = clearskyLink(user);
                $(this)[0].after(cLinkEl);
            }
        },
    );
}, false, 5000, -1); // eslint-disable-line @stylistic/js/space-unary-ops

