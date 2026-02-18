// supabase/functions/get-holidays/index.ts

Deno.serve(async () => {
  const HOLIDAY_KEY = Deno.env.get("HOLIDAY_KEY")
  if (!HOLIDAY_KEY) {
    return new Response(JSON.stringify({ error: "HOLIDAY_KEY is not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  const year = new Date().getFullYear()
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0")

  const apiUrl = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=${HOLIDAY_KEY}`

  const res = await fetch(apiUrl)
  const data = await res.text() // XML 그대로 받기

  return new Response(data, { headers: { "Content-Type": "application/xml" } })
})
