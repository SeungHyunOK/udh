import { useState, useEffect, useCallback } from 'react';
import type { GameData, GameInfo, SelectChoiceRequest } from '@/types/api';

// 게임 상태를 관리하는 Hook (정적 내보내기용)
export function useGame() {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);

  // 알림 닫기
  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // 새 게임 시작 (정적 버전에서는 데모 데이터 사용)
  const startNewGame = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 정적 버전에서는 데모 게임 데이터 생성
      const demoGameData: GameData = {
        id: 'demo-game-1',
        title: 'UDH-의성데몬헌터',
        description: '고운사를 장악한 요괴들을 퇴치하고 사찰을 정화하라!',
        content: '고운사에 도착했습니다. 요괴의 기운이 느껴집니다...',
        choices: [
          '사찰 안으로 들어간다',
          '주변을 탐색한다',
          '도망간다'
        ],
        current_state: '고운사_입구',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setGameData(demoGameData);
      
      // 성공 알림 표시
      setNotification({
        message: '새 게임이 시작되었습니다! (데모 모드)',
        type: 'success',
      });

      return { success: true, data: demoGameData };
    } catch (err) {
      console.error('새 게임 시작 중 예외 발생:', err);
      setError('예상치 못한 오류가 발생했습니다.');
      return { success: false, error: '예상치 못한 오류가 발생했습니다.' };
    } finally {
      setLoading(false);
    }
  }, []);

  // 게임 로드 (정적 버전에서는 데모 데이터 사용)
  const loadGame = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 정적 버전에서는 저장된 게임이 없다고 가정
      setNotification({
        message: '저장된 게임이 없습니다. 새 게임을 시작해주세요.',
        type: 'info',
      });

      return { success: false, error: '저장된 게임이 없습니다.' };
    } catch (err) {
      console.error('loadGame 예외 발생:', err);
      setError('예상치 못한 오류가 발생했습니다.');
      return { success: false, error: '예상치 못한 오류가 발생했습니다.' };
    } finally {
      setLoading(false);
    }
  }, []);

  // 게임 정보 자동 로드 (정적 버전에서는 데모 데이터 사용)
  const autoLoadGameInfo = useCallback(async () => {
    try {
      // 정적 버전에서는 데모 게임 정보 생성
      const demoGameInfo: GameInfo = {
        game_id: 'demo-game-1',
        title: 'UDH-의성데몬헌터',
        description: '고운사를 장악한 요괴들을 퇴치하고 사찰을 정화하라!',
        current_state: '고운사_입구',
        progress: 0,
        current_location: '고운사_입구',
        choices: [
          '사찰 안으로 들어간다',
          '주변을 탐색한다',
          '도망간다'
        ]
      };

      setGameInfo(demoGameInfo);
      return { success: true, data: demoGameInfo };
    } catch (err) {
      setError('게임 정보 로드 중 오류가 발생했습니다.');
      return {
        success: false,
        error: '게임 정보 로드 중 오류가 발생했습니다.',
      };
    }
  }, []);

  // 게임 정보 로드
  const loadGameInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 정적 버전에서는 데모 게임 정보 생성
      const demoGameInfo: GameInfo = {
        game_id: 'demo-game-1',
        title: 'UDH-의성데몬헌터',
        description: '고운사를 장악한 요괴들을 퇴치하고 사찰을 정화하라!',
        current_state: '고운사_입구',
        progress: 0,
        current_location: '고운사_입구',
        choices: [
          '사찰 안으로 들어간다',
          '주변을 탐색한다',
          '도망간다'
        ]
      };

      setGameInfo(demoGameInfo);
      return { success: true, data: demoGameInfo };
    } catch (err) {
      setError('예상치 못한 오류가 발생했습니다.');
      return { success: false, error: '예상치 못한 오류가 발생했습니다.' };
    } finally {
      setLoading(false);
    }
  }, []);

  // 선택지 선택 (정적 버전에서는 데모 데이터 사용)
  const selectChoice = useCallback(
    async (choiceIndex: number) => {
      setLoading(true);
      setError(null);

      try {
        // 정적 버전에서는 데모 게임 진행
        const choices = [
          '고운사 안으로 들어갑니다. 요괴의 기운이 더욱 강해집니다...',
          '주변을 탐색합니다. 숨겨진 단서를 발견했습니다!',
          '도망갑니다. 하지만 이미 늦었습니다...'
        ];

        const newGameData: GameData = {
          ...gameData!,
          content: choices[choiceIndex] || '선택을 진행합니다...',
          current_state: `진행_${choiceIndex + 1}`,
          choices: [
            '계속 진행한다',
            '잠시 멈춘다',
            '돌아간다'
          ],
          updated_at: new Date().toISOString()
        };

        setGameData(newGameData);
        
        // 성공 알림 표시
        setNotification({
          message: '선택이 완료되었습니다!',
          type: 'success',
        });

        return { success: true, data: newGameData };
      } catch (err) {
        setError('예상치 못한 오류가 발생했습니다.');
        return { success: false, error: '예상치 못한 오류가 발생했습니다.' };
      } finally {
        setLoading(false);
      }
    },
    [gameData]
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
    isAuthenticated: true, // 정적 버전에서는 항상 인증된 것으로 가정
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
