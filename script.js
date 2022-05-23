let slides = document.querySelectorAll('.slider-item');
let slider = [];
let prevBtn = document.querySelector('.arrow__prev');
let nextBtn = document.querySelector('.arrow__next');
let dotContainer = document.querySelector('.dots');
let imgWidth = document.querySelector('.slider').offsetWidth;
let currentSlide = 0;
let activeSlides = [];
let dots;
let offset = 0;

function init() {
    for (let i = 0; i < slides.length; i++) {
        slider[i] = slides[i].src;
        slides[i].remove();
    }
    let sliderTrack = document.createElement('div');
    sliderTrack.classList.add('slider-track');
    document.querySelector('.slider').append(sliderTrack);
    let currentImg = document.createElement('img');
    currentImg.src = slider[currentSlide];
    currentImg.classList.add('slider-item');
    sliderTrack.append(currentImg);
    createDots();
    dots = document.querySelectorAll('.dot');
    dots[currentSlide].classList.add('dot-active');
};
function createDots() {
    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dotContainer.append(dot);
        document.querySelector('.dots').lastChild.setAttribute('data-item', [i]);      
    }
};
function clearDots() {
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('dot-active');
    }
};

function showNextSlide() {
    nextBtn.removeEventListener('click', showNextSlide);
    currentSlide == (slider.length - 1) ? currentSlide = 0 : currentSlide++;
    let nextImg = document.createElement('img');
    nextImg.src = slider[currentSlide];
    nextImg.classList.add('slider-item');
    document.querySelector('.slider-track').append(nextImg);
    document.querySelector('.slider-track').style.transition = 'all 0.3s ease';
    document.querySelector('.slider-track').style.transform = 'translateX(' + -imgWidth + 'px)';
    activeSlides = document.querySelectorAll('.slider-item');
    clearDots();
    setTimeout(function() {
        activeSlides[0].remove();
        document.querySelector('.slider-track').style.transition = 'none';
        document.querySelector('.slider-track').style.transform = 'translateX(0px)';
        dots[currentSlide].classList.add('dot-active');
        nextBtn.addEventListener('click', showNextSlide, false);
    }, 300);
};

function showPrevSlide() {
    prevBtn.removeEventListener('click', showPrevSlide);
    currentSlide == 0 ? currentSlide = slider.length - 1 : currentSlide--;
    let prevImg = document.createElement('img');
    prevImg.src = slider[currentSlide];
    prevImg.classList.add('slider-item');
    document.querySelector('.slider-track').prepend(prevImg);
    document.querySelector('.slider-track').style.transform = 'translateX(' + imgWidth + 'px)';
    activeSlides = document.querySelectorAll('.slider-item');
    clearDots();
    setTimeout(function() {
        document.querySelector('.slider-track').style.transform = 'translateX(0px)';
        activeSlides[1].remove();
        dots[currentSlide].classList.add('dot-active');
        prevBtn.addEventListener('click', showPrevSlide, false);
    }, 300);
};
function showDotSlide(event) {
    var targetElement = event.target;
    if (targetElement.className != 'dots') {
        clearDots();
        targetElement.classList = 'dot dot-active';
        currentSlide = targetElement.getAttribute('data-item');
        document.querySelector('.slider-item').src = slider[currentSlide];
    } else {
        return;
    }
};

prevBtn.addEventListener('click', showPrevSlide, false);
nextBtn.addEventListener('click', showNextSlide, false);
dotContainer.addEventListener('click', showDotSlide, false);

init(); 