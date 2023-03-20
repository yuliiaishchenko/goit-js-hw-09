const INTERVAL_TIME = 1000;
let intervalId = null;

const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
}

refs.btnStart.addEventListener('click', changeColor);
refs.btnStop.addEventListener('click', onBtnStop);


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  function changeColor (){
    refs.btnStart.toggleAttribute('disabled');
    

    intervalId = setInterval(() =>{
        refs.body.style.backgroundColor = getRandomHexColor()
    }, INTERVAL_TIME)
  };

  function onBtnStop(){
    clearInterval(intervalId);
    refs.btnStart.removeAttribute('disabled');
   
  };
