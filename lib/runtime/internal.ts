import Environment from "./environment.ts";
import { MakeNull, NumberValue, RuntimeValue, StringValue } from "./values.ts";

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
            default:
                result += ` ${JSON.stringify(value)}`;
        }
    }
    console.log(result);
    return MakeNull();
}
