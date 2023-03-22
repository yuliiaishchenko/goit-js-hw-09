import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1668293497947-be08490a3b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')"

const startBtn = document.querySelector("button[data-start]");
startBtn.disabled = true;

const dateInput = document.querySelector("#datetime-picker");

const refs = {
    daysRefs: document.querySelector("[data-days]"),
    hoursRefs: document.querySelector("[data-hours]"),
    minutesRefs: document.querySelector("[data-minutes]"),
    secondsRefs: document.querySelector("[data-seconds]"),
};

let timerId = null;



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
   console.log(selectedDates[0]);
  console.log(new Date())
if(selectedDates[0]< new Date()){
  startBtn.disabled = true;
  Notify.failure("Please choose a date in the future");
} else{
  startBtn.disabled = false;
  startBtn.addEventListener('click', ()=>{
    changeTimerValue(selectedDates[0])
  })
}},
    };
    
flatpickr (dateInput, options);

function changeTimerValue(){

  let timer = setInterval(()=> {
    let countdown = new Date (dateInput.value) - new Date();
    startBtn.disabled = true;
    console.log(countdown)
    if(countdown>=0){
      let timerData = convertMs(countdown);
      refs.days.textContent = timerData.days;
      refs.hours.textContent = timerData.hours;
      refs.minutes.textContent = timerData.minutes;
      refs.seconds.textContent = timerData.seconds;
    }
    else{
      Notify.success('Time is over!')
      clearInterval(timer);
    }
  }, 1000);
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

 
function addLeadingZero (value){
    return String(value).padStart(2,0)
  };