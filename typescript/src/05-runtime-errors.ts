let players = [
   { name: 'Natalie', hp: 14 },
   { name: 'Lach', hp: 7 },
   { name: 'Ben', hp: 10 },
   { name: 'Eli', hp: 8 }
];

players = null;
// Error when not --strict
console.log(players.map(player => player.name));
