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
        let speed = options.speed || 30

        if (options.text) {

            let file = new File(`${this.root}/text/${options.text}`)

            if(!file.open("r")) {
                alert("error opening file: " + options.text)
                return
            }

            let text = file.readAll();

            text.forEach( line => {

                switch(mode) {

                    // For character-at-a-time rendering...
                    case "character": {

                        line.split("").forEach(character => {

                            console.print(character)
                            sleep(speed)
                        })
                    }

                    // For line-at-a-time rendering...
                    case "line": {

                        console.print(line)
                        sleep(speed)
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
