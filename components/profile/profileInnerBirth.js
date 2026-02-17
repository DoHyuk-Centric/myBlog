function profileInnerBirth() {
    const birth = document.getElementById("profileBirth");
    
    birth.addEventListener("input", () => {
        let value = birth.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
        if (value.length > 8) {
            value = value.slice(0, 8); // 최대 8자리로 제한
        }
        if(value.length >= 4 && value.length < 5) {
            value = value.replace(/(\d{4})(\d{2})?/, "$1-$2"); // YYYY-MM 형식으로 변환
        }
        else if (value.length >= 5) {
            value = value.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"); // YYYY-MM-DD 형식으로 변환
        }
        birth.value = value;
    });
}
profileInnerBirth();