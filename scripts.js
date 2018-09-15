var img_efccback = document.querySelector("#img_efcc-back"),
    preview_efcc = document.querySelector("#efcc-preview");

var windowHeight;

function calculateWindowHeight() {
  windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
}

window.onresize = function() {
  calculateWindowHeight();
};

var landingImg_color = document.querySelector("#landing-color"),
    html = document.querySelector("html"),
    main = document.querySelector("main");

html.style.overflow = "hidden";
landingImg_color.classList.add("readyToFadeIn");
main.classList.add("readyToFadeIn");

window.onload = function() {
  calculateWindowHeight();
  
  setTimeout(function() {
    landingImg_color.classList.add("fadeIn");
    main.classList.add("fadeIn");
    html.style.overflow = "visible";
  }, 500);
  
};

window.onunload = function() {
  window.scrollTo(0,0);
}



/************************* UTILITY AND POLYFILLS *****************************/

// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             // IE Fallback, you can even fallback to onscroll
             function(callback){ window.setTimeout(callback, 1000/60) };


// VERTICAL POSITION
var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
var pY = function() {
  return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
}

var lastPosition;

// Returns true iff the element is not completely off the screen.
function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top + 20 - viewHeight >= 0);
}

// Returns true iff the element is at least 50% in the screen.
function checkMostlyVisible(elm) {
    var rect = elm.getBoundingClientRect();
//    return !(rect.bottom < viewHeight/2 || rect.top - viewHeight/2 >= 0);
    return !(rect.top - windowHeight/2 >= 0);
}

function loop(){
  var y = pY();
    
  // Didn't scroll
  if (lastPosition == y) { // Avoid calculations if not needed
      scroll( loop );
      return false;
  }
  // Scrolled
  else {
      lastPosition = y;

    if (checkMostlyVisible(preview_efcc)) {
      var rect = preview_efcc.getBoundingClientRect();
      img_efccback.style.marginTop = rect.top - 0.5*windowHeight + "px";
    }
      // Video Auto-play Logic
      scroll( loop );
  }
}

loop(); // Call the loop for the first time


//window.onscroll = function() {
//  if (checkMostlyVisible(preview_efcc)) {
//        var rect = preview_efcc.getBoundingClientRect();
//        img_efccback.style["top"] = rect.top - 0.5*windowHeight + "px";
//  }
//}

















preloader();

function preloader() {
  // create object
  imageObj = new Image();

  // start preloading
  for(var i = 1; i <= 4; i++) 
  {
    imageObj.src="img/taichi-" + i + ".png";
  }
  
  updateImage();
}


var taichipink_img = document.querySelector("#img_taichi-pink");
var taichipink_img_index = 0;
var interval_time = 500;

function updateImage() {
  setTimeout(function() {
    taichipink_img.src="img/taichi-" +  (taichipink_img_index+1) + ".png";
    taichipink_img_index = (taichipink_img_index + 1) % 4;
    updateImage();
  }, interval_time);
}








/************** MORE INFO BUTTONS **************/

// Add event-listeners for all "More Info" buttons
var moreInfoButtons = document.getElementsByClassName("more-info");
for (var i = 0; i < moreInfoButtons.length; i++) {
    var moreInfoButton = moreInfoButtons[i];
    moreInfoButton.addEventListener("click", function(e) {
        var cardInfo = e.target.parentElement.querySelector(".extended-info");
        console.log(cardInfo);
        if (cardInfo.classList.contains("displayed")) {
            cardInfo.classList.remove("displayed");
            e.target.innerHTML = "more info"
        } else {
            cardInfo.classList.add("displayed");
            e.target.innerHTML = "less info"
        }
    });
}



