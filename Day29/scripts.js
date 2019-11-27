let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function trailingNumber(val){
	return `${val<10?'0':''}${val}`;
}

function timer(seconds){
	clearInterval(countDown);
	const now = Date.now(); //get now time
	const then = now + seconds*1000; // calc then -> end timer
	displayTimeLeft(seconds);
	displayEndTime(then);
	countDown = setInterval(function(){
		const secondsLeft = Math.round((then - Date.now())/1000);
		if(secondsLeft<0){
			clearInterval(countDown);
			return;
		}
		//console.log(secondsLeft);
		displayTimeLeft(secondsLeft);
	},1000);
}

function displayTimeLeft(seconds){
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;

	const display = `${trailingNumber(mins)}:${trailingNumber(secs)}`;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hours = end.getHours();
	const adjHours = hours>12?hours-12:hours;
	//console.log(hours);
	const mins = end.getMinutes();
	//console.log(mins);
	const secs = end.getSeconds();
	//console.log(secs);

	endTime.textContent = `Be back at ${adjHours}:${trailingNumber(mins)}`;
}

function startTimer(){
	const seconds =  parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
	e.preventDefault();//dont reload page
	const mins = this.minutes.value;
	timer(mins*60);
	this.reset();
});