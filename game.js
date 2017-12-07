/*

    http://brm.io/matter-js/docs/classes/Body.html

 */


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
    log = console.log;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showAngleIndicator: true
    }
});

// create two boxes and a ground
var bodies = {
    hero: Bodies.rectangle(300, 200, 50, 50),
    boxA: Bodies.rectangle(400, 200, 80, 80),
    boxB: Bodies.rectangle(450, 50, 80, 80),
    boxC: Bodies.rectangle(100, 50, 80, 80),
    ground: Bodies.rectangle(400, 610, 810, 60, { isStatic: true }),
    ground2: Bodies.rectangle(425, 510, 405, 30, { isStatic: true }),
};

// add all of the bodies to the world
World.add(engine.world, _.map(_.values(bodies)));

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
//
//
////////////////////////////////////////////////////////////////////////////////
//
// Commands
//
////////////////////////////////////////////////////////////////////////////////
var commands = {};

commands.box = function command_box(x, y, width, height) {
    var b = Bodies.rectangle(x, y, width, height);
    World.add(engine.world, [b]);
    Body.applyForce(b, b.position, Vector.create(0.1, 0.1));
};

window['qwe'] = function qwe(prop) {
    return commands[prop];
};

const _horizontalForce = window['hf'] = 0.01;
const _verticalForce = window['vf'] = 0.09;
var isMovingLeft = false;
var isMovingRight = false;

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    log('key down: ' + keyName);
    if (keyName === 'j') {
        isMovingLeft = true;
    }
    if (keyName === 'l') {
        isMovingRight = true;
    }
});

let jump = (force) => {
    Body.applyForce(bodies.hero, bodies.hero.position, Vector.create(0, -1 * force));
};

document.addEventListener('keyup', (event) => {
    var verticalForce = _verticalForce / (1 + bodies.hero.angularSpeed);
    const keyName = event.key;
    log('key up: ' + keyName);
    if (keyName === 'k') {
        jump(verticalForce);
    }
    if (keyName === 'j') {
        isMovingLeft = false;
    }
    if (keyName === 'l') {
        isMovingRight = false;
    }
});

const DELAY_MS = 100;
var interval = window.setInterval(() => {
    var horizontalForce = _horizontalForce / (1 + bodies.hero.angularSpeed);
    if (isMovingLeft) {
        let origin = Vector.create(
            bodies.hero.position.x - bodies.hero.width,
            bodies.hero.position.y);
        Body.applyForce(bodies.hero, bodies.hero.position, Vector.create(-1 * horizontalForce, 0));
    }
    if (isMovingRight) {
        Body.applyForce(bodies.hero, bodies.hero.position, Vector.create(+1 * horizontalForce, 0));
    }
}, DELAY_MS);

////////////////////////////////////////////////////////////////////////////////
// Gamepad
////////////////////////////////////////////////////////////////////////////////

const gamepad = new Gamepad();

gamepad.on('connect', e => {
    console.log(`controller ${e.index} connected!`);
});

gamepad.on('disconnect', e => {
    console.log(`controller ${e.index} disconnected!`);
});

gamepad.on('press', 'button_1', () => {
    console.log('button 1 was pressed!');
});

gamepad.on('hold', 'button_1', () => {
    console.log('button 1 is being held!');
});

gamepad.on('release', 'button_1', () => {
    console.log('button 1 was released!');
});

gamepad.on('hold', 'shoulder_bottom_right', e => {
    console.log(`shoulder_bottom_right has a value of ${e.value}!`);
});

//
//
////////////////////////////////////////////////////////////////////////////////
// p5.js code
////////////////////////////////////////////////////////////////////////////////

/*
function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  // desenhando o retangulo
  var rectangleX = 30;
  var rectangleY = 75;
  var rectangleWidth = 250;
  var rectangleHeight = 200;

  rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

  // desenhando o triangulo
  var x1 = 30;
  var y1 = 75;

  var x2 = 58;
  var y2 = 20;

  var x3 = 86;
  var y3 = 75;

  triangle(x1, y1, x2, y2, x3, y3);
}
*/

/*
function create() {
    var block = new Block({mass: 10, width: 100, height: 50});
    var node = new Node({mass: 10, radius: 5, origin: [0,0]});
    var edge = new Edge(block, node, {
        length: 10
    });
}
*/
