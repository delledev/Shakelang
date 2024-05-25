import { _prompt, print } from "./internal.ts";
import { MakeBoolean, MakeNativeFunction, MakeNull, NumberValue, RuntimeValue } from "./values.ts";

export function createGlobalEnv() {
    const env = new Environment();
    env.declareVar("aye", MakeBoolean(true), true);
    env.declareVar("nay", MakeBoolean(false), true);
    env.declareVar("nonexistant", MakeNull(), true);

    //Native built-in functions
    env.declareVar("speaketh", MakeNativeFunction(print), true);
    env.declareVar("Speaketh", MakeNativeFunction(print), true);
    env.declareVar("reveal", MakeNativeFunction(print), true);
    env.declareVar("Reveal", MakeNativeFunction(print), true);
    env.declareVar("Bid", MakeNativeFunction(_prompt), true);
    env.declareVar("bid", MakeNativeFunction(_prompt), true);
    env.declareVar("Enquire", MakeNativeFunction(_prompt), true);
    env.declareVar("enquire", MakeNativeFunction(_prompt), true);
    return env;
}

export default class Environment {
    private parent?: Environment;
    private variables: Map<string, RuntimeValue>;
    private constants: Set<string>;

    constructor(parentEnv?: Environment) {
        this.parent = parentEnv;
        this.variables = new Map();
        this.constants = new Set();
    }

    public declareVar(variableName: string, value: RuntimeValue, constant: boolean): RuntimeValue {
        if (this.variables.has(variableName)) {
            throw `Cannot re-declare already declared variable '${variableName}'.`;
        }

        this.variables.set(variableName, value);
        if (constant) {
            this.constants.add(variableName);
        }
        return value;
    }

    public lookUpVar(variableName: string): RuntimeValue {
        const env = this.resolve(variableName);
        return env.variables.get(variableName) as RuntimeValue;
    }
    public assignVar(variableName: string, value: RuntimeValue): RuntimeValue {
        const env = this.resolve(variableName);
        if (env.constants.has(variableName)) {
            throw `Cannot reasign '${variableName}' as it is a constant identifier.`;
        }
        env.variables.set(variableName, value);

        return value;
    }

    public resolve(variableName: string): Environment {
        if (this.variables.has(variableName)) {
            return this;
        }

        if (this.parent == undefined) {
            this.variables.set(variableName, {
                type: "number",
                value: 0,
            } as NumberValue);
            return this;
        }

        return this.parent.resolve(variableName);
    }
}
