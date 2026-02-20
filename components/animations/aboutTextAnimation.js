export function initTextAnimation() {
    headerText();
    pText();
}

function headerText() {
    const headerTexts = ["블로그에 오신것을 환영합니다.", "꾸준함은 무기다.", "협업을 중시하자."];

    const aboutText = document.getElementById("aboutHeaderText");
    if (!aboutText) return;

    aboutText.textContent = "";

    const headerTextSpan = document.createElement("span");
    const headercursor = document.createElement("span");
    headercursor.textContent = "|";
    headercursor.style.display = "inline-block";
    headercursor.style.marginLeft = "6px";
    headercursor.style.transition = "opacity 0.2s ease";

    aboutText.append(headerTextSpan, headercursor);

    let visible = true;
    setInterval(() => {
        visible = !visible;
        headercursor.style.opacity = visible ? "1" : "0";
    }, 500);

    let textIndex = 0;
    let index = 0;
    let isDeleting = false;

    const TYPE_SPEED = 130;
    const DELETE_SPEED = 70;
    const END_PAUSE = 1100;
    const START_PAUSE = 400;

    function tick() {
        const currentText = headerTexts[textIndex];

        headerTextSpan.textContent = currentText.slice(0, index);

        if (!isDeleting) {
            index += 1;

            if (index > currentText.length) {
                isDeleting = true;
                return setTimeout(tick, END_PAUSE);
            }
            return setTimeout(tick, TYPE_SPEED);
        } else {
            index -= 1;

            if (index < 0) {
                isDeleting = false;
                index = 0;

                textIndex = (textIndex + 1) % headerTexts.length;

                return setTimeout(tick, START_PAUSE);
            }
            return setTimeout(tick, DELETE_SPEED);
        }
    }

    tick();
}

function pText() {
    const pTexts = ["Frontend Engineer", "김도혁"];

    const aboutPText = document.getElementById("aboutPText");
    if (!aboutPText) return;

    aboutPText.textContent = "";

    const pTextspan = document.createElement("span");
    const pcursor = document.createElement("span");
    pcursor.textContent = "|";
    pcursor.style.display = "inline-block";
    pcursor.style.marginLeft = "6px";
    pcursor.style.transition = "opacity 0.2s ease";

    aboutPText.append(pTextspan, pcursor);

    let visible = true;
    setInterval(() => {
        visible = !visible;
        pcursor.style.opacity = visible ? "1" : "0";
    }, 500);

    let textIndex = 0;
    let index = 0;
    let isDeleting = false;

    const TYPE_SPEED = 130;
    const DELETE_SPEED = 70;
    const END_PAUSE = 2200;
    const START_PAUSE = 400;

    function tick() {
        const currentText = pTexts[textIndex];

        pTextspan.textContent = currentText.slice(0, index);

        if (!isDeleting) {
            index += 1;

            if (index > currentText.length) {
                isDeleting = true;
                return setTimeout(tick, END_PAUSE);
            }
            return setTimeout(tick, TYPE_SPEED);
        } else {
            index -= 1;

            if (index < 0) {
                isDeleting = false;
                index = 0;

                textIndex = (textIndex + 1) % pTexts.length;

                return setTimeout(tick, START_PAUSE);
            }
            return setTimeout(tick, DELETE_SPEED);
        }
    }

    tick();
}