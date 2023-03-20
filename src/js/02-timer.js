import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


let intervalId = null;
let selectedDate = null;
let currentDate = null;


const flatpickrInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.toggleAttribute('disabled');

flatpickr (flatpickrInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     if (selectedDates[0].getTime() < Date.now()){
        alert("Please choose a date in the future");
     } else {
        startBtn.disabled = false;
        const setTimer = () => {
            selectedDate = selectedDates[0].getTime();
            timer.start();
        };
        startBtn.addEventListener('click', setTimer);
     }},
    
  });

  
  const timer = {
    rootSelector: document.querySelector('.timer'),
    start(){
        intervalId = setInterval(() => {
            startBtn.disabled = true;
            flatpickrInput.disabled = true;
            currentDate = Date.now();
            const delta = selectedDate - currentDate;
            if (delta <= 0) {
                this.stop();
                return;
            }

            const { days, hours, minutes, seconds } = this.convertMs(delta);
            this.rootSelector.querySelector('[data-days]').textContent = this.addLeadingZero(days);
            this.rootSelector.querySelector('[data-hours]').textContent = this.addLeadingZero(hours);
            this.rootSelector.querySelector('[data-minutes]').textContent = this.addLeadingZero(minutes);
            this.rootSelector.querySelector('[data-seconds]').textContent = this.addLeadingZero(seconds);
        }, 1000);
    },

    stop(){

        clearInterval(intervalId);
        this.intervalId = null;
        startBtn.disabled = true;
        flatpickrInput.disabled = false;
    }
  };


  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
 };


function addLeadingZero (value){
    return String(value).padStart(2,0)
  };