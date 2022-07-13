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
  'PIEZA',
];
const ATTEMPTS = 6;
let level = 0;
let userAttepmt = 0;
let userAnswer = [];
let score = 0;

createKeyboard();
createGrid();

const findRepeated = (gridColors, letter, index) => {
  //Array de índices de la respuesta del usuario
  const indexes = userAnswer.map((item, index) => index);
  /*Creamos un array donde los elementos son el índices de la respuesta del 
  usuario donde la letra marcada en verde anteriormente se repite*/
  const repeated = indexes.filter(
    (item) => userAnswer[item] === letter
  );
  /*Si la letra en verde se repite en más lugares, ponerla en rojo en esos lugares
  donde no debería estar. Así le decimos al usuario que la palabra tiene un número 
  dado de veces esa letra*/
  repeated.map((i) => {
    if (i !== index && gridColors[i] !== 'ok') {
      gridColors[i] = 'wrong';
    }
  });
};

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
      let aux = SECRET_WORD[level].split('');
      //Para los colores en la respuesta del usuario
      const gridColors = [];

      userAnswer.map((letter, index) => {
        //Si la letra en la respuesta del usuario es igual a la SECRET_WORD
        if (letter === SECRET_WORD[level][index]) {
          gridColors[index] = 'ok';
          /*Quitamos de aux esa letra para que en el else donde se 
            verifica si incluye una letra, ya no tome esta en cuenta
          */
          aux[index] = '';
          findRepeated(gridColors, letter, index);
        } else if (aux.includes(letter)) {
          gridColors[index] = 'maybe';
          findRepeated(gridColors, letter, index);
        } else {
          gridColors[index] = 'wrong';
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
