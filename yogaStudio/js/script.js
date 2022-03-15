console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);

// Setup
const scroller = document.querySelector('.scroller');
const bodyScrollBar = Scrollbar.init(scroller, { 
  damping: 0.05, 
  delegateTo: document, 
  alwaysShowTracks: true,

});

ScrollTrigger.scrollerProxy(".scroller", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  }
});

bodyScrollBar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: scroller });




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

var scrollUp = document.querySelector('.navbar');
// // adds bg color when start scrolling
ScrollTrigger.create({
	trigger:'.hero',
	id:'scrolling-down',
	start: 'top top',
  endTrigger:'footer',
	end:'bottom top',
	toggleClass: {className: 'nav--scrolled', targets: scrollUp},
	onToggle: scrollTrigger => {
		scrollTrigger.refresh()
	  },
});






//// text around arch/////
gsap.to(".drawText",10,{attr:{startOffset:'105%'},repeat:-1, ease:'none'});


///////////
// gsap.set(".circleText svg", { autoAlpha: 1 });
// var circle = gsap.timeline({
// 	defaults: { ease: "none", duration: 4 },
// 	scrollTrigger:{
// 		trigger:'.circleWrap',
// 		start:'top bottom',
// 		//markers:true
// 		// toggleActions: "play none none none",
// 	}
// })

// circle.from(
//     ".circleText .text",
//     {
//       attr: { startOffset: "100%" }
//     }
//   )
//   circle.from("#circle", {
//     rotation: 360,
//     transformOrigin: "center center",
//     repeat: -1
//   });


////////////////////////////////////////////////////////////////
// moving arch background/////
gsap.timeline({repeat:-1, yoyo:true})
.to('#panning', {
  objectPosition:'80% 0',
  duration:10, ease:'power1.inOut',
  repeat:1, yoyo:true
},0)


// horizontal scroll arch

gsap.set('#img2', {	attr:{x:-300}})


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
    //   anticipatePin: 1,
      scrub: true,
    }
  });

});	



// split text titles
  var text = gsap.utils.toArray(".aniText");
  text.forEach((el) => {  
	  
  var splitWords = new SplitText(el, {type: "words,chars"});
  chars = splitWords.words;
  
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
		duration: 0.8,
		yPercent: 100,
		ease: "back.out",
		stagger: 0.05
	});
  });

  ///////////////////////////////////////////






///////////////////marquee
var element = $('.marquee__part p');
for (var i = 0; i < 3; i++) {
    element.parent().append(element.clone());
}

gsap.to(".marquee__part p", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"}).totalProgress(0.5);
gsap.set(".marquee__inner", {xPercent: -50});

/////////////////////////////text feature


// Only necessary to correct marker position - not needed in production


if (document.querySelector('.gsap-marker-scroller-start')) {		
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');	

  bodyScrollBar.addListener(({ offset }) => {  
    gsap.set(markers, { marginTop: -offset.y })
  });

  console.log('true')
}