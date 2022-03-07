console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);

//////////////////////////------------ Setup
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

///////////////////

const bar = Scrollbar.init(document.querySelector('#my-scrollbar'));
bar.containerEl.querySelectorAll("a[href*='#']").forEach(el => {
  el.addEventListener("click", () => {
    bar.scrollIntoView(document.getElementById(el.getAttribute("href").substring(1)))
  })
})
//////////////////////////------------ Setup





////////////////////////---------- Navigation
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
////////////////////////---------- Navigation END




//// ////----------------highlight paragraph text
gsap.utils.toArray('.text-highlight').forEach((section, i) => { 
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse',
    },
    backgroundSize:'100% 100%',
    duration: 0.5,
  });
})


////////////////////////---------- Fixed section
ScrollTrigger.create({
    trigger: '.fixed',
    pin: '.fixed .content',
    start: 'top top',
    end:'bottom bottom',
    scrub:true, 
})


////////////////////////---------- image entrance animation
gsap.utils.toArray('.scale img').forEach((section, i) => { 
  gsap.from(section, {
  scale:.75,
  rotate:'-15',
  y:100,
  ease: Sine.easeOut,
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      toggleActions: 'play reverse play reverse',    
    }
  }); 
})

gsap.utils.toArray('.scale-other img').forEach((section, i) => { 
  gsap.from(section, {
    scale:.75,
    rotate:'15',
    y:100,
    ease: Sine.easeOut,
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      toggleActions: 'play reverse play reverse',    
    }
  }); 
})


////////////////////////---------- background color change for menu sections

gsap.utils.toArray('.bg-trig').forEach((section, i) => {  
  var bgColor = section.dataset.color;
  gsap.to('.fixed .bg', {
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom center',
      toggleActions: 'play reset play reset',
      scrub:true
    },
    ease: Sine.easeInOut,
    immediateRender: false,
    backgroundColor: bgColor,
    duration: 0.5,
  });  
});


////////////////////////---------- pink background menu when scrolled past


gsap.utils.toArray('.bg-trig').forEach((section, i) => {  
  const active = $(".fixed a[href$='"+$(section).attr('id')+"']");

  let thing = gsap.timeline({
    scrollTrigger:{
      trigger: section,
      start: "top center",
      toggleActions: 'play none none reverse',
    }
  })

  thing.to(active,{  backgroundSize:'100% 100%', ease:'none', duration:0.5})
});









///////////////image rotation//////////////////

var imagesSt = $('.start img'), 
    duration = 0.3, 
    timelineSt = new TimelineMax({repeat:-1});  

gsap.set(imagesSt, {visibility:"hidden"});
timelineSt
.staggerTo(imagesSt, 0, {visibility:"visible", immediateRender:false}, duration)
.staggerTo(imagesSt, 0, {visibility:"hidden", immediateRender:false}, duration, duration)


var imagesEd = $('.end img'), 
    duration = 0.3, 
    timelineEd = new TimelineMax({repeat:-1});  

gsap.set(imagesEd, {visibility:"hidden"});
timelineEd
.staggerTo(imagesEd, 0, {visibility:"visible", immediateRender:false}, duration)
.staggerTo(imagesEd, 0, {visibility:"hidden", immediateRender:false}, duration, duration)



////////////////////////////////////////////////////////////////////////
if (document.querySelector('.gsap-marker-scroller-start')) {		
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');	
  bodyScrollBar.addListener(({ offset }) => {  
  gsap.set(markers, { marginTop: -offset.y })
  });
  console.log('true')
}





