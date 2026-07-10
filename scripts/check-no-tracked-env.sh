#!/usr/bin/env bash
# git이 .env 파일을 추적하고 있으면 실패한다.
# supabase/functions/.env 가 공개 저장소에 커밋돼 HOLIDAY_KEY가 노출된 적이 있다.
set -euo pipefail

tracked=$(git ls-files | grep -E '(^|/)\.env($|\.)' | grep -v '\.env\.example$' || true)

if [ -n "$tracked" ]; then
  echo "::error::.env 파일이 git에 추적되고 있습니다. 커밋에서 제외하세요."
  echo "$tracked" | sed 's/^/  - /'
  echo ""
  echo "해결:"
  echo "  git rm --cached <파일>   # 워킹트리의 파일은 남습니다"
  exit 1
fi

echo "추적 중인 .env 파일 없음"
