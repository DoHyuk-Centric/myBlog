// supabase/functions/get-holidays/index.ts

// 1. 허가증(CORS 헤더) 정의
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접속 허용
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // 2. 브라우저가 본 요청 전 보내는 '탐색용 요청(OPTIONS)' 처리
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const HOLIDAY_KEY = Deno.env.get("HOLIDAY_KEY");
    if (!HOLIDAY_KEY) {
      return new Response(JSON.stringify({ error: "HOLIDAY_KEY is not set" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");

    // 공공데이터 포털 API 호출 (JSON으로 받으면 훨씬 편합니다!)
    const apiUrl =
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=${HOLIDAY_KEY}&_type=json`;

    const res = await fetch(apiUrl);
    const data = await res.json(); // XML 대신 JSON으로 처리

    // 3. 응답할 때 반드시 corsHeaders를 넣어줍니다.
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "알 수 없는 오류가 발생했습니다.";

    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
