const btnStart = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");


const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];

let time = 0;
let score = 0;

btnStart.addEventListener("click", (e) => {
	e.preventDefault();
	screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
	if (e.target.classList.contains("time-btn")) {
		time = parseInt(e.target.getAttribute("data-time"));
		screens[1].classList.add("up");
		startGame();
	}
});



board.addEventListener("click", (e) => {
	if (e.target.classList.contains("circle")) {
		
		score++;
		e.target.remove();
		createRandomCircle();
	}
});

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

const decreaseTime = () => {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
};

function setTime(value) {
	timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<div class='end-box'><h1>Score: <span class='primary'>${score}</span></h1><button class='restart time-btn' >Restart</button></div>`
	const restart = document.querySelector(".restart");
	restart.addEventListener('click', () => {
		location.reload();
	})
}

function createRandomCircle() {
	const circle = document.createElement("div");
	const size = getRandomNum(10, 60);
	const { width, height } = board.getBoundingClientRect();
	const x = getRandomNum(0, width - size);
	const y = getRandomNum(0, height - size);

	const color = getRandomColor();
	circle.style.background = color;
	circle.classList.add("circle");
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	board.append(circle);
}

function getRandomNum(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}


function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}


