import { TokenType } from "./def.ts";

export const KEYWORDS: Record<number, string[]> = {
    [TokenType.Identifier]: [],
    [TokenType.Equals]: ["equals"],
    [TokenType.Number]: [],
    [TokenType.BinaryOperator]: [],
    [TokenType.StringLiteral]: [],
    [TokenType.Let]: ["let"],
    [TokenType.Const]: ["const"],
    [TokenType.OpenParen]: ["openp"],
    [TokenType.CloseParen]: ["closep"],
    [TokenType.Semicolon]: ["semicolon"],
    [TokenType.Comma]: ["comma"],
    [TokenType.Colon]: ["colon"],
    [TokenType.OpenBrace]: ["openbc"],
    [TokenType.CloseBrace]: ["closebc"],
    [TokenType.OpenBracket]: ["openbk"],
    [TokenType.CloseBracket]: ["closebk"],
    [TokenType.Dot]: ["dot"],
};
export const KEYWORDS_LEN = 17;

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

function checkSemiColon(val: string): boolean {
    const semiColons = [";"];
    return semiColons.includes(val);
}
