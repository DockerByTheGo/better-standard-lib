function prettifyJson(json: string): string {
    let level = 0;
    let result = "";
    let inString = false;

    for (let i = 0; i < json.length; i++) {
        const char = json[i];

        // Toggle inString flag for quotes
        if (char === "\"" && (i === 0 || json[i - 1] !== "\\")) {
            inString = !inString;
        }

        if (inString) {
            result += char;
        }
        else {
            switch (char) {
                case "{":
                case "[":
                    result += char;
                    level++;
                    result += `\n${"  ".repeat(level)}`;
                    break;
                case "}":
                case "]":
                    level--;
                    result += `\n${"  ".repeat(level)}${char}`;
                    break;
                case ",":
                    result += char;
                    result += `\n${"  ".repeat(level)}`;
                    break;
                default:
                    result += char;
                    break;
            }
        }
    }

    return result;
}

export function logWithoutMethods(h: object) {
    console.log(prettifyJson(JSON.stringify(h)));
}
