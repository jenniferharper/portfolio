console.clear();
gsap.registerPlugin(ScrollTrigger, SplitText);


ScrollTrigger.matchMedia({	
  // desktop
  "(min-width: 1024px)": function() { 
   
  },
	
  // all 
  "all": function() {
    // //background image amination
    gsap.set('.zoom', {scale:2, transformOrigin:'50% 50%'},0);	
    const sections = document.querySelectorAll('.zoom');

    sections.forEach((section, index) => {
      gsap.to(section, {
        scale:1,
        ease:Power1.easeInOut,
        duration:1,
        scrollTrigger: {
            trigger: section,
            start: 'top bottom-=200',
            toggleActions: 'play none none none',
        }
      });  
    });

    //////////////////educapss/////////////////////////
    var lama = gsap.timeline({	
      repeat:-1, 	repeatDelay:3,	
      scrollTrigger: {trigger:'#educapps',start: 'top center',}
    })    
    lama
    .from(".ear", {svgOrigin:"46 73", rotate:-45, ease: "power1.inOut", duration:1,},0)
    .to(".noise", {scale:1.5, ease: "power1.inOut", duration:1,},0)
    .to(".noise", {scale:1, ease: "power1.inOut", duration:1,},1)
    .from(".head", {rotate:-5, transformOrigin:"-20% 100%",ease: "power1.inOut", duration:1,},1)    
    .to(".ear", {svgOrigin:"46 73", rotate:-45, ease: "power1.inOut", duration:1,},1)   
    //////////////////educapss/////////////////////////
  }	
}); 

gsap.to(".asterisk",10,{rotate:360,repeat:-1, ease:'none', transformOrigin:'center'});
gsap.to(".rotate-svg-text",10,{rotate:-360,repeat:-1, ease:'none', transformOrigin:'center'});



    ////// headings animation
    var text = gsap.utils.toArray(".animate-heading");

    

    text.forEach((el) => {

        var splitWords = new SplitText(el, {type: "words,chars", charsClass: "special"});
        chars = splitWords.chars;

        var splitTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100",
            end: "bottom top",
            toggleActions: "play none none none",
          }
        });

        splitTimeline.from('.special',{
          opacity:0,
          scaleX:0,
          xPercent: '-200',
          stagger: 0.08,
          ease:Back.easeOut,
          color:'#e9e4de'
        });
       
    });


    // const feature = document.querySelector(".feature .row");
    // const featureImg = document.querySelector(".feature .animate-img");
    // const featurePrem = document.querySelector(".feature .preamble");

    // var featureTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger:feature,
    //     start: "top top",
    //     end: "bottom center",
    //     toggleActions: "play none none none",
    //     scrub:true,
    //     pin:true,
    //     onLeave: () => gsap.to(featurePrem, {yPercent:-50,ease:Back.easeOut}), 
    //   }
    // });

    // featureTl
    // .from(featureImg,{scale:0.4, yPercent:'10'},0)
    // .to(featurePrem,{ yPercent:'10',ease:Back.easeOut},0)
