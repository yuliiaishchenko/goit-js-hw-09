import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const flatpickerInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start-timer]');
startBtn.disabled = true;

flatpickr (flatpickerInput, options);


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     if (selectedDates[0].getTime() < Date.now()){
        alert("Please choose a date in the future");
     } else {
        startBtn.disabled = false;
        const setTimer = ()=> {
            selectedDate = selectedDates[0].getTime();
            timer.start();
        };
        startBtn.addEventListener('click', setTimer);
     }
    },
  };

  
  const timer = {
    rootSelector: document.querySelector('.timer'),
    start(){
        intervalId = setInterval(() => {
            startBtn.disabled = true;
            flatpickerInput.disabled = true;
            currentDate = Date.now();
            const delta = selectedDate - currentDate;
            if (delta <= 0) {
                this.stop();
                return;
            }

            const { days, hours, minutes, seconds } = this.convertMs(delta);
            this.rootSelector.querySelector('[data-days]').textContent = this.addLeasingZero(days);
            this.rootSelector.querySelector('[data-hours]').textContent = this.addLeasingZero(hours);
            this.rootSelector.querySelector('[data-minutes]').textContent = this.addLeasingZero(minutes);
            this.rootSelector.querySelector('[data-seconds]').textContent = this.addLeasingZero(seconds);
        }, 1000);
    },

    stop(){

        clearInterval(intervalId);
        this.intervalId = null;
        startBtn.disabled = true;
        flatpickerInput.disabled = false;
    }
  };


  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = this.addLeasingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeasingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeasingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeasingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
 };
  addLeasingZero(value){
    return String(value).padStart(2,0);
  };