console.clear();
gsap.registerPlugin(ScrollTrigger, SplitText);

ScrollTrigger.matchMedia({ 
  "all": function() {
    nav();
    function nav(){
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
    }

    hero()
    function hero(){
      var split = new SplitText(".animate-heading", {type:"chars,words,lines", charsClass: "heroSplit"});
      chars = split.chars; 
        
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: "top bottom-=100",
          end: "bottom top",
          toggleActions: "play none none none",
        }
      });

      tl.from(chars,{
        opacity:0,
        scaleX:0,
        xPercent: '-200',
        stagger: 0.08,
        ease:Back.easeOut,
        color:'#e9e4de'
      });  
    }

    zoom()
    function zoom(){
      gsap.set('.zoom', {scale:2, transformOrigin:'50% 50%'},0);
      const section = document.querySelectorAll('.zoom');

       section.forEach((section, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=200',
            toggleActions: 'play none none none',
          }
        });

        tl
        .to(section,2, {scale:1, ease:Power1.easeInOut,})


        ScrollTrigger.create({
          trigger: section,
          id: index+1,
          start: 'top center',
          toggleActions: 'play none none reverse',
          animation:tl,
        })    
      })
    }

    educapps();
    function educapps(){
      var tl = gsap.timeline({	
        repeat:-1, 	
        repeatDelay:3,	
        scrollTrigger: {
          trigger:'#educapps',
          start: 'top center'
        }
      }) 
      tl
      .from(".ear", {svgOrigin:"46 73", rotate:-45, ease: "power1.inOut", duration:1,},0)
      .to(".noise", {scale:1.5, ease: "power1.inOut", duration:1,},0)
      .to(".noise", {scale:1, ease: "power1.inOut", duration:1,},1)
      .from(".head", {rotate:-5, transformOrigin:"-20% 100%",ease: "power1.inOut", duration:1,},1)    
      .to(".ear", {svgOrigin:"46 73", rotate:-45, ease: "power1.inOut", duration:1,},1)
    }   
   
    rotateBtn();
    function rotateBtn(){
      gsap.to(".asterisk",8,{rotate:360,repeat:-1, ease:'none', transformOrigin:'center'});
    }

    headings();
    function headings(){
      var text = gsap.utils.toArray("h2");
      text.forEach((el) => {
        var splitWords = new SplitText(el, {type: "words,chars", charsClass: "headingSplit"});
        chars = splitWords.chars;

        var splitTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            toggleActions: "play none none none",
          }
        });

        splitTimeline.from(chars,1,{
          opacity:0,
          scaleX:0,
          rotate:'-20',
          yPercent: '100',
          stagger: 0.05,
          ease:Back.easeOut,
          color:'#e9e4de',
        
        });       
      });
    }
  }	
}); 









