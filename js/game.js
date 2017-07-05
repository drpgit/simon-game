function MyGame(clicks) {
  this.theColors = ["red", "green", "yellow", "blue"];
  this.theTiles = [];
  this.theResponse = [];
  this.clicks = clicks;
  this.rounds = 0;
  this.strict = false;
}

MyGame.prototype.newTile = function() {
  this.theTiles.push(this.theColors[Math.floor(Math.random() * 4)]);
};

MyGame.prototype.checkStrict = function() {
  if (this.strict) {
    this.strict = false;
  } else {
    this.strict = true;
  }
};

MyGame.prototype.newEvaluate = function() {
  if (this.theResponse.length === this.theTiles.length && this.theResponse[this.clicks - 1] === this.theTiles[this.clicks - 1] && this.rounds === 19) {
    this.rounds += 1;
    $(".rounds-number").html(this.rounds);
    $(".message-text").html("You Win! Play Again?");
    this.newStart();
  } else if (this.theResponse.length === this.theTiles.length && this.theResponse[this.clicks - 1] === this.theTiles[this.clicks - 1]) {
    this.newRound();
    this.rounds += 1;
    $(".rounds-number").html(this.rounds);
  } else if (this.theResponse[this.clicks - 1] !== this.theTiles[this.clicks - 1] && this.strict) {
    $(".message-text").html("Sorry, you lost... Play Again?");
  } else if (this.theResponse[this.clicks - 1] !== this.theTiles[this.clicks - 1] && this.strict === false) {
    $(".message-text").html("Not quite right. Try that move again?");
    this.theResponse = [];
    this.clicks = 0;
    this.animate(this.theTiles);
  }
};

MyGame.prototype.newResponse = function(color) {
  $(".message-text").html("Concentrate!");
  if (color) {
    var audio = new Audio('media/simonSound' + color + '.mp3');
    this.theResponse.push(color);
    audio.play();
    this.clicks += 1;
    this.newEvaluate();
  }
};

MyGame.prototype.newRound = function() {
  this.theResponse = [];
  this.clicks = 0;
  this.newTile();
  this.animate(this.theTiles);
};

MyGame.prototype.newStart = function() {
  this.theTiles = [];
  $(".rounds-number").html(0);
  this.rounds = 0;
  $(".message-text").html("Concentrate!");
  this.newRound();
};

MyGame.prototype.animate = function(sequence) {
  var i = 0;
  var interval = setInterval(function() {
    this.lightUp(sequence[i]);
    var audio = new Audio('media/simonSound' + sequence[i] + '.mp3');
    audio.play();
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }.bind(this), 600);
};

MyGame.prototype.lightUp = function(color) {
  var tile = $('.computer-' + color).addClass('full-color');
  window.setTimeout(function() {
    tile.removeClass('full-color');
  }, 300);
};

// beginning of standard front-end code

$(document).ready(function() {
  var startClicks = 0;
  var newGame = new MyGame(startClicks);

  $('.strict-toggle').change(function() {
    newGame.checkStrict();
  });

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
