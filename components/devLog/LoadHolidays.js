async function loadHolidays() {
  const url = 'https://dkbjmlifixnmptdvoaxi.supabase.co/functions/v1/get-holidays';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('네트워크 응답에 문제가 있습니다.');
    
    const data = await response.json(); // 이제 JSON으로 바로 받습니다.
    
    // 공공데이터 포털의 JSON 구조에 따라 데이터 추출
    const items = data.response.body.items.item;
    const holidayList = Array.isArray(items) ? items : [items]; // 공휴일이 하나일 때 처리

    holidayList.forEach(item => {
      console.log(`날짜: ${item.locdate}, 이름: ${item.dateName}`);
    });

  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  }
}
loadHolidays();