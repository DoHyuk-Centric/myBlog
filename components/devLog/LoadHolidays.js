window.holidaySet = new Set();
window.holidayMap = {};

export async function loadHolidays() {
  const url = 'https://dkbjmlifixnmptdvoaxi.supabase.co/functions/v1/get-holidays';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('네트워크 응답에 문제가 있습니다.');
    
    const data = await response.json();
    
    const items = data.response.body.items.item;
    const holidayList = Array.isArray(items) ? items : [items]; // 공휴일이 하나일 때 처리

    holidayList.forEach(item => {
      const dateStr = String(item.locdate);   // "YYYY-MM-DD" 형식
      const name = item.dateName;
      window.holidaySet.add(dateStr);
      window.holidayMap[dateStr] = name;
      
      window.holidaySet.add(String(item.locdate));
    });

  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  }
}
loadHolidays();