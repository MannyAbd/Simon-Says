
const topRight =document.querySelector('.top-right');
const topLeft =document.querySelector('.top-left');
const bottomLeft =document.querySelector('.bottom-left');
const bottomRight =document.querySelector('.bottom-right');
//computer flashes random squares
const getRandomPanel = () => {
  const panels = [topRight, topLeft, bottomLeft, bottomRight];
  return panels[parseInt(Math.random() * panels.length)];
};

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];
//computer blinks a sequence of colors

const flash = panel => {
  return new Promise((resolve, reject) => {

    panel.className += ' active';//supposed to do the blinking
    setTimeout(() => {
      panel.className = panel.className.replace(' active', '');
      setTimeout(() => {
        resolve();
      }, 300); //blinks between
    }, 1000);
});
};

let canClick = false;


// user can now click
const panelClicked = panelClicked => {
  if (!canClick) return;
  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panelClicked){
    if (sequenceToGuess.length === 0) {
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      startFlashing();
    }
  } else {
    alert('yuh dead');
  }
};

const startFlashing = async () => {
  canClick = false;
  for (const panel of sequence) {
    await flash(panel);
  }
  canClick = true;
};


startFlashing();
