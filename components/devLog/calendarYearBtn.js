/** 년도선택 기능 */
function calendarControler_Year(){
  const yearBtn = document.getElementById("calendar_Year");
  const yearSelector = document.getElementById("calendar_Year_choice");
  yearBtn.addEventListener("click",(e) => {
    e.stopPropagation();
    if(yearSelector.classList.contains("hidden")){
      yearSelector.classList.remove("hidden");
    }
    else{
      yearSelector.classList.add("hidden");
    }
  });

  yearSelector.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click",(e) => {
    if(!yearSelector.classList.contains("hidden")){
      yearSelector.classList.add("hidden");
    }
  });
}

calendarControler_Year();