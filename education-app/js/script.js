console.clear();

gsap.registerPlugin(Draggable, InertiaPlugin,ScrollTrigger, SplitText);

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

//////scroll change nav/////
var scrollUp = document.querySelector('.navbar');

// adds bg color when start scrolling
ScrollTrigger.create({
	id:'scrolling-down',
	start: 'top top-=50',
	toggleClass: {className: 'nav--scrolled', targets: scrollUp,
	}
});


ScrollTrigger.create({
	start: 'top top-=50',
	toggleClass: {className: 'nav--up', targets: scrollUp},
	onUpdate: ({direction}) => {
		if (direction == -1) {
		scrollUp.classList.remove('nav--up');
		} else {
		scrollUp.classList.add('nav--up');
	}}
});


ScrollTrigger.matchMedia({
	"(min-width: 993px)": function() {
		const delSections = document.querySelectorAll(".change");
		delSections.forEach((section, index) => {			
			ScrollTrigger.create({
				id: index+1,
				trigger: section,
				start: "top top",
				end:'bottom top',
				toggleActions: 'play none none reverse',
				onEnter: () => gsap.to('.logo-icon', {fill:'#0A004B'}), 
				onLeave: () => gsap.to('.logo-icon', {fill:'#f5f1ea'}), 
				onLeaveBack: () => gsap.to('.logo-icon', {fill:'#f5f1ea'}), 
				onEnterBack: () => gsap.to('.logo-icon', {fill:'#f5f1ea'}),
			});

		});
	}
});
//---------- Navigation ends 
/////---------- 576px Media Queries

if($(window).width() > 576){
	// //show or hide button on scroll direction
	var scrollUp1 = document.querySelector('.fixedBtn');
	
	ScrollTrigger.create({
	start: 'top top',	
	onUpdate: ({direction}) => {
		if (direction == 1) {
		scrollUp1.classList.remove('jwpnavbar--scrolled');
		} else {
		scrollUp1.classList.add('jwpnavbar--scrolled');
		}
	}
	});

	////transition to sit above footer at end of page
	gsap.to(".fixedBtn", {
		y:-40,
		 scrollTrigger: {
			trigger: '.right circle',
			start: 'top bottom+=100',
			toggleActions: 'play none none reverse',  
		}
	});

	gsap.from(".fixedBtn", {
		id:"fixed",
		opacity:0,
		 scrollTrigger: {
			trigger: '.services',
			start: 'top bottom',
			toggleActions: 'play none none reverse',  
		}
	});
} // //media queries ends


// split text titles

var splitWords = new SplitText('.aniText', {type: "words,chars"});
chars = splitWords.words;
  var splitTimeline = gsap.timeline({ });
  splitTimeline.from(chars, {
	 delay:0.2,
    opacity: 0,
    yPercent: 180,
    duration: 0.8,
    ease: 'Power3.easeOut',
    stagger: 0.2,
    transform: "rotate3d(1,-.3,0,90deg)",
	stagger:0.2,
  });



//////All titiles title animation
gsap.utils.toArray('.animate-title').forEach(section => {
	gsap.from(section, {
		skewX:-25,
		scale:.5,
		opacity:0,
		yPercent:100,
		duration:1,
		ease:Back.easeOut,
		scrollTrigger: {
		trigger: section,
		start: 'top bottom',
		toggleActions: 'play none none none',
		}
	});
});


// ////hero circle animation
gsap.from('.animate-sm',{
	y:-60,
	scale:2,
	transformOrigin:"50% 50%",
	ease: 'none',
	duration:1,
});


///// about section circle animation
gsap.from('.animate-bg.other',{
	x:-60,
	scale:1.1,
	transformOrigin:"50% 50%",
	duration:1,
	scrollTrigger: {
		trigger: '.animate-bg.other',
		start: 'top center+=100',
		toggleActions: 'play none none reverse',  
	}
});






/// //SVG illustrations animation
///////////eye/////////////////
var blink = gsap.timeline({	
	repeat:-1, 	repeatDelay:5,	
	scrollTrigger: {trigger:'#services',start: 'top center',}
})
blink.to(".blink", {delay:2,scaleY:-1,y:20,	transformOrigin:"100% 100%",ease: "power1.inOut",duration:0.1,})
.to(".blink", {	scaleY:1,y:'+=-20',transformOrigin:"100% 100%",ease: "power1.inOut",duration:0.1,})

///////////lama/////////////////
var lama = gsap.timeline({	
	repeat:-1, 	repeatDelay:3,	
	scrollTrigger: {trigger:'#educapps',start: 'top center',}
})

