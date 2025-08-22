import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { gameService } from '@/lib/api/gameService';
import type { GameData, GameInfo, SelectChoiceRequest } from '@/types/api';

// 게임 상태를 관리하는 Hook
export function useGame() {
  const { data: session } = useSession();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      console.log('새 게임 시작 시작');
      const token = await getGoogleIdToken();
      const response = await gameService.startNewGame(token);

      if (response.success && response.data) {
        console.log('새 게임 시작 성공:', response.data);
        setGameData(response.data);

        // 새 게임 시작 성공 시 게임 정보도 자동으로 로드
        try {
          console.log('새 게임 정보 자동 로드 시작');
          const infoResponse = await gameService.loadGameInfo(token);
          if (infoResponse.success && infoResponse.data) {
            console.log('새 게임 정보 로드 성공:', infoResponse.data);
            setGameInfo(infoResponse.data);
          } else {
            console.warn('새 게임 정보 로드 실패:', infoResponse.error);
          }
        } catch (infoErr) {
          console.warn('새 게임 정보 로드 중 예외 발생:', infoErr);
        }

        return { success: true, data: response.data };
      } else {
        console.log('새 게임 시작 실패:', response.error);
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
      console.log('useGame loadGame 시작');
      const token = await getGoogleIdToken();
      console.log('토큰 획득:', !!token);

      const response = await gameService.loadGame(token);
      console.log('gameService.loadGame 응답:', response);

      if (response.success) {
        // response.data가 null이어도 성공으로 처리 (백엔드 리다이렉트 케이스)
        if (response.data) {
          console.log('게임 로드 성공, gameData 설정:', response.data);
          setGameData(response.data);
        } else {
          console.log(
            '게임 로드 성공 (response: null), gameData는 설정하지 않음'
          );
        }

        // 게임 로드 성공 시 게임 정보도 자동으로 로드
        let infoResponse: any = null;
        let autoStarted = false;

        try {
          console.log('게임 정보 자동 로드 시작');
          infoResponse = await gameService.loadGameInfo(token);
          if (infoResponse.success && infoResponse.data) {
            console.log('게임 정보 로드 성공:', infoResponse.data);
            setGameInfo(infoResponse.data);
          } else {
            console.warn('게임 정보 로드 실패:', infoResponse.error);

            // 저장된 데이터가 없는 경우 자동으로 새 게임 시작
            if (
              infoResponse.error ===
              '저장된 데이터가 없습니다. 새로운 게임을 시작합니다.'
            ) {
              console.log('저장된 데이터가 없음, 자동으로 새 게임 시작');
              autoStarted = true;

              try {
                const newGameResponse = await gameService.startNewGame(token);
                if (newGameResponse.success && newGameResponse.data) {
                  console.log('자동 새 게임 시작 성공:', newGameResponse.data);
                  setGameData(newGameResponse.data);

                  // 새 게임 시작 후 다시 게임 정보 로드 시도
                  const retryInfoResponse =
                    await gameService.loadGameInfo(token);
                  if (retryInfoResponse.success && retryInfoResponse.data) {
                    console.log(
                      '새 게임 정보 로드 성공:',
                      retryInfoResponse.data
                    );
                    setGameInfo(retryInfoResponse.data);
                  }
                }
              } catch (newGameErr) {
                console.warn('자동 새 게임 시작 실패:', newGameErr);
              }
            }
          }
        } catch (infoErr) {
          console.warn('게임 정보 로드 중 예외 발생:', infoErr);
        }

        return {
          success: true,
          data: response.data,
          autoStarted: autoStarted, // 자동 새 게임 시작 여부
        };
      } else {
        console.log('게임 로드 실패, 에러 설정:', response.error);
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
    isAuthenticated: !!session,
    startNewGame,
    loadGame,
    loadGameInfo,
    autoLoadGameInfo,
    selectChoice,
    resetGame,
  };
}
