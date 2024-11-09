// estrella.js

// Función para crear una estrella con un color aleatorio y tamaño aleatorio
function crearEstrella(x, y, radio) {
    var puntos = 5;
    var radioExterno = radio;
    var radioInterno = radio / 2;
    var estrella = Matter.Bodies.polygon(x, y, puntos, radioExterno, {
        isStatic: true,  // Establecer la estrella como estática
        render: {
            fillStyle: '#FFD700',  // Color de la estrella
            strokeStyle: '#FFD700', // Color del borde
            lineWidth: 2            // Grosor del borde
        }
    });

    return estrella;
}

// Función para generar 10 estrellas en posiciones aleatorias sin que se solapen
function generarEstrellasAleatorias() {
    var estrellas = [];
    var intentosMaximos = 100;  // Límite para evitar bucles infinitos
    var radioEstrella = 40;     // Radio de las estrellas (tamaño fijo para evitar que se solapen demasiado)
    
    for (var i = 0; i < 100; i++) {
        var x, y, solapado;
        var intentos = 0;

        do {
            // Generar posiciones aleatorias
            x = Math.random() * 1500;
            y = Math.random() * 900;
            
            // Verificar si la nueva estrella se solapa con alguna estrella existente
            solapado = false;
            for (var j = 0; j < estrellas.length; j++) {
                var distancia = Math.sqrt(Math.pow(x - estrellas[j].position.x, 2) + Math.pow(y - estrellas[j].position.y, 2));
                if (distancia < 2 * radioEstrella) {  // Si la distancia entre los centros es menor que el doble del radio, se solapan
                    solapado = true;
                    break;
                }
            }

            intentos++;
        } while (solapado && intentos < intentosMaximos); // Si no se encuentra una posición válida, intentamos varias veces

        // Si se superaron los intentos, salimos (para evitar bucles infinitos)
        if (intentos < intentosMaximos) {
            var estrella = crearEstrella(x, y, radioEstrella);
            estrellas.push(estrella);
        }
    }

    return estrellas;
}

// Función para hacer rotar las estrellas continuamente
function hacerRotarEstrellas(engine, estrellas) {
    Matter.Events.on(engine, 'afterUpdate', function() {
        estrellas.forEach(function(estrella) {
            // Aplicar rotación continua a cada estrella
            Matter.Body.rotate(estrella, 0.05);  // Rotar en sentido horario a baja velocidad
        });
    });
}

// Exportar las funciones
module.exports = {
    generarEstrellasAleatorias,
    hacerRotarEstrellas
};
