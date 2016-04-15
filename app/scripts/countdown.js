// variables
		el = document.getElementById('countdown'),
		intervalId;

// Countdown Object
var cd = {
		days: {
			wrapper: document.getElementById('days'),
			el: document.querySelector('#days strong')
		},
		hours: {
			wrapper: document.getElementById('hours'),
			el: document.querySelector('#hours strong')
		},
		minutes: {
			wrapper: document.getElementById('minutes'),
			el: document.querySelector('#minutes strong')
		},
		seconds: {
			wrapper: document.getElementById('seconds'),
			el: document.querySelector('#seconds strong')
		}
};

// Set Initial Time
setTime(new Date());

// Start Countdown
intervalId = setInterval( setTime, 1000 );

// Add Eventlistener when visibility changes
document.addEventListener('visibilitychange', visibilityHandler, false);

// Calculate Time
function setTime () {

	now = new Date();

	// Calculate time difference
	diff = end - now;

	// calc days
	cd.days.now = Math.floor(diff / 1000 / 60 / 60 / 24);
	diff -= cd.days.now *1000 * 60 * 60 * 24;

	// calc hours
	cd.hours.now = Math.floor(diff / 1000 / 60 / 60);
	diff -= cd.hours.now * 1000 * 60 * 60;

	// calc minutes
	cd.minutes.now = Math.floor(diff / 1000 / 60);
	diff -= cd.minutes.now * 1000 * 60;

	// calc seconds
	cd.seconds.now = Math.floor(diff / 1000);
	diff -= cd.seconds.now * 1000;

	for (time in cd) {

		// Update Only if value has changed
		if (cd[time].now != cd[time].old) {
			cd[time].old = cd[time].now;

			// Check if value is greater than 0
			if (cd[time].now > 0 ) {
				cd[time].el.innerText = cd[time].now;
				cd[time].wrapper.classList.remove('hide');

			// else hide
			} else {
				cd[time].wrapper.classList.add('hide');
			}
		}
	}
}

// Visibility Hander
function visibilityHandler () {

	// check if window is active, stop countdown
  if (document.hidden) {
    clearInterval(intervalId);

  // else start countdown again
  } else  {
    intervalId = setInterval( setTime, 1000);
  }
}
