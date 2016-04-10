var infoboxEl = document.querySelector('.infobox'),
		openEl = document.querySelector('.js-open'),
		closeEl = document.querySelector('.js-close');

openEl.addEventListener('click', function (evt) {

	infoboxEl.classList.remove('hide');

});

closeEl.addEventListener('click', function (evt) {

	infoboxEl.classList.add('hide');

});


