console.clear;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText,MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin);

ScrollTrigger.matchMedia({ 
  "(max-width: 1025px)": function() {
  $( ".slider" ).addClass( "touch" );
},

"(min-width: 1025px)": function() {

    ///// -------------Touch or non touch devices -------------------------/////
    var isTouch = !!("undefined" != typeof document.documentElement.ontouchstart);

    if(!isTouch) {
    console.log('non mobile')
      /////-- This is for non touch/desktop etc ---////// 

      ////----------------------slider
      $( ".slider" ).removeClass( "touch" )
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

    ////----------------------- end non touch----------------------- ////
    } else {
      ///-- This is for touch devices ---//////
      console.log('touch and mobile')
      ////---------------deactivate slider
      $( ".slider" ).addClass( "touch" );
    }

},

 "all": function() {
       ///////////////////site preloader////////////////////////
       var imgLoad = imagesLoaded('.wrapper');
       var progressBar = $(".c-preloader__progress"),
           count = $(".c-preloader__count"),
           images = $("img").length,
           loadedCount = 0,
           loadingProgress = 0,
           tlProgress = gsap.timeline();
        
       imgLoad.on( 'progress', function( instance, image ) {
           loadProgress();
       });
        
       function loadProgress(imgLoad, image) {
       
           loadedCount++;
         
           loadingProgress = (loadedCount/images);
           console.log(loadingProgress);
       
           gsap.to(tlProgress, 1, {progress:loadingProgress});
       }
       
       var tlProgress = gsap.timeline({
           paused: true,
           onUpdate: countPercent,
           onComplete: loadComplete
       });
        
       tlProgress
       // .to('html',{overflow:'hidden'},0)
         .to(progressBar, 1, {width:"100%"},0)      
         .to(count, 0.5, {autoAlpha:0},1)
   
       
       
       function countPercent() {
             var newPercent = (tlProgress.progress()*100).toFixed();
             count.text(newPercent + "%");
       }
   
   
   
       
       function loadComplete() {
         var splitTitle = new SplitText(".large.animate", { type: "words,chars" });
         var splitH1 = new SplitText(".heroAniText", { type: "words,chars" });
   
         title = splitTitle.chars;
         titleH1 = splitH1.chars;
   
         var tlEnd =  gsap.timeline({});
         tlEnd
   
        
           .from(title, {
             yPercent: 100,
             ease: "back.out",
             scale:0.1,
             stagger: 0.02
           },0)
       
           .to('.large.animate', {autoAlpha:1},0)
   
           .to('.intro.animate', {
             duration: 1,
             yPercent: 50,
             ease: "back.out",
             autoAlpha:1
           },">")
   
           .to(".large.animate", 0.5, {yPercent:-200, autoAlpha:0},'<2')
           .to(".c-preloader", 1, { yPercent:-100},'>-0.5')
           // .to('html',{overflow:'visible'},">")
           .from(titleH1, {
             opacity:0,
             duration:1,
             yPercent: 100,
             ease: "back.out",
             stagger: 0.02
           },'>-0.5')
   
        
       }
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
      endTrigger:".cta",
      end:'bottom top',
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

    // set image to center on masked images
    gsap.set('#horz-one-panning, #horz-two-panning', {	
      attr:{ x:'-50%' },
    })

    gsap.set('#heroLittle', {	
      attr:{ y:'-30%' },
    })

    let heroPan = gsap.timeline({repeat:-1, yoyo:true,}); 
    heroPan.to('.bg-img-hero', { backgroundPosition:'90% 100%', duration:15, ease:'none'})




   /////////////////////////////////////////////////////////////////////////////////////// 
  } // all end
});


