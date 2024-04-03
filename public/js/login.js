const formsubmit = document.querySelector("#formSubmit");
const register = document.querySelector("#register");

if (formsubmit) {
    if (register) {
        register.addEventListener("click", function (e) {
            e.preventDefault();
            formsubmit.submit();
        });
    }
}
