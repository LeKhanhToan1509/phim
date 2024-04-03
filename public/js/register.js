const getstart = document.querySelector("#getstart");
const input = document.querySelector("#inputEmail3");
const start = document.querySelector(".start");
const alert1 = document.querySelector(".alert1");
console.log(alert1);
console.log(start, getstart);
getstart.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value) {
        let check = 0;
        for (let i = 0; i < input.value.length; i++) {
            if (input.value[i] === "@") {
                check = 1;
            }
        }
        if (check == 0) {
            alert1.classList.remove("d-none");
        } else {
            start.submit();
        }
    }
});
