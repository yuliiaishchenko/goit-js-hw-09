import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1668293497947-be08490a3b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')"
let intervalId = null;
let selectedDate = null;
let currentDate = null;


const refs = {
    dateInput: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysRefs: document.querySelector('[data-days]'),
    hoursRefs: document.querySelector('[data-hours]'),
    minutesRefs: document.querySelector('[data-minutes]'),
    secondsRefs: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', startCounter);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     if (selectedDates[0].getTime() < Date.now()){
        Notify.failure("Please choose a date in the future");
     } else {
        startBtn.disabled = false;
        const setTimer = () => {
            selectedDate = selectedDates[0].getTime();
            timer.start();
        };
        startBtn.addEventListener('click', setTimer);
     }},}

flatpickr (refs.dateInput, options);

  function startCounter(){
    timer.start()
  };

  const timer = {
    
    start(){
        intervalId = setInterval(() => {
            startBtn.disabled = true;
            dateInput.disabled = true;
            currentDate = Date.now();
            const delta = selectedDate - currentDate;
            updateTimer(convertMs(delta));
            if (delta <= 1000) {
                this.stop();
            }
        }, 1000);
    },

    stop(){

        clearInterval(intervalId);
        startBtn.disabled = true;
        dateInput.disabled = false;
        return;
    }
  };


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

 function updateTimer ({days, hours, minutes, seconds}){
    dataDays.textContent = `${days}`;
    dataHours.textContent = `${hours}`;
    dataMinutes.textContent = `${minutes}`;
    dataSeconds.textContent = `${seconds}`;
 }

function addLeadingZero (value){
    return String(value).padStart(2,0)
  };