//////////////////////////////// Логика попапов /////////////////////////////////////////////

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
	const MAX_ANIMATIONS = 4; // Количество анимаций
	let lastIndex = 0;
	let textUpdatedInLoop = false;

	function updateText(element, letter) {
	  element.textContent = letter;
	}

	// Получить случайную букву
	function getRandomLetter() {
		let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let randomIndex = Math.floor(Math.random() * alphabet.length);
		return alphabet[randomIndex];
	}

	function animate() {
		animationCount++;
		textUpdatedInLoop = false;
		textElements.forEach(function(element, index) {
			if(index >= lastIndex){
				if(animationCount % MAX_ANIMATIONS === 0 && textUpdatedInLoop === false){
					updateText(element, letters[index]);
					lastIndex++;
					textUpdatedInLoop = true;
				}else{
					updateText(element, getRandomLetter());
				}
			}
			if(lastIndex > letters.length-1){
				clearInterval(animationInterval);
			}
		});
	}

	var animationInterval = setInterval(animate, 80);
}

//animateText('svg1');
//setInterval(() => animateText('svg1'), 6000);

//animateText('svg2');
//setInterval(() => animateText('svg2'), 6000);

//animateText('svg3');
//setInterval(() => animateText('svg3'), 6000);

let allSvgTexts = [];
const svgElements = document.querySelectorAll('.logoSvg');
svgElements.forEach((svgElement, indexSvg) => {
    const textElements = svgElement.getElementsByTagName('text');
    allSvgTexts[indexSvg] = [];
    for (let indexText = 0; indexText < textElements.length; indexText++) {
        allSvgTexts[indexSvg][indexText] = textElements[indexText];
    }
});

allSvgTexts[0][2].textContent = "4";
allSvgTexts[1][4].textContent = "7";

////////////////////////////// ///// АНИМBАТЬ ЭЛЕМЕНТЫ /////// //////////////////////////

const animItems = document.querySelectorAll("._anim-items"); // Элементы которые нужно анимировать
if(animItems.length > 0){
	window.addEventListener('scroll', animOnScroll);
	/* Что происходит: Для каждого элемента который имеет класс '_anim-items' при достижении 1/4 его
	высоты, либо 1/4 высоты окна браузера(если высота объекта выше высоты окна браузера) ему 
	добавляется класс '_active'. Если мы недокрутили до елемента, либо перекрутили то у него класс
	'_active' убирается. */
	function animOnScroll() {
		for(let index = 0; index < animItems.length; index++){ 
			const animItem = animItems[index]; // Получаем каждый объект отдельно
			const animItemHeight = animItem.offsetHeight; // Получаем высоту объекта
			const animItemOffset = offset(animItem).top; // Позиция объекта относительно верха
			const animStart = 4; // Коэффициент резулирующий момент старта анимации

			// Настройка момента старта анимации
			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			// Для случая когда анимированный объект выше по высоте чем окно браузера
			if(animItemHeight > window.innerHeight){
				animItemPoint = window.innerHeight - window.innerHeight / 4;
			}

			// Добавляем элементам класс при определенных условиях
			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('_active');
			}else{ // Убрать класс нужно для повторной анимации объекта
				/* Наличие у объекта класса '_anim-no-hide' говорит о том что не нужно объект  
				повторно анимировать если опять на него проскролили */
				if(!animItem.classList.contains('_anim-no-hide')){
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {// Корректно и кроссбраузерно выщитывает позиция объекта относительно верха
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(function() {
		animOnScroll();
	}, 300);
}

////////////////////////////////////////////////////////////////////////////////////////