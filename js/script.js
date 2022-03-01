console.clear();
gsap.registerPlugin(ScrollTrigger);
	
const sections = document.querySelectorAll('.zoom');
sections.forEach((section, index) => {
  gsap.from(section, {
  width:'200%',
  height:'200%', 
  transformOrigin:"50% 50%",
  ease:Power1.easeInOut,
  duration:2,
  scrollTrigger: {
      trigger: section,
      start: 'top bottom-=200',
      toggleActions: 'play none none none',
  }
  });  
})


//////////////////educapss/////////////////////////
var lama = gsap.timeline({	
	repeat:-1, 	repeatDelay:3,	
	scrollTrigger: {trigger:'#educapps',start: 'top center',}
})

lama.from(".ear", {svgOrigin:"46 73", rotate:-45, ease: "power1.inOut", duration:1,},0)
.to(".noise", {scale:1.5, ease: "power1.inOut", duration:1,},0)
.to(".noise", {scale:1, ease: "power1.inOut", duration:1,},1)
.from(".head", {rotate:-5, transformOrigin:"-20% 100%",ease: "power1.inOut", duration:1,},1)

.to(".ear", {svgOrigin:"46 73", rotate:-45, ease: "power1.inOut", duration:1,},1)



