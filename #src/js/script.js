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

  /////////////////////////////////// КОНЕЦ АНИМАЦИИ SVG-КАРТИНКИ /////////////////////////////////

// Указываем пороговое значение ширины экрана, ниже которого будет происходить перемещение блоков
const thresholdWidth = 1214;

// Функция для перемещения элементов между блоками в зависимости от размера экрана
function moveElementsBasedOnScreenWidth() {
    const container1 = document.getElementById('container1'); // Первый блок, откуда берем элементы
    const container2 = document.getElementById('container2'); // Второй блок, куда перемещаем элементы
    const screenWidth = window.innerWidth; // Ширина экрана

    // Если ширина экрана меньше порогового значения, перемещаем элементы из container1 в container2
    if (screenWidth < thresholdWidth) {
        const elementsToMove = container1.querySelectorAll('.element-to-move');
        elementsToMove.forEach(element => {
            container2.appendChild(element);
        });
    } else { // Если ширина экрана больше порогового значения, возвращаем элементы из container2 в container1
        const elementsToMoveBack = container2.querySelectorAll('.element-to-move');
        elementsToMoveBack.forEach(element => {
            container1.appendChild(element);
        });
    }
}

// Вызываем функцию при загрузке страницы и изменении размера окна
window.addEventListener('load', moveElementsBasedOnScreenWidth);
window.addEventListener('resize', moveElementsBasedOnScreenWidth);