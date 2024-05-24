import {
    AssignmentExpression,
    BinaryExpression,
    CallExpression,
    Identifier,
    ObjectLiteral,
} from "../../ast/astTypes.ts";
import Environment from "../environment.ts";
import { evalNode } from "../interpeter.ts";
import {
    MakeNull,
    NativeFunctionValue,
    NumberValue,
    ObjectValue,
    RuntimeValue,
} from "../values.ts";

export function evaluateBinaryExpression(
    binOp: BinaryExpression,
    env: Environment,
): RuntimeValue {
    const left = evalNode(binOp.left, env);
    const right = evalNode(binOp.right, env);

    if (left.type == "number" && right.type == "number") {
        return evaluateNumericExpression(
            left as NumberValue,
            right as NumberValue,
            binOp.operator,
        );
    } else {
        return MakeNull();
    }
}

export function evaluateNumericExpression(
    left: NumberValue,
    right: NumberValue,
    operator: string,
) {
    let result: number;

    if (operator == "+") {
        result = left.value + right.value;
    } else if (operator == "-") {
        result = left.value - right.value;
    } else if (operator == "*") {
        result = left.value * right.value;
    } else if (operator == "/") {
        //TODO:Divison by zero checks
        result = left.value / right.value;
    } else {
        //not yet implemented
        result = left.value % right.value;
    }

    return {
        type: "number",
        value: result,
    } as NumberValue;
}

export function evaluateIdentifier(
    ident: Identifier,
    env: Environment,
): RuntimeValue {
    const val = env.lookUpVar(ident.symbol);
    return val;
}

export function evaluateAssignment(
    node: AssignmentExpression,
    env: Environment,
): RuntimeValue {
    if (node.assigne.kind != "Identifier") {
        throw `Invalid left hand side inside assigment expression. ${JSON.stringify(node.assigne)}`;
    }
    const variableName = (node.assigne as Identifier).symbol;
    return env.assignVar(variableName, evalNode(node.value, env));
}

export function evaluateObject(
    obj: ObjectLiteral,
    env: Environment,
): RuntimeValue {
    const object = {
        type: "object",
        properties: new Map(),
    } as ObjectValue;

    for (const { key, value } of obj.properties) {
        const runtimeValue =
            value == undefined ? env.lookUpVar(key) : evalNode(value, env);
        object.properties.set(key, runtimeValue);
    }

    return object;
}

export function evaluateCallExpression(
    callExpression: CallExpression,
    env: Environment,
): RuntimeValue {
    const args: RuntimeValue[] = callExpression.args.map((arg) =>
        evalNode(arg, env),
    );
    const fn = evalNode(callExpression.caller, env);

    if (fn.type != "nativeFunction") {
        throw "Function is not defined." + JSON.stringify(fn);
    }

    const result = (fn as NativeFunctionValue).call(args, env);
    return result;
}
