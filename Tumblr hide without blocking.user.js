// ==UserScript==
// @name        Tumblr hide without blocking
// @namespace   https://github.com/holyspiritomb
// @match       https://www.tumblr.com/*
// @grant       GM_getValue
// @grant       GM_addStyle
// @version     0.0.1
// @author      holyspiritomb
// @run-at      document-end
// @require     https://code.jquery.com/jquery-latest.min.js
// @require     https://greasyfork.org/scripts/383527-wait-for-key-elements/code/Wait_for_key_elements.js?version=701631
// @inject-into page
// @icon        https://www.google.com/s2/favicons?domain=tumblr.com
// @description Hides conversations with specific users, and stops those users from appearing as suggested recipients of posts when you click share.
// ==/UserScript==

let hiddenFriends = Array.from(GM_getValue("hidethese","staff"));

for (friend of hiddenFriends){
    GM_addStyle(`button[aria-label="Select ${friend}"]{display:none;}`);
}

function shouldHide(friend) {
    let friendIndex = hiddenFriends.indexOf(friend);
    if (friendIndex == -1) {
        return false;
    } else {
    return true;
    }
}

waitForKeyElements ("button[aria-label='Conversation'] div.pTvJc", function() {
    $('button[aria-label=Conversation] div.pTvJc').each(function() {
        let friendName = $(this)[0].innerText;
        if (shouldHide(friendName) == true) {
            console.log(`hiding ${friendName}`)
            let conversation = $(this).closest('button');
            conversation.css("display","none");
            }
    });
});
