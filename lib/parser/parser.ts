import {
    AssignmentExpression,
    BinaryExpression,
    CallExpression,
    Expression,
    Identifier,
    MemberExpression,
    NumericLiteral,
    ObjectLiteral,
    ProgramNode,
    Property,
    Statement,
    VariableDeclaration,
} from "../ast/astTypes.ts";
import { Token, TokenType } from "../lexer/def.ts";
import { tokenize } from "../lexer/lexer.ts";

export default class Parser {
    private tokens: Token[] = [];

    public produceAST(sourceCode: string): ProgramNode {
        this.tokens = tokenize(sourceCode);
        const program: ProgramNode = {
            kind: "ProgramNode",
            body: [],
        };

        while (this.notEOF()) {
            program.body.push(this.parseStatement());
        }
        return program;
    }

    private notEOF(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }
    private at() {
        return this.tokens[0];
    }
    private eat(): Token {
        return this.tokens.shift() as Token;
    }
    private expect(type: TokenType, err: string) {
        const prevTok = this.eat();
        if (!prevTok || prevTok.type != type) {
            console.error(
                "Parser Error: \n",
                err,
                prevTok,
                "- Expected: ",
                type,
            );
            Deno.exit(1);
        }
        return prevTok;
    }
    private parseStatement(): Statement {
        switch (this.at().type) {
            case TokenType.Const:
            case TokenType.Let:
                return this.parseVaribleDeclaration();
            default:
                return this.parseExpression();
        }
    }

    private parseExpression(): Expression {
        return this.parseAssignmentExpression();
    }

    private parseObjectExpressions(): Expression {
        if (this.at().type != TokenType.OpenBrace) {
            return this.parseAdditiveExpression();
        }

        this.eat();
        const properties = new Array<Property>();
        while (this.notEOF() && this.at().type != TokenType.CloseBrace) {
            const key = this.expect(
                TokenType.Identifier,
                "Object literal key expected.",
            ).value;
            if (this.at().type == TokenType.Comma) {
                this.eat();
                properties.push({
                    kind: "Property",
                    key,
                } as Property);
                continue;
            } else if (this.at().type == TokenType.CloseBrace) {
                properties.push({
                    kind: "Property",
                    key,
                } as Property);
                continue;
            }

            this.expect(
                TokenType.Colon,
                "Missing colon following an identifier in Object Expression.",
            );
            const value = this.parseExpression();
            properties.push({
                value,
                kind: "Property",
                key,
            } as Property);
            if (this.at().type != TokenType.CloseBrace) {
                this.expect(
                    TokenType.Comma,
                    "Expected comma or closing bracket token following property.",
                );
            }
        }

        this.expect(
            TokenType.CloseBrace,
            "Object literal is missing a closing brace.",
        );
        return {
            kind: "ObjectLiteral",
            properties,
        } as ObjectLiteral;
    }
    private parseAssignmentExpression(): Expression {
        const left = this.parseObjectExpressions();
        if (this.at().type == TokenType.Equals) {
            this.eat();

            const value = this.parseAssignmentExpression();
            return {
                value,
                assigne: left,
                kind: "AssignmentExpression",
            } as AssignmentExpression;
        }
        return left;
    }
    private parseAdditiveExpression(): Expression {
        let left = this.parseMultiplicativeExpression();

        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat().value;
            const right = this.parseMultiplicativeExpression();

            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator,
            } as BinaryExpression;
        }
        return left;
    }

    private parseMultiplicativeExpression(): Expression {
        let left = this.parseCallMemberExpression();

        while (this.at().value == "/" || this.at().value == "*") {
            const operator = this.eat().value;
            const right = this.parseCallMemberExpression();

            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator,
            } as BinaryExpression;
        }
        return left;
    }
    private parsePrimaryExpression(): Expression {
        const token = this.at();
        switch (token.type) {
            case TokenType.Identifier:
                return {
                    kind: "Identifier",
                    symbol: this.eat().value,
                } as Identifier;
            case TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                } as NumericLiteral;

            case TokenType.OpenParen: {
                this.eat();
                const val = this.parseExpression();
                this.expect(
                    TokenType.CloseParen,
                    "Unexpected token found inside parenthesis. Expected closed parenthesis.",
                );
                return val;
            }
            default:
                console.error(
                    "Unexpected token found during parsing.",
                    this.at(),
                    this.tokens,
                );
                Deno.exit(1);
        }
    }
    private parseVaribleDeclaration(): Statement {
        const isConst = this.eat().type == TokenType.Const;
        const identifier = this.expect(
            TokenType.Identifier,
            "Expected identifier name.",
        ).value;

        if (this.at().type == TokenType.Semicolon) {
            this.eat();
            if (isConst) {
                throw "Constant expressions must be assigned a value at declaration.";
            }
            return {
                kind: "VariableDeclaration",
                identifier,
                constant: isConst,
            } as VariableDeclaration;
        }

        this.expect(
            TokenType.Equals,
            "Expected equals identifier in variable declaration.",
        );
        const declaration = {
            kind: "VariableDeclaration",
            value: this.parseExpression(),
            constant: isConst,
            identifier,
        } as VariableDeclaration;
        return declaration;
    }

    private parseCallMemberExpression(): Expression {
        const member = this.parseMemberExpression();
        if (this.at().type == TokenType.OpenParen) {
            return this.parseCallExpression(member);
        }

        return member;
    }
    private parseCallExpression(caller: Expression): Expression {
        let callExpression: Expression = {
            kind: "CallExpression",
            caller,
            args: this.parseArgs(),
        } as CallExpression;

        if (this.at().type == TokenType.OpenParen) {
            callExpression = this.parseCallExpression(callExpression);
        }
        return callExpression;
    }
    private parseArgs(): Expression[] {
        this.expect(TokenType.OpenParen, "Expected open parenthesis."); // Possibly redundant
        const args =
            this.at().type == TokenType.CloseParen ? [] : this.parseArgsList();

        this.expect(
            TokenType.CloseParen,
            "Missing closing parenthesis after function call.",
        );
        return args;
    }
    private parseArgsList(): Expression[] {
        const args = [this.parseAssignmentExpression()];
        while (this.at().type == TokenType.Comma && this.eat()) {
            args.push(this.parseAssignmentExpression());
        }
        return args;
    }
    private parseMemberExpression(): Expression {
        let object = this.parsePrimaryExpression();

        while (
            this.at().type == TokenType.Dot ||
            this.at().type == TokenType.OpenBracket
        ) {
            const operator = this.eat();
            let property: Expression;
            let computed: boolean;

            if (operator.type == TokenType.Dot) {
                computed = false;
                property = this.parsePrimaryExpression(); //has to be an identifier
                if (property.kind != "Identifier") {
                    throw "Cannot use dot operator withour right hand side being an identifier.";
                }
            } else {
                //Member chaining
                computed = true;
                property = this.parseExpression();
                this.expect(
                    TokenType.CloseBrace,
                    "Missing closing bracket in computed value.",
                );
            }
            object = {
                kind: "MemberExpression",
                object,
                property,
                computed,
            } as MemberExpression;
        }
        return object;
    }
}
