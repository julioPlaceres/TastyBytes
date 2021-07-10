// mobile menu display
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");
const dropdown = document.querySelector(".navbar-dropdown");
const expandDropdownEl = document.querySelector(".navbar-link");
const x = window.matchMedia("(max-width: 1280px)")

burgerIcon.addEventListener("click", () => {
    console.log("clicked");
    navbarMenu.classList.toggle("is-active");
})

expandDropdownEl.addEventListener("click", () => {
    console.log(dropdown.className);
    if(x.matches) {
        if(dropdown.classList.contains("is-hidden")) {
            dropdown.setAttribute("class", "navbar-dropdown is-active");
        }
        else {
            dropdown.setAttribute("class", "navbar-dropdown is-hidden");
        }
    }
})
