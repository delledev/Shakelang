import Parser from "./lib/parser/parser.ts";
import Environment, { createGlobalEnv } from "./lib/runtime/environment.ts";
import { evaluateProgram } from "./lib/runtime/evaluation/statements.ts";
import { evalNode } from "./lib/runtime/interpeter.ts";

//repl()
run("./test.shake");

async function run(filename: string) {
    const parser = new Parser();
    const env = createGlobalEnv();
    const input = await Deno.readTextFile(filename);
    const program = parser.produceAST(input);
    const result = evaluateProgram(program, env);
    console.log(result);
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
        const result = evalNode(program, env);
        console.log(result);
    }
}
