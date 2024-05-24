export type NodeType =
    | "ProgramNode"
    | "VariableDeclaration"
    | "NumericLiteral"
    | "StringLiteral"
    | "Identifier"
    | "BinaryExpression"
    | "AssignmentExpression"
    | "Property"
    | "ObjectLiteral"
    | "MemberExpression"
    | "CallExpression";

export interface Statement {
    kind: NodeType;
}

export interface Expression extends Statement {}

export interface VariableDeclaration extends Statement {
    kind: "VariableDeclaration";
    constant: boolean;
    identifier: string;
    value?: Expression;
}

export interface ProgramNode extends Statement {
    kind: "ProgramNode";
    body: Statement[];
}

export interface BinaryExpression extends Expression {
    kind: "BinaryExpression";
    left: Expression;
    right: Expression;
    operator: string;
}
export interface CallExpression extends Expression {
    kind: "CallExpression";
    args: Expression[];
    caller: Expression;
}
export interface MemberExpression extends Expression {
    kind: "MemberExpression";
    object: Expression;
    property: Expression;
    computed: boolean;
}

export interface Identifier extends Expression {
    kind: "Identifier";
    symbol: string;
}

export interface NumericLiteral extends Expression {
    kind: "NumericLiteral";
    value: number;
}

export interface StringLiteral extends Expression {
    kind: "StringLiteral";
    value: string;
}

export interface AssignmentExpression extends Expression {
    kind: "AssignmentExpression";
    assigne: Expression;
    value: Expression;
}

export interface Property extends Expression {
    kind: "Property";
    key: string;
    value?: Expression;
}

export interface ObjectLiteral extends Expression {
    kind: "ObjectLiteral";
    properties: Property[];
}
