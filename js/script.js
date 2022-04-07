console.clear();
gsap.registerPlugin(ScrollTrigger);

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



