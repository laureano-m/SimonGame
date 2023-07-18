// Declaracion de variables
let gameSequence = [];
let playerSequence = [];
let level = 0;
let score = 0;
const colors = ['red', 'green', 'blue', 'yellow'];

// Funcion para comenzar el juego
// Se inicia la secuencia del juego en un array vacio, el nivel y puntaje en 0
function startGame() {
  gameSequence = [];
  playerSequence = [];
  level = 0;
  score = 0;
  document.getElementById('score').innerText = `Puntaje: ${score}`;
  document.getElementById('level').innerText = `Nivel: ${level}`;
  document.getElementById('start').disabled = true;
  for(let i = 0; i < 999; i++) {                                    // se va generando la secuencia
    gameSequence.push(colors[Math.floor(Math.random() * 4)]);
  }
  displaySequence();
}

document.getElementById('start').addEventListener('click', startGame); // cuando se le da click al boton de comenzar, llama a la funcion startGame.

function displaySequence() {          // se muestra la secuencia del juego por cada nivel y se ilumina cada 1 seg cada boton
  for(let i = 0; i <= level; i++) { 
    setTimeout(function() {
      flashButton(gameSequence[i]);
    }, i * 1000);
  }
}

function flashButton(color) {                   // ilumina el boton tomando el color correspondiente y agrega la clase pressed en CSS
  let button = document.getElementById(color);
  button.classList.add('pressed');
  setTimeout(function() {
    button.classList.remove('pressed');
  }, 500);
}

let buttons = document.getElementsByClassName('game-button'); // obtiene todos los botons con la clase game-button

for(let button of buttons) {                      // recorre el arreglo que tiene todos los botones del juego
  button.addEventListener('click', function(e) {
    e.target.classList.add('pressed');
    setTimeout(function() {
      e.target.classList.remove('pressed');
    }, 500);
    playerSequence.push(e.target.id);
    if(playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
      alert('¡Has perdido! Haz clic en Comenzar para jugar de nuevo.');
      document.getElementById('start').disabled = false;
      return;
    }
    score++; // Se suma un punto por cada botón correcto
    document.getElementById('score').innerText = `Puntaje: ${score}`;
    if(playerSequence.length === gameSequence.length) {
      alert('¡Felicidades, has ganado! Haz clic en Comenzar para jugar de nuevo.');
      document.getElementById('start').disabled = false;
      return;
    }
    if(playerSequence.length === level + 1) {
      level++;
      playerSequence = [];
      setTimeout(function() {
        displaySequence();
      }, 1000);
    }
    document.getElementById('level').innerText = `Nivel: ${level}`;
  });
}
