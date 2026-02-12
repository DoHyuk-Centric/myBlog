profileMobeEvent();
function profileMobeEvent(){
    const profileBtn = document.getElementById("user");

    profileBtn.addEventListener("click", () => {
        window.location.href = "/pages/profile.html";
    })
}