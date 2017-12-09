// There are at least three (3) issues below. Where's Waldo.js?
exports.reportPlayerScores = function reportPlayerScores(players) {
   var totalHp = players
      .map(player => player.hp)
      .reduce((hpTotal, hp) => hpTotal + hp);

   var averageHp = totalHp/players.length;

   var topPlayer = players
      .reduce((previousTopPlayerHp, player) => {
         if (player.hp > previousTopPlayerHp) {
            return player.hp;
         }
         else {
            return previousTopPlayerHp;
         }
      });

   return {
      avrageHp: averageHp,
      topPlayr: topPlayer,
      totalHp: totalHp
   };
}
