import { TokenType } from "./def.ts";

export const KEYWORDS: Record<number, string[]> = {
    [TokenType.Identifier]: [],
    [TokenType.Equals]: ["be"],
    [TokenType.Number]: [],
    [TokenType.BinaryOperator]: [],
    [TokenType.StringLiteral]: [],
    [TokenType.Quote]: ["utter", "quote", '"'],
    [TokenType.Let]: ["proclaim", "declare"],
    [TokenType.Const]: ["eternal", "immutable"],
    [TokenType.OpenParen]: ["begins", "beginning"],
    [TokenType.CloseParen]: ["ends", "perchance"],
    [TokenType.Semicolon]: ["pause"],
    [TokenType.Comma]: ["break"],
    [TokenType.Colon]: ["continueth"],
    [TokenType.OpenBrace]: ["commence"],
    [TokenType.CloseBrace]: ["conclude"],
    [TokenType.OpenBracket]: ["openbk"],
    [TokenType.CloseBracket]: ["closebk"],
    [TokenType.Dot]: ["hereby"],
};
export const KEYWORDS_LEN = 18;

export function identifyType(val: string): TokenType | null {
    if (checkOpenParen(val)) {
        return TokenType.OpenParen;
    } else if (checkCloseParen(val)) {
        return TokenType.CloseParen;
    } else if (checkBinaryOperator(val)) {
        return TokenType.BinaryOperator;
    } else if (checkEquals(val)) {
        return TokenType.Equals;
    } else {
        return null;
    }
}

function checkOpenParen(val: string): boolean {
    return val == "(" ? true : false;
}
function checkCloseParen(val: string): boolean {
    return val == ")" ? true : false;
}

function checkBinaryOperator(val: string): boolean {
    const binaryOpps = ["+", "-", "*", "/"];
    return binaryOpps.includes(val);
}

function checkEquals(val: string): boolean {
    const equals = ["="];
    return equals.includes(val);
}

function _checkSemiColon(val: string): boolean {
    const semiColons = [";"];
    return semiColons.includes(val);
}
