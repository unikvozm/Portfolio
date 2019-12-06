// toggle the education list
let edu = document.querySelector(".education__header");
let eduContainer = document.querySelector(".education__container");

edu.addEventListener("click", function() {
  this.classList.toggle("expanded");
  if (eduContainer.style.maxHeight) {
    eduContainer.style.maxHeight = null;
  } else {
    eduContainer.style.maxHeight = eduContainer.scrollHeight + "px";
  }
});

// toggle project's description
let desc = document.querySelectorAll(".projects__project-btn");
let descWrap = document.querySelectorAll(".projects__project-wrapper");

for (let i = 0; i < desc.length; i++) {
  desc[i].addEventListener("click", function() {
    this.classList.toggle("open-desc");
    descWrap[i].classList.toggle("projects__project-wrapper--opened");
    if (descWrap[i].style.display === 'block') {
      descWrap[i].style.maxHeight = null;
      descWrap[i].style.display = "none";
    } else {
      descWrap[i].style.display = "block";
      descWrap[i].style.maxHeight = descWrap[i].scrollHeight + "px";

    }
  });
}

// project slider
let projects = document.querySelectorAll(".projects__project");
let current = 0;
let isEnabled = true;

function changeCurrentProject(n) {
  current = (n + projects.length) % projects.length;
}

function hideProject(direction) {
  isEnabled = false;
  projects[current].classList.add(direction);
  projects[current].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function showProject(direction) {
  projects[current].classList.add("next", direction);
  projects[current].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function nextProject(n) {
  hideProject("to-left");
  changeCurrentProject(n + 1);
  showProject("from-right");
}

function previousProject(n) {
  hideProject("to-right");
  changeCurrentProject(n - 1);
  showProject("from-left");
}

// slide with clicks
document
  .querySelector(".projects__carousel-control.left")
  .addEventListener("click", function() {
    if (isEnabled) {
      previousProject(current);
    }
  });

document
  .querySelector(".projects__carousel-control.right")
  .addEventListener("click", function() {
    if (isEnabled) {
      nextProject(current);
    }
  });

// slide with key left and right
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "37") {
    // left arrow
    if (isEnabled) {
      previousProject(current);
    }
  } else if (e.keyCode == "39") {
    // right arrow
    if (isEnabled) {
      nextProject(current);
    }
  }
}
// swipe with mouse
const swipedetect = el => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener(
    "mousedown",
    function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    "mouseup",
    function(e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (isEnabled) {
              previousProject(current);
            }
          } else {
            if (isEnabled) {
              nextProject(current);
            }
          }
        }
      }
      e.preventDefault();
    },
    false
  );

  // swipe with touch
  surface.addEventListener(
    "touchstart",
    function(e) {
      if (
        e.target.classList.contains("projects__carousel-arrow") ||
        e.target.classList.contains("projects__carousel-control")
      ) {
        if (e.target.classList.contains("left")) {
          if (isEnabled) {
            previousProject(current);
          }
        } else {
          if (isEnabled) {
            nextProject(current);
          }
        }
      }
      var touchobj = e.changedTouches[0];
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    "touchmove",
    function(e) {
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    "touchend",
    function(e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX;
      distY = touchobj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (isEnabled) {
              previousProject(current);
            }
          } else {
            if (isEnabled) {
              nextProject(current);
            }
          }
        }
      }
      e.preventDefault();
    },
    false
  );
};

var el = document.querySelector(".projects__carousel");
swipedetect(el);
