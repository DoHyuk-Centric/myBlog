/** 년도선택 기능 */
function calendarSelector_Year() {
  const yearBtn = document.getElementById("calendar_Year");
  const yearSelector = document.getElementById("calendar_Year_choice");
  yearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (yearSelector.classList.contains("hidden")) {
      yearSelector.classList.remove("hidden");
    } else {
      yearSelector.classList.add("hidden");
    }
  });

  yearSelector.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!yearSelector.classList.contains("hidden")) {
      yearSelector.classList.add("hidden");
    }
  });
}

calendarSelector_Year();
calendarSelector_Month();

function calendarSelector_Month() {
  const calendar_Month = document.getElementById("calendar_Month_choice");
  const calendar_Month_button = document.getElementById("calendar_Month");

  calendar_Month_button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (calendar_Month.classList.contains("h-30")) {
      calendar_Month.classList.remove("h-30");
      calendar_Month.classList.add("h-0");
      calendar_Month.classList.add("opacity-0");
    } else {
      calendar_Month.classList.remove("h-0");
      calendar_Month.classList.add("h-30");
      calendar_Month.classList.remove("opacity-0");
    }
  });

  calendar_Month.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (!calendar_Month.classList.contains("h-0")) {
      calendar_Month.classList.remove("h-30");
      calendar_Month.classList.add("h-0");
      calendar_Month.classList.add("opacity-0");
    }
  });
}
