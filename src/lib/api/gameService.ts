import { httpClient } from './client';
import { API_ENDPOINTS } from './config';
import type {
  NewGameResponse,
  LoadGameResponse,
  LoadInfoResponse,
  SelectChoiceRequest,
  SelectChoiceResponse,
  GameData,
  GameInfo,
} from '@/types/api';

// LLM Adventure Game API 서비스 클래스
export class GameService {
  // 새 게임 시작
  async startNewGame(token: string): Promise<NewGameResponse> {
    try {
      const response = await httpClient.get<GameData>(
        API_ENDPOINTS.NEW_GAME,
        token
      );

      if (!response.success) {
        // 401 에러인 경우 특별한 메시지 반환
        if (response.error?.status === 401) {
          return {
            success: false,
            error: '다시 로그인 해주세요!',
          };
        }

        return {
          success: false,
          error:
            response.error?.message || '새 게임을 시작하는데 실패했습니다.',
        };
      }

      // response.data가 null이어도 성공으로 처리 (백엔드에서 새 게임 생성 후 리다이렉트하는 경우)
      return {
        success: true,
        data: response.data,
        message: '새 게임이 시작되었습니다.',
      };
    } catch (error) {
      console.error('새 게임 시작 중 오류 발생:', error);
      return {
        success: false,
        error: '새 게임을 시작하는 중 오류가 발생했습니다.',
      };
    }
  }

  // 게임 로드
  async loadGame(token: string): Promise<LoadGameResponse> {
    try {
      const response = await httpClient.get<GameData>(
        API_ENDPOINTS.LOAD_GAME,
        token
      );

      if (response.success) {
        // response.data가 null이어도 성공으로 처리 (백엔드 리다이렉트 케이스)
        return {
          success: true,
          data: response.data,
          message: '게임을 불러왔습니다.',
        };
      }

      // 401 에러인 경우 특별한 메시지 반환
      if (response.error?.status === 401) {
        return {
          success: false,
          error: '다시 로그인 해주세요!',
        };
      }

      return {
        success: false,
        error: response.error?.message || '게임을 불러오는데 실패했습니다.',
      };
    } catch (error) {
      console.error('게임 로드 중 오류 발생:', error);
      return {
        success: false,
        error: '게임을 불러오는 중 오류가 발생했습니다.',
      };
    }
  }

  // 게임 정보 로드
  async loadGameInfo(token: string): Promise<LoadInfoResponse> {
    try {
      const response = await httpClient.get<GameInfo>(
        API_ENDPOINTS.LOAD_INFO,
        token
      );

      if (response.success) {
        if (response.data) {
          return {
            success: true,
            data: response.data,
            message: '게임 정보를 불러왔습니다.',
          };
        } else {
          // response.data가 null인 경우 - 저장된 데이터가 없음
          return {
            success: false,
            error: '저장된 데이터가 없습니다. 새로운 게임을 시작합니다.',
            data: null,
          };
        }
      }

      // 401 에러인 경우 특별한 메시지 반환
      if (response.error?.status === 401) {
        return {
          success: false,
          error: '다시 로그인 해주세요!',
        };
      }

      return {
        success: false,
        error:
          response.error?.message || '게임 정보를 불러오는데 실패했습니다.',
      };
    } catch (error) {
      console.error('게임 정보 로드 중 오류 발생:', error);
      return {
        success: false,
        error: '게임 정보를 불러오는 중 오류가 발생했습니다.',
      };
    }
  }

  // 선택지 선택
  async selectChoice(
    data: SelectChoiceRequest,
    token: string
  ): Promise<SelectChoiceResponse> {
    try {
      const response = await httpClient.post<GameData>(
        API_ENDPOINTS.SELECT_CHOICE,
        data,
        token
      );

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
          message: '선택이 완료되었습니다.',
        };
      }

      // 401 에러인 경우 특별한 메시지 반환
      if (response.error?.status === 401) {
        return {
          success: false,
          error: '다시 로그인 해주세요!',
        };
      }

      return {
        success: false,
        error: response.error?.message || '선택에 실패했습니다.',
      };
    } catch (error) {
      console.error('선택지 선택 중 오류 발생:', error);
      return {
        success: false,
        error: '선택지 선택 중 오류가 발생했습니다.',
      };
    }
  }
}

// 싱글톤 인스턴스 생성
export const gameService = new GameService();
