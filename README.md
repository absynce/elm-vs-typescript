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

TypeScript is a gradually-typed superset of JavaScript. It has generics, type annotations and inference, interfaces, union types, classes, arrow functions and more.

TypeScript has optional types in order to work in existing JavaScript codebases. These are defined by type annotations.

##### Example

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
