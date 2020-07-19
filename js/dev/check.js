"use strict";

document.addEventListener("readystatechange", function () {
    if (this.readyState == "interactive") {
        self.top.postMessage(JSON.parse('{"loadstage": "check", "from": "check", "type": "loadstage"}'), "*");
        self.addEventListener("message", function (msg) {});
    };
});
