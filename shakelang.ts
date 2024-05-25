import Parser from "./lib/parser/parser.ts";
import { createGlobalEnv } from "./lib/runtime/environment.ts";
import { evaluateProgram } from "./lib/runtime/evaluation/statements.ts";
import { evalNode } from "./lib/runtime/interpeter.ts";

if (Deno.args.length > 0) {
    runFile(Deno.args[0]);
} else {
    repl();
}

async function runFile(filename: string) {
    const parser = new Parser();
    const env = createGlobalEnv();
    const input = await Deno.readTextFile(filename);
    const program = parser.produceAST(input);
    const _result = evaluateProgram(program, env);
}

function repl() {
    const env = createGlobalEnv();
    const parser = new Parser();
    console.log("Repl v1");
    while (true) {
        const input = prompt("> ");
        if (!input || input == "exit") {
            Deno.exit(1);
        }

        const program = parser.produceAST(input);
        const _result = evalNode(program, env);
    }
}
