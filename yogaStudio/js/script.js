console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);


// const deviceType = () => {
//   const ua = navigator.userAgent;
//   if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
//       // return "tablet";
//       console.log('tablet')
//   }
//   else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
//       // return "mobile";
//       console.log('mobile')
//   }
//   // return "desktop";
//   console.log('desktop')
// };


// var isMobile = window.matchMedia("only screen and (max-width: 760px)"),
var isTouch = !!("undefined" != typeof document.documentElement.ontouchstart);

if(isTouch) {
        // is mobile device
        alert("has touch support");
} else {
        // is not a mobile device
        alert("no touch support");
}
////////////////////////////////////////////
// ScrollTrigger.matchMedia({  
//   //tablet/mobile
//   "(max-width: 992px)": function() {

//   },
//   "(min-width: 1400px)": function() {

 
//   },

//   "all": function() {

//   }	
// });


/////---------- Navigation
//////hamburger and menu changes/////
$('.navbar-toggler').click(function(){
	$(this).toggleClass('open');
});


$('.nav-item a').click(function() {
   $('.navbar-toggler').removeClass('open');
});

$('.nav-link').on('click',function() {
  $('.navbar-collapse').collapse('hide');
});


// text around arch/////
gsap.to(".drawText",10,{attr:{startOffset:'105%'},repeat:-1, ease:'none'});


////////////////////////////////////////////////////////////////
// moving arch background/////
// gsap.timeline({repeat:-1, yoyo:true})
// .to('#hero-panning', {
//   objectPosition:'90% 0',
//   duration:10, ease:'none',
//   repeat:1, yoyo:true
// },0)

// set image to center
gsap.set('#about-panning, #horz-one-panning, #horz-two-panning', {	
  attr:{ x:'-50%' },

})


///////////////////////////horizonl scroll section/////////////////////////////////////

const horizontalSections = gsap.utils.toArray('section.horizontal')

horizontalSections.forEach(function (sec, i) {	  
  var thisPinWrap = sec.querySelector('.pin-wrap');
  var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');  
  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 

  gsap.fromTo(thisAnimWrap, { 
    x: () => thisAnimWrap.classList.contains('animation-wrap') ? 0 : getToValue() }, { 
    x: () => thisAnimWrap.classList.contains('animation-wrap') ? getToValue() : 0, 
    ease: "none",
    scrollTrigger: {
      trigger: sec,		
      start: "top top",
      end: () => "+=" + thisAnimWrap.scrollWidth,
      pin: true,  
	     pinReparent: true, 
      invalidateOnRefresh: true,
      scrub: true,
    }
  });

});	



// split text titles
  // var text = gsap.utils.toArray(".aniText");
  // text.forEach((el) => {
  //     var splitWords = new SplitText(el, {type: "words,chars"});
  //     chars = splitWords.chars;

  //     var splitTimeline = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top bottom-=100",
  //         end: "bottom top",
  //         toggleActions: "play none none none",
  //       }
  //     });
  //     splitTimeline.from(chars, {
  //         opacity:0,
  //         duration: 0.5,
  //         yPercent: 10,
  //         rotate:30,
  //         ease: "back.out",
  //         stagger: 0.02
  //     });
  // });

  ///////////////////////////////////////////


////////////////////////---------- Fixed section
var scrollUp = document.querySelector('.navbar');

////adds bg color when start scrolling
ScrollTrigger.create({
  id:'scrolling-down',
  start: 'top top-=50',
  end:'+=21000',
  toggleClass: {className: 'nav--scrolled', targets: scrollUp,},
});



/////////////////////////////text feature

// Rate = Distance over Time r=d/t
// If we want to define the rate, and 
// the distance is determined, 
// time will have to be variable

// We want to define the rate, and we can 
// define that statically
r = 50;
adjustJank = 4; // Set this to 0 to see the jank I'm talking about ... this just adds to the distance animated to smooth out the seam

// Get the initial scroll elements and save them for later
const scrollElems = document.querySelectorAll('.marquee-container p');

// Adjust our tween based on the object and distance given
function adjustTween(obj, d) {
  // Get the progress of the previous tween if it exists
  let progress = 0;
  if(obj.tween) {
    progress = obj.tween.progress();
    // Kill the previous tween
    obj.tween.kill();
  }
    
  // r = d/t 
  // r*t = d
  // t = d/r
  
  // Set the proper time
  var t = d/r;

  // Create a new tween to animate our text so that it loops
  // Make sure to save it to the object so we can refer to it later
  obj.tween = gsap.fromTo(obj.parentElement, {x: 0}, {
    duration: t,
    x: "-"+(d+adjustJank), 
    ease: 'linear',
    repeat: -1,
  }).progress(progress); // Set the progress of the new tween to the same value of
                         // the previous tween (if it exists) before it was killed
}

// Set up for what appears to be an seamless stream of text
// This could go in an init() function
scrollElems.forEach((obj, i) => {
  var d = obj.offsetWidth;
  var parent = obj.parentElement;
  var clone = obj.cloneNode(true);
  parent.appendChild(clone);
  gsap.set(parent.parentElement, {width: d});
  
  adjustTween(obj, d);
});

// Adjust widths and tweens on resize
window.addEventListener("resize", () => {
  scrollElems.forEach((obj, i) => {
    var d = obj.offsetWidth;
    var parent = obj.parentElement;
    gsap.set(parent.parentElement, {width: d});
    adjustTween(obj, d);
  });
});


// =============================
