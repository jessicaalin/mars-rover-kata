
//Cardinal directions
var n = "North";
var w = "West";
var s = "South";
var e = "East";
//Coordinates X & Y
var x = 0;
var y = 1;
var coordinates = "coordinates";
//Keys and others
var right = "right";
var left = "left"
var forward = "forward";
var backward = "backward";
var direction = "direction";
var travelLog = "travelLog";
var roverOne = "Rover One";
var roverTwo = "Hotshot";
//Rover object
var rover = {"direction":n, "coordinates":[0,0], "travelLog":[]};
var hotshot = {"direction":n, "coordinates":[9,9], "travelLog":[]};
var activeRover = roverOne;
var onDuty = rover;
//False if using one rover, True if using Two
var activateHotshot = false;
//Map
var map = [
  ['R',' ',' ',' ','!',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ','!',' '],
  [' ','!',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ','!',' ',' ',' ',' '],
  [' ',' ','!',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ','!',' ',' ',' ','!',' '],
  [' ','!',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ','H']];

//message functions
function logNowFacing(str){
  console.log(str + " is now facing: " + onDuty[direction]);
};
function logCommandsError(){
  console.log("Error, enter valid commands!");
};
function logRoverCollision(){
  console.log("Rover found, collission prevented!");
};
function logObstacleCollision(){
  console.log("Obstacle found, collission prevented!");
};
function logLimitReached(){
  console.log("Limit reached, could not move!");
};
function logTurnLeftCalled(){
  console.log("turnLeft was called!");
};
function logTurnRightCalled(){
  console.log("turnRight was called!");
};
function logMoveForwardCalled(){
  console.log("moveForward was called");
};
function logMoveBackwardCalled(){
  console.log("moveBackward was called");
};
function logTravelLog(){
  console.log("travel log: " + onDuty[travelLog])
};
function logRoverCoordinates(){
  console.log(activeRover + " coordinates: " +  "[" + onDuty[coordinates] + "]");
};
function logMap(){
  console.log(map);
}
//Adds current coordinates to travel log
function updateTravelLog(){
  onDuty[travelLog].push("[" + onDuty[coordinates][x] + "," + rover[coordinates][y] + "]");
};
//activates rover Two
function autobotsRollOut(){
  activateHotshot = true;
  console.log("Hotshot is ready for action!")
};
//Function that delets past coordinates
function deleteCoordinatesMap(rx,ry){
  map[ry][rx] = ' ';
}
//Checks if hotshot has been activated and alternates if true
function optimusPrime(){
  if (activateHotshot === true) {
    alternateAutobots()
  }
}
//Alternates rovers
function alternateAutobots(){
  if (activeRover === roverOne){
    activeRover = roverTwo
    onDuty = rover;
  } else{
    activeRover = roverOne
    onDuty = hotshot;
  }
}
//Moves rover in map
function moveRover(){
  if (onDuty === hotshot){
    map[hotshot[coordinates][y]][hotshot[coordinates][x]] = 'H';
  } else {
    map[rover[coordinates][y]][rover[coordinates][x]] = 'R';
  }
}
//Checks if rover will collide on move command
function willCollideWithRover(str){
  let rx = onDuty[coordinates][x];
  let ry = onDuty[coordinates][y];
  let d = onDuty[direction];
  if (str === forward) {
    switch (d) {
      case n:
        if (map[ry - 1][rx] !== ' '){
          return true;
        }
        break;
      case w:
        if (map[ry][rx - 1] !== ' '){
          return true;
        }
        break;
      case s:
        if (map[ry + 1][rx] !== ' '){
          return true;
        }
        break;
      default:
        if (map[ry][rx + 1] !== ' ') {
          return true;
        }
        break;
    }
  }else{
    switch (d) {
      case n:
        if (map[ry + 1][rx] !== ' '){
          return true;
        }
        break;
      case w:
        if (map[ry][rx + 1] !== ' '){
          return true;
        }
        break;
      case s:
        if (map[ry - 1][rx] !== ' '){
          return true;
        }
        break;
      default:
        if (map[ry][rx - 1] !== ' ') {
          return true;
        }
        break;
    }
  }
}


//Checks if rover will collide on move commands
function willCollideWithObstacle(str){
  let rx = onDuty[coordinates][x];
  let ry = onDuty[coordinates][y];
  let d = onDuty[direction];
  if (str === forward) {
    switch (d) {
      case n:
        if (map[ry - 1][rx] === '!'){
          return true;
        }
        break;
      case w:
        if (map[ry][rx - 1] === '!'){
          return true;
        }
        break;
      case s:
        if (map[ry + 1][rx] === '!'){
          return true;
        }
        break
      default:
        if (map[ry][rx + 1] === '!') {
          return true;
        }
        break
    }
  }else{
    switch (d) {
      case n:
        if (map[ry + 1][rx] === '!'){
          return true;
        }
        break;
      case w:
        if (map[ry][rx + 1] === '!'){
          return true;
        }
        break;
      case s:
        if (map[ry - 1][rx] === '!'){
          return true;
        }
        break
      default:
        if (map[ry][rx - 1] === '!') {
          return true;
        }
        break
    }
  }
}
//Prevents Rover from leaving map
function mapLimit(str) {
  let rx = onDuty[coordinates][x];
  let ry = onDuty[coordinates][y];
  let d = onDuty[direction];
  if (str === forward) {
    if (ry === 0 && d === n) {
      return false;
    }else if (rx === 0 && d === w) {
      return false;
    }else if (ry === 9 && d === s) {
      return false;
    }else if (rx === 9 && d === e) {
      return false;
    }else {
      return true;
    };
  }else {
    if (ry === 9 && d === n) {
      return false;
    }else if (rx === 9 && d === w) {
      return false;
    }else if (ry === 0 && d === s) {
      return false;
    }else if (rx === 0 && d === e) {
      return false;
    }else {
      return true;
    }
  };
};
//turn towards left and calls appropiate logs
function turnLeft() {
  optimusPrime();
  logTurnLeftCalled();
  turn(left);
  logNowFacing(activeRover);
};
//turn towards right and calls appropiate logs
function turnRight() {
  optimusPrime();
  logTurnRightCalled();
  turn(right);
  logNowFacing(activeRover);
};
//Changes direction to left or tight
function turn(d) {
  if (d === right) {
    switch (onDuty[direction]) {
      case n:
        onDuty[direction] = e;
        break;
      case e:
        onDuty[direction] = s;
        break;
      case s:
        onDuty[direction] = w;
        break;
      default:
        onDuty[direction] = n;
    }
  } else {
    switch (onDuty[direction]) {
      case n:
        onDuty[direction] = w;
        break;
      case w:
        onDuty[direction] = s;
        break;
      case s:
        onDuty[direction] = e;
        break;
      default:
        onDuty[direction] = n;
    }
  }
};
//Calls move forward and appropiate logs
function moveForward() {
  optimusPrime();
  logMoveForwardCalled();
  if (mapLimit(forward) === true) {
    if(willCollideWithObstacle(forward) !== true){
      if(willCollideWithRover(forward) !== true){
        updateTravelLog();
        move(forward);
        logTravelLog();
        logRoverCoordinates();
        moveRover();
        logMap();
      }else{
        return logRoverCollision();
      }
    }else{
      return logObstacleCollision();
    }
  } else {
    return logLimitReached();
  }
}
//Calls move backwards and appropiate logs
function moveBackward() {
  optimusPrime();
  logMoveBackwardCalled();
  if (mapLimit(backward) === true) {
    if(willCollideWithObstacle(backward) !== true){
      if(willCollideWithRover(backward) !== true){
        updateTravelLog();
        move(backward);
        logTravelLog();
        logRoverCoordinates();
        moveRover()
        logMap()
      }else{
        return logRoverCollision();
      }
    }else{
      return logObstacleCollision();
    }
  } else {
    return logLimitReached();
  }
}
//Moves Rover forward or backward
function move(d) {
  let rx = onDuty[coordinates][x];
  let ry = onDuty[coordinates][y];
  if (d === forward){
    switch (onDuty[direction]) {
    case n:
        deleteCoordinatesMap(rx,ry)
        onDuty[coordinates][y] -= 1;

        break;
      case w:
        deleteCoordinatesMap(rx,ry)
        onDuty[coordinates][x]-= 1;
        break;
      case s:
        deleteCoordinatesMap(rx,ry)
        onDuty[coordinates][y] += 1;
        break;
      default:
      deleteCoordinatesMap(rx,ry)
      onDuty[coordinates][x] += 1;
        break;
      }
  } else {
    switch (onDuty[direction]) {
      case n:
        deleteCoordinatesMap(rx,ry);
        onDuty[coordinates][y] += 1;
        break;
      case w:
        deleteCoordinatesMap(rx,ry);
        onDuty[coordinates][x] += 1;
        break;
      case s:
        deleteCoordinatesMap(rx,ry);
        onDuty[coordinates][y] -= 1;
        break;
      default:
        deleteCoordinatesMap(rx,ry);
        onDuty[coordinates][x] -= 1;
        break;
    }
  }
}
//Takes in a string of commands and exectutes them
function commands(str) {
  let string = str.split("")
  if (commandsValidator(str) === true) {
    for (var i = 0; i < str.length; i++) {
      switch (str[i]) {
        case "f":
          moveForward();
          break;

        case "b":
          moveBackward();
          break;
        case "r":
          turnRight();
          break;

        default:
          turnLeft();
      }
    }
  } else {
    return console.log(commandsError);
  }
}
//verifies that all commands are valid before passing them to commands function
function commandsValidator(str) {
  let listCommands = ["f","b","l","r"]
  for (var i = 0; i < str.length; i++) {
    if (listCommands.includes(str[i])) {
      true
    } else {
      return false;
    }
  }
  return true;
}
console.log("Rover is facing north.");
