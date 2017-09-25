const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localaMediaStream => {
      video.src = window.URL.createObjectURL(localaMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(err);
    });
};

const paint2Canvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  [canvas.width, canvas.height] = [width, height];

  ctx.drawImage(video, 0, 0, width, height);
  // take the pixels out
  let pixels = ctx.getImageData(0, 0, width, height);
  // mess with pixels
  // pixels = redEffect(pixels);
  pixels = rgbSplit(pixels);
  pixels = greenScreen(pixels);
  // put pixels back
  ctx.putImageData(pixels, 0, 0);
  requestAnimationFrame(paint2Canvas);
};

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'newImage');
  link.innerHTML = `<img src="${data}" alt="new Image" />`;
  strip.insertBefore(link, strip.firstChild);
};

const redEffect = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
  }
  return pixels;
};

const rgbSplit = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // red
    pixels.data[i + 100] = pixels.data[i + 1]; // green
    pixels.data[i - 150] = pixels.data[i + 2]; // blue
  }
  return pixels;
};

const greenScreen = (pixels) => {
  const levels = {};
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
};

getVideo();
video.addEventListener('canplay', paint2Canvas);
