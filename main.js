const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');

const slider = document.querySelector('.testimonials-wrapper');
const faqContainer = document.querySelector('.faq-content');

// Stop Animations During Window Resizing 

let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

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

// FAQ ACCORDION

document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.querySelector('.faq-content');

    faqContainer.addEventListener('click', (e) => {
        const groupQuestion = e.target.closest('.faq-question');

        if (!groupQuestion) return;

        const group = groupQuestion.parentElement;
        const groupAnswer = group.querySelector('.faq-answer');
        const icon = groupQuestion.querySelector('i');
        const divider = group.querySelector('.divider');

        // Toggle icon
        icon.classList.toggle('fa-xmark');
        icon.classList.toggle('fa-plus');

        // Toggle answer
        groupAnswer.classList.toggle('open');

        // Toggle data-type attribute
        if (groupAnswer.classList.contains('open')) {
            divider.setAttribute('data-type', 'dark');
        } else {
            divider.setAttribute('data-type', 'light');
        }

        // Close other groups
        const otherGroups = faqContainer.querySelectorAll('.faq-group');
        otherGroups.forEach((otherGroup) => {
            if (otherGroup !== group) {
                const otherGroupAnswer = otherGroup.querySelector('.faq-answer');
                const otherIcon = otherGroup.querySelector('.faq-question i');
                const otherDivider = otherGroup.querySelector('.divider');

                otherGroupAnswer.classList.remove('open');
                otherIcon.classList.remove('fa-xmark');
                otherIcon.classList.add('fa-plus');
                otherDivider.setAttribute('data-type', 'light');
            }
        });
    });
});

// MOBILE NAV

// mobileNavToggle.addEventListener('click', () => {
//     mobileNavToggle.classList.toggle('active');
//     primaryNav.classList.toggle('active');
//     document.body.classList.toggle('active-nav');
// });


mobileNavToggle.addEventListener("click", () => {
    const visibility = primaryNav.dataset.visible;

    primaryNav.dataset.visible = visibility === "false" || visibility === null ? "true" : "false";
    mobileNavToggle.setAttribute("aria-expanded", primaryNav.dataset.visible === "true" ? "true" : "false");
    document.body.classList.toggle('active-nav', primaryNav.dataset.visible === "true");
});
