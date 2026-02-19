policyHandler();
function policyHandler(){
    const exit = document.getElementById("exitButton");
    exit.addEventListener("click", () => {
        window.close();
    })
}