# 🚀 헤일메리 분수 미션 (Hail Mary: Fraction Mission)

초등학교 5학년 분수의 덧셈·뺄셈 단원 학습용 웹 게임.

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## 기술 스택

React 18 · Vite · TypeScript · Tailwind CSS · Zustand · React Router · KaTeX · Framer Motion

## 테스트

```bash
npm run test          # 단위 테스트 (vitest)
npm run e2e:install   # E2E 브라우저 설치 (최초 1회)
npm run e2e           # E2E (Playwright, chromium)
```

## Firebase 학급 동기화 (옵션)

`.env.local`에 Firebase 키 설정 시 학급 단위 리더보드가 클라우드 sync.
미설정 시 LocalStorage 로컬 모드로 동작. `.env.example` 참고.

## 진행 상태

- [x] Phase 1 MVP — 챕터 1
- [x] Phase 2 — 챕터 2~6 (장르 다양화: 슈터/디펜스/리액터/매칭)
- [x] Phase 3 — 챕터 7 메가보스 + 보너스 응용 문항 + BGM
- [x] Phase 4 — 학급 명부/리더보드, 진도판, 발표 모드, Firebase 옵셔널
