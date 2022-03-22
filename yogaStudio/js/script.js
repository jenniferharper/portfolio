console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);




// gsap.to()... infinity and beyond!
// For more check out greensock.com// record the initial inline CSS for these elements so that ScrollTrigger can revert them even if animations add inline styles later
// ScrollTrigger.saveStyles(".marquee__inner, .marquee__inner p");
 // if you put this INSIDE one of the functions, it'll only revert the recorded elements when that media query no longer matches. You can use ScrollTrigger.saveStyles() in multiple places.

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
          chars = splitWords.chars;

          var splitTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=100",
              end: "bottom top",
              toggleActions: "play none none none",
              // markers:true
            }
          });
          splitTimeline.from(chars, {
            opacity:0,
            yPercent: 100,
            ease: "back.out",
            stagger: 0.02
          });
      });


    //// text around arch/////
    gsap.to(".drawText",10,{attr:{startOffset:'105%'},repeat:-1, ease:'none'});

    //// set image to center on masked images
    gsap.set('#about-panning, #horz-one-panning, #horz-two-panning', {	
      attr:{ x:'-50%' },
    })

    let heroPan = gsap.timeline({repeat:-1, yoyo:true,}); 
    heroPan.to('.bg-img-hero', { backgroundPosition:'90% 100%', duration:15, ease:'none'})


    ///// -------------Touch or non touch devices -------------------------/////
    var isTouch = !!("undefined" != typeof document.documentElement.ontouchstart);

    if(!isTouch) {
    /////-- Non touch ---//////
    $( ".slider" ).removeClass( "touch" )
      console.log('non tablet/mobile')
      ///marquee text
      var element = $('.marquee__part p');
      for (var i = 0; i < 3; i++) {
          element.parent().append(element.clone());
      }
      gsap.set(".marquee__inner", {xPercent: -50}); 

      var mrq = gsap.utils.toArray(".marquee__part p");
      let marquee = gsap.timeline( {repeat: 100, yoyo: true} );
      marquee.to(mrq, {xPercent: -100, repeat: -1, duration: 10, ease: "linear"});  


      ////////// slider
      var container = $('.slider .wrapper');
      var boxes = document.querySelectorAll('.section');

      let tlSlider = gsap.timeline({
        scrollTrigger: {
          trigger: ".slider",
          start: "center center",
          end: function(){  
            return "+=" + container[0].scrollWidth;
          },
          scrub: 1,
          pin: true,
          toggleClass: "is-active",
          refreshPriority: 1,
          // markers:true
          ease:'none'
        }
      });

      refresher();
      function refresher(){
        tlSlider.kill(); 
        gsap.set(boxes, {clearProps:"all"}); 
        tlSlider.clear();
        tlSlider.to(boxes, {	
          x: function(){  
          return -(container[0].scrollWidth - document.documentElement.clientWidth) + "px";
          },
        });
      };

      var windowWidth = $(window).width();
      $(window).resize(function(){	
        if ($(window).width() != windowWidth) {
        windowWidth = $(window).width();
        refresher();	
        }
      });

    } else {

    console.log('tablet/mobile')
    $( ".slider" ).addClass( "touch" )

    ///-- Touch ---//////

    ///marquee text
    var element = $('.marquee__part p');
      for (var i = 0; i < 2; i++) {
          element.parent().append(element.clone());
      }  

      gsap.set(".marquee__inner", {xPercent: -25}); 
      const sections = document.querySelectorAll('.marquee__part p');
      sections.forEach((section) => {
        gsap.to(section, {
          xPercent: -25, 
          duration: 5, 
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            scrub:0.5,
          }
        }); 
      })
    }

    ////// horizontal slider


        // gsap.from('.slider .section .content', {
        //   height:0, 
        //   // stagger:0.05,
        //   ease: "none",
        //   scrollTrigger: {
        //     trigger: '.slider',
        //     start: "top bottom",
        //     // scrub:0.5
        //   }
        // }); 


    /////////////////////////////////////////////////////////////////////////////////////// 
  } // all end
});

