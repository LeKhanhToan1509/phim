const formsubmit = document.getElementById("formSubmit");
const register = document.getElementById("register");
if (formsubmit) {
    if (register) {
        register.addEventListener("click", function (e) {
            e.preventDefault();
            let path = formsubmit.getAttribute("action");
            path += "register";
            formsubmit.setAttribute("action", path);
            console.log(formsubmit.getAttribute("action"));
            formsubmit.submit();
        });
    }
}
