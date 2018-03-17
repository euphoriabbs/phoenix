/// <reference path="eternity.d.ts" />
/* tslint:enable */
"use strict";
load("sbbsdefs.js");
var Eternity = (function () {
    function Eternity(root) {
        this.root = root;
    }
    Eternity.prototype.render = function (options) {
        var mode = options.mode || "line";
        var encoding = options.encoding || "CP437";
        if (options.text) {
            var file = new File(this.root + "/text/" + options.text);
            if (!file.open("r")) {
                alert("error opening file: " + options.text);
                return;
            }
            var text = file.readAll();
            text.forEach(function (line) {
                switch (mode) {
                    case "character": {
                        line.split("").forEach(function (character) {
                            console.print(character);
                            sleep(options.speed || 0.5);
                        });
                    }
                    case "line": {
                        console.print(line);
                        sleep(options.speed || 25);
                    }
                }
            });
            file.close();
        }
    };
    return Eternity;
}());
var eternity = new Eternity("../../ui/eternity");
eternity.render({
    text: "WELCOME.ANS",
    encoding: "CP437",
    mode: "line",
    speed: 50
});
console.print("\r\n");
console.pause();
