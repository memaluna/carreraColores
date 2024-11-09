// pelota.js

// Función para generar un color aleatorio
function generarColorAleatorio() {
    var colores = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFFF33', '#33FFF6'];
    return colores[Math.floor(Math.random() * colores.length)];
}

// Función para generar un tamaño aleatorio (radio)
function generarTamanoAleatorio() {
    return Math.floor(Math.random() * 50) + 20; // Radio entre 20 y 70
}

// Función para crear una pelota con un color y tamaño específicos
function crearPelota(x, y, radio, color) {
    return Matter.Bodies.circle(x, y, radio, {
        render: {
            fillStyle: color, // Asignar el color proporcionado
            strokeStyle: '#000', // Opcional: color de borde
            lineWidth: 2 // Opcional: grosor del borde
        }
    });
}

// Función para crear un grupo de 10 pelotas del mismo color y tamaño en una posición específica
function crearGrupoPelotas(x, y, tamanio) {
    var color = generarColorAleatorio();  // Generar un color aleatorio para todas las pelotas
    var radio = tamanio; // Generar un tamaño aleatorio para todas las pelotas
    var pelotas = [];

    for (var i = 0; i < 10; i++) {
        var pelota = crearPelota(x, y, radio, color);
        pelotas.push(pelota); // Añadir cada pelota al array
    }

    return pelotas;
}