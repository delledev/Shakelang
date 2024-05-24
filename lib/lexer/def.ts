export enum TokenType {
    Identifier,
    Equals,
    StringLiteral,
    Number,
    BinaryOperator,
    Const,
    Let,
    OpenParen,
    Comma,
    Colon,
    OpenBrace,
    CloseBrace,
    Semicolon,
    CloseParen,
    OpenBracket,
    CloseBracket,
    Dot,
    EOF,
}

export interface Token {
    value: string;
    type: TokenType;
}
