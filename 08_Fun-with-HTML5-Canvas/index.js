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

};
const handleUpHandler = (e) => {
};
const getCurrentSlider = (e) => {
  if (!e.target.closest('.slider-container')) return;
  return e.target.closest('.slider-container').querySelector('input').id;
};
const sliderDownHandler = (e) => {
  isDragging[getCurrentSlider(e)] = true;
};

const sliderUpHandler = (e) => {
  isDragging[getCurrentSlider(e)] = false;
};

const handleMousemove = (e) => {
  if (!isDragging[getCurrentSlider(e)]) return;
  console.log(e.target, e, e.offsetX);
  const currentHandle = e.currentTarget.querySelector('.handle');
  currentHandle.style.left = `${e.offsetX}px`;
};

handles.forEach(handle => handle.addEventListener('mousedown', handleDownHandler));
handles.forEach(handle => handle.addEventListener('mouseup', handleUpHandler));
sliders.forEach(slider => slider.addEventListener('mousedown', sliderDownHandler));
sliders.forEach(slider => slider.addEventListener('mouseup', sliderUpHandler));
sliders.forEach(slider => slider.addEventListener('mousemove', handleMousemove));
window.addEventListener('mouseup', (e) => {
  isDragging[getCurrentSlider(e)] = false;
});
