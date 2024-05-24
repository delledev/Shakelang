import {
    AssignmentExpression,
    BinaryExpression,
    CallExpression,
    Identifier,
    NumericLiteral,
    ObjectLiteral,
    ProgramNode,
    Statement,
    StringLiteral,
    VariableDeclaration,
} from "../ast/astTypes.ts";
import Environment from "./environment.ts";
import {
    evaluateAssignment,
    evaluateBinaryExpression,
    evaluateCallExpression,
    evaluateIdentifier,
    evaluateObject,
} from "./evaluation/expressions.ts";
import {
    evaluateProgram,
    evaluateVariableDeclaration,
} from "./evaluation/statements.ts";
import { NumberValue, RuntimeValue, StringValue } from "./values.ts";

export function evalNode(astNode: Statement, env: Environment): RuntimeValue {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: (astNode as NumericLiteral).value,
                type: "number",
            } as NumberValue;
        case "StringLiteral":
            return {
                value: (astNode as StringLiteral).value,
                type: "string",
            } as StringValue;
        case "Identifier":
            return evaluateIdentifier(astNode as Identifier, env);
        case "ObjectLiteral":
            return evaluateObject(astNode as ObjectLiteral, env);
        case "CallExpression":
            return evaluateCallExpression(astNode as CallExpression, env);
        case "AssignmentExpression":
            return evaluateAssignment(astNode as AssignmentExpression, env);
        case "BinaryExpression":
            return evaluateBinaryExpression(astNode as BinaryExpression, env);
        case "ProgramNode":
            return evaluateProgram(astNode as ProgramNode, env);
        case "VariableDeclaration":
            return evaluateVariableDeclaration(
                astNode as VariableDeclaration,
                env,
            );
        default:
            console.error("Cannot interpret this ast node yet.", astNode);
            Deno.exit(0);
    }
}
