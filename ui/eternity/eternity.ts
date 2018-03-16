/// <reference path="eternity.d.ts" />

/* tslint:enable */

"use strict";

load("sbbsdefs.js")

class Eternity {
    public name: string

    constructor(name) {
        this.name = name
    }

    render(options: EternityRenderOptions) {


        if (options.text) {

            let f = new File(`../../ui/eternity/text/#{options.text}`)

            if(!f.open("r")) {
                alert("error opening file: " + options.text)
                return
            }

            // console.print("\1n");
            console.clear();
            let text = f.readAll();
            for (var i=0;i<text.length;i++) {
                console.print(text[i]);
                if (i<text.length-1)
                    console.print("\r\n")
                console.line_counter = 0;
            }
            f.close();
        }
    }
}

const eternity = new Eternity("euphoria")

eternity.render({ text: "WELCOME.ANS"})

