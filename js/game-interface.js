var MyGame = require('./../js/game.js').gameModule;

// beginning of standard front-end code

$(document).ready(function() {
  var startClicks = 0;
  var newGame = new MyGame(startClicks);

    $(".game-start").click(function() {
      newGame.newRound();
    });
    $(".game-new").click(function() {
      newGame.newStart();
    });
    $(".player-red").click(function() {
      newGame.newResponse("red");
    });
    $(".player-blue").click(function() {
      newGame.newResponse("blue");
    });
    $(".player-green").click(function() {
      newGame.newResponse("green");
    });
    $(".player-yellow").click(function() {
      newGame.newResponse("yellow");
    });

});
