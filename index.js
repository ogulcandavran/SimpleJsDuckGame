const duckToCatch = document.querySelector(".duck_to_catch");
const littleDuckSize = document.querySelector("#little_duck");
const runningDuck = document.querySelector(".running_duck");
const score = document.querySelector("#score");

const setRandomLocation = (element, imgSize) => {
  const randomLeft = Math.floor(Math.random() * window.innerWidth);
  const randomTop = Math.floor(Math.random() * window.innerHeight);
  if ((randomLeft > imgSize) & (randomTop > imgSize)) {
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
  const imgSize = 120;
  if (e.key === "ArrowRight") {
    moveHorizontal(runningDuck, "right", moveLength, imgSize);
  } else if (e.key === "ArrowLeft") {
    moveHorizontal(runningDuck, "left", moveLength, imgSize);
  } else if (e.key === "ArrowDown") {
    moveVertical(runningDuck, "down", moveLength, imgSize);
  } else if (e.key === "ArrowUp") {
    moveVertical(runningDuck, "up", moveLength, imgSize);
  }
  if (isTouching(runningDuck, duckToCatch)) {
    setRandomLocation(duckToCatch, moveLength);
    updateScore();
  }
});

const updateScore = () => {
  score.innerText = Number(score.innerText) + 1;
};

const moveVertical = (element, direction, length, imgSize) => {
  const currentTop = extractPosition(element.style.top);
  if (direction === "down" && currentTop < window.innerHeight - imgSize) {
    element.style.top = `${currentTop + length}px`;
  }

  if (direction === "up" && currentTop >= 0) {
    element.style.top = `${currentTop - length}px`;
  }
};

const moveHorizontal = (element, direction, length, imgSize) => {
  const currentLeft = extractPosition(element.style.left);
  if (direction === "left" && currentLeft >= 0) {
    element.style.left = `${currentLeft - length}px`;
    element.style.transform = "scale(-1,1)";
  }

  if (direction === "right" && currentLeft < window.innerWidth - imgSize) {
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
