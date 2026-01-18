let currentMode = null;

function calendarButtonControler() {
  const calendar_YearMonth_choice = document.getElementById(
    "calendar_YearMonth_choice"
  );
  const yearselectBtn = document.getElementById("calendarYearText");
  const monthselectBtn = document.getElementById("calendarMonthcontents");
  const monthBtn = document.getElementById("calendar_Month");
  const yearBtn = document.getElementById("calendar_Year");

  const calendarYearcontents = document.getElementById("calendarYearcontents");
  const calendarMonthcontents = document.getElementById(
    "calendarMonthcontents"
  );


  function calendarButtonClick(e) {
    e.stopPropagation();

    const clickMode = e.currentTarget === yearBtn ? "year" : "month";

    if (currentMode === clickMode) {
      if (calendar_YearMonth_choice.classList.contains("h-full")) {
        calendar_YearMonth_choice.classList.remove("h-full", "opacity-100");
        calendar_YearMonth_choice.classList.add("h-0");
      }

      currentMode = null;
      return;
    }

    if (calendar_YearMonth_choice.classList.contains("h-0")) {
      calendar_YearMonth_choice.classList.remove("h-0");
      calendar_YearMonth_choice.classList.add("h-full", "opacity-100");
    }

    yearselectBtn.addEventListener("click", () => {
      /** 탭 안에서 년도 선택 누른 경우 이벤트 */
      currentMode = "month";
      calendarMonthcontents.classList.remove("hidden");
      calendarYearcontents.classList.add("hidden");
    });

    if (e.currentTarget === yearBtn) {
      currentMode = "year";
      calendarYearcontents.classList.remove("hidden");
      calendarMonthcontents.classList.add("hidden");
    } else if (e.currentTarget === monthBtn) {
      currentMode = "month";
      calendarMonthcontents.classList.remove("hidden");
      calendarYearcontents.classList.add("hidden");
    }
  }
  document.addEventListener("click", () => {
    if (!calendar_YearMonth_choice.classList.contains("h-0")) {
      calendar_YearMonth_choice.classList.remove("h-full", "opacity-100");
      calendar_YearMonth_choice.classList.add("h-0");
    }
    currentMode = null;
  });
  calendar_YearMonth_choice.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  yearBtn.addEventListener("click", calendarButtonClick);
  monthBtn.addEventListener("click", calendarButtonClick);
}
calendarButtonControler();