# Shakelang

Welcome to **Shakelang**, a functional programming language inspired by the poetic and timeless works of William Shakespeare. This language allows you to write code as if it were a Shakespearean play, with support for modern programming concepts.

## Features

ShakespeareLang is an interpreted, functional language with support for objects. Here are some of the core features:

-   **Variable Declaration**: Use `const` and `let` to declare variables.
-   **Variable Assignment**: Assign values to variables.
-   **Data Types**: Supports string, number and boolean values.
-   **Complex Objects**: Declare and manipulate complex objects, similar to JavaScript.
-   **Member Expressions**: Access and modify object properties.
-   **User Input**: Take input from the user.
-   **Console Output**: Write output to the console.
-   **Binary Operations**: Perform basic binary operations.

## Getting Started

## Dependencies

Make sure you have installed the dependencies:

-   git
-   deno
-   node

### Installation

To get started with ShakespeareLang, clone the repository:

```sh
git clone https://github.com/delledev/ShakespeareLang.git
cd ShakespeareLang
npm i
```

### Running

In order to start interpeter you can use:

```sh
deno run -A shakelang.ts 'filePath'
```

If no file were provided it will simply start the interpeter console.

### Compiling

```sh
deno compile -A shakelang.ts
```

After compiling you can use the compiled file similiar to python using any CLI.

## Syntax

Welcome to the world of poetic programming! This unique language uses a poetic syntax to express code, offering a whimsical and creative approach to writing programs. Below is a guide to help you understand the syntax and rules of this language.

### Tokens and Their Meanings

The following tokens are used in our poetic programming language, each corresponding to a traditional programming construct:

True: `aye`

False: `nay`

Equals: `be`

Quote: `utter`, `quote`,

Let: `proclaim`, `declare`

Const: `eternal`, `immutable`

Open Parenthesis: `begins`, `beginning`

Close Parenthesis: `ends`, `perchance`

Semicolon: `pause`

Comma: `break`

Colon: `continueth`

Open Brace: `commence`

Close Brace: `conclude`

Dot: `hereby`

Print: `speaketh`, `reveal`

Prompt: `bid`, `enquire`

### Basic Rules

`Comments:` '//' is used to write single line comments.

`Variables:` Variables may be declared but it is not necessary. You can assing values to variables without declaring them.

`Identifiers:` Any word not recognized as a keyword is treated as an identifier.

`Trailing Identifiers:` Identifiers can have trailing words.

`Strings:` Must start with a quote token but can end with a newline.

### Syntax Examples

```js
    Proclaim words be utter Hello world.  // let words = "Hello world."
    May the holy bless thyself //Filler words acceptable as long as no keywords are used this is allowed.
    Against all thy wishes reveal beginning words perchance  // print(words)
```

```js
    Thy gods be bid beginning utter What is pi? utter perchance // gods = prompt('What is pi?')
    Speaketh beginning gods ends // print(gods)
```

```js
    // const human = {
    //     age:42
    // }
    Eternal human be commence
    Age continueth 42 conclude
```

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
