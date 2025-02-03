// ==UserScript==
// @name         Clearsky links on bsky.app
// @namespace    https://github.com/holyspiritomb
// @description  Adds unobtrusive links to clearsky next to usernames on profiles and lists.
// @match        https://bsky.app/profile/*
// @match        https://bsky.app/starter-pack/*
// @grant        none
// @homepageURL  https://github.com/holyspiritomb/userscripts
// @homepage     https://github.com/holyspiritomb/userscripts
// @updateURL    https://raw.githubusercontent.com/holyspiritomb/userscripts/main/bsky/clearsky-link-insert.user.js
// @downloadURL  https://raw.githubusercontent.com/holyspiritomb/userscripts/main/bsky/clearsky-link-insert.user.js
// @version      0.0.1
// @author       holyspiritomb
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?domain=clearsky.app
// @require      https://code.jquery.com/jquery-latest.min.js
// @require      https://greasyfork.org/scripts/446257-waitforkeyelements-utility-function/code/waitForKeyElements%20utility%20function.js?version=1059316
// ==/UserScript==

/* global waitForKeyElements */
(() => {
    "use strict";

    function markSeen(el) {
        el.classList.add("clearskyseen");
    }

    function getClearUrl(linkEl) {
        const linkUrl = linkEl.href;
        const clearUrl = linkUrl.replace("bsky.app/profile", "clearsky.app");
        return clearUrl;
    }

    function addClearskyButton(prevEl, clearButtonUrl) {
        if (prevEl.classList.contains("clearskyseen")) {
            return;
        } else {
            let clearButton = document.createElement("a");
            clearButton.href = clearButtonUrl;
            clearButton.innerText = " 🔍";
            clearButton.style = "padding-left:5px; pointer-events:auto !important; text-decoration:none; font-style: normal;";
            clearButton.target = "_blank";
            prevEl.append(clearButton);
            markSeen(prevEl);
        }
    }

    // function addButtons(keyEl, containEl, userLinkEl, insertPoint, buttonEl) {
    //     console.log("hi im a cool function");
    //
    //     waitForKeyElements(keyEl, function() {
    //         markSeen(containEl);
    //         // const buttonUrl = getClearUrl(userLinkEl);
    //         //let clearButton = buildClearButton(buttonUrl);
    //         // insertPoint.append(clearButton);
    //         // containEl.classList.add("x)
    //         // markSeen(insertPoint)
    //         //insertPoint.classList.add("clearskyseen");
    //     }, false, 5000, -1); // eslint-disable-line @stylistic/js/space-unary-ops
    // }


    if (document.location.href.endsWith("/follows") || document.location.href.endsWith("/following")) {
        waitForKeyElements("a[href^='/profile/'][aria-label][role='link'][style*='color'] > div > div", function(){
            for (const followblock of document.querySelectorAll("a[href^='/profile/'][aria-label][role='link'][style*='color']:not(.clearskyseen)") ) {
                markSeen(followblock);
                const followNameEl = followblock.firstChild.children[1].children[1];
                // console.log(followblock.firstChild.children[1].lastChild);
                //followNameEl.style.border = "1px solid yellow";
                const clearFollowUrl = getClearUrl(followblock);
                //followNameEl.classList.add("clearskyseen");
                addClearskyButton(followNameEl, clearFollowUrl);
            }
        }, false, 5000, -1); // eslint-disable-line @stylistic/js/space-unary-ops
    } else if (document.location.href.includes("/lists/")) {
        waitForKeyElements("a[data-testid^='user-'][href^='/profile/']", function() {
            $("a[data-testid^='user-'][href^='/profile/']:not(.clearskyseen)").each( function() {
                // $(this)[0].classList.add("clearskyseen");
                markSeen(this[0]);
                const insertPoint = $(this)[0].firstChild.children[1].children[1];
                const clearUrl = getClearUrl($(this)[0]);
                addClearskyButton(insertPoint, clearUrl);
            });
        }, false, 5000, -1); // eslint-disable-line @stylistic/js/space-unary-ops
    } else if (document.location.href.includes("/starter-pack/")) {
        waitForKeyElements("a[href*='/profile/'][aria-label^='View'][aria-label*='s profile'][role='link'] div[dir]", function() {
            $("a[href*='/profile/'][aria-label^='View'][aria-label*='s profile']:not(.clearskyseen)").each( function() {
                // $(this)[0].classList.add("clearskyseen");
                markSeen(this[0]);
                const insertPoint = $(this)[0].firstChild.firstChild.children[1].children[1];
                const clearUrl = getClearUrl($(this)[0]);
                addClearskyButton(insertPoint, clearUrl);
            });
        }, false, 5000, 5);
    } else {
        waitForKeyElements("[data-testid='profileHeaderDisplayName'] a", function() {
            const profileName = document.querySelector("[data-testid='profileHeaderDisplayName']");
            if (profileName.classList.contains("clearskyseen")) {
                return;
            } else {
                markSeen(profileName);
                const profileLinkEl = profileName.querySelector("a");
                const clearSkyUrl = getClearUrl(profileLinkEl);
                const profileCont = profileName.parentElement.parentElement;
                const profileHandle = profileCont.lastChild;
                addClearskyButton(profileHandle, clearSkyUrl);
            }
        }, false, 5000, -1); // eslint-disable-line @stylistic/js/space-unary-ops
    }
})();
