console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);

ScrollTrigger.matchMedia({  
//tablet/mobile
 "(max-width: 1023px)": function() {

},
"(min-width: 1024px)": function() {

 
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

    /////////////////////////////marquee text feature
    r = 100;
    adjustJank = 4;
    const scrollElems = document.querySelectorAll('.marquee-container p');

    function adjustTween(obj, d) {
      // Get the progress of the previous tween if it exists
      let progress = 0;
      if(obj.tween) {
        progress = obj.tween.progress();
        // Kill the previous tween
        obj.tween.kill();
      }

      var t = d/r;
      obj.tween = gsap.fromTo(obj.parentElement, {x: 0}, {
        duration: t,
        x: "-"+(d+adjustJank), 
        ease: 'linear',
        repeat: -1,
      }).progress(progress); 
      // Set the progress of the new tween to the same value of
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

  }	
});


// var isMobile = window.matchMedia("only screen and (max-width: 760px)"),
// var isTouch = !!("undefined" != typeof document.documentElement.ontouchstart);
// if(isTouch) {
//         // things i want on mobile only
//         alert("has touch support");
// } else {
//     // things i want on desk only
//     console.log("no touch support");
// }






