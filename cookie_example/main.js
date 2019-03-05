function setCookies(value) {
    // document.getElementById("test").innerHTML = "test";
    document.cookie = "section=" + value;
    window.open("contact.html", "_self");
}

function readCookies() {
    var myCookies = {}
    var cooks = document.cookie.split(";");
    for (var id in cooks) {
        var cookie = cooks[id].split("=");
        myCookies[cookie[0].trim()] = cookie[1];
    }
    if (myCookies["section"] != undefined) {
        document.getElementById(myCookies["section"]).style.display = "block";
    } else {
        document.getElementById("four").style.display = "block";
    }
}

function deleteCookie() {
    document.cookie = "section=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
}