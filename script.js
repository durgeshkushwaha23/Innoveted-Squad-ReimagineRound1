function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function sliderAnimation() {
    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');

    let carouselDom = document.querySelector('.carousel');
    let SliderDom = carouselDom.querySelector('.carousel .list');
    let thumbnailBorderDom = document.querySelector('.carousel .listThumbnail');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    let timeDom = document.querySelector('.carousel .time');

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    let timeRunning = 2000;
    let timeAutoNext = 2000;


    nextDom.onclick = function () {
        showSlider('next');
    }

    prevDom.onclick = function () {
        showSlider('prev');
    }
    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
    function showSlider(type) {
        let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
        let thumbnailItemsDom = document.querySelectorAll('.carousel .listThumbnail .item');

        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            next.click();
        }, timeAutoNext)
    }
}

function navAnimation() {
    var tl = gsap.timeline({
        debugger: {
            // Show markers in the animation timeline
            showMarkers: true
        }
    })
    tl.from(".logo", {
        y: -30,
        duration: 1,
        opacity: 0
    })
    tl.from(".links h1", {
        x: 30,
        duration: 0.5,
        opacity: 0,
        stagger: {
            amount: 0.7
        }
    })


}

function loadingAnimation() {
    
    var tl = gsap.timeline()
    tl.from(".carousel", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from(".carousel", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })
    // tl.from(".main .page2, .main .page2", {
    //     opacity: 0,
    //     duration: 0.5,
    //     stagger: 0.2
    // })

}


// Shery.mouseFollower(.);
var slideAnimation=document.querySelector(".silderr")
// slideAnimation.addEventListener("mouseenter", function() {
//     var tl = gsap.timeline()
//     tl.from(".bsms", {
//         y: -30,
//         duration: 1,
//         opacity: 0
//     })
// })

var card=document.querySelector(".CardEvents")
card.addEventListener("mouseenter", function(){
    card.style.opacity = 1;
    var tl = gsap.timeline()
    
    tl.from(".CardEvents h2", {
        y: -40,
        // scale:0,
        // rotate: 360,
        duration: 1,
        opacity: 0
    })

    tl.from(".carddd", {
        scale:1.4,
        rotate: 360,
        duration: .8,
        opacity: 0,
        markers: true,
        start: "top 10%",
        end: "top 10%",        
    });

    tl.from(".cardinner",{
        markers:true,
        
    })

    tl.from(".carddd .carddwn", {
        // y: -0,
        scale:0,
        rotate: 360,
        duration: .8,
        opacity: 0,
        markers: true,
        start: "top 60%",
        end: "top 10%", 
    })
})

var card2=document.querySelector(".cardEvent2")

card2.addEventListener("mouseenter", function(){
    card2.style.opacity = 1;
    var tl = gsap.timeline()
    
    tl.from(".carddd", {
        // y: -40,
        scale:0,
        rotate: 360,
        duration: 1,
        opacity: 0,
        markers: true,
        start: "top 60%",
        end: "top 10%", 
    })
})

Shery.mouseFollower({});;

Shery.makeMagnet(".links h1" /* Element to target.*/, {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });


locomotiveAnimation();
navAnimation();
sliderAnimation();
