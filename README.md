# Elm vs. TypeScript

Compare/contrast features of Elm and TypeScript.

[Elm](http://elm-lang.org/) and [TypeScript](https://www.typescriptlang.org/) are both ways to improve front-end development. They are similar in some ways, but differ in many as well.

## Contents

* Type systems
    * Type system overview
        * TypeScript
        * Elm
    * Union types in both
    * Optional inferred vs. optional dynamic types

## Type systems

### Type system overview

#### TypeScript

TypeScript is a gradually-typed superset of JavaScript. It has generics, type annotations and inference, interfaces, union types, classes and more.

TypeScript has optional types in order to work in existing JavaScript codebases. These are defined by type annotations.

##### Optional Types Example

###### Plain ol' ES5 (in a TypeScript file)
(typescript/src/optional-types.ts)

```typescript
function log(message) {
    console.log(message);
}

log('Strings are welcome');
log('So are numbers...');
log(134);
```

Compile:

```
npm run tsc typescript/src/optional-types.ts
```

Run:

```
node typescript/src/optional-types.js
```

Output:

```
Strings are welcome
So are numbers...
134
```

###### TypeScript

(typescript/src/optional-types2.ts):

```typescript
function log(message: string) {
    console.log(message);
}

log('Strings are welcome');
log('Not numbers...');
log(134); // Compiler error here.
```

Compile:

```
npm run tsc typescript/src/optional-types.ts
```

Output (error):

```
typescript/src/optional-types.ts(15,6): error TS2345: Argument of type '134' is not assignable to parameter of type 'string'.
```

As you can see this makes it easy to opt-in to benefits of TypeScript from an existing codebase. It only took a change on one line to add the type annotation.

From:
```
function log(message) {
```

To:

```
function log(message: string) {
```

#### Elm

Elm is a statically-typed language. It has static types, type aliases, type annotations and inference, records and union types. Elm compiles to JavaScript to target browsers, but it is a different language, *not* a superset of JavaScript.

##### Type annotation/inference example

###### Elm type inference

Enter the following into the Elm repl (`npm run elm repl`)
```elm
add a b = a + b
add 1 2
```

Output:

```
3 : number
```

If you try to add a string and a number Elm recognizes it should be a number.

```elm
add 1 "2" -- Compiler error.
```

The [`+` operator](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Basics#+) only works on numbers. Instead the [`++` operator](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Basics#++) is used to append strings together. Elm code tends to be explicit when confusion could cause errors.

Output (error):

```
-- TYPE MISMATCH --------------------------------------------- repl-temp-000.elm

The 2nd argument to function `add` is causing a mismatch.

4|   add 1 "2"
           ^^^
Function `add` is expecting the 2nd argument to be:

    number

But it is:

    String

Hint: I always figure out the type of arguments from left to right. If an
argument is acceptable when I check it, I assume it is "correct" in subsequent
checks. So the problem may actually be in how previous arguments interact with
the 2nd.
```

Yep, that's the compiler message clearly explaining the issue and giving some advice on how to resolve it.
