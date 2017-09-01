// funcs
const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

const updatePlayBtn = (e) => {
  const icon = e.currentTarget.paused ? '►' : '⏸';
  toggle.textContent = icon;
};

const skip = (e) => {
  const value = e.currentTarget.dataset.skip;
  video.currentTime += parseFloat(value);
};

const handleRangeUpdate = (e) => {
  video[e.currentTarget.name] = e.currentTarget.value;
};

const handleProgress = (e) => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

// query Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const rangeBars = player.querySelectorAll('input[type="range"]');
const skipBtns = player.querySelectorAll('[data-skip]');

// events
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayBtn);
video.addEventListener('pause', updatePlayBtn);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipBtns.forEach(btn => btn.addEventListener('click', skip));

rangeBars.forEach(bar => bar.addEventListener('change', handleRangeUpdate));
rangeBars.forEach(bar => bar.addEventListener('mousemove', handleRangeUpdate));

let scrubFlag;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => scrubFlag && scrub(e));
progress.addEventListener('mousedown', () => scrubFlag = true);
progress.addEventListener('mouseup', () => scrubFlag = false);
