const labels = document.querySelectorAll('.label');
const inputs = document.querySelectorAll('.input');

// hash function for dynamic input id
String.prototype.hashCode = function (salt) {
  const str = this + salt;
  let hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `hash_${Math.abs(hash)}`;
};

const genId = () => {
  Array.from(inputs).map((inputEl, i) => {
    let currentId = (inputEl.innerHTML).hashCode(i + Date());
    inputEl.setAttribute('id', currentId);
    labels[i].setAttribute('for', currentId);
  });
};

const updateDeleteLine = (e) => {
  e.currentTarget.parentNode.classList.toggle('is-done');
};

const multiSelect = (e) => {
  let inBetween = false;
  if (e.shiftKey && lastChecked && lastChecked !== e.currentTarget) {
    labels.forEach(label => {
      if (label === e.currentTarget || label === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        label.classList.add('is-done');
        label.querySelector('.input').checked = true;
      };
    });
    if (!e.currentTarget.classList.contains('is-done')) {
      e.currentTarget.click();
    }
  }
  lastChecked = e.currentTarget;
};
let lastChecked;

document.addEventListener('DOMContentLoaded', genId);

inputs.forEach(input => input.addEventListener('change', updateDeleteLine));
labels.forEach(input => input.addEventListener('click', multiSelect));
