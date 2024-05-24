import {
    MakeBoolean,
    MakeNativeFunction,
    MakeNull,
    NumberValue,
    RuntimeValue,
} from "./values.ts";

export function createGlobalEnv() {
    const env = new Environment();
    env.declareVar("true", MakeBoolean(true), true);
    env.declareVar("false", MakeBoolean(false), true);
    env.declareVar("null", MakeNull(), true);

    //Native built-in functions
    env.declareVar(
        "print",
        MakeNativeFunction((args, _scope) => {
            console.log(...args);
            return MakeNull();
        }),
        true,
    );
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

    public declareVar(
        variableName: string,
        value: RuntimeValue,
        constant: boolean,
    ): RuntimeValue {
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
