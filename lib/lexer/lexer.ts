import { identifyType, KEYWORDS, KEYWORDS_LEN } from "./identifiers.ts";
import { Token, TokenType } from "./def.ts";
import { isAlpha, isInt, isSkippable, token } from "./helper.ts";

export function tokenize(sourceString: string): Token[] {
    const location = [1, 0];
    const tokens = new Array<Token>();
    const srcArray = sourceString.split("");

    while (srcArray.length > 0) {
        location[1] = location[1] + 1;
        if (srcArray[0] == "\n") {
            location[0] = location[0] + 1;
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
                        if (KEYWORDS[i].includes(str)) {
                            isReserved = true;
                            reservedIndex = i;
                        }
                    }
                    if (!isReserved) {
                        tokens.push(token(str, TokenType.Identifier));
                    } else {
                        tokens.push(token(str, reservedIndex));
                    }
                } else if (isSkippable(srcArray[0])) {
                    srcArray.shift();
                } else {
                    console.error(
                        `Unrecognized character found at ${location[0]}:${location[1]}, "${srcArray[0]}"`,
                    );
                    Deno.exit(1);
                }
                break;
        }
    }
    tokens.push(token("EOF", TokenType.EOF));
    return tokens;
}
