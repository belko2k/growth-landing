const slider = document.querySelector('.testimonials-wrapper');

let pos = { left: 0, x: 0 };

const mouseDownHandler = function (e) {
    pos = {
        // The current scroll
        left: slider.scrollLeft,
        // Get the current mouse position
        x: e.clientX,
    };

    // Change the cursor and prevent user from selecting the text
    slider.style.cursor = 'grabbing';
    slider.style.userSelect = 'none';

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved horizontally
    const dx = (e.clientX - pos.x) * 5;

    // Scroll the element horizontally
    slider.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
    slider.style.cursor = 'grab';
    slider.style.userSelect = 'auto';

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

slider.addEventListener('mousedown', mouseDownHandler);
