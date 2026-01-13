function calendarSelector_Year() {
  const yearBtn = document.getElementById("calendar_Year");
  const yearSelector = document.getElementById("calendar_Year_choice");
  yearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (yearSelector.classList.contains("h-30")) {
      yearSelector.classList.remove("h-30");
      yearSelector.classList.add("h-0");
      yearSelector.classList.add("opacity-0");
    } else {
      yearSelector.classList.remove("h-0");
      yearSelector.classList.add("h-30");
      yearSelector.classList.remove("opacity-0");
    }
  });

  yearSelector.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!yearSelector.classList.contains("h-0")) {
      yearSelector.classList.remove("h-30");
      yearSelector.classList.add("h-0");
      yearSelector.classList.add("opacity-0");
    }
  });
}

// calendarSelector_Year();
// calendarSelector_Month();

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

function calendarButtonControler() {
  const calendar_YearMonth_choice = document.getElementById(
    "calendar_YearMonth_choice"
  );
  const monthBtn = document.getElementById("calendar_Month");
  const yearBtn = document.getElementById("calendar_Year");

  const calendarYearcontents = document.getElementById("calendarYearcontents");
  const calendarMonthcontents = document.getElementById("calendarMonthcontents");

  let currentMode = null;

  function calendarButtonClick(e) {
    e.stopPropagation();

    const clickMode = e.currentTarget === yearBtn ? "year" : "month";

    if (currentMode === clickMode) {
      if (calendar_YearMonth_choice.classList.contains("h-89")) {
        calendar_YearMonth_choice.classList.remove("h-89", "opacity-100");
        calendar_YearMonth_choice.classList.add("h-0");
      }

      currentMode = null;
      return;
    }

    if (calendar_YearMonth_choice.classList.contains("h-0")) {
      calendar_YearMonth_choice.classList.remove("h-0");
      calendar_YearMonth_choice.classList.add("h-89", "opacity-100");
    }

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
      calendar_YearMonth_choice.classList.remove("h-89", "opacity-100");
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

function calendarContentsSelector(){

  calendarYearcontents.classList.remove("hidden");
}