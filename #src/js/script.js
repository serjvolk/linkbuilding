/* Показать попап с ссылками */
document.querySelectorAll(".js-show-popup").forEach(function(element) {
  element.addEventListener("click", function(e) {
	e.preventDefault()
    showPopup();
  });
});

/* Скрыть попап с ссылками */
document.getElementById("js-popup-overlay").addEventListener("click", function() {
  hidePopup()
});

/* Показать попап */
function showPopup(){
	document.getElementById("js-popup").classList.add("active");
    document.getElementsByTagName("body")[0].classList.add("lock");
    document.getElementById("js-popup-body").classList.add("show");
}

/* Скрыть попап */
function hidePopup(){
	document.getElementById("js-popup-body").classList.remove("show");
	document.getElementById("js-popup-body").classList.add("hide");
	if (window.innerWidth < 767.98) {
		setTimeout(function() {
			hidePopupR();
		}, 150);
	}else{
		hidePopupR();
	}
}

function hidePopupR(){
	document.getElementById("js-popup").classList.remove("active");
	document.getElementsByTagName("body")[0].classList.remove("lock");
	document.getElementById("js-popup-body").classList.remove("hide");
}

////////////////////////////////////// АНИМАЦИЯ SVG-КАРТИНКИ ////////////////////////////////////

function animateText(svgID) {
	var textElements = document.querySelectorAll('svg#'+svgID+' text');
	var letters = ['S', 'E', 'O', 'T', 'E', 'A', 'M', 'L', 'E', 'A', 'D'];
	var animationCount = 0;
	var maxAnimations = 15; // Количество анимаций

	function updateText(element, letter) {
	  element.textContent = letter;
	}

	function getRandomLetter() {
		var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var randomIndex = Math.floor(Math.random() * alphabet.length);
		return alphabet[randomIndex];
	}

	function animate() {
	  animationCount++;
	  if (animationCount <= maxAnimations) {
		textElements.forEach(function(element) {
		  updateText(element, getRandomLetter());
		});
	  } else {
		clearInterval(animationInterval);
		textElements.forEach(function(element, index) {
		  updateText(element, letters[index]);
		});
	  }
	}

	var animationInterval = setInterval(animate, 80);
  }

  animateText('svg1');
  setInterval(() => animateText('svg1'), 4000);

  animateText('svg2');
  setInterval(() => animateText('svg2'), 4000);

  animateText('svg3');
  setInterval(() => animateText('svg3'), 4000);

/////////////////////////////////// КОНЕЦ АНИМАЦИИ SVG-КАРТИНКИ /////////////////////////////////