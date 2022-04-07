console.clear;
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

///// -------------Touch or non touch devices -------------------------/////
var isTouch = !!("undefined" != typeof document.documentElement.ontouchstart);
if(!isTouch) {
    console.log('non mobile')
} else {
    ///-- This is for touch devices ---//////
    console.log('touch and mobile')
}


///// -------------Media queries -------------------------/////
ScrollTrigger.matchMedia({ 
"(max-width: 1025px)": function() {
},

"(min-width: 1025px)": function() {
},

"all": function() {
} // all end
});