console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);




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
gsap.timeline({repeat:-1, yoyo:true})
.to('#hero-panning', {
  objectPosition:'90% 0',
  duration:10, ease:'none',
  repeat:1, yoyo:true
},0)

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
  var text = gsap.utils.toArray(".aniText");
  text.forEach((el) => {
      var splitWords = new SplitText(el, {type: "words,chars"});
      chars = splitWords.chars;

      var splitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=100",
          end: "bottom top",
          toggleActions: "play none none none",
        }
      });
      splitTimeline.from(chars, {
          opacity:0,
          duration: 0.5,
          yPercent: 100,
          ease: "back.out",
          stagger: 0.05
      });
  });

  ///////////////////////////////////////////


////////////////////////---------- Fixed section
ScrollTrigger.create({
  trigger: '.fixed',
  pin: '.fixed-scroll .nav-fix',
  start: 'top top',
  end:'+=21000',

})



var scrollUp = document.querySelector('.navbar');

////adds bg color when start scrolling
ScrollTrigger.create({
  id:'scrolling-down',
  start: 'top top-=50',
  end:'+=21000',
  toggleClass: {className: 'nav--scrolled', targets: scrollUp,},
});



///////////////////marquee
var element = $('.marquee__inner p');
for (var i = 0; i < 3; i++) {
    element.parent().append(element.clone());
}

var element = $('.marquee__inner-other p');
for (var i = 0; i < 3; i++) {
    element.parent().append(element.clone());
}


/////////////////////////////text feature

