let date = new Date();

calendarContentsYearSelector();
/** 년도 추가 함수 */
function calendarContentsYearSelector() {
  const calendarYearLeftBtn = document.getElementById("calendarYearLeftBtn");
  const calendarYearRightBtn = document.getElementById("calendarYearRightBtn");

  calendarYearLeftBtn.addEventListener("click", () => {
    date.setFullYear(date.getFullYear() - 1);
    renderCalendar();
  });
  calendarYearRightBtn.addEventListener("click", () => {
    date.setFullYear(date.getFullYear() + 1);
    renderCalendar();
  });
}

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const calendar_Year = document.getElementById("calendar_Year");
  const calendar_Month = document.getElementById("calendar_Month");
  const calendar_day = document.getElementById("calendar_day");

  const calendarYearText = document.getElementById("calendarYearText");

  calendar_day.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  calendarYearText.textContent = year;
  calendar_Year.textContent = year;
  calendar_Month.textContent = month + 1;

  const calendaryear = parseInt(calendar_Year.textContent);
  const calendarmonth = parseInt(calendar_Month.textContent);

  createPrevMonthDay(calendar_day, firstDay, prevLastDay);
  createCurrentDay(calendar_day, lastDay, calendaryear, calendarmonth - 1);
  createNextMonthDay(calendar_day);
}

function createCurrentDay(calendar_day, lastDay, year, month) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  for (let i = 1; i <= lastDay; i++) {
    const newDay = document.createElement("div");
    newDay.textContent = i;
    if (currentYear === year && currentMonth === month && i === currentDay) {
      const dot = document.createElement("div");
      dot.classList.add(
        "w-3",
        "h-1",
        "bg-blue-500",
        "rounded-full",
        "absolute",
        "left-1/2",
        "-translate-x-1/2",
        "-bottom-1"
      );
      newDay.style.position = "relative";
      newDay.appendChild(dot);
    }
    calendarCurrentColorChange(calendar_day, newDay);
    calendar_day.appendChild(newDay);
  }
}

function createPrevMonthDay(calendar_day, firstDay, prevLastDay) {
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = document.createElement("div");
    day.textContent = prevLastDay - i;
    calendarPrevColorChange(calendar_day, day);
    calendar_day.appendChild(day);
  }
}

function createNextMonthDay(calendar_day) {
  const weekCells = calendar_day.children.length;
  const nextDay = (7 - (weekCells % 7)) % 7;

  for (let i = 1; i <= nextDay; i++) {
    const nextDay = document.createElement("div");
    nextDay.textContent = i;
    calendarNextColorChange(calendar_day, nextDay);
    calendar_day.appendChild(nextDay);
  }
}

function calendarControler() {
  const prevMonth_Btn = document.getElementById("prevMonthBtn");
  const nextMonth_Btn = document.getElementById("nextMonthBtn");

  prevMonth_Btn.addEventListener("click", (e) => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  nextMonth_Btn.addEventListener("click", (e) => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
}

function calendarPrevColorChange(calendar_day, day) {
  const dayOfweek = calendar_day.children.length % 7;
  if (dayOfweek === 0) {
    day.classList.add("text-red-300", "dark:text-red-400", "dark:opacity-60");
  } else {
    day.classList.add("text-gray-400");
  }
}

function calendarCurrentColorChange(calendar_day, newDay) {
  const dayOfweek = calendar_day.children.length % 7;
  if (dayOfweek === 0) {
    newDay.classList.add("text-red-500");
  } else if (dayOfweek === 6) {
    newDay.classList.add("text-blue-500");
  }
}

function calendarNextColorChange(calendar_day, nextDay) {
  const dayOfweek = calendar_day.children.length % 7;
  if (dayOfweek === 6) {
    nextDay.classList.add(
      "text-blue-300",
      "dark:text-blue-400",
      "dark:opacity-60"
    );
  } else {
    nextDay.classList.add("text-gray-400");
  }
}

renderCalendar();
calendarControler();
