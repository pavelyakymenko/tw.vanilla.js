// carousel.js
export default function initDrawer() {

class Carousel {
    constructor(element) {
        this.carousel = element;
        this.inner = element.querySelector('.carousel-inner');
        this.items = element.querySelectorAll('.carousel-item');
        this.indicators = element.querySelectorAll('[data-carousel-slide-to]');
        
        this.totalSlides = this.items.length;
        this.currentSlide = 0;
        this.intervalId = null;
        this.intervalTime = parseInt(element.dataset.interval) || 5000;

        this.init();
    }

    init() {
        this.carousel.addEventListener('click', (e) => {
            const control = e.target.closest('[data-carousel-control]');
            const indicator = e.target.closest('[data-carousel-slide-to]');

            if (control) {
                const action = control.dataset.carouselControl;
                action === 'next' ? this.next() : this.prev();
            }

            if (indicator) {
                const slideIndex = parseInt(indicator.dataset.carouselSlideTo);
                this.goTo(slideIndex);
            }
        });

        this.carousel.addEventListener('mouseenter', () => this.pause());
        this.carousel.addEventListener('mouseleave', () => this.cycle());

        if (this.carousel.dataset.ride === 'carousel') {
            this.cycle();
        }
    }

    goTo(index) {
        this.currentSlide = index;

        // Идеальная математика: каждый слайд занимает ровно 100% ширины.
        // Чтобы показать второй слайд (индекс 1), сдвигаем ленту влево на -100%
        const offset = -100 * this.currentSlide;
        this.inner.style.transform = `translateX(${offset}%)`;

        // Обновляем точки
        this.indicators.forEach((ind, i) => {
            if (i === this.currentSlide) {
                ind.classList.add('active');
                ind.style.opacity = '1';
            } else {
                ind.classList.remove('active');
                ind.style.opacity = '0.5';
            }
        });
    }

    next() {
        const nextSlide = (this.currentSlide + 1) % this.totalSlides;
        this.goTo(nextSlide);
    }

    prev() {
        const prevSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goTo(prevSlide);
    }

    cycle() {
        this.pause();
        this.intervalId = setInterval(() => this.next(), this.intervalTime);
    }

    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

export default function initCarousels() {
    const carousels = document.querySelectorAll('[data-ride="carousel"]');
    carousels.forEach(el => new Carousel(el));
}

// В самом конце JS файла CodePen обязательно вызови функцию:
initCarousels();

}
