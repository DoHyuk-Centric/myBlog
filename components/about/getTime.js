startClock();
function startClock(){
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
        mobile: document.getElementById("mobileCurrentTime"),
        xp: document.getElementById("xpCurrentTime"),
    }

    contents.xp.textContent = `${period()} ${displayHour}:${String(minute).padStart(2, "0")}`;
    contents.mobile.textContent = `${period()} ${displayHour}:${String(minute).padStart(2, "0")}`;

}