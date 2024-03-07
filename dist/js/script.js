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

// Получить все элементы text от всех svg в один объект
var allSvgTexts = [];
(function getAllElements(){
	const svgElements = document.querySelectorAll('.logoSvg');
	svgElements.forEach((svgElement, indexSvg) => {
		const textElements = svgElement.getElementsByTagName('text');
		allSvgTexts[indexSvg] = [];
		for (let indexText = 0; indexText < textElements.length; indexText++) {
			allSvgTexts[indexSvg][indexText] = textElements[indexText];
		}
	});
})();

// Обновить text по индексу у всех svg
function updateText(index, letter) {
	for(let s = 0; s < allSvgTexts.length; s++){
	  allSvgTexts[s][index].textContent = letter;
	}
}

let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let alphabetLength = alphabet.length;
// Получить случайную букву
function getRandomLetter() {
	let randomIndex = Math.floor(Math.random() * alphabetLength);
	return alphabet[randomIndex];
}

let letters = ['S', 'E', 'O', 'T', 'E', 'A', 'M', 'L', 'E', 'A', 'D'];
const MAX_ANIMATIONS = 4; // Количество анимаций
// Анимация картинок
function animateText() {
	let animationCount = 0;
	let lastIndex = 0;
	let textUpdatedInLoop = false;

	function animate() {
		animationCount++;
		textUpdatedInLoop = false;
		for(let i = 0; i < letters.length; i++){
			if(i >= lastIndex){
				if(animationCount % MAX_ANIMATIONS === 0 && textUpdatedInLoop === false){
					updateText(i, letters[i]);
					lastIndex++;
					textUpdatedInLoop = true;
				}else{
					updateText(i, getRandomLetter());
				}
			}
			if(lastIndex > letters.length-1){
				clearInterval(animationInterval);
			}
		}
	}

	var animationInterval = setInterval(animate, 80);
}

animateText();
setInterval(animateText, 6000);

////////////////////////////////////////////////////////////////////////////////////