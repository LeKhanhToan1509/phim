const getstart = document.querySelector("#getstart");
const form = document.querySelector(".home");
getstart.addEventListener("click", (e) => {
    e.preventDefault();
    form.submit();
});
