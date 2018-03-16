/// <reference path="eternity.d.ts" />
/* tslint:enable */
"use strict";
load("sbbsdefs.js");
var Eternity = (function () {
    function Eternity(name) {
        this.name = name;
    }
    Eternity.prototype.render = function (options) {
        if (options.text) {
            var f = new File("../../ui/eternity/text/#{options.text}");
            if (!f.open("r")) {
                alert("error opening file: " + options.text);
                return;
            }
            // console.print("\1n");
            console.clear();
            var text = f.readAll();
            for (var i = 0; i < text.length; i++) {
                console.print(text[i]);
                if (i < text.length - 1)
                    console.print("\r\n");
                console.line_counter = 0;
            }
            f.close();
        }
    };
    return Eternity;
}());
var eternity = new Eternity("euphoria");
eternity.render({ text: "WELCOME.ANS" });
