//get out elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBarr= player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fsBtn = player.querySelector("[data-full]");
//build out functions

function togglePlay(){
	const method = video.paused ? 'play':'pause';
	video[method]();
}

// This function updates the play/pause icon depending on video state
function updatePlayButton() {
  this.paused ? (toggle.textContent = "►") : (toggle.textContent = "||");
}

function skip() {
  if (this.dataset.skip === "-10") {
    video.currentTime -= 10;
  }

  if (this.dataset.skip === "25") {
    video.currentTime += 25;
  }
}

function updateSlider() {
  if (this.name === "volume") {
    video.volume = this.value;
  }

  if (this.name === "playbackRate") {
    video.playbackRate = this.value;
  }
}

function updateVideoProgress() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBarr.style.flexBasis = `${percentage}%`;
}

function videoScrub(e) {
  const percent = (e.layerX / progress.offsetWidth) * video.duration;
  video.currentTime = percent;
}

function fullscreen() {
  video.requestFullscreen();
}

//Connect Event Listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", updateVideoProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((item) => item.addEventListener("click", skip));
ranges.forEach((item) => item.addEventListener("change", updateSlider));
let mousedown = false;
progress.addEventListener("click", videoScrub);
progress.addEventListener("mousemove", (e) => mousedown && videoScrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
fsBtn.addEventListener("click", fullscreen);