import { loadHolidays } from "./LoadHolidays.js";

let date = new Date();

initCalendar();
async function initCalendar() {
  await loadHolidays();
  renderCalendar();
  calendarControler();
}

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
  const holiday = document.getElementById("calendarHoliday");

  const calendarYearText = document.getElementById("calendarYearText");

  calendar_day.innerHTML = "";

  holiday.classList.add("hidden");
  document.getElementById("calendarHolidayInfo").innerHTML = "";

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
    const dateStr = `${year}${String(month + 1).padStart(2, "0")}${String(i).padStart(2, "0")}`;
    const newDay = document.createElement("div");
    newDay.textContent = i;
    newDay.style.position = "relative";
    newDay.classList.add("cursor-pointer");

    if (window.holidaySet.has(dateStr)) {
      const holidayDot = document.createElement("div");
      holidayDot.classList.add(
        "w-4",
        "h-1",
        "bg-red-500",
        "rounded-full",
        "absolute",
        "left-1/2",
        "-translate-x-1/2",
        "-bottom-1",
        "opacity-50",
      );
      holidayDot.style.bottom = "-3px";
      newDay.appendChild(holidayDot);

      newDay.addEventListener("click", () => {
        addHolidayInfo(year, month)
      });
    }
    if (
      currentYear === year &&
      currentMonth === month &&
      i === currentDay &&
      window.holidaySet.has(dateStr)
    ) {
      const todaydot = document.createElement("div");
      todaydot.classList.add(
        "w-4",
        "h-1",
        "bg-blue-500",
        "rounded-full",
        "absolute",
        "left-1/2",
        "-translate-x-1/2",
        "-bottom-1",
      );
      todaydot.style.bottom = "-10px";
      newDay.appendChild(todaydot);
    } else if (
      currentYear === year &&
      currentMonth === month &&
      i === currentDay
    ) {
      const todaydot = document.createElement("div");
      todaydot.classList.add(
        "w-4",
        "h-1",
        "bg-blue-500",
        "rounded-full",
        "absolute",
        "left-1/2",
        "-translate-x-1/2",
        "-bottom-1",
      );
      todaydot.style.bottom = "-3px";
      newDay.appendChild(todaydot);
    }
    calendarCurrentColorChange(calendar_day, newDay, dateStr);
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
  const monthselectBtn = document.getElementById("calendarMonthcontents");

  // 월 선택 버튼
  monthselectBtn.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    const month = button.querySelector("span").textContent;
    if (e.target.tagName === "BUTTON") {
      date.setMonth(Number(month) - 1);
      renderCalendar();
      calendar_tapControler();
    }
  });

  // 이전 달 버튼
  prevMonth_Btn.addEventListener("click", (e) => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  // 다음 달 버튼
  nextMonth_Btn.addEventListener("click", (e) => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
}

/** 달력 월 선택 버튼 클릭시 currentMode 초기화와 탭 닫기 */
function calendar_tapControler() {
  const calendar_YearMonth_choice = document.getElementById(
    "calendar_YearMonth_choice",
  );

  calendar_YearMonth_choice.classList.remove("h-full", "opacity-100");
  calendar_YearMonth_choice.classList.add("h-0");

  currentMode = null;

  return;
}

function calendarPrevColorChange(calendar_day, day) {
  const dayOfweek = calendar_day.children.length % 7;
  if (dayOfweek === 0) {
    day.classList.add("text-red-300", "dark:text-red-400", "dark:opacity-60");
  } else {
    day.classList.add("text-gray-400");
  }
}

function calendarCurrentColorChange(calendar_day, newDay, dateStr) {
  if (window.holidaySet.has(dateStr)) {
    newDay.classList.add("text-red-500");
    return;
  }

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
      "dark:opacity-60",
    );
  } else {
    nextDay.classList.add("text-gray-400");
  }
}

function addHolidayInfo(year, month){
  const holiday = document.getElementById("calendarHoliday");
  const holidayInfo = document.getElementById("calendarHolidayInfo");
  holidayInfo.innerHTML = "";

  holiday.classList.toggle("hidden");

  Object.entries(window.holidayMap).forEach(([dateStr, name]) => {
    const holidayYear = Number(dateStr.slice(0,4));
    const holidayMonth = Number(dateStr.slice(4,6)) - 1;

    if (holidayYear === year && holidayMonth === month) {
      const holiday_li = document.createElement("li");
      const holiday__li__time = document.createElement("time");
      const holiday__li__p = document.createElement("p");

      holiday_li.classList.add("flex","gap-4");

      holiday__li__time.textContent = dateStr.slice(-2) + "일";
      holiday_li.appendChild(holiday__li__time);

      holiday__li__p.textContent = name;
      holiday_li.appendChild(holiday__li__p);

      holidayInfo.appendChild(holiday_li);
    }
  });
}