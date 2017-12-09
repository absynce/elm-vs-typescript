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
