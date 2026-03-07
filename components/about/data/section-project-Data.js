export const SECTION_PROJECT_DATA = {
    tabs: [
        { target: "tab-overview", label: "블로그 프로젝트", number: "01", class: "rounded-tl-xl duration-300 bg-[#e2e0d8] dark:bg-slate-900 text-[8px] sm:text-[12px] w-full flex-1" },
        { target: "tab-stack", label: "기술스택 & 아키텍처", number: "02", class: "text-[8px] duration-300 sm:text-[12px] w-full dark:border-slate-600 border-[#e2e0d8] border-b-2 border-t-2 flex-1" },
        { target: "tab-feature", label: "핵심기능 구현", number: "03", class: "rounded-bl-xl duration-300 text-[8px] sm:text-[12px] w-full flex-1" },
    ],
    cards: [
        {
            id: "tab-overview",
            badge: { label: "PROJECT", color: "blue" },
            title: "DoHyuk.dev 프로젝트",
            subject: "주제 : 개인블로그",
            period: "기간 : 2025.12 ~ 2026.03(약 3개월)",
            meta: "기간 : 2025.12 ~ 2026.03 · 약 3개월",
            sections: [
                {
                    heading: "계기",
                    items: [
                        "직접 관리·유지보수 가능",
                        "velog 사용 중 느꼈던 불편함을 개선",
                        "Tistory의 동영상 콘텐츠 중단 이후, 장기적으로 유지 가능한 블로그가 필요하다고 판단",
                    ],
                },
                {
                    heading: "개선점",
                    items: [
                        "이미지 버튼 클릭 시, 텍스트를 띄어 이미지 Markdown이 자동 삽입되도록 개선",
                    ],
                },
                {
                    heading: "영감",
                    items: [
                        "Tistory처럼 별도 버튼을 누르지 않아도, velog처럼 우측에 실시간 미리보기를 제공",
                        "개발자 친화적인 Markdown 기반의 velog 글쓰기 UX",
                    ],
                },
            ],
        },
        {
            id: "tab-stack",
            badge: { label: "STACK", color: "green" },
            title: "기술 스택 & 아키텍처",
            subject: "배포 : Vercel",
            stacks: {
                FrontEnd: ["Vainlla JS", "Tailwind CSS"],
                BackEnd: ["Supabase(Auth, Storage, DB)"],
            },
            troubles: [
                {
                    label: "Scroll Navigation 개선",
                    desc: "offsetTop 기반 조건식 → threshold 보정 → IntersectionObserver 적용",
                    href: "https://hyeeoooook.tistory.com/30",
                },
                {
                    label: "Menu UI + 접근성 통합 설계",
                    desc: "이벤트 분산 → 상태 기반 설계 통합",
                    href: "https://hyeeoooook.tistory.com/33",
                },
                {
                    label: "Async 제어 흐름 개선",
                    desc: "비동기 완료 전 페이지 이동 문제 → await 기반 흐름 제어",
                    href: "https://hyeeoooook.tistory.com/39",
                },
                {
                    label: "Firebase → Supabase Auth 마이그레이션",
                    desc: "Firebase Auth + Supabase DB 분리로 권한 제어 이슈 → Supabase Auth로 통합(RLS 기반)",
                    href: "https://hyeeoooook.tistory.com/40",
                },
            ],
            mobileTroubles: [
                "Scroll Navigation 개선",
                "Menu UI + 접근성 통합 설계",
                "Async 제어 흐름 개선",
                "Firebase → Supabase Auth 마이그레이션",
            ],
        },
        {
            id: "tab-feature",
            badge: { label: "FEATURE", color: "purple" },
            title: "핵심 기능 & 구현",
            subject: "데이터 흐름 중심 설계",
            features: [
                {
                    title: "Markdown",
                    badge: "Editor",
                    badgeColor: "blue",
                    items: [
                        "개발자 친화적인 Markdown 기반 작성 UX",
                        "입력 → 파싱 → 실시간 미리보기 렌더링",
                        "이미지 업로드 후 URL 자동 삽입",
                    ],
                },
                {
                    title: "인증 & 권한 설계",
                    badge: "Auth",
                    badgeColor: "amber",
                    items: [
                        "Auth 이벤트 기반 로그인 상태 관리",
                        "Posts-Profiles 관계 모델링으로 작성자 연결",
                        "RLS로 수정/삭제 권한을 작성자에게 제한",
                    ],
                },
                {
                    title: "비동기 & 상태 흐름",
                    badge: "Flow",
                    badgeColor: "green",
                    items: [
                        "저장 완료(await) 후 라우팅으로 데이터 유실 방지",
                        "UI 토글 로직을 상태 기반(open/close)으로 통합",
                        "Escape/외부 클릭 등 예외 케이스 처리",
                    ],
                },
            ],
            mobileFeatures: {
                topRow: [
                    { heading: "MarkDown", items: ["입력 → 파싱 → 실시간 미리보기 렌더링"] },
                    { heading: "Auth", items: ["Auth 이벤트 기반 로그인 상태관리"] },
                ],
                rows: [
                    { heading: "비동기 & 상태흐름", items: ["저장 완료(await) 후 라우팅으로 데이터 유실 방지"] },
                    {
                        heading: "렌더링 최적화",
                        items: [
                            "Scroll 이벤트 → Observer로 섹션 감지구조 변경",
                            "메뉴 UI를 상태 기반으로 통합",
                            "비동기 완료 후 라우팅 처리로 실행 흐름 제어 개선",
                        ],
                    },
                ],
            },
        },
    ],
};