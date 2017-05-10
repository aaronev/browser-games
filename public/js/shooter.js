var can1 = document.getElementById("can1").getContext("2d")
let HEIGHT = 500
let WIDTH = 500
let timeWhenGameStarted = Date.now()
let message = 'Bouncing'
var enemyList = {}
var upgradeList = {}
var bulletList = {}
var frameCount = 0
var score = 0

can1.font = '30px Arial'

var player = {
  x: 50,
  spdX: 30,
  y: 40,
  spdY: 5,
  name: "P",
  hp: 10,
  width: 20,
  height: 20,
  color: 'green',
  attkSpd: 1,
  attackCounter: 0,
  pressingDown: false,
  pressingUp: false,
  pressingLeft: false,
  pressingRight: false,
}

Enemy = function(id, x, y, spdX, spdY, width, height) {
  var enemy = {
  x: x,
  spdX: spdX,
  y: y,
  spdY: spdY,
  name: "E",
  id: id,
  width: width,
  height: height,
  color: 'red',
  }
  enemyList[id] = enemy
}

Upgrade = function(id, x, y, spdX, spdY, width, height, category, color) {
  var upgrade = {
  x: x,
  spdX: spdX,
  y: y,
  spdY: spdY,
  name: "E",
  id: id,
  width: width,
  height: height,
  color: color,
  category: category,
  }
  upgradeList[id] = upgrade
}

randomlyGenerateUpgrade = function() {
  var x = Math.random() * WIDTH
  var y = Math.random() * HEIGHT
  var height = 10
  var width = 10
  var id = Math.random()
  var spdX = 0
  var spdY = 0

  if(Math.random() < 0.5) {
    var category = 'score'
    var color = 'orange'
  } else {
    var category = 'attkSpd'
    var color = 'purple'
  }
  Upgrade(id, x, y, spdX, spdY, width, height, category, color)
}

Bullet = function(id, x, y, spdX, spdY, width, height) {
  var upgrade = {
  x: x,
  spdX: spdX,
  y: y,
  spdY: spdY,
  name: "E",
  id: id,
  width: width,
  height: height,
  color: 'black',
  timer: 0
  }
  bulletList[id] = upgrade
}

randomlyGenerateBullet = function() {
  var x = player.x
  var y = player.y
  var height = 10
  var width = 10
  var id = Math.random()
  var angle = Math.random() * 360
  var spdX = Math.cos(angle/180 * Math.PI) * 5
  var spdY = Math.sin(angle/180 * Math.PI) * 5
  Bullet(id, x, y, spdX, spdY, width, height)
}

getDistanceBetweenEntity = function(entity1, entity2) {
  var vx = entity1.x - entity2.x
  var vy = entity1.y - entity2.y
  return Math.sqrt(vx*vx+vy*vy)
}

testCollisionEntity = function(entity1, entity2) {
  var rect1 = {
    x: entity1.x-entity1.width/2,
    y: entity1.y-entity1.height/2,
    width: entity1.width,
    height: entity1.height,
  }
   var rect2 = {
    x: entity2.x-entity2.width/2,
    y: entity2.y-entity2.height/2,
    width: entity2.width,
    height: entity2.height,
  }
  return testCollisionRectRect(rect1, rect2)
}

updateEntityPosition = function(char) {
  char.x += char.spdX
  char.y += char.spdY
  can1.fillRect(char.x-char.width/2, char.y-char.height/2, char.width, char.height)
  if (char.x < 0 || char.x > WIDTH) {
    console.log(message)
    char.spdX = -char.spdX
  }
  if (char.y < 0 || char.y > HEIGHT) {
    console.log(message)
    char.spdY = -char.spdY
  }
}

testCollisionRectRect = function(rect1, rect2) {
  return rect1.x <= rect2.x + rect2.width 
      && rect2.x <= rect1.x + rect1.width
      && rect1.y <= rect2.y + rect2.height 
      && rect2.y <= rect1.y + rect1.height  
}

drawEntity = function(something) {
  can1.save()
  can1.fillStyle = something.color
  can1.fillRect(something.x-something.width/2, something.y-something.height/2, something.width, something.height)
  can1.restore()
}

updateEntity = function(something) {
  updateEntityPosition(something)
  drawEntity(something)
}

//Using the Mouse
// document.onmousemove = function(mouse) {
//   var mouseX = mouse.clientX - 8;
//   var mouseY = mouse.clientY -8;

