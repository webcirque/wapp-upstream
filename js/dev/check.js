"use strict";

var reasonText;
var switchPane = function (tid) {
    Array.from(document.querySelectorAll(".medium-window")).forEach((e, i) => {
        e.style.display = "none";
        if (e.id == tid) {
            e.style.display = "";
        };
        Array.from(document.querySelectorAll(".loader-webcirque")).forEach((e, i) => {
            e.style.animation = "";
        });
    });
};
var rejectwr = function (reason) {
    switchPane("win-reject");
    reasonText.innerText = reason;
};

document.addEventListener("readystatechange", function () {
    if (this.readyState == "interactive") {
        // Elements
        reasonText = document.querySelector("#text-reason");
        // Functions
        self.top.postMessage(JSON.parse('{"loadstage": "check", "from": "check", "type": "loadstage"}'), "*");
        self.addEventListener("message", function (msg) {
            switch (msg.data.type) {
                case "action" : {
                    switch (msg.data.action) {
                        case "check": {
                            console.log("Security check started.");
                            Array.from(document.querySelectorAll(".loader-webcirque")).forEach((e, i) => {
                                e.style.animation = "loadin 1s linear infinite"
                            });
                            if (window.wenv) {
                                if (wenv.env) {
                                    if (wenv.env.trustver) {
                                        if (!(wenv.env.danger) || wenv.env.tags.indexOf("mod_cn") != -1) {
                                            if (wenv.env.trust) {
                                                if (wenv.env.ver) {
                                                    switchPane("win-resolve");
                                                } else {
                                                    rejectwr("Cannot know current version of your browser.");
                                                };
                                            } else {
                                                rejectwr("Faking another browser.")
                                            };
                                        } else {
                                            rejectwr("Blocklisted browser.");
                                        };
                                    } else {
                                        rejectwr("Fake browser version detected.");
                                    };
                                } else {
                                    rejectwr("Cannot distinguish current environment: Empty wenv.env");
                                };
                            } else {
                                rejectwr("Cannot load [websf@webcirque.main.wenv]");
                            };
                            break;
                        };
                    };
                };
            };
        });
    };
});
