import { ProgramNode, VariableDeclaration } from "../../ast/astTypes.ts";
import Environment from "../environment.ts";
import { evalNode } from "../interpeter.ts";
import { MakeNull, NullValue, RuntimeValue } from "../values.ts";

export function evaluateProgram(
    program: ProgramNode,
    env: Environment,
): RuntimeValue {
    let lastEval: RuntimeValue = MakeNull() as NullValue;
    for (const statement of program.body) {
        lastEval = evalNode(statement, env);
    }

    return lastEval;
}

export function evaluateVariableDeclaration(
    node: VariableDeclaration,
    env: Environment,
): RuntimeValue {
    const value = node.value ? evalNode(node.value, env) : MakeNull();
    return env.declareVar(node.identifier, value, node.constant);
}
