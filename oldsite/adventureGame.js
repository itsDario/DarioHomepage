function setup() {
    var myCanvas = createCanvas(800, 500); //game canvas

    myCanvas.parent('game'); //place the canvas inside a specific element
}

function preload() {
    playerImg = loadImage('assets/ellen.png'); // images of all the assets 
    ground = loadImage('assets/field.png');
    gemImg = loadImage('assets/gem.png');
    keyImg = loadImage('assets/key.png');
    doorImg = loadImage('assets/door.png');
}

var playerImg;
var up = false;
var down = false;
var left = false;
var right = false;
var player = {
    xpos: 200,
    ypos: 350,
    width: 23,
    height: 48,
    keyCount: 0,
    startingPos: {
        x: 200,
        y: 350
    }
};

var ground; //everything done with var because i didnt know about let and const
var gemImg;
var doorImg;
var keyImg;
var gemArray = [{ //the two gems
        xpos: 600,
        ypos: 200,
        width: 25,
        height: 25,
        visible: true
    },
    {
        xpos: 600,
        ypos: 400,
        width: 25,
        height: 25,
        visible: true
    },
];
var wallArray = [{ //the five wall cubes
        xpos: 750,
        ypos: 0,
        width: 50,
        height: 500
    },
    {
        xpos: 0,
        ypos: 0,
        width: 50,
        height: 500
    },
    {
        xpos: 50,
        ypos: 0,
        width: 700,
        height: 50
    },
    {
        xpos: 50,
        ypos: 450,
        width: 700,
        height: 50
    },
    {
        xpos: 375,
        ypos: 50,
        width: 50,
        height: 350
    }
];
var enemyArray = [{ //one enemy with the possibility of more
    xpos: 100,
    ypos: 200,
    width: 25,
    height: 25,
    spd: 8,
    axe: "x"
}];
var doorArray = [{
    xpos: 375,
    ypos: 400,
    width: 50,
    height: 50,
    open: false
}];
var keyArray = [{
    xpos: 100,
    ypos: 100,
    width: 25,
    height: 25,
    collected: false
}];

function draw() { //the main draw loop
    background(220);
    drawMap();
    drawGems();
    drawDoors();
    drawKeys();
    drawEnemies();
    playerAll();
}

function drawEnemies() { //shows enemy and makes it bounce between the walls that surround it
    fill(255, 0, 0);
    for (i = 0; i < enemyArray.length; i++) {
        rect(enemyArray[i].xpos, enemyArray[i].ypos, enemyArray[i].width, enemyArray[i].height);

        if (enemyArray[i].axe === "x") {
            enemyArray[i].xpos += enemyArray[i].spd;
        }
        for (x = 0; x < wallArray.length; x++) {
            if (collision(enemyArray[i], wallArray[x])) {
                enemyArray[i].spd *= -1;
                enemyArray[i].xpos += enemyArray[i].spd;
                break;
            }
        }
    }
}

function drawDoors() { //displays the door
    for (i = 0; i < doorArray.length; i++) {
        if (!doorArray[i].open) {
            image(doorImg, doorArray[i].xpos, doorArray[i].ypos, doorArray[i].width, doorArray[i].height);
        }
    }
}

function drawKeys() { //displays keys and checks for collision
    for (i = 0; i < keyArray.length; i++) {
        if (!keyArray[i].collected) {
            image(keyImg, keyArray[i].xpos, keyArray[i].ypos, keyArray[i].width, keyArray[i].height);

            if (collision(player, keyArray[i])) {
                player.keyCount += 1;
                keyArray[i].collected = true;
            }
        }
    }
}

