const handles = document.querySelectorAll('.slider .handle');
const previewEl = document.querySelector('.controls .preview');
const sliders = {
  all: document.querySelectorAll('.slider'),
  h: document.querySelector('.h-slider .slider'),
  s: document.querySelector('.s-slider .slider'),
  l: document.querySelector('.l-slider .slider'),
  a: document.querySelector('.a-slider .slider'),
};
const inputs = {
  all: document.querySelectorAll('.input'),
  h: document.querySelector('#h'),
  s: document.querySelector('#s'),
  l: document.querySelector('#l'),
  a: document.querySelector('#a'),
};
const gradients = {
  h: [],
  s: [],
  l: [],
  a: [],
};
let isDragging = {
  h: false,
  s: false,
  l: false,
  a: false
};
const updateHsla = (
  h = inputs.h.value,
  s = inputs.s.value,
  l = inputs.l.value,
  a = inputs.a.value) => {

  const updateHueList = (s, l, a) => {
    Array.from(Array(37)).forEach((v, i) => {
      gradients.h[i] = `hsla(${i * 10}, ${s}%, ${l}%, ${a})`;
    });
  };
  const updateS = (h, l, a) => {
    Array.from(Array(6)).forEach((v, i) => {
      gradients.s[i] = `hsla(${h}, ${i * 20}%, ${l}%, ${a})`;
    });
  };
  const updateL = (h, s, a) => {
    Array.from(Array(6)).forEach((v, i) => {
      gradients.l[i] = `hsla(${h}, ${s}%, ${i * 20}%, ${a})`;
    });
  };
  const updateA = (h, s, l) => {
    Array.from(Array(6)).forEach((v, i) => {
      gradients.a[i] = `hsla(${h}, ${s}%, ${l}%, ${i * 2 / 10})`;
    });
  };
  updateHueList(s, l, a);
  updateS(h, l, a);
  updateL(h, s, a);
  updateA(h, s, l);
};

const updateSliderBg = () => {
  const setSliderBg = (sliderEl, colorList) => {
    sliderEl.style.background = `linear-gradient(to right, ${colorList}`;
  };
  setSliderBg(sliders.h, gradients.h);
  setSliderBg(sliders.s, gradients.s);
  setSliderBg(sliders.l, gradients.l);
  setSliderBg(sliders.a, gradients.a);
  updatePreview(inputs.h.value, inputs.s.value, inputs.l.value, inputs.a.value);
};

const updatePreview = (h, s, l, a) => {
  previewEl.style.background = `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

updateHsla();
updateSliderBg();
updatePreview(inputs.h.value, inputs.s.value, inputs.l.value, inputs.a.value);
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

// update input field value
const updateHandleValue = (handle, offsetX) => {
  const inputEl = handle.parentNode.parentNode.querySelector('.input');
  const sliderW = handle.parentNode.parentNode.querySelector('.slider').offsetWidth;
  const percent = Math.ceil(offsetX / sliderW * 100);
  inputVal = inputEl.max * percent / 100;
  inputEl.value = (inputEl.max <= 1) ? inputVal : Math.ceil(inputVal);
};

const sliderDownHandler = (e) => {
  const currentHandle = e.currentTarget.querySelector('.handle');
  updateHandlePosition(currentHandle, e.offsetX);
  updateHandleValue(currentHandle, e.offsetX);
  updateHsla();
  updateSliderBg();
};

const sliderUpHandler = (e) => {
};

const handleMousemove = (e) => {
  if (!isDragging[getCurrentSlider(e)]) return;
  const currentHandle = e.currentTarget.querySelector('.handle');
  updateHandlePosition(currentHandle, e.offsetX);
  updateHandleValue(currentHandle, e.offsetX);
  updateHsla();
  updateSliderBg();
};

handles.forEach(handle => handle.addEventListener('mousedown', handleDownHandler));
handles.forEach(handle => handle.addEventListener('mouseup', handleUpHandler));
sliders.all.forEach(slider => slider.addEventListener('mousedown', sliderDownHandler));
sliders.all.forEach(slider => slider.addEventListener('mouseup', sliderUpHandler));
sliders.all.forEach(slider => slider.addEventListener('mousemove', handleMousemove));
window.addEventListener('mouseup', (e) => {
  Object.keys(isDragging).forEach(key => {
    isDragging[key] = false;
  });
});
