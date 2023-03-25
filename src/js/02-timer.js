import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1668293497947-be08490a3b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')"

const startBtn = document.querySelector("button[data-start]");
startBtn.disabled = true;
startBtn.addEventListener('click', changeTimerValue);

const dateInput = document.querySelector("input#datetime-picker");

const refs = {
    daysRefs: document.querySelector("[data-days]"),
    hoursRefs: document.querySelector("[data-hours]"),
    minutesRefs: document.querySelector("[data-minutes]"),
    secondsRefs: document.querySelector("[data-seconds]"),
};

let timerData = null;



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
   
if(selectedDates[0].getTime()< Date.now()){
  startBtn.disabled = true;
  Notify.failure("Please choose a date in the future");
} else{
  startBtn.disabled = false;
  selectedDate = selectedDates[0].getTime();
}},
    };
    
flatpickr (dateInput, options);

function changeTimerValue(){

  timer.start();
}

  let timer = {
    start(){
      intervalId = setInterval(()=> 
    {let countdown = selectedDate - Date.now();
   createMarkup(convertMs(countdown));
   startBtn.disabled = true;
   dateInput.disabled = true;
    
   
   if(countdown =1000){
      Notify.success('Time is over!')
    }

  }, 1000);},
stop(){
  startBtn.disabled = true;
  dateInput.disabled = false;
  clearInterval(intervalId);
  return;}};


function createMarkup({days, hours, minutes, seconds}){
  refs.daysRefs.textContent = addLeadingZero(days);
  refs.hoursRefs.textContent = addLeadingZero(hours);
  refs.minutesRefs.textContent = addLeadingZero(minutes);
  refs.secondsRefs.textContent = addLeadingZero(seconds)
}
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
 };

 
function addLeadingZero (value){
    return String(value).padStart(2,0)
  };