const menuBtn = document.getElementById("menuBtn");
const menuExitBtn = document.getElementById("menuExitBtn");
const menuBar = document.getElementById("menuBar");

menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menuBar.classList.toggle("-translate-x-full")
})

menuExitBtn.addEventListener("click", () => {
    menuBar.classList.toggle("-translate-x-full")
})

document.addEventListener("click", (e) => {
    if(!menuBar.classList.contains("-translate-x-full")){
        if(!menuBar.contains(e.target) && !menuBtn.contains(e.target)){
            menuBar.classList.toggle("-translate-x-full")
        }
    }
});