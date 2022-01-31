function slider() {
    //slider
    const next = document.querySelector('.offer__slider-next'),
        prev = document.querySelector('.offer__slider-prev'),
        slides = document.querySelectorAll('.offer__slide'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    let indexSlide = 1;
    
    displaySlides(indexSlide);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    
    function displaySlides(n) {
        if (n > slides.length) {
            indexSlide = 1;
        }

        if (n < 1) {
            indexSlide = slides.length;
        }

        slides.forEach(elem => elem.style.display = 'none');

        slides[indexSlide - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${indexSlide}`;
        } else {
            current.textContent = indexSlide;
        }
    }

    function plusSlide(n) {
        displaySlides(indexSlide += n);
    }

    prev.addEventListener('click', () => {
        console.log(slides[0]);
        plusSlide(-1);
    }); 

    next.addEventListener('click', () => {
        plusSlide(1);
    });
}

export default slider;