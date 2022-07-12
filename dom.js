const createKeyboard = () => {
  const keyboard = document.querySelector('#keyboard');

  //Crea los elementos HTML para crear el teclado
  const keyboardSections = keyboardLetters.map((letters) => {
    const ul = document.createElement('ul');
    letters.map((letter) => {
      const li = document.createElement('li');
      li.innerHTML = `<button id=${letter} onclick="handleKey(event)">${letter}</button>`;
      ul.appendChild(li);
    });
    return ul;
  });
  //Añade el teclado al DOM
  keyboard.append(...keyboardSections);
};

const createGrid = () => {
  //Crea la grid para los intentos de la palabra
  const grid = document.querySelector('#grid');
  for (let i = 0; i < ATTEMPTS; i++) {
    const ul = document.createElement('ul');
    ul.id = i;
    for (let j = 0; j < SECRET_WORD[level].length; j++) {
      const li = document.createElement('li');
      li.id = `${i},${j}`;
      ul.appendChild(li);
    }
    grid.appendChild(ul);
  }
};

//Coloca una letra en la correspondiente casilla
const writeLetter = (e) => {
  if (userAnswer.length < SECRET_WORD[level].length) {
    userAnswer.push(e.target.id);
    const li = document.getElementById(
      `${userAttepmt},${userAnswer.length - 1}`
    );
    li.innerText = userAnswer[userAnswer.length - 1];
  }
};

//Para borrar letras de una en una
const deleteLetter = () => {
  if (userAnswer.length > 0) {
    userAnswer.pop();
    const li = document.getElementById(
      `${userAttepmt},${userAnswer.length}`
    );
    li.innerText = '';
  }
};

//Crear modal
const createModal = (title, txt, score, btnTxt, fn) => {
  const section = document.querySelector('#modal');
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const div = document.createElement('div');
  const button = document.createElement('button');
  section.className = 'modal';
  div.className = 'score';
  button.className = 'next';
  button.addEventListener('click', fn);
  h2.innerText = title;
  h2.className = score ? 'win' : 'lose';
  p.innerHTML = txt;
  button.innerText = btnTxt;
  for (let i = 0; i < 3; i++) {
    const icon = document.createElement('i');
    if (score) {
      icon.className = 'fa-solid fa-star star';
      score--;
    } else {
      icon.className = 'fa-solid fa-star no-star';
    }

    div.appendChild(icon);
  }
  article.appendChild(h2);
  article.appendChild(p);
  article.appendChild(div);
  article.appendChild(button);
  section.appendChild(article);
};
