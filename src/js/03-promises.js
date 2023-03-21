import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.body.style.backgroundImage = "url(https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg)";

const refs = {
  body: document.querySelector('body'),
  form: document.querySelector('form.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
}

refs.form.addEventListener('click', onPromiseCreate);




function createPromise(position, delay) {
return new Promise ( (resolve, reject) => {

  const shouldResolve = Math.random() > 0.3;
  setTimeout(()=>
  {
  if (shouldResolve) {
   resolve({position, delay});
  } else {
   reject({position, delay});}
  }, delay);});
};

function onPromiseCreate(evt){
  evt.preventDefault();

  let delayValue = Number (refs.delay.value);
  let stepValue = Number (refs.step.value);
  let amountValue = Number (refs.amount.value);

  for (let i=1; i<=1; i += 1)
{let delayOfPromise = delayValue + stepValue*i;
createPromise (i, delayOfPromise).then(({position, delay})=>{
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}).catch(({position, delay})=> {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
});
}
}