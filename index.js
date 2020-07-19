const duckToCatch = document.querySelector(".duck_to_catch");
const littleDuckSize = document.querySelector("#little_duck");
const runningDuck = document.querySelector(".running_duck");
const score = document.querySelector("#score");

const setRandomLocation = (element, moveLength) => {
  const randomLeft = Math.floor(Math.random() * window.innerWidth);
  const randomTop = Math.floor(Math.random() * window.innerHeight);
  if ((randomLeft > moveLength) & (randomTop > moveLength)) {
    element.style.top = `${randomTop - littleDuckSize.clientHeight}px`;
    element.style.left = `${randomLeft - littleDuckSize.clientWidth}px`;
  }
};

const isTouching = (a, b) => {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
};

window.addEventListener("keydown", function (e) {
  const moveLength = 30;
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    moveHorizontal(runningDuck, e.key, moveLength);
  } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    moveVertical(runningDuck, e.key, moveLength);
  }
  if (isTouching(runningDuck, duckToCatch)) {
    setRandomLocation(duckToCatch, moveLength);
    updateScore();
  }
});

const updateScore = () => {
  score.innerText = Number(score.innerText) + 1;
};

const moveVertical = (element, key, moveLength) => {
  const imageHeight = element.offsetHeight;
  const currentTop = extractPosition(element.style.top);
  const length =
    window.outerHeight - currentTop - element.offsetHeight < moveLength
      ? window.outerHeight - currentTop - element.offsetHeight
      : moveLength;

  if (key === "ArrowDown" && currentTop < window.innerHeight - imageHeight) {
    element.style.top = `${currentTop + length}px`;
  }

  if (key === "ArrowUp" && currentTop >= 0) {
    element.style.top = `${currentTop - moveLength}px`;
  }
};

const moveHorizontal = (element, key, moveLength) => {
  const imageWidth = element.offsetWidth;
  const currentLeft = extractPosition(element.style.left);
  const length =
    window.outerWidth - currentLeft - element.offsetWidth < moveLength
      ? window.outerWidth - currentLeft - element.offsetWidth
      : moveLength;
  console.log(window.outerWidth - currentLeft - element.offsetWidth);
  if (key === "ArrowLeft" && currentLeft >= 0) {
    element.style.left = `${currentLeft - moveLength}px`;
    element.style.transform = "scale(-1,1)";
  }

  if (key === "ArrowRight" && currentLeft < window.innerWidth - imageWidth) {
    element.style.left = `${currentLeft + length}px`;
    element.style.transform = "scale(1,1)";
  }
};

const extractPosition = (position) => {
  if (!position) {
    return 100;
  }
  return parseInt(position.slice(0, -2));
};

setRandomLocation(duckToCatch, 30);
