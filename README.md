# Elm vs. TypeScript

Compare/contrast features of Elm and TypeScript.

[Elm](http://elm-lang.org/) and [TypeScript](https://www.typescriptlang.org/) are both ways to improve front-end development. They are similar in some ways, but differ in many facets as well.

## Contents

* Type systems
    * Type system overview
        * TypeScript
        * Elm
    * Optional types example in TypeScript
    * Type annotation/inference example in Elm
    * Optional inferred vs. optional dynamic types
    * Union types in both

## Type systems

### Type system overview

#### TypeScript

TypeScript is a gradually-typed superset of JavaScript. It has generics, type annotations and inference, interfaces, union types, classes and more.

TypeScript has optional types in order to work in existing JavaScript codebases. These are defined by type annotations.

[By design](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals), TypeScript does not have a sound type system.

### Elm

Elm is a statically-typed language. It has static types, type aliases, type annotations and inference, records and union types. Elm compiles to JavaScript to target browsers, but it is a *different* language, *not* a superset of JavaScript.

By design, Elm has a sound type system. Therefore, runtime errors like `undefined is not a function` [do not occur in Elm](https://guide.elm-lang.org/error_handling/).

### Optional types example in TypeScript

#### Plain ol' ES5 (in a TypeScript file)
(`typescript/src/01-optional-types.ts`)

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
npm run tsc typescript/src/01-optional-types.ts
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

#### TypeScript

(`typescript/src/02-optional-types-annotated.ts`):

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
npm run tsc typescript/src/01-optional-types.ts
```

Output (error):

```
typescript/src/01-optional-types.ts(15,6): error TS2345: Argument of type '134' is not assignable to parameter of type 'string'.
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


### Type annotation/inference example in Elm

#### Elm type inference

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

#### Elm type annotations

Although Elm can infer types for you it's best practice to define them _explicitly_. It's also useful if the compiler can't infer the type or you want to more narrowly define how a function can be used.

##### Function with inferred types
(`elm/src/01-inferred-types.elm`)

This function looks just like the one from the previous example.
```
add a b =
    a + b

-- Call it
add 1 3.2
```

To run it, use `elm-reactor`:

```
npm run elm reactor
```

Navigate to `elm/src/01-inferred-types.elm`.

Output (to browser):

```
4.2
```

##### Function with type annotations
(`elm/src/02-type-annotations.elm`)

This function looks just like the one from the previous example with one additional line above the function definition.

```
add : number -> number -> number
add a b =
    a + b
```

To run it, use `elm-reactor`:

```
npm run elm reactor
```

Navigate to `elm/src/02-type-annotations.elm`.

Output (to browser):

```
4.2
```

Now let's edit the `add` function type annotation to only accept integers.

(`elm/src/02-type-annotations.elm`)
```
add : Int -> Int -> Int
add a b =
    a + b
```

Output (error):

```
-- TYPE MISMATCH ---------------------------------- elm\src\02-type-annotations.elm

The 2nd argument to function `add` is causing a mismatch.

7|     add 1 3.2
             ^^^
Function `add` is expecting the 2nd argument to be:

    Int

But it is:

    Float

Hint: Elm does not automatically convert between Ints and Floats. Use `toFloat`
and `round` to do specific conversions.
<http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#toFloat>

Hint: I always figure out the type of arguments from left to right. If an
argument is acceptable when I check it, I assume it is "correct" in subsequent
checks. So the problem may actually be in how previous arguments interact with
the 2nd.
```

Once again the lovely Elm compiler helps us identify the issue with a helpful message.

### Optional inferred vs. optional dynamic types

#### Optional dynamic types (TypeScript)
By default TypeScript allows dynamic types. This can be disabled with a `--strict` compiler flag, but then the benefit for existing code bases is lost.

If I were to use TypeScript in an existing code base I would require new code to be compiled with `--strict`. Existing code would need to migrate to the "strict" code base when edited. That should be a fun transition.

#### Optional inferred types (Elm)

Elm has optional type inference, which can be turned into a compiler warning. Either way, the code is _safe_. The compiler will always verify types are correct and give a helpful error if not.

I run the Elm compiler with `--warn` as a reminder to add type annotations. It even gives me the annotation to copy into code!

### Union types in both (sort of)

Both TypeScript and Elm have something they each call union types. However the syntax and behavior of each is different.

For the sake of this discussion let's narrow their usage to two things:
* exhaustive cases
* modeling complex data

#### Exhaustive cases

##### Elm

Define some log levels:

```elm
type LogLevel
    = Error
    | Info
```

Use them in a case expression:
```elm
log : LogLevel -> String -> Html msg
log logLevel message =
    case logLevel of
        Error ->
            text ("Error: " ++ message)

        Info ->
            text ("Info: " ++ message)
```

You can check this out in elm-reactor at `elm/src/03-exhaustive-cases.elm`.

Next let's add another log level for warnings:

```elm
type LogLevel
    = Error
    | Info
    | Warning
```

Try compiling it without adding the case by going to
`elm/src-04-exhaustive-cases-warning.elm` in elm-reactor.

Output (error):
```
-- MISSING PATTERNS -------------------- elm\src\04-exhaustive-cases-warning.elm

This `case` does not have branches for all possibilities.

18|>    case logLevel of
19|>        Error ->
20|>            text ("Error: " ++ message)
21|>
22|>        Info ->
23|>            text ("Info: " ++ message)

You need to account for the following values:

    ExhaustiveCasesWarning.Warning

Add a branch to cover this pattern!

If you are seeing this error for the first time, check out these hints:
<https://github.com/elm-lang/elm-compiler/blob/0.18.0/hints/missing-patterns.md>
The recommendations about wildcard patterns and `Debug.crash` are important!
```

I'm starting to sound like a broken record, but once again the Elm compiler has our back with a delicious error message on how to fix it. It provides a link to explain the error in more detail to boot!

##### TypeScript

This time define some log levels in TypeScript:

```
type LogLevel =
   'Error' |
   'Info'
```

That looks pretty similar to Elm.

What about using it in a switch/case statement?

```
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function log(logLevel: LogLevel, message: string) {
   switch (logLevel) {
      case 'Error':
         return 'Error:' + message;
      case 'Info':
         return 'Info:' + message;
      default: return assertNever(logLevel); // error here if there are missing cases
   }
}
```

This looks a bit odd, but the `assertNever` function is [the official way to force exhaustiveness checks](https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking).

Compile/run:
```
npm run tsc typescript\src\03-exhaustive-cases.ts && node typescript\src\03-exhaustive-cases.js
```

Next let's add the warning log level:
```
type LogLevel =
   'Error' |
   'Info' |
   'Warning'
```

Compile:
```
npm run tsc typescript\src\04-exhaustive-cases-warning.ts
```

Output (error):
```
typescript/src/04-exhaustive-cases-warning.ts(18,35): error TS2345: Argument of type '"Warning"' is not assignable to parameter of type 'never'.
```

This error message isn't particularly useful, but, hey, at least it had an error.

#### Summary on union types

TypeScript has a harder time trying to convey the usefulness of union types because it is married to JavaScript.

## Side-by-side comparison

| Criteria                  | TypeScript | Elm     |
| ------------------------- | ---------- | ------- |
| Type system soundness     | &cross;    | &check; |
| Gradual types             | &check;    | &cross; |
| User-friendly compiler    | &cross;    | &check; |
| Easily model complex data | &cross;    | &check; |
| Maintainability           | &cross;    | &check; |
| Safety                    | &cross;    | &check; |
| Simplicity                | &cross;    | &check; |

## Resources

* ["Why Elm Instead of TypeScript?](http://www.chriskrycho.com/2017/why-elm-instead-of-typescript.html)" - by Chris Krycho
