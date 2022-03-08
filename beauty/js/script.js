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
    /////////////////hero arrows /////////////////////////
    gsap.set(".arrow-wrap path",{
      stroke:'#f1353d',
      strokeWidth:5,
      fill:'none',
      strokeLinecap:'round',
      strokeMiterlimit:10
    })

    let arrows = gsap.timeline({
      scrollTrigger:{
        trigger:'.bottle',
        start:'top bottom',
      }
    })

    arrows.from('.stem', {
      drawSVG: '0% 0%',
      ease: "none",
      opacity:0,
      duration:1,
      stagger:0.7
    },0);

    arrows.from('.cap', {
      drawSVG: '50% 50%',
      ease: "none",
      opacity:0,
      duration:0.5,
      stagger:0.7
    },0.8);
    //////////////////////////////////////////

  }	
}); 


