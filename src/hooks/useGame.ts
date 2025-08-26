import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { gameService } from '@/lib/api/gameService';
import { httpClient } from '@/lib/api/client';
import type { GameData, GameInfo, SelectChoiceRequest } from '@/types/api';

// 게임 상태를 관리하는 Hook
export function useGame() {
  const { data: session } = useSession();
  const router = useRouter();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);

  // 401 에러 발생 시 자동 로그아웃 처리
  const handleUnauthorized = useCallback(() => {
    console.log('401 에러로 인한 자동 로그아웃 처리');
    const message = '다시 로그인 해주세요!';
    setError(message);
    setNotification({
      message,
      type: 'error',
    });
    setGameData(null);
    setGameInfo(null);

    // 잠시 후 로그아웃 처리 (사용자가 알림을 볼 수 있도록)
    setTimeout(() => {
      signOut({ callbackUrl: '/' });
    }, 2000);
  }, []);

  // HTTP 클라이언트에 401 에러 콜백 설정
  useEffect(() => {
    httpClient.setUnauthorizedCallback(handleUnauthorized);
  }, [handleUnauthorized]);

  // 알림 닫기
  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Google ID 토큰 가져오기
  const getGoogleIdToken = useCallback(async () => {
    if (!session) {
      throw new Error('로그인이 필요합니다.');
    }

    // NextAuth.js v5에서는 session에서 직접 토큰을 가져올 수 있음
    // 실제로는 Google OAuth의 id_token을 사용해야 함
    if (session.providerToken) {
      return session.providerToken as string;
    }

    // providerToken이 없는 경우 accessToken 사용
    if (session.accessToken) {
      return session.accessToken as string;
    }

    throw new Error('Google ID 토큰이 없습니다. 다시 로그인해주세요.');
  }, [session]);

  // 새 게임 시작
  const startNewGame = useCallback(async () => {
    if (!session) {
      setError('로그인이 필요합니다.');
      return { success: false, error: '로그인이 필요합니다.' };
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getGoogleIdToken();
      const response = await gameService.startNewGame(token);

      if (response.success) {
        // response.data가 null이어도 성공으로 처리 (백엔드에서 새 게임 생성 후 리다이렉트하는 경우)
        if (response.data) {
          setGameData(response.data);
        }

        // 성공 알림 표시
        setNotification({
          message: response.message || '새 게임이 시작되었습니다!',
          type: 'success',
        });

        return { success: true, data: response.data };
      } else {
        setError(response.error || '새 게임을 시작하는데 실패했습니다.');
        return { success: false, error: response.error };
      }
    } catch (err) {
      console.error('새 게임 시작 중 예외 발생:', err);
      setError('예상치 못한 오류가 발생했습니다.');
      return { success: false, error: '예상치 못한 오류가 발생했습니다.' };
    } finally {
      setLoading(false);
    }
  }, [session, getGoogleIdToken]);

  // 게임 로드
  const loadGame = useCallback(async () => {
    if (!session) {
      setError('로그인이 필요합니다.');
      return { success: false, error: '로그인이 필요합니다.' };
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getGoogleIdToken();
      const response = await gameService.loadGame(token);

      if (response.success) {
        // response.data가 null이어도 성공으로 처리 (백엔드 리다이렉트 케이스)
        if (response.data) {
          setGameData(response.data);
        }

        return {
          success: true,
          data: response.data,
          message: response.message || '게임을 불러왔습니다.',
        };
      } else {
        setError(response.error || '게임을 불러오는데 실패했습니다.');
        return { success: false, error: response.error };
      }
    } catch (err) {
      console.error('loadGame 예외 발생:', err);
      setError('예상치 못한 오류가 발생했습니다.');
      return { success: false, error: '예상치 못한 오류가 발생했습니다.' };
    } finally {
      setLoading(false);
    }
  }, [session, getGoogleIdToken]);

  // 게임 정보 자동 로드 (리다이렉트 후 사용)
  const autoLoadGameInfo = useCallback(async () => {
    if (!session) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      const token = await getGoogleIdToken();
      const response = await gameService.loadGameInfo(token);

      if (response.success && response.data) {
        setGameInfo(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error || '게임 정보를 불러오는데 실패했습니다.');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('게임 정보 로드 중 오류가 발생했습니다.');
      return {
        success: false,
        error: '게임 정보 로드 중 오류가 발생했습니다.',
      };
    }
  }, [session, getGoogleIdToken]);

  // 게임 정보 로드
  const loadGameInfo = useCallback(async () => {
    if (!session) {
      // 로그인하지 않은 경우 게임 정보를 로드하지 않음
      return { success: false, error: '로그인이 필요합니다.' };
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getGoogleIdToken();
      const response = await gameService.loadGameInfo(token);

      if (response.success && response.data) {
        setGameInfo(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error || '게임 정보를 불러오는데 실패했습니다.');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('예상치 못한 오류가 발생했습니다.');
      return { success: false, error: '예상치 못한 오류가 발생했습니다.' };
    } finally {
      setLoading(false);
    }
  }, [session, getGoogleIdToken]);

  // 선택지 선택
  const selectChoice = useCallback(
    async (choiceIndex: number) => {
      if (!session) {
        setError('로그인이 필요합니다.');
        return { success: false, error: '로그인이 필요합니다.' };
      }

      setLoading(true);
      setError(null);

      try {
        const token = await getGoogleIdToken();
        const data: SelectChoiceRequest = { select: choiceIndex };
        const response = await gameService.selectChoice(data, token);

        if (response.success && response.data) {
          setGameData(response.data);
          // 선택 후 게임 정보도 업데이트
          try {
            const infoResponse = await gameService.loadGameInfo(token);
            if (infoResponse.success && infoResponse.data) {
              setGameInfo(infoResponse.data);
            }
          } catch (infoErr) {
            console.warn('게임 정보 업데이트 실패:', infoErr);
          }
          return { success: true, data: response.data };
        } else {
          // 500 에러 등 실패 시 에러 설정
          setError(response.error || '선택에 실패했습니다.');
          return { success: false, error: response.error };
        }
      } catch (err) {
        setError('예상치 못한 오류가 발생했습니다.');
        return { success: false, error: '예상치 못한 오류가 발생했습니다.' };
      } finally {
        setLoading(false);
      }
    },
    [session, getGoogleIdToken]
  );

  // 게임 상태 초기화
  const resetGame = useCallback(() => {
    setGameData(null);
    setGameInfo(null);
    setError(null);
  }, []);

  return {
    gameData,
    gameInfo,
    loading,
    error,
    notification,
    isAuthenticated: !!session,
    startNewGame,
    loadGame,
    loadGameInfo,
    autoLoadGameInfo,
    selectChoice,
    resetGame,
    closeNotification,
    setNotification,
  };
}
