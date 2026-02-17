function profileInnerBirth() {
    const birth = document.getElementById("profileBirth");
    
    birth.addEventListener("input", () => {
        let value = birth.value.replace(/\D/g, "");
        if (value.length > 8) {
            value = value.slice(0, 8);
        }
        if(value.length >= 4 && value.length < 6) {
            value = value.replace(/(\d{4})?/, "$1-");
        }
        else if (value.length >= 6) {
            value = value.replace(/(\d{4})(\d{2})/, "$1-$2-");
        }
        birth.value = value;
    });
}
profileInnerBirth();