// ==UserScript==
// @name        Goodreads Author and Publisher Avoiding
// @namespace   https://github.com/holyspiritomb
// @author      spiritomb
// @version     1.0.0
// @description Warns you with iconography if a book's publisher or author is in your avoid lists.
// @match       https://www.goodreads.com/book/show/*
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @homepageURL https://github.com/holyspiritomb/userscripts
// @updateURL   https://raw.githubusercontent.com/holyspiritomb/userscripts/main/goodreads/goodreads-author-publisher-filtering.user.js
// @icon        https://www.google.com/s2/favicons?domain=goodreads.com
// ==/UserScript==

let valueArrayList = GM_listValues();

function findBookInfo(obj){
    let keys = [];
    for (let key in obj) {
        if (key.startsWith("Book:")) {
            if (obj[key]["details"]){
                keys.push(key);
            }
        }
    }
    return keys;
}

function findBookAuthors(obj){
    let keys = [];
    for (let key in obj) {
        if (key.startsWith("Contributor:")) {
            if (obj[key]["name"]){
                keys.push(key);
            }
        }
    }
    return keys;
}

function inList(itemToTest, someList) {
    let itemIndex = someList.indexOf(itemToTest);
    // eslint-disable-next-line space-unary-ops
    if (itemIndex == -1) {
        return false;
    } else {
        return true;
    }
}

function addWarning(elem, reason) {
    let warningEl = document.createElement("span");
    warningEl.title = `${reason} is in avoid list`;
    warningEl.innerText = '\u26a0\ufe0f'; // the warning sign emoji
    warningEl.style.marginLeft = "5px";
    warningEl.style.marginRight = "5px";
    if (reason == "publisher") {
        warningEl.style.float = "right";
        warningEl.style.display = "inline-block";
        elem.insertAdjacentElement("beforebegin", warningEl);
    } else {
        elem.insertAdjacentElement("afterend", warningEl);
    }
}

if (valueArrayList) {
    let avoidPublishers = [];
    avoidPublishers = GM_getValue("avoidThesePublishers");
    if ( !avoidPublishers ){
        GM_setValue("avoidThesePublishers", ["Publisher1"]);
    } else {
        console.log(avoidPublishers);
    }
    let avoidAuthors = [];
    avoidAuthors = GM_getValue("avoidTheseAuthors");
    if ( !avoidAuthors ){
        GM_setValue("avoidTheseAuthors", ["Author1"]);
    } else {
        console.log(avoidAuthors);
    }
    setTimeout( function () {
        const jsonstring = document.querySelector("script#__NEXT_DATA__").text;
        const jsonobj = JSON.parse(jsonstring);
        const apolloObj = jsonobj.props.pageProps.apolloState;
        const bookId = findBookInfo(jsonobj.props.pageProps.apolloState);
        const bookAuthorId = findBookAuthors(apolloObj);
        console.log(bookAuthorId);
        bookAuthorId.forEach((authId) => {
            console.log(apolloObj[authId]);
        });
        const bookInfo = jsonobj.props.pageProps.apolloState[bookId];
        const publisher = bookInfo["details"]["publisher"];
        let titleNode = document.querySelector("[data-testid='bookTitle']");
        if ( inList(publisher, avoidPublishers) ){
            console.log(`${publisher} is in avoid list`);
            addWarning(titleNode, "publisher");
        } else {
            console.log(`${publisher} is not in avoid list`);
        }
        let authorNodes = document.querySelectorAll("span.ContributorLink__name");
        authorNodes.forEach((element) => {
            let authorName = element.innerText;
            console.log(`checking avoid list for ${authorName}`);
            if ( inList(authorName, avoidAuthors) ){
                console.log(`${authorName} is in avoid list`);
                addWarning(element, "author");
            } else {
                console.log(`${authorName} is not in avoid list`);
            }
        });
        let otherAuthorNodes = document.querySelectorAll("div.BookCard__authorName");
        otherAuthorNodes.forEach((element) => {
            let authorName = element.innerText;
            console.log(`checking avoid list for ${authorName}`);
            if ( inList(authorName, avoidAuthors) ){
                console.log(`${authorName} is in avoid list`);
                addWarning(element, "author");
            } else {
                console.log(`${authorName} is not in avoid list`);
            }
        });
    }, 5000);
} else {
    console.log("No values stored. making default keys now");
    GM_setValue("avoidThesePublishers", ["Publisher1"]);
    GM_setValue("avoidTheseAuthors", ["Author1"]);
}
