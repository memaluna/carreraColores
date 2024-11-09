// Función para crear un rectángulo con caída y una inclinación inicial
function crearRectanguloInclinadoConCaida(x, y, width, height, anguloInicial) {
    var rectangulo = Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true, // No estático para que caiga
        render: {
            fillStyle: '#FF5733', // Color del rectángulo (puedes cambiarlo)
            strokeStyle: '#000',   // Opcional: color de borde
            lineWidth: 2           // Opcional: grosor del borde
        }
    });
    
    // Aplicar una inclinación inicial al rectángulo
    Matter.Body.rotate(rectangulo, anguloInicial);

    return rectangulo;
}