import Environment from "./environment.ts";
import { BooleanValue, MakeNull, NumberValue, RuntimeValue, StringValue } from "./values.ts";

export function print(args: RuntimeValue[], _env: Environment) {
    let result = "";
    while (args.length > 0) {
        const value = args.shift();
        switch (value?.type) {
            case "string":
                result += ` ${(value as StringValue).value}`;
                break;
            case "number":
                result += ` ${(value as NumberValue).value}`;
                break;
            case "boolean":
                result += ` ${(value as BooleanValue).value ? "True" : "False"}`;
                break;
            default:
                result += ` ${JSON.stringify(value)}`;
        }
    }
    console.log(result);
    return MakeNull();
}

export function _prompt(args: RuntimeValue[], _env: Environment): RuntimeValue {
    const ans = prompt((args[0] as StringValue).value);

    return {
        type: "string",
        value: ans,
    } as StringValue;
}
