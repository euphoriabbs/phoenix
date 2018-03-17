
function load (library){}

interface load {library: Object}

interface EternityRenderOptions {
    text?: string,
    encoding?: string,
    menu?: string,
    speed?: number,
    mode?: string,
    align?: string,
    file?: string
}

function console {
    this.print = Object
}

declare namespace console {
    function print(string): string
}