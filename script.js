let time = 100;
let timerId;
let loadingCount = 4;

function updateTimer() {
  timerId = setTimeout(updateTimer, 40);
  time -= 0.5;
  const images = document.querySelectorAll(".randomImage");
  const selectImage = document.querySelector(".selectImage");
  selectImage.src = images[0].src;
  selectImage.nextElementSibling.textContent =
    images[0].nextElementSibling.textContent;
  if (time <= 75) {
    selectImage.src = images[1].src;
    selectImage.nextElementSibling.textContent =
      images[1].nextElementSibling.textContent;
  }
  if (time <= 50) {
    selectImage.src = images[2].src;
    selectImage.nextElementSibling.textContent =
      images[2].nextElementSibling.textContent;
  }
  if (time <= 25) {
    selectImage.src = images[3].src;
    selectImage.nextElementSibling.textContent =
      images[3].nextElementSibling.textContent;
  }
  if (time <= 0) {
    reload();
  }
  document.querySelector(".progress").style.width = time + "%";
}

function randomImg(img) {
  fetch(
    "https://jsonplaceholder.typicode.com/photos/" +
      Math.round(Math.random() * 5000)
  )
    .then((response) => response.json())
    .then((data) => {
      img.src = data.url;
      img.nextElementSibling.textContent = data.title;
    });
}

function reload() {
  loadingCount = 4;
  time = 100;
  document.querySelector(".progress").style.width = time + "%";
  clearTimeout(timerId);
  document.querySelectorAll(".randomImage").forEach((image) => {
    randomImg(image);
  });
}

function loaded(event) {
  loadingCount -= 1;
  if (loadingCount === 0) {
    updateTimer();
  }
  event.target.classList.remove("loading");
}

function controlTimer() {
  if (document.querySelector(".controlTimer").textContent === "STOP") {
    document.querySelector(".controlTimer").textContent = "PLAY";
    clearTimeout(timerId);
  } else {
    document.querySelector(".controlTimer").textContent = "STOP";
    updateTimer();
  }
}

function init() {
  reload();
  document.querySelector(".refresh").onclick = reload;
  document.querySelectorAll(".randomImage").forEach((image) => {
    image.onload = loaded;
  });
  document.querySelectorAll(".randomImage").forEach((image) => {
    image.addEventListener("click", () => {
      clearTimeout(timerId);
      document.querySelector(".controlTimer").textContent = "PLAY";
      const selectImage = document.querySelector(".selectImage");
      selectImage.src = image.src;
      selectImage.nextElementSibling.textContent =
        image.nextElementSibling.textContent;
    });
  });
  document
    .querySelector(".controlTimer")
    .addEventListener("click", controlTimer);
}

window.addEventListener("DOMContentLoaded", init);
