import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1668293497947-be08490a3b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')"
let timerId = null;
let timeDifferent = 0;
let formatDate = null;


const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysRefs: document.querySelector('[data-days]'),
    hoursRefs: document.querySelector('[data-hours]'),
    minutesRefs: document.querySelector('[data-minutes]'),
    secondsRefs: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    timeDifferentDate(selectedDates[0]);},
    };
    

refs.startBtn.setAttribute('disabled', true);

flatpickr (refs.dateInput, options);
refs.startBtn.addEventListener('click', onBtnStart);

  function onBtnStart(){
   timerId = setInterval(startTimer,1000);
  };


  function timeDifferentDate(selectedDates){
    const currentDate = Date.now();
      if (selectedDates < currentDate){
       refs.startBtn.setAttribute('disabled', true);
       return  Notify.failure("Please choose a date in the future");
      } else {
         
       
             timeDifferent = selectedDates[0].getTime()- currentDate;
             formatDate = convertMs(timeDifferent);
             renderDate(formatDate);
             refs.startBtn.removeAttribute('disabled');
         
  }}

  function startTimer() {
    refs.startBtn.setAttribute('disabled', true);

    refs.dateInput.setAttribute('disabled', true);
timeDifferent <=1000;

if(refs.secondsRefs.textContent <=0 && refs.minutesRefs.textContent<=0){
  Notify.success('Time is over!');
  clearInterval(timerId)
}
else{
formatDate = convertMs(timeDifferent);
renderDate(formatDate);
}
}


  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
 };

 function renderDate ({days, hours, minutes, seconds}){
    refs.dataDays.textContent = `${days}`;
    refs.dataHours.textContent = `${hours}`;
    refs.dataMinutes.textContent = `${minutes}`;
    refs.dataSeconds.textContent = `${seconds}`;
 }

function addLeadingZero (value){
    return String(value).padStart(2,0)
  };