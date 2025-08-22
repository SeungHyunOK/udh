// API 설정 및 환경 변수

export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_URL || 'https://llm-adventure.de.r.appspot.com',
  TIMEOUT: 300000, // 5분 (300초)
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1초
} as const;

export const API_ENDPOINTS = {
  NEW_GAME: '/newgame',
  LOAD_GAME: '/loadgame',
  LOAD_INFO: '/loadinfo',
  SELECT_CHOICE: '/selectchoice',
} as const;

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// API 에러 메시지
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결에 실패했습니다.',
  TIMEOUT_ERROR: '요청 시간이 초과되었습니다.',
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  INTERNAL_ERROR: '서버 오류가 발생했습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
} as const;
