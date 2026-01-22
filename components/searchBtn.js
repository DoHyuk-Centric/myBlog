searchBtn();
function searchBtn(){
  const btn = document.getElementById("searchBtn");
  const wrap = document.getElementById("searchWrap");
  const searchInput = document.getElementById("searchInput");
  
  btn.addEventListener("click", () => {
    wrap.classList.toggle("w-0");
    wrap.classList.toggle("w-60");
  });
  
  document.addEventListener("click", (e) => {
    if(!wrap.classList.contains("w-0")){
      if(!wrap.contains(e.target) && !btn.contains(e.target)){
        wrap.classList.add("w-0");
        wrap.classList.remove("w-60");
        searchInput.value = "";
      }
    }
  });
}