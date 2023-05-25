import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.warning("Please choose a date in the future");
    } else {
      onChooseDate.disabled = false;
    }
  },
};

const datePicker = flatpickr("#datetime-picker", options);

const onChooseDate = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let selectedDate;
let countdownInterval;

function updateCountdown() {
  const currentDate = new Date();
  const timeRemaining = selectedDate - currentDate;

  if (timeRemaining <= 0 || timeRemaining === 0) {
    clearInterval(countdownInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);
  updateTimer(days, hours, minutes, seconds);
}

onChooseDate.addEventListener('click', () => {
  selectedDate = datePicker.selectedDates[0];

  
  const countdownInterval = setInterval(updateCountdown, 1000);

  

  updateCountdown(); 
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const daysElement = document.getElementById('daysValue');
const hoursElement = document.getElementById('hoursValue');
const minutesElement = document.getElementById('minutesValue');
const secondsElement = document.getElementById('secondsValue');

function updateTimer(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
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
}
