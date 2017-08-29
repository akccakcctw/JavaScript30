const handles = document.querySelectorAll('.slider .handle');
const sliders = document.querySelectorAll('.slider');
let isDragging = {
  h: false,
  s: false,
  l: false,
  a: false
};

const dragHandler = (e) => {

};
const handleDownHandler = (e) => {
  isDragging[getCurrentSlider(e)] = true;

};
const handleUpHandler = (e) => {
  isDragging[getCurrentSlider(e)] = false;
};
const getCurrentSlider = (e) => {
  if (!e.target.closest('.slider-container')) return;
  return e.target.closest('.slider-container').querySelector('input').id;
};
const updateHandlePosition = (handle, offsetX) => {
  offsetX = Math.max(0, offsetX - 20); // handle width = 20px
  handle.style.left = `${offsetX}px`;
};
const updateHandleValue = (handle, offsetX) => {
  const inputEl = handle.parentNode.parentNode.querySelector('.input');
  const sliderW = handle.parentNode.parentNode.querySelector('.slider').offsetWidth;
  const percent = Math.ceil(offsetX / sliderW * 100)
  inputEl.value = Math.ceil(inputEl.max * percent / 100);
}

const sliderDownHandler = (e) => {
  const currentHandle = e.currentTarget.querySelector('.handle');
  updateHandlePosition(currentHandle, e.offsetX);
  updateHandleValue(currentHandle, e.offsetX);
};

const sliderUpHandler = (e) => {
};

const handleMousemove = (e) => {
  if (!isDragging[getCurrentSlider(e)]) return;
  const currentHandle = e.currentTarget.querySelector('.handle');
  updateHandlePosition(currentHandle, e.offsetX);
};

handles.forEach(handle => handle.addEventListener('mousedown', handleDownHandler));
handles.forEach(handle => handle.addEventListener('mouseup', handleUpHandler));
sliders.forEach(slider => slider.addEventListener('mousedown', sliderDownHandler));
sliders.forEach(slider => slider.addEventListener('mouseup', sliderUpHandler));
sliders.forEach(slider => slider.addEventListener('mousemove', handleMousemove));
window.addEventListener('mouseup', (e) => {
  isDragging[getCurrentSlider(e)] = false;
});
