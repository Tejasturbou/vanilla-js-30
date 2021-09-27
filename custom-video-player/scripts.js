const video_player = document.getElementById("video_player");
const toggleButton = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll("input[type='range']");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const fullscreenToggle = document.querySelector("#screenToggle");

video_player.addEventListener("click", togglePlay);
video_player.addEventListener("play", togglePlayButton);
video_player.addEventListener("pause", togglePlayButton);
video_player.addEventListener("timeupdate", handleProgress);

toggleButton.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
	range.addEventListener("mousemove", handleRangeUpdate)
);

function togglePlay() {
	const isPlaying = video_player.paused;
	if (isPlaying) video_player.play();
	else video_player.pause();
}

function togglePlayButton() {
	const icon = this.paused ? "►" : "❚ ❚";
	toggleButton.textContent = icon;
}

function skip() {
	video_player.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video_player[this.name] = this.value;
}

function handleProgress() {
	const completionPercent =
		(video_player.currentTime / video_player.duration) * 100;
	progressBar.style.flexBasis = `${completionPercent}%`;
}

function scrub(event) {
	const scrubTime =
		(event.offsetX / progress.offsetWidth) * video_player.duration;
	video_player.currentTime = scrubTime;
}

function toggleFullScreen() {
	if (video_player.requestFullscreen) {
		video_player.requestFullscreen();
	} else if (video_player.webkitRequestFullscreen) {
		video_player.webkitRequestFullscreen();
	} else if (video_player.msRequestFullscreen) {
		video_player.msRequestFullscreen();
	}
}

let isMouseDown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => isMouseDown && scrub(e));
progress.addEventListener("mouseup", () => (isMouseDown = false));
progress.addEventListener("mousedown", () => (isMouseDown = true));

fullscreenToggle.addEventListener("click", toggleFullScreen);
