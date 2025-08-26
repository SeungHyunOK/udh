'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import { AuthButtons } from '@/components/AuthButtons';
import { Notification } from '@/components/Notification';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [processingChoice, setProcessingChoice] = useState<number | null>(null);
  const {
    gameData,
    gameInfo,
    loading,
    error,
    notification,
    startNewGame,
    loadGame,
    loadGameInfo,
    autoLoadGameInfo,
    selectChoice,
    resetGame,
    closeNotification,
  } = useGame();

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // 컴포넌트 마운트 시 게임 정보 자동 로드
  useEffect(() => {
    if (status === 'authenticated' && session) {
      autoLoadGameInfo();
    }
  }, [status, session, autoLoadGameInfo]);

  // gameData가 있을 때 자동으로 게임 정보 로드
  useEffect(() => {
    if (gameData && status === 'authenticated' && session) {
      loadGameInfo();
    }
  }, [gameData, status, session, loadGameInfo]);

  // 로딩 중일 때
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우
  if (!session) {
    return null; // 리다이렉트 중
  }

  const handleStartNewGame = async () => {
    await startNewGame();
  };

  const handleLoadGame = async () => {
    await loadGame();
  };

  const handleChoiceSelect = async (choiceIndex: number) => {
    setProcessingChoice(choiceIndex);
    try {
      await selectChoice(choiceIndex);
    } finally {
      setProcessingChoice(null);
    }
  };

  const handleReset = () => {
    resetGame();
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 알림 표시 */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎮 LLM Adventure Game
          </h1>
          <p className="text-lg text-gray-600">
            AI와 함께하는 텍스트 어드벤처 게임
          </p>
        </div>

        {/* 상단 네비게이션 */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            ← 메인으로 돌아가기
          </button>
          <AuthButtons />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* 게임 정보 */}
        {gameInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* 왼쪽: 스토리 및 선택지 */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              {/* 스토리 비트 */}
              {gameInfo.story_beats && gameInfo.story_beats.length > 0 && (
                <div className="mb-6">
                  <div className="space-y-3">
                    {gameInfo.story_beats.map((beat, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        {beat.speaker && (
                          <p className="text-sm font-medium text-blue-600 mb-1">
                            {beat.speaker}
                          </p>
                        )}
                        <span className="text-xs text-gray-500">
                          {beat.type}
                        </span>
                        <p className="text-gray-800">{beat.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 선택지 */}
              {gameInfo.choices && gameInfo.choices.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    선택지
                  </p>
                  <div className="space-y-2">
                    {gameInfo.choices.map((choice, index) => (
                      <button
                        key={index}
                        onClick={() => handleChoiceSelect(index)}
                        disabled={processingChoice !== null}
                        className="w-full text-left p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors disabled:opacity-50 relative focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        {processingChoice === index ? (
                          <div className="flex items-center justify-between">
                            <span className="opacity-50">{choice}</span>
                            <div className="flex items-center space-x-2">
                              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                              <span className="text-sm text-green-600 font-medium">
                                처리 중...
                              </span>
                            </div>
                          </div>
                        ) : (
                          choice
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 사용 가능한 선택지 */}
              {gameInfo.available_choices &&
                gameInfo.available_choices.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      사용 가능한 선택지
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                      {gameInfo.available_choices.map((choice, index) => (
                        <li key={index} className="text-gray-700">
                          {choice}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* 오른쪽: 현재 상태 섹션 */}
            <div className="bg-white rounded-lg shadow-md p-6 ">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                현재 상태
              </h3>
              <div className="space-y-4">
                {/* 체력 */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">체력</p>
                  <div className="flex items-center space-x-3 bg-red-50 p-3 rounded-lg">
                    <span className="text-2xl">❤️</span>
                    <p className="text-lg font-semibold text-gray-900">
                      {gameInfo.health || 0}
                    </p>
                  </div>
                </div>

                {/* 정신력 */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    정신력
                  </p>
                  <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
                    <span className="text-2xl">🧠</span>
                    <p className="text-lg font-semibold text-gray-900">
                      {gameInfo.sanity || 0}
                    </p>
                  </div>
                </div>

                {/* 소지금 */}
                {gameInfo.money !== undefined && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      소지금
                    </p>
                    <p className="text-lg font-semibold text-gray-900 bg-yellow-50 p-3 rounded-lg">
                      💰 {gameInfo.money}
                    </p>
                  </div>
                )}

                {/* 현재 위치 */}
                {gameInfo.current_location && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      현재 위치
                    </p>
                    <p className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded-lg">
                      🗺️ {gameInfo.current_location}
                    </p>
                  </div>
                )}

                {/* 현재 기분 */}
                {gameInfo.current_mood && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      현재 기분
                    </p>
                    <p className="text-gray-900 bg-green-50 p-3 rounded-lg">
                      {gameInfo.current_mood}
                    </p>
                  </div>
                )}

                {/* 인벤토리 */}
                {gameInfo.items && gameInfo.items.trim() && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      인벤토리
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {gameInfo.items.split(',').map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                        >
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 게임이 시작되지 않은 경우 */}
        {!gameData && !gameInfo && !loading && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-4">
              게임을 시작하거나 기존 게임을 로드해주세요.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleStartNewGame}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                새 게임 시작
              </button>
              <button
                onClick={handleLoadGame}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                기존 게임 로드
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
