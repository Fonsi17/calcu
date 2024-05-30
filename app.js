let display = document.getElementById('display');
let listaHistorial = document.getElementById('listaHistorial');
let operacionActual = '';
let numeroAnterior = 0;

function agregarNumero(numero) {
    operacionActual += numero;
    display.value = operacionActual;
}

function agregarOperador(operador) {
    if (operacionActual === '') {
        return;
    }

    calcular();
    operacionActual = numeroAnterior + operador;
    numeroAnterior = parseFloat(display.value);
    display.value = operacionActual;
}

function calcular() {
    if (operacionActual === '') {
        return;
    }

    let resultado = eval(operacionActual);
    guardarEnHistorial(operacionActual + ' = ' + resultado);
    mostrarHistorial();
    numeroAnterior = resultado;
    operacionActual = '';
    display.value = resultado;
}

function borrar() {
    operacionActual = '';
    numeroAnterior = 0;
    display.value = '';
}

function guardarEnHistorial(operacion) {
    let historial = localStorage.getItem('historial') || '';
    historial = historial + '\n' + operacion;
    localStorage.setItem('historial', historial);
}

function mostrarHistorial() {
    let historial = localStorage.getItem('historial') || '';
    let operaciones = historial.split('\n');

    listaHistorial.innerHTML = '';
    for (let operacion of operaciones) {
        let elemento = document.createElement('li');
        elemento.textContent = operacion;
        listaHistorial.appendChild(elemento);
    }
}

// Cargar el historial al iniciar la página
mostrarHistorial();
