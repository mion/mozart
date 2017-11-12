// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
    lg = console.log;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var boxC = Bodies.rectangle(100, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, boxC, ground]);

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

  [_.define, [_.x, _.y], [_.*, _.x, _.y]]
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
