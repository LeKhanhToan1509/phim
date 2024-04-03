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

