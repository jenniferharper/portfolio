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

    ///////////non mobile devices

    var isTouch = !!("undefined" != typeof document.documentElement.ontouchstart);
    if(!isTouch) {

      /////marquee text
      gsap.set(".marquee__inner", {xPercent: -50});  
      let marquee = gsap.timeline( {repeat: 100, yoyo: true} );
      marquee.to(".marquee__part p", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"});  
       
      let heroPan = gsap.timeline({repeat:-1, yoyo:true,}); 
      heroPan.to('.bg-img-hero', { backgroundPosition:'100% 100%', duration:10, ease:'none'})


       return function() {
         marquee.kill(); 
         gsap.set(".marquee__part p", {clearProps:"all"});  
         
         heroPan.kill(); 
         gsap.set(".bg-img-hero", {clearProps:"all"}); 
       };

       
    }  //touch end
  } // all end
});


/////////////////////////////text feature

// // Rate = Distance over Time r=d/t
// // If we want to define the rate, and 
// // the distance is determined, 
// // time will have to be variable

// // We want to define the rate, and we can 
// // define that statically
// r = 50;
// adjustJank = 4; // Set this to 0 to see the jank I'm talking about ... this just adds to the distance animated to smooth out the seam

// // Get the initial scroll elements and save them for later
// const scrollElems = document.querySelectorAll('.marquee-container p');

// // Adjust our tween based on the object and distance given
// function adjustTween(obj, d) {
//   // Get the progress of the previous tween if it exists
//   let progress = 0;
//   if(obj.tween) {
//     progress = obj.tween.progress();
//     // Kill the previous tween
//     obj.tween.kill();
//   }
    
//   // r = d/t 
//   // r*t = d
//   // t = d/r
  
//   // Set the proper time
//   var t = d/r;

//   // Create a new tween to animate our text so that it loops
//   // Make sure to save it to the object so we can refer to it later
//   obj.tween = gsap.fromTo(obj.parentElement, {x: 0}, {
//     duration: t,
//     x: "-"+(d+adjustJank), 
//     ease: 'linear',
//     repeat: -1,
//   }).progress(progress); // Set the progress of the new tween to the same value of
//                          // the previous tween (if it exists) before it was killed
// }

// // Set up for what appears to be an seamless stream of text
// // This could go in an init() function
// scrollElems.forEach((obj, i) => {
//   var d = obj.offsetWidth;
//   var parent = obj.parentElement;
//   var clone = obj.cloneNode(true);
//   parent.appendChild(clone);
//   gsap.set(parent.parentElement, {width: d});
  
//   adjustTween(obj, d);
// });

// // Adjust widths and tweens on resize
// window.addEventListener("resize", () => {
//   scrollElems.forEach((obj, i) => {
//     var d = obj.offsetWidth;
//     var parent = obj.parentElement;
//     gsap.set(parent.parentElement, {width: d});
//     adjustTween(obj, d);
//   });
// });