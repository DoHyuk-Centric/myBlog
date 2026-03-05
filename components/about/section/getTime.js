export function initGetTime(){
    getTime();

    const now = new Date();
    const seconds = now.getSeconds();

    const delay = (60 - seconds) * 1000;

    setTimeout(() => {
        getTime();
        setInterval(getTime, 60000);
    }, delay);
}

function getTime(){
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();

    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDate();

    const week = time.getDay();
    const weekName = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = weekName[week];

    let displayHour = hour % 12;
    displayHour = displayHour === 0 ? 12 : displayHour;

    let period = function checkTime(){
        if(hour >= 12){
            return "오후";
        }
        else{
            return "오전";
        }
    }

    const contents = {
        kakaoDay: document.getElementById("kakaoTalkCurrentDay"),
        kakaoMassage: document.getElementById("kakaoTalkCurrentTime"),
        mobile: document.getElementById("mobileCurrentTime"),
        xp: document.getElementById("xpCurrentTime"),
    }

    contents.kakaoDay.textContent = `${year}년 ${month + 1}월 ${day}일 ${dayName}요일`
    contents.kakaoMassage.textContent = `${period()} ${displayHour}:${String(minute).padStart(2, "0")}`;
    contents.xp.textContent = `${period()} ${displayHour}:${String(minute).padStart(2, "0")}`;
    contents.mobile.textContent = `${period()} ${displayHour}:${String(minute).padStart(2, "0")}`;

}