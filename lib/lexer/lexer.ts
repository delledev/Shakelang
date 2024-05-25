import { identifyType, KEYWORDS, KEYWORDS_LEN } from "./identifiers.ts";
import { Token, TokenType } from "./def.ts";
import { isAlpha, isInt, isNewLine, isSkippable, token } from "./helper.ts";

export function tokenize(sourceString: string): Token[] {
    const location = [1, 0]; //TODO: Fix this shit.
    const tokens = new Array<Token>();
    const srcArray = sourceString.split("");
    while (srcArray.length > 0) {
        location[1] = location[1] + 1;
        if (srcArray[0] == "\n") {
            location[0] = location[0] + 1;
        }

        if (srcArray[0] === "/" && srcArray[1] === "/") {
            let letter = srcArray.shift();
            while (true) {
                //TODO: Very messy code fix it.
                if (letter == "\r") {
                    break;
                }
                if (letter == "\n") {
                    break;
                }
                if (letter == "\r\n") {
                    break;
                }
                letter = srcArray.shift();
            }
        }
        switch (identifyType(srcArray[0])) {
            case TokenType.OpenParen:
                tokens.push(token(srcArray.shift(), TokenType.OpenParen));
                break;
            case TokenType.CloseParen:
                tokens.push(token(srcArray.shift(), TokenType.CloseParen));
                break;
            case TokenType.BinaryOperator:
                tokens.push(token(srcArray.shift(), TokenType.BinaryOperator));
                break;
            case TokenType.Equals:
                tokens.push(token(srcArray.shift(), TokenType.Equals));
                break;
            case null:
                //number
                if (isInt(srcArray[0])) {
                    let number = "";
                    while (srcArray.length > 0 && isInt(srcArray[0])) {
                        number += srcArray.shift();
                        location[1] = location[1] + 1;
                    }
                    tokens.push(token(number, TokenType.Number));
                } else if (isAlpha(srcArray[0])) {
                    let str = "";
                    while (srcArray.length > 0 && isAlpha(srcArray[0])) {
                        str += srcArray.shift();
                        location[1] = location[1] + 1;
                    }

                    let isReserved = false;
                    let reservedIndex = 0;
                    for (let i = 0; i < KEYWORDS_LEN; i++) {
                        if (KEYWORDS[i].includes(str.toLowerCase())) {
                            isReserved = true;
                            reservedIndex = i;
                        }
                    }
                    if (!isReserved) {
                        tokens.push(token(str, TokenType.Identifier));
                    } else if (reservedIndex == TokenType.Quote) {
                        const currentWords: string[] = [];
                        let word = "";
                        srcArray.shift(); //Remove the extra space
                        while (srcArray.length > 0 && !KEYWORDS[TokenType.Quote].includes(word.toLowerCase()) && srcArray[0] != "\r") {
                            const letter = srcArray.shift();
                            word += letter;
                            if (letter == " ") {
                                currentWords.push(word);
                                word = "";
                            }
                        }
                        if (!KEYWORDS[TokenType.Quote].includes(word)) {
                            currentWords.push(word);
                        } else {
                            currentWords[currentWords.length - 1] = currentWords[currentWords.length - 1].substring(0, currentWords[currentWords.length - 1].length - 1);
                        }
                        const strValue = currentWords.join("");
                        tokens.push(token(strValue, TokenType.StringLiteral));
                    } else {
                        tokens.push(token(str, reservedIndex));
                    }
                } else if (isSkippable(srcArray[0])) {
                    srcArray.shift();
                } else {
                    console.error(`Unrecognized character found at ${location[0]}:${location[1]}, "${srcArray[0]}"`);
                    Deno.exit(1);
                }
                break;
        }
    }
    tokens.push(token("EOF", TokenType.EOF));
    return tokens;
}