function playerAll() {

    image(playerImg, player.xpos, player.ypos); //player render

    for (i = 0; i < gemArray.length; i++) {
        if (collision(player, gemArray[i])) { //gem collection
            gemArray[i].visible = false;
        }
    }

    if (up === true) { //moving north collision 
        player.ypos -= 6;

        for (i = 0; i < wallArray.length; i++) { //collision with right wall
            while (collision(player, wallArray[i])) {
                player.ypos += 1;
            }
        }

        for (i = 0; i < doorArray.length; i++) { //collision with door
            if (collision(player, doorArray[i]) && !doorArray[i].open && player.keyCount > 0) {
                doorArray[i].open = true;
                player.keyCount -= 1;
            }
            while (collision(player, doorArray[i]) && !doorArray[i].open && player.keyCount < 1) {
                player.ypos += 1;
            }
        }
    }

    if (down === true) { //moving south collision with wall and door
        player.ypos += 6;

        for (i = 0; i < wallArray.length; i++) {
            while (collision(player, wallArray[i])) {
                player.ypos -= 1
            }
        }

        for (i = 0; i < doorArray.length; i++) {
            if (collision(player, doorArray[i]) && !doorArray[i].open && player.keyCount > 0) {
                doorArray[i].open = true;
                player.keyCount -= 1;
            }
            while (collision(player, doorArray[i]) && !doorArray[i].open && player.keyCount < 1) {
                player.ypos -= 1;
            }
        }
    }

    if (left === true) { //moving left collision with wall and door
        player.xpos -= 6;

        for (i = 0; i < wallArray.length; i++) {
            while (collision(player, wallArray[i])) {
                player.xpos += 1
            }
        }

        for (i = 0; i < doorArray.length; i++) {
            if (collision(player, doorArray[i]) && !doorArray[i].open && player.keyCount > 0) {
                doorArray[i].open = true;
                player.keyCount -= 1;
            }
            while (collision(player, doorArray[i]) && !doorArray[i].open && player.keyCount < 1) {
                player.xpos += 1;
            }
        }
    }

    if (right === true) { //moving right collision with wall and door
        player.xpos += 6;

        for (i = 0; i < wallArray.length; i++) {
            while (collision(player, wallArray[i])) {
                player.xpos -= 1
            }
        }

        for (i = 0; i < doorArray.length; i++) {
            if (collision(player, doorArray[i]) && !doorArray[i].open && player.keyCount > 0) {
                doorArray[i].open = true;
                player.keyCount -= 1;
            }
            while (collision(player, doorArray[i]) && !doorArray[i].open && player.keyCount < 1) {
                player.xpos -= 1;
            }
        }
    }

    for (i = 0; i < enemyArray.length; i++) { //colliding with enemy in any direction
        if (collision(enemyArray[i], player)) {
            resetPlayer();
        }
    }

    if (player.ypos > 450) {
        player.ypos = 450;
    }
    if (player.ypos < 0) {
        player.ypos = 0;
    }
    if (player.xpos > 775) {
        player.xpos = 775;
    }
    if (player.xpos < 0) {
        player.xpos = 0;
    }
}

function drawGems() { //drawing the gem images
    for (i = 0; i < gemArray.length; i++) {
        if (gemArray[i].visible) {
            image(gemImg, gemArray[i].xpos, gemArray[i].ypos, gemArray[i].width, gemArray[i].height); //gem render
        }
    }
}

function drawMap() { //drawing the map
    noStroke();

    for (var x = 0; x < width; x += 500) {
        for (var y = 0; y < height; y += 500) {
            image(ground, x, y); /////////////background
        }
    }
    fill(255, 255, 0);

    for (i = 0; i < wallArray.length; i++) {
        rect(wallArray[i].xpos, wallArray[i].ypos, wallArray[i].width, wallArray[i].height);
    }
}

function keyPressed() { //checking for key down
    if (keyCode === UP_ARROW) {
        up = true;
    }
    if (keyCode === DOWN_ARROW) {
        down = true;
    }
    if (keyCode === LEFT_ARROW) {
        left = true;
    }
    if (keyCode === RIGHT_ARROW) {
        right = true;
    }
}

function keyReleased() { //checking for key up
    if (keyCode === UP_ARROW) {
        up = false;
    }
    if (keyCode === DOWN_ARROW) {
        down = false;
    }
    if (keyCode === LEFT_ARROW) {
        left = false;
    }
    if (keyCode === RIGHT_ARROW) {
        right = false;
    }
}

function resetPlayer() { //resets the player to their original starting position
    player.xpos = player.startingPos.x
    player.ypos = player.startingPos.y
}

function collision(obj1, obj2) { //calculates all the collisions
    if (obj1.xpos + obj1.width > obj2.xpos &&
        obj1.xpos < obj2.xpos + obj2.width &&
        obj1.ypos + obj1.height > obj2.ypos &&
        obj1.ypos < obj2.ypos + obj2.height) {
        return true;
    } else {
        return false;
    }
}