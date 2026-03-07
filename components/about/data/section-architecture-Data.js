export const SECTION_ARCHITECTURE_DATA = {
  title: "공휴일 로딩 흐름 (Serverless Proxy)",

  steps: [
    {
      number: "1",
      theme: "slate",
      bg: "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600",
      title: "브라우저 (LoadHolidays.js)",
      desc: "클라이언트에서 Edge Function으로 요청",
      badge: { label: "Client", class: "border-slate-200 bg-white text-slate-700 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-200" },
      codeRingClass: "ring-slate-200 dark:ring-slate-600",
      code: `fetch("supabase.co/functions/v1/get-holidays")`,
      details: null,
    },
    {
      number: "2",
      theme: "indigo",
      bg: "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 dark:shadow-[0_0_0_1px_rgba(79,70,229,0.35)]",
      title: "Supabase Edge Function (index.ts)",
      desc: "Deno 런타임에서 실행되는 서버리스 함수",
      badge: { label: "Serverless / Deno", class: "border-indigo-200 bg-white text-indigo-700 dark:border-indigo-600 dark:bg-slate-800 dark:text-indigo-300" },
      codeRingClass: null,
      code: null,
      details: [
        {
          title: "환경변수 사용",
          code: "HOLIDAY_KEY",
          desc: "API 키를 브라우저로 노출하지 않고 함수 내부에서만 사용",
        },
        {
          title: "외부 API 호출",
          code: `fetch("apis.data.go.kr/...")`,
          desc: "요청/응답을 중계하며 필요한 가공도 가능",
        },
      ],
    },
    {
      number: "3",
      theme: "emerald",
      bg: "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700",
      title: "공공데이터 포털 API",
      desc: "공휴일 데이터를 제공하는 외부 서비스",
      badge: { label: "External API", class: "border-emerald-200 bg-white text-emerald-700 dark:border-emerald-600 dark:bg-slate-800 dark:text-emerald-300" },
      codeRingClass: "ring-emerald-200 dark:ring-emerald-700",
      code: "Response (JSON/XML) 반환",
      details: null,
    },
  ],

  response: {
    title: "응답 → 브라우저로 전달",
    desc: "클라이언트는 안전하게 결과만 받음",
    badges: ["API Key Hidden", "Separation of Concerns"],
  },

  keyPoints: [
    {
      text: "브라우저는",
      highlight: "Edge Function",
      rest: "만 호출 → 외부 API 키는 서버리스 레이어에만 존재",
    },
    {
      text: "나중에 캐싱, 유효성 검사, 레이트리밋 같은 서버 로직을 여기에 자연스럽게 추가 가능",
      highlight: null,
    },
  ],
};