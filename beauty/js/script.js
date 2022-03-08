console.clear();
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

ScrollTrigger.matchMedia({	
  // desktop
  "(min-width: 992px)": function() {
    // class for all drop down wrapper items
    let revealContainers = document.querySelectorAll(".reveal");
    // creates stagger for the 3 columns in the row
    let cols = 3;
    for (let i = 0; i < revealContainers.length; i += cols) {
      let containers = []
      for (let j = 0; j < cols; j++) {
        containers.push(revealContainers[i + j]);
      }    
      createTrigger(containers);
    }

    function createTrigger(containers) {     
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containers[0],
          start: "top center",
          markers: true,
          toggleActions: 'play none none reverse',
        }
      })        
      containers.forEach((container, i) => {
        let image = container.querySelector(".reveal div");
        
        let subTl = gsap.timeline()
          .from(image, {
            yPercent: -100,
            opacity:0,
            height:0
          });
        
        tl.add(subTl, i * 0.1);
      });    
    }   
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


