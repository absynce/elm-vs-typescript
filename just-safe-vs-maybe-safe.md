# Elm vs. TypeScript

## Just safe vs. Maybe Safe

- Runtime errors
- Source maps
- Debugging

### Runtime errors

#### TypeScript

When compiling TypeScript without `--strict` there is plenty of opportunities for runtime errors around `null` and `undefined`.

```typescript
let players = [
   { name: 'Natalie', hp: 14 },
   { name: 'Lach', hp: 7 },
   { name: 'Ben', hp: 10 },
   { name: 'Eli', hp: 8 }
];

players = null;
// Error when not --strict
console.log(players.map(player => player.name));
```

Compile/run:

```
npm run tsc typescript/src/05-runtime-errors.ts && node typescript/src/05-runtime-errors.js
```

Output (error):

```
/mnt/c/dev/elm/elm-vs-typescript/typescript/src/05-runtime-errors.js:10
console.log(players.map(function (player) { return player.name; }));
                   ^

TypeError: Cannot read property 'map' of null
```

What about when compiling with `--strict`?

```
npm run tsc -- --strict typescript/src/05-runtime-errors.ts && node typescript/src/05-runtime-errors.js
```

Output (error):

```
typescript/src/05-runtime-errors.ts(8,1): error TS2322: Type 'null' is not assignable to type '{ name: string; hp: number; }[]'.
```

That's better, but what about when interacting with JavaScript outside of TypeScript? You can import JavaScript modules and use them directly.

Check out `typescript/src/06-runtime-errors-import-other-stuff.ts`:

```typescript
import { reportPlayerScores } from '../totally-cool-javascript-module';

type Player = { name: string, hp: number };

let players = [
   { name: 'Lach', hp: 7 },
   { name: 'Natalie', hp: 14 },
   { name: 'Ben', hp: 10 },
   { name: 'Eli', hp: 8 }
];

let playerReport = reportPlayerScores(players);

console.log(playerReport);
console.log(congratulatePlayer(playerReport.topPlayer))

function congratulatePlayer(player: Player) {
   return `Great work, ${player.name}! You reached ${player.hp} hit points.`;
}
```

Imagine in version 1.2.2 of `totally-cool-javascript-module` this worked fine. `reportPlayerScores` returned an object with the following properties:

```typescript
{
   topPlayer: { name: string, hp: number },
   averageHp: number,
   totalHp: number
   };
```

Then you upgraded to `1.2.3` for a bug fix.

Compile/run:
```
npm run tsc typescript\src\06-runtime-errors-import-other-stuff.ts && node typescript\src\06-runtime-errors-import-other-stuff.js
```

Output (runtime error):

```
{ avrageHp: 9.75,
  topPlayr: { name: 'Lach', hp: 7 },
  totalHp: 39 }
c:\dev\elm\elm-vs-typescript\typescript\src\06-runtime-errors-import-other-stuff.js:14
    return "Great work, " + player.name + "! You reached " + player.hp + " hit points.";
                                  ^

TypeError: Cannot read property 'name' of undefined
```

It turns out the package maintainer had released the new fix at 3am after a night of binge drinking.

If you're curious check out `typescript/totally-cool-javascript-module.js` to see the three (3) issues.

Apparently you can [add `.d.ts` files](https://github.com/Microsoft/TypeScript/issues/2712) with module declarations so you can compile with `--strict`. I tried to do this, but haven't yet figured out how. However, I don't see how this [would ensure anything with a JavaScript dependency](https://github.com/Microsoft/TypeScript/issues/2709#issuecomment-91968950). It would still require manually configuring `something.d.ts` and keeping it in sync, therefore subject to human error.

#### Elm

On the other hand, Elm [tracks runtime exceptions as issues in the Elm kernel](https://github.com/elm-lang/core/issues/377).
