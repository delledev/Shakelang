import Environment from "./environment.ts";

export type ValueType =
    | "null"
    | "number"
    | "boolean"
    | "object"
    | "nativeFunction";

export interface RuntimeValue {
    type: ValueType;
}

export interface NullValue extends RuntimeValue {
    type: "null";
    value: null;
}
export interface NumberValue extends RuntimeValue {
    type: "number";
    value: number;
}
export interface BooleanValue extends RuntimeValue {
    type: "boolean";
    value: boolean;
}

export interface ObjectValue extends RuntimeValue {
    type: "object";
    properties: Map<string, RuntimeValue>;
}

export type FunctionCall = (
    args: RuntimeValue[],
    env: Environment,
) => RuntimeValue;

export interface NativeFunctionValue extends RuntimeValue {
    type: "nativeFunction";
    call: FunctionCall;
}

export function MakeNativeFunction(call: FunctionCall) {
    return {
        type: "nativeFunction",
        call,
    } as NativeFunctionValue;
}

export function MakeBoolean(b: boolean = true) {
    return {
        type: "boolean",
        value: b,
    } as BooleanValue;
}

export function MakeNull() {
    return {
        type: "null",
        value: null,
    } as NullValue;
}

export function makeNumber(number = 0) {
    return {
        type: "number",
        value: number,
    } as NumberValue;
}
