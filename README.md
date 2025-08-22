# 🚀 LLM Adventure Project

LLM Adventure API와 연동되는 Next.js 프로젝트입니다.

## ✨ 주요 기능

- 🔍 모험 검색 및 조회
- 📱 반응형 UI (Tailwind CSS)
- 🎯 TypeScript로 타입 안전성 보장
- 🚀 Next.js 15 + App Router
- 🎨 Prettier + ESLint 코드 품질 관리

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Code Quality**: ESLint, Prettier
- **State Management**: React Hooks
- **HTTP Client**: Fetch API with AbortController

## 📁 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # 전역 스타일
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 메인 페이지
├── hooks/              # React Hooks
│   └── useAdventures.ts # 모험 데이터 관리 Hook
├── lib/                # 유틸리티 라이브러리
│   ├── api/            # API 관련
│   │   ├── client.ts   # HTTP 클라이언트
│   │   ├── config.ts   # API 설정
│   │   └── adventureService.ts # 모험 API 서비스
│   └── utils.ts        # 공통 유틸리티 함수
└── types/              # TypeScript 타입 정의
    └── api.ts          # API 응답 타입들
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# LLM Adventure API 설정
NEXT_PUBLIC_API_URL=https://llm-adventure.de.r.appspot.com

# 개발 환경 설정
NODE_ENV=development
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📚 API 사용법

### 기본 사용법

```typescript
import { useAdventures } from '@/hooks/useAdventures';

function MyComponent() {
  const {
    adventures,
    loading,
    error,
    searchAdventures
  } = useAdventures();

  // 모험 검색
  const handleSearch = (query: string) => {
    searchAdventures(query);
  };

  return (
    // 컴포넌트 JSX
  );
}
```

### 직접 API 호출

```typescript
import { adventureService } from '@/lib/api/adventureService';

// 모든 모험 조회
const response = await adventureService.getAdventures();

// 특정 모험 조회
const adventure = await adventureService.getAdventure('id');

// 모험 검색
const results = await adventureService.searchAdventures('검색어');
```

## 🎨 코드 품질 관리

### 코드 포맷팅

```bash
npm run format        # 모든 파일 포맷팅
npm run format:check  # 포맷팅 검사만
```

### 린팅

```bash
npm run lint          # ESLint 검사
npm run lint:fix      # ESLint 오류 자동 수정
```

## 🔧 주요 설정

### Tailwind CSS

Tailwind CSS v4가 설정되어 있으며, `@import "tailwindcss";`로 사용합니다.

### TypeScript

엄격한 타입 검사가 활성화되어 있으며, 모든 API 응답에 대한 타입이 정의되어 있습니다.

### ESLint + Prettier

코드 스타일과 품질을 일관되게 유지합니다.

## 📱 반응형 디자인

- 모바일 우선 접근법
- Tailwind CSS의 반응형 클래스 활용
- 그리드 시스템으로 카드 레이아웃 구성

## 🚀 배포

### Vercel 배포

```bash
npm run build
```

### 정적 내보내기

```bash
npm run build
npm run export
```

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.
