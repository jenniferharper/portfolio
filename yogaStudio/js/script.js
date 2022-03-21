console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);


var element = $('.marquee__part p');
for (var i = 0; i < 3; i++) {
    element.parent().append(element.clone());
}




// gsap.to()... infinity and beyond!
// For more check out greensock.com// record the initial inline CSS for these elements so that ScrollTrigger can revert them even if animations add inline styles later
ScrollTrigger.saveStyles(".marquee__inner, .marquee__inner p"); // if you put this INSIDE one of the functions, it'll only revert the recorded elements when that media query no longer matches. You can use ScrollTrigger.saveStyles() in multiple places.

ScrollTrigger.matchMedia({ 

  "(min-width: 1336px)": function() {

  },

 "all": function() {
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

    ////adds bg color when start scrolling
    var scrollUp = document.querySelector('.navbar');
    ScrollTrigger.create({
      id:'scrolling-down',
        toggleClass: {className: 'nav--scrolled', targets: scrollUp,},
    });

    //// background image pan hero
    gsap.timeline({
      repeat:-1, yoyo:true,
    })
    .to('.bg-img-hero', {
      backgroundPosition:'100% 100%',
      duration:10, ease:'none',
    },0)


    ////// headings animation
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
              duration: 1,
              yPercent: 100,
              ease: "back.out",
              stagger: 0.02
          });
      });


    ////// text around arch/////
    gsap.to(".drawText",10,{attr:{startOffset:'105%'},repeat:-1, ease:'none'});

    //// set image to center on masked images
    gsap.set('#about-panning, #horz-one-panning, #horz-two-panning', {	
      attr:{ x:'-50%' },
    })

    ////horizonl scroll section////
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


    var isTouch = !!("undefined" != typeof document.documentElement.ontouchstart);
    if(!isTouch) {
      gsap.set(".marquee__inner", {xPercent: -50});    
    
      // other animations that aren't ScrollTrigger-related...
       let tl = gsap.timeline( {repeat: 100, yoyo: true} );
       tl.to(".marquee__part p", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"});
       // THIS IS THE KEY! Return a function that'll get called when the breakpoint no longer matches so we can kill() the animation (or whatever)
       return function() {
         tl.kill(); 
         gsap.set(".marquee__part p", {clearProps:"all"});      
         // other cleanup code can go here. 
       };
    }  
  }
});


///////////////////marquee