lama.from(".ear", {svgOrigin:"46 73", rotate:-45, ease: "power1.inOut", duration:1,},0)
.to(".noise", {scale:1.5, ease: "power1.inOut", duration:1,},0)
.to(".noise", {scale:1, ease: "power1.inOut", duration:1,},1)
.from(".head", {rotate:-5, transformOrigin:"-20% 100%",ease: "power1.inOut", duration:1,},1)
.to(".ear", {svgOrigin:"46 73", rotate:-45, ease: "power1.inOut", duration:1,},1)

///////////butterfly//////

var wings = gsap.timeline({	
	repeat:-1, 	repeatDelay:4,	
	scrollTrigger: {trigger:'#services',start: 'top center',}
})
wings.from(".wings", {fill:'#F59688', ease: "power1.inOut", duration:1,},0)
.from(".dot", {transformOrigin:'71% 38%', scale:0.5,  ease: "power1.inOut", duration:1,},0)
.to(".dot", {transformOrigin:'71% 38%', scale:0.5, fill:'#8F3083', ease: "power1.inOut", duration:1,},1)
.to(".wings", {fill:'#F59688', ease: "power1.inOut", duration:1,},1)

///////////////illustration animation ends//////////////////

///////////////////////////////////////////
//vertical tab feature///////
let vertTab = gsap.timeline({
	scrollTrigger: {
		trigger:'.services',
		start: 'top center',
		end:'bottom center+=100',
		scrub:1,  
		toggleActions: 'play reverse play reverse',  
	}
}); 

function verticalTab() {
	var box = document.querySelector('.services .community');
	let height = box.clientHeight;
	var text = document.querySelector('.vert-text span');
	let widthX = text.clientHeight;
	gsap.set(".vert-text span", {clearProps:"all"});  
	vertTab.clear();
	vertTab.to(".vert-text span", {y:height - widthX});
}


//////////////////////////////////////////////testimonial slider

//////////////////////responsive height calculations
findHeight();
// .slide-content is inside absolute container (.slide).
//So, find the tallest .slide-content column, set all columns to that height

function findHeight() {
	var textHeight = $('.slide-content').map(function() {
	return $(this).height();}).get();	  
	var maxHeight = Math.max.apply(null, textHeight);
  	gsap.set('.wrapper-container', { height: maxHeight })
	ScrollTrigger.refresh();
}

gsap.set('.new .row', { className: "row js-works"})


///////////////////////// Slider settings
var slideDuration = 1;
var slides = document.querySelectorAll(".slide");
var prevButton = document.querySelector("#nextButton");
var nextButton = document.querySelector("#prevButton");
var numSlides = slides.length;

for (var i = 0; i < numSlides; i++) {
  gsap.set(slides[i], {
    xPercent: i * 100 
  });
}


// change 0 to adjust slide auto speed
var timer = gsap.delayedCall(0,autoPlay);
var animation = gsap.to(slides, {
  duration: 1, 
  xPercent: "+=" + (numSlides * 100),
  ease: "none",
  paused: true,
  repeat: -1,
  modifiers: {
    xPercent: gsap.utils.wrap(-100, (numSlides - 1) * 100)
  }
});


var proxy = document.createElement("div");
gsap.set(proxy, { x: 0 });
var slideAnimation = gsap.to({}, {duration: 0.1});
var slideWidth = 0;
var wrapWidth = 0;
resizeSlider();

var draggable = new Draggable(proxy, {
  trigger: ".slides-container",
  throwProps: true,
  onPress: updateDraggable,
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  snap: {     
    x: gsap.utils.snap(slideWidth)
  }
});


// window.addEventListener("resize", resizeSlider);
prevButton.addEventListener("click", function() {
  animateSlides(1);
});

nextButton.addEventListener("click", function() {
  animateSlides(-1);
});

function updateDraggable() {
  timer.restart(true);
  slideAnimation.kill();
  this.update();
}

function animateSlides(direction) {
  timer.restart(true);
  slideAnimation.kill();

  var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
  
  slideAnimation = gsap.to(proxy, {
    duration: slideDuration,
    x: x,
    onUpdate: updateProgress
  });  
}

function autoPlay() {  
  if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
   timer.restart(true);
  } else {
    animateSlides(-1);
  }
}

function updateProgress() {  
  animation.progress(gsap.utils.wrap(0, 1, gsap.getProperty(proxy, "x") / wrapWidth));
}

function resizeSlider() {
  var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
  
  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;
  
  gsap.set(proxy, {
    x: norm * wrapWidth
  });
  
  animateSlides(0);
  slideAnimation.progress(1);
}

function snapX(x) {
  return Math.round(x / slideWidth) * slideWidth;
}


/////////////////media queries and animation refresh////////////////////
window.addEventListener('load', (event) => {
	verticalTab();
	findHeight();
});


var windowWidth = $(window).width();
$(window).resize(function(){	
	if ($(window).width() != windowWidth) {
	windowWidth = $(window).width();
	findHeight();
	verticalTab();
	}
});

$( window ).on( "orientationchange", function( event ) {
	findHeight();
});


	


