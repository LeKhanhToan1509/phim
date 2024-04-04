window.addEventListener("DOMContentLoaded", (event) => {
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((likeBtn) => {
        likeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const icon = likeBtn.querySelector("i");
            if (icon.classList.contains("fa-regular")) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
            } else {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
            }
        });
    });
});
const logoutForm = document.querySelector(".logoutForm");
const logout = document.querySelector(".logout");
console.log(logout, logoutForm);
logout.addEventListener("click", (e) => {
    e.preventDefault();
    logoutForm.submit();
});

var mySwiper = new Swiper(".swiper-container", {
    spaceBetween: 5,
    slidesPerView: 2,
    loop: true,
    freeMode: true,
    loopAdditionalSlides: 5,
    speed: 500,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            freeMode: false,
        },
    },
});
