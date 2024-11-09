// archivo_principal.js

// Module Aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Composite = Matter.Composite,
    Body = Matter.Body;



// Create Engine and World
var engine = Engine.create();
var world = engine.world;

// Get the initial width and height from the render options
var width = 1500;  // Puedes ajustarlo según lo que necesites inicialmente
var height = 900;  // Lo mismo con la altura

// Create Renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: width,
        height: height,
        wireframes: false, // Deshabilitar los wireframes para que veamos los colores
    }
});

// Create Bodies
var ground = Bodies.rectangle(width / 2, height - 10, width, 20, { isStatic: true });
var paredDerecha = Bodies.rectangle(width - 10, height / 2, 20, height, { isStatic: true });
var paredIzquierda = Bodies.rectangle(10, height / 2, 20, height, { isStatic: true });

// Crear las estrellas y añadirlas al mundo
var estrellas = generarEstrellasAleatorias();
Composite.add(world, estrellas);

// Añadir el rectángulo inclinado
//var rectanguloInclinado = crearRectanguloInclinadoConCaida(200, 150, 2000, 10, Math.PI / 15); // Crear un rectángulo inclinado 30 grados
//Composite.add(world, rectanguloInclinado);

// Crear pelotas usando la función definida en pelota.js
for (let index = 0; index < 10; index++) {
    var pelotas = crearGrupoPelotas(30, 0, 10);  // Crear 10 pelotas en la posición (300, 300)
    Composite.add(world, pelotas);   
}

// Add Bodies to the World
Composite.add(world, [ground, paredDerecha, paredIzquierda]);

// Hacer que las estrellas roten
hacerRotarEstrellas(engine, estrellas);

// Mouse Control Setup
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

// Add Mouse Event for Creating Boxes
Events.on(mouseConstraint, 'mousedown', function(event) {
    var mousePosition = event.mouse.position;
    console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
    
    // Create a new box at mouse position
    var box3 = Bodies.rectangle(mousePosition.x, mousePosition.y, 80, 80);
    Composite.add(world, box3);
});

// Run the Renderer
Render.run(render);

// Create Runner and Run Engine
var runner = Runner.create();
Runner.run(runner, engine);
