console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);


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
// adds bg color when start scrolling

ScrollTrigger.create({
	trigger:'.content-wrap',
	id:'scrolling-down',
	start: 'top top-=50',
	end:'bottom top',
	toggleClass: {className: 'nav--scrolled', targets: scrollUp},
	onToggle: scrollTrigger => {
		scrollTrigger.refresh()
	  },
});




//////*THIS NEEDS TO GO FIRST OTHERWISE PINNING DOESNT WORK*//////
smoothScroll("#content-wrap");
////////////////////////////////////////////////////////////////


//// text around arch/////
gsap.to(".drawText",10,{attr:{startOffset:'105%'},repeat:-1, ease:'none'});


///////////
gsap.set(".circleText svg", { autoAlpha: 1 });
var circle = gsap.timeline({
	defaults: { ease: "none", duration: 4 },
	scrollTrigger:{
		trigger:'.circleWrap',
		start:'top center',
		markers:true
		// toggleActions: "play none none none",
	}
})

circle.from(
    ".circleText .text",
    {
      attr: { startOffset: "100%" }
    }
  )
  circle.from("#circle", {
    rotation: 360,
    transformOrigin: "center center",
    repeat: -1
  });


////////////////////////////////////////////////////////////////
//// moving arch background/////
gsap.timeline({repeat:-1, yoyo:true})
.to('#img', {
  attr:{x:-250,},
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


//////////////////////// SMOOTH SCROLL SETTINGS///////////////////////////
function smoothScroll(content, viewport, smoothness) {
	
	content = gsap.utils.toArray(content)[0];
	smoothness = smoothness ||1;

	gsap.set(viewport || content.parentNode, {overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0});
	gsap.set(content, {overflow: "visible", width: "100%"});

	let getProp = gsap.getProperty(content),
		setProp = gsap.quickSetter(content, "y", "px"),
		setScroll = ScrollTrigger.getScrollFunc(window),
		removeScroll = () => content.style.overflow = "visible",
		killScrub = trigger => {
			let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
			scrub && scrub.kill();
			trigger.animation.progress(trigger.progress);
		},
		height, isProxyScrolling;

	function refreshHeight() {
		height = content.clientHeight;
		content.style.overflow = "visible"
		document.body.style.height = height + "px";
    	return height - document.documentElement.clientHeight;
	}

	ScrollTrigger.addEventListener("refresh", () => {
		removeScroll();
		requestAnimationFrame(removeScroll);
	})
	
	ScrollTrigger.defaults({scroller: content});
	ScrollTrigger.prototype.update = p => p; 

	ScrollTrigger.scrollerProxy(content, {
		scrollTop(value) {
			if (arguments.length) {
				isProxyScrolling = true; 
				setProp(-value);
				setScroll(value);
				return;
			}
			return -getProp("y");
		},
		getBoundingClientRect() {
			return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
		}
	});

	return ScrollTrigger.create({
		animation: gsap.fromTo(content, {y:0}, {
			y: () => document.documentElement.clientHeight - height,
			ease: "none",
			onUpdate: ScrollTrigger.update
		}),
		scroller: window,
		invalidateOnRefresh: true,
		start: 0,
		end: refreshHeight,
    	refreshPriority: -999,
		scrub: smoothness,
		onUpdate: self => {
			if (isProxyScrolling) {
				killScrub(self);
				isProxyScrolling = false;
			}
		},
		onRefresh: killScrub 
	});
}

