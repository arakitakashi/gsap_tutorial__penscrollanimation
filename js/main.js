gsap.registerPlugin(ScrollTrigger)

function getTopPartsHeight() {
  return document.querySelector('.pen-top').clientHeight - 22
}

function init(){
    
    // start here

    // move part 3 to cover 2
    gsap.set('.part3', {
      y: () => {
        return -(getTopPartsHeight())
      },
      scrollTrigger: {
        id: 'pen-body',
        trigger: '.part3',
        start: 'top bottom-=270px',
        end: `+=${getTopPartsHeight()}`,
        pin: true,
        pinSpacing: false,
      }
    })

    const partTopOffsets = [547, 722, 842]

    function fixPart(el, offset, index) {
      gsap.set(el, {y: -offset})

      gsap.to(el, { y: 0, ease: 'none', scrollTrigger: {
        trigger: '.pen-body', 
        start: 'top bottom-=640px',
        end: `+=${offset}`,
        scrub: true,
        markers: true
      }})
    }

    gsap.utils.toArray(['.part4', '.part5', '.part6']).forEach((part, index) => {

      fixPart(part, partTopOffsets[index], index)
      
    })

    // gsap.set('.part4', {y : '-547px'})
    // gsap.set('.part5', {y : '-722px'})
    // gsap.set('.part6', {y : '-842px'})

    // tween the tip of the pen back to 0

    const allParts = gsap.utils.toArray('.part')
    allParts.forEach((part, index) => {

      let startPosition = 'top center'

      if(index === 2) {
        startPosition = `top+=${getTopPartsHeight()} center`    
      }

      gsap.set(part, {
        scrollTrigger: {
          id: `${part.getAttribute('class')}`,
          trigger: part,
          start: startPosition,
          toggleClass: 'fade-in',
          markers: true
        }
      }
      )
})
}

window.addEventListener('load', function(){
    init();
});
