// variables
const end = new Date('April 14 2019 21:00:00 UTC-0400'); // timezones!!!
let intervalId = null;

// Countdown Object
const cd = {
  days: {
    wrapper: document.getElementById('days'),
    el: document.querySelector('#days strong'),
  },
  hours: {
    wrapper: document.getElementById('hours'),
    el: document.querySelector('#hours strong'),
  },
  minutes: {
    wrapper: document.getElementById('minutes'),
    el: document.querySelector('#minutes strong'),
  },
  seconds: {
    wrapper: document.getElementById('seconds'),
    el: document.querySelector('#seconds strong'),
  },
};

// Calculate Time
const setTime = () => {
  const now = new Date();

  // Calculate time difference
  let diff = end - now;

  // calc days
  cd.days.now = Math.floor(diff / 1000 / 60 / 60 / 24);
  diff -= cd.days.now * 1000 * 60 * 60 * 24;

  // calc hours
  cd.hours.now = Math.floor(diff / 1000 / 60 / 60);
  diff -= cd.hours.now * 1000 * 60 * 60;

  // calc minutes
  cd.minutes.now = Math.floor(diff / 1000 / 60);
  diff -= cd.minutes.now * 1000 * 60;

  // calc seconds
  cd.seconds.now = Math.floor(diff / 1000);
  diff -= cd.seconds.now * 1000;

  Object.keys(cd).forEach((time) => {
    cd[time].el.innerText = cd[time].now;
  });
};

// Visibility Hander
const visibilityHandler = () => {
  // check if window is active, stop countdown
  if (document.hidden) {
    clearInterval(intervalId);

    // else start countdown again
  } else {
    intervalId = setInterval(setTime, 1000);
  }
};

// Set Initial Time
setTime(new Date());

// Start Countdown
intervalId = setInterval(setTime, 1000);

// Add Eventlistener when visibility changes
document.addEventListener('visibilitychange', visibilityHandler, false);