//   if(mouseX < player.width/2)
//       mouseX = 0
//   if(mouseX > WIDTH-player.width/2)
//       mouseX = WIDTH-player.width/2
//   if(mouseY < player.height/2)
//       mouseY = player.height/2
//   if(mouseY > HEIGHT - player.height/2)
//       mouseY = HEIGHT - player.height/2

//   player.x = mouseX
//   player.y = mouseY
// }

document.onclick = function(mouse) {
  if(player.attackCounter > 25) {
    randomlyGenerateBullet()
    player.attackCounter = 0
  }
}

document.onkeydown = function(event) {
  if(event.keyCode === 68)
    player.pressingRight = true
  else if(event.keyCode === 83)
    player.pressingDown = true
  else if(event.keyCode === 65)
    player.pressingLeft = true
  else if(event.keyCode === 87)
    player.pressingUp = true
}

document.onkeyup = function(event) {
  if(event.keyCode === 68)
    player.pressingRight = false
  else if(event.keyCode === 83)
    player.pressingDown = false
  else if(event.keyCode === 65)
    player.pressingLeft = false
  else if(event.keyCode === 87)
    player.pressingUp = false
}

updatePlayerPosition = function() {
  if(player.pressingRight)
    player.x += 10
  if(player.pressingLeft)
    player.x -= 10
  if(player.pressingDown)
    player.y += 10
  if(player.pressingUp)
    player.y -= 10

  if(player.x < player.width/2)
      player.x = player.width/2
  if(player.x > WIDTH-player.width/2)
      player.x = WIDTH-player.width/2
  if(player.y < player.height/2)
      player.y = player.height/2
  if(player.y > HEIGHT - player.height/2)
      player.y = HEIGHT - player.height/2

}

update = function() {
  can1.clearRect(0,0,WIDTH,HEIGHT)
  frameCount++
  score++
  if(frameCount % 100 === 0)
    randomlyGenerateEnemy()

  if(frameCount % 75 === 0)
    randomlyGenerateUpgrade()

  player.attackCounter += player.attkSpd

  for(var key in bulletList) {
    updateEntity(bulletList[key])
    var toRemove = false
    bulletList[key].timer++
    if(bulletList[key].timer > 100) {
      toRemove = true
    }

    for(var key2 in enemyList) {
      var isColliding = testCollisionEntity(bulletList[key], enemyList[key2])
      if(isColliding) {
        toRemove = true
        delete enemyList[key2]
        break
      }
    }
    if(toRemove){
      delete bulletList[key]
    }
  }

  for(var key in upgradeList) {
    updateEntity(upgradeList[key])
    var isColliding = testCollisionEntity(player, upgradeList[key])
     if (isColliding) {
      if(upgradeList[key].category === 'score')
        score += 1000 
      if(upgradeList[key].category === 'attkSpd')
        player.attkSpd += 3
        delete upgradeList[key]  
     }    
  }

  for (var key in enemyList) {
     updateEntity(enemyList[key])
     var isColliding = testCollisionEntity(player, enemyList[key])
     if (isColliding) {
        player.hp = player.hp - 1
     }
  }
  if(player.hp <= 0) {
    var timeSurvived = Date.now() - timeWhenGameStarted
    console.log("You lost! You surved for " + timeSurvived + " ms.")
    startNewGame()
  }
  updatePlayerPosition()
  drawEntity(player)
  can1.fillText(player.hp + ' Hp', 0, 30)
  can1.fillText('Score: ' + score, 200, 30)
}

startNewGame = function() {
  player.hp = 10
  timeWhenGameStarted = Date.now()
  frameCount = 0
  score = 0
  enemyList = {}
  upgradeList = {}
  bulletList = {}
  randomlyGenerateEnemy()
  randomlyGenerateEnemy()
  randomlyGenerateEnemy()

}

randomlyGenerateEnemy = function() {
  var x = Math.random() * WIDTH
  var y = Math.random() * HEIGHT
  var height = 10 + Math.random() * 30
  var width = 10 + Math.random() * 30
  var id = Math.random()
  var spdX = 5 + Math.random() * 5
  var spdY = 5 + Math.random() * 5
  Enemy(id, x, y, spdX, spdY, width, height)
}

startNewGame()

update()
setInterval(update, 40)
