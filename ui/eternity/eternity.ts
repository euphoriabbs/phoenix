/// <reference path="eternity.d.ts" />

/* tslint:enable */

"use strict";

load("sbbsdefs.js")

class Eternity {
    public root: string

    constructor(root) {
        this.root = root
    }

    render(options: EternityRenderOptions) {

        let mode = options.mode || "line"
        let encoding = options.encoding || "CP437"

        if (options.text) {

            let file = new File(`${this.root}/text/${options.text}`)

            if(!file.open("r")) {
                alert("error opening file: " + options.text)
                return
            }

            let text = file.readAll();

            text.forEach( line => {

                switch(mode) {

                    case "character": {

                        line.split("").forEach(character => {

                            console.print(character)
                            sleep(options.speed || 0.5)
                        })
                    }

                    case "line": {
                        console.print(line)
                        sleep(options.speed || 25)
                    }
                }
            })

            file.close();
        }
    }
}

const eternity = new Eternity("../../ui/eternity")

eternity.render(
    {
        text: "WELCOME.ANS",
        encoding: "CP437",
        mode: "line",
        speed: 50
    }
)

console.print("\r\n")
console.pause()
