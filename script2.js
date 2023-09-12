function reload() {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    image.src = "https://loremflickr.com/300/200?random=" + Math.random();
    image.classList.add("loading");
  });
}

function removeImg() {
  const images = document.querySelectorAll(".overlay");
  if (images.length === 2) {
    const target = document.querySelector(".remove");
    target.classList.add("grayBtn");
  }
  if (images.length > 1) {
    images[0].remove();
  }
}

function togglePreview(event) {
  if (event.target.tagName === "IMG") {
    event.target.parentNode.classList.toggle("active");
  }
  if (event.target.classList.contains("active")) {
    event.target.classList.toggle("active");
  }
}
function imgOnclick() {
  const images = document.querySelectorAll(".overlay");
  images.forEach((image) => {
    image.onclick = togglePreview;
  });
}

function addImg() {
  const image = document.querySelector(".overlay");
  const newImage = document.createElement("div");
  newImage.className = "overlay";
  newImage.innerHTML =
    '<img src="https://loremflickr.com/300/200?random=' +
    Math.random() +
    '" class="randomImage"/>';
  image.after(newImage);
  imgOnclick();
  const images = document.querySelectorAll(".overlay");
  if (images.length > 1) {
    const target = document.querySelector(".remove");
    target.classList.remove("grayBtn");
  }
}

function init() {
  const buttonReload = document.querySelector(".reload");
  buttonReload.onclick = reload;
  const buttonRemove = document.querySelector(".remove");
  buttonRemove.onclick = removeImg;
  const buttonAdd = document.querySelector(".add");
  buttonAdd.onclick = addImg;
  imgOnclick();
  document.querySelectorAll("img").forEach((image) => {
    image.onload = (event) => event.target.classList.remove("loading");
  });
}

window.addEventListener("DOMContentLoaded", init);
