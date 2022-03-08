console.clear();
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

ScrollTrigger.matchMedia({	
  // desktop
  "(min-width: 1024px)": function() { 
   
  },
	
  // all 
  "all": function() {
    // //background image amination
    gsap.set('.zoom', {scale:1.5, transformOrigin:'50% 50%'},0);	
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
    })
    //////////////////////////////////////////

    let arrow = gsap.timeline({
    });

    arrow.from(".arrow-wrap .stem", {
      drawSVG: '0% 0%',
      ease: "none",
      opacity:0,
      duration:1,
    },1);

   arrow.from(".arrow-wrap .cap", {
      drawSVG: '50% 50%',
      ease: "none",
      opacity:0,
      duration:1,
    },1.5);




  //////////////////////////////////////////






  }	
}); 


