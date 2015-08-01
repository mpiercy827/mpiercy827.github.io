(function() {
  if (typeof Snake === "undefined") {
    Snake = window.Snake = {};
  }

  // Board Class

  Board = Snake.Board = function () {
    this.gridWidth = 50;
    this.gridHeight = 30;
    this.resetBoard();
  };

  Board.prototype.resetBoard = function () {
    this.grid = [];
    this.apples = [];
    this.startPos = [Math.floor(this.gridHeight/2),
                      Math.floor(this.gridWidth/2)];
    this.snake = new Snake.Snake(this.startPos);
    this.addApple();
    this.setupGrid();
  };

  Board.prototype.setupGrid = function () {
    for (var row = 0; row < this.gridHeight; row++) {
      var currRow = [];
      for (var col = 0; col < this.gridWidth; col++) {
        currRow.push(new Vector([row, col]));
      }
      this.grid.push(currRow);
    }
  };

  Board.prototype.outOfBounds = function (pos) {
    var row = pos[0];
    var col = pos[1]
    return (row < 0 || row >= this.gridHeight ||
            col < 0 || col >= this.gridWidth);
  };

  Board.prototype.snakeOut = function () {
    var snakeHead = this.snake.segments[0];
    return this.outOfBounds(snakeHead.pos) ? true : false;
  };

  Board.prototype.addApple = function () {
    var randRow = Math.floor(Math.random() * this.gridHeight);
    var randCol = Math.floor(Math.random() * this.gridWidth);

    var applePos = [randRow, randCol];
    var occupied = false;
    this.snake.allCoords().forEach(function (pos) {
      if (pos[0] === applePos[0] && pos[1] === applePos[1]) { occupied = true; }
    });

    occupied ? this.addApple() : this.apples.push(new Apple(applePos));
  };

  Board.prototype.convertApple = function () {
    this.snake.addSegment = true;
    this.apples.pop();
    this.addApple();
  };


  // Snake Class


  Snake.Snake = function(pos){
    this.segments = [];
    this.addSegment = false;
    this.segments.push(new Vector(pos));
  };

  Snake.Snake.prototype.includes = function (vector) {
    for (var i = 0; i < this.segments.length; i++) {
      if (this.segments[i].equals(vector)) {
        return true;
      }
    }
    return false;
  };

  Snake.Snake.prototype.allCoords = function () {
    var coords = [];
    for (var i = 0; i < this.segments.length; i++) {
      coords.push(this.segments[i].pos)
    }
    return coords;
  };

  Snake.Snake.prototype.move = function () {
    var currentSeg = this.segments[0];
    var directionVector = Snake.DIRECTIONS[this.currDir];
    this.segments[0] = this.segments[0].plus(directionVector);

    for (var i = 1; i < this.segments.length; i++) {
      var nextSeg = this.segments[i];
      this.segments[i] = currentSeg;
      currentSeg = nextSeg;
    }

    if (this.addSegment) {
      this.segments.push(currentSeg);
      this.addSegment = false;
    }
  };

  Snake.Snake.prototype.turn = function (newDirection) {
    if (!this.currDir) { this.currDir = newDirection; return; }

    var currentVector = Snake.DIRECTIONS[this.currDir];
    var newVector = Snake.DIRECTIONS[newDirection];

    if (!currentVector.isOpposite(newVector)) { this.currDir = newDirection; }
  };

  Snake.Snake.prototype.selfCollision = function () {
    var snakeHead = this.segments[0];
    for (var i = 1; i < this.segments.length; i++) {
      if (snakeHead.equals(this.segments[i])) { return true; }
    }
    return false;
  };


  // Vector Utility Class


  Vector = Snake.Vector = function(pos) {
    this.pos = pos;
  };

  Vector.prototype.plus = function (otherVec) {
    var newVec = [this.pos[0] + otherVec.pos[0], this.pos[1] + otherVec.pos[1]];
    return new Vector(newVec);
  };

  Snake.DIRECTIONS = {
    'N': new Vector([-1,0]),
    'E': new Vector([0,1]),
    'S': new Vector([1,0]),
    'W': new Vector([0,-1])
  };

  Vector.prototype.equals = function (otherVec) {
    return (this.pos[0] === otherVec.pos[0] && this.pos[1] === otherVec.pos[1]);
  };

  Vector.prototype.isOpposite = function (otherVector) {
    return (this.plus(otherVector).equals(new Vector([0,0])));
  };

  // Apple Class

  Apple = Snake.Apple = function(pos) {
    this.pos = pos;
  };

})();
