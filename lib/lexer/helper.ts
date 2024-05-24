import { Token, TokenType } from "./def.ts";

export function token(val: string = "", type: TokenType): Token {
    return {
        value: val,
        type: type,
    };
}

export function isAlpha(str: string): boolean {
    return str.toLowerCase() != str.toUpperCase();
}

export function isInt(str: string): boolean {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(str);
}

export const skippables = [" ", "\n", "\t", "\r"];
export function isSkippable(str: string): boolean {
    return skippables.includes(str);
}
