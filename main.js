const keyboardLetters = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['←', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '↩'],
];
//←
const SECRET_WORD = [
  'MUNDO',
  'BUENA',
  'CAZAR',
  'CANTO',
  'MANTO',
  'APODO',
  'ARCOS',
  'BOTAS',
  'CANAS',
  'BANCO',
  'PASTO',
  'PISTA',
  'DOLER',
  'FELIZ',
  'LOGRO',
];
const ATTEMPTS = 6;
let level = 0;
let userAttepmt = 0;
let userAnswer = [];
let score = 0;

createKeyboard();
createGrid();

//Comprobar respuesta
const checkWord = () => {
  if (userAnswer.length === SECRET_WORD[level].length) {
    //Caso en que todas las palabras son correctas
    if (userAnswer.join('') === SECRET_WORD[level]) {
      const ul = document.getElementById(userAttepmt);
      ul.childNodes.forEach((li) => (li.className = 'ok'));
      win();
    }
    //Caso en el que algunas son correctas o no lo son
    else {
      //Obtenemos el color correspondiente para cada casilla según la condición
      //Generamos un array con esos valores
      const gridColors = userAnswer.map((letter, index) => {
        if (letter === SECRET_WORD[level][index]) {
          return 'ok';
        } else if (SECRET_WORD[level].includes(letter)) {
          return 'maybe';
        } else {
          return 'wrong';
        }
      });
      //Pintamos las casillas del color correspondiente
      gridColors.map((item, index) => {
        const li = document.getElementById(`${userAttepmt},${index}`);
        const btn = document.getElementById(userAnswer[index]);
        li.className = item;
        btn.className = item;
      });
      userAttepmt++;
      userAnswer = [];
      if (userAttepmt === ATTEMPTS) {
        lose();
      }
    }
  }
};

//Obtener letra del teclado, enter o borrar
const handleKey = (e) => {
  switch (e.target.id) {
    case '↩':
      checkWord();
      break;
    case '←':
      deleteLetter();
      break;
    default:
      writeLetter(e);
  }
};

const next = (levelUp) => {
  levelUp ? level++ : level;
  score = 0;
  userAttepmt = 0;
  userAnswer = [];
  const grid = document.querySelector('#grid');
  const modal = document.querySelector('#modal');
  const keyboard = document.querySelector('#keyboard');
  modal.className = '';
  modal.innerHTML = '';
  grid.innerHTML = '';
  keyboard.innerHTML = '';
  createGrid();
  createKeyboard();
};

const win = () => {
  if (userAttepmt >= 0 && userAttepmt <= 2) {
    score = 3;
  } else if (userAttepmt >= 3 && userAttepmt <= 4) {
    score = 2;
  } else {
    score = 1;
  }
  if (level < SECRET_WORD.length - 1) {
    createModal(
      '¡Felicidades!',
      `Nivel ${level + 1} completado`,
      score,
      'Siguiente nivel',
      () => next(true)
    );
  } else {
    createModal(
      '¡Felicidades!',
      'Has completado todos los niveles',
      score,
      'Gracias por jugar'
    );
  }
};

const lose = () => {
  score = 0;
  createModal(
    '¡Oi!',
    'Lo sentimos, has perdido',
    score,
    'Reintentar',
    () => next(false)
  );
};
