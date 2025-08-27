'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import { AuthButtons } from '@/components/AuthButtons';
import { Notification } from '@/components/Notification';
import Image from 'next/image';

export default function GamePage() {
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

  // 컴포넌트 마운트 시 게임 정보 자동 로드
  useEffect(() => {
    autoLoadGameInfo();
  }, [autoLoadGameInfo]);

  // gameData가 있을 때 자동으로 게임 정보 로드
  useEffect(() => {
    if (gameData) {
      loadGameInfo();
    }
  }, [gameData, loadGameInfo]);

  // 새 게임 시작
  const handleStartNewGame = async () => {
    try {
      const result = await startNewGame();
      if (result.success) {
        // 성공 알림 표시
        console.log('새 게임이 시작되었습니다!');
      }
    } catch (error) {
      console.error('게임 시작 실패:', error);
    }
  };

  // 게임 로드
  const handleLoadGame = async () => {
    try {
      const result = await loadGame();
      if (result.success) {
        console.log('게임을 불러왔습니다!');
      }
    } catch (error) {
      console.error('게임 로드 실패:', error);
    }
  };

  // 선택지 선택
  const handleChoiceSelect = async (choiceIndex: number) => {
    if (!gameData) return;

    setProcessingChoice(choiceIndex);
    try {
      const result = await selectChoice(choiceIndex);
      if (result.success) {
        console.log('선택이 완료되었습니다!');
      }
    } catch (error) {
      console.error('선택 처리 실패:', error);
    } finally {
      setProcessingChoice(null);
    }
  };

  // 게임 리셋
  const handleResetGame = () => {
    resetGame();
    console.log('게임이 리셋되었습니다!');
  };

  // 인증되지 않은 경우
  if (!gameData) {
    // 정적 버전에서는 게임 데이터가 없어도 페이지를 표시
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 relative overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="./images/game/background.png"
            alt="게임 배경"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* 헤더 */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🎮</div>
              <h1 className="text-3xl font-bold text-gray-800 font-['Noto_Sans_KR']">
                UDH-의성데몬헌터
              </h1>
            </div>
            <AuthButtons />
          </header>

          {/* 게임 시작 안내 */}
          <div className="text-center mt-20">
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-orange-200">
              <h2 className="text-4xl font-bold mb-6 text-red-600 font-['Noto_Sans_KR']">
                🚀 게임을 시작하세요!
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto font-['Pretendard'] font-medium text-lg">
                새로운 모험을 시작하거나 이전 게임을 이어서 플레이하세요.
              </p>
              <div className="flex justify-center space-x-6">
                <button
                  onClick={handleStartNewGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black text-xl px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 font-['Noto_Sans_KR']"
                >
                  🎮 새 게임 시작
                </button>
                <button
                  onClick={handleLoadGame}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-xl px-8 py-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 font-['Noto_Sans_KR']"
                >
                  📂 기존 게임 로드
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 relative overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="./images/game/background.png"
          alt="게임 배경"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🎮</div>
            <h1 className="text-3xl font-bold text-gray-800 font-['Noto_Sans_KR']">
              UDH-의성데몬헌터
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetGame}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-['Pretendard']"
            >
              🔄 게임 리셋
            </button>
            <AuthButtons />
          </div>
        </header>

        {/* 게임 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 게임 스토리 */}
          <div className="lg:col-span-2">
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-['Noto_Sans_KR']">
                📖 현재 상황
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mb-6">
                <p className="text-lg text-gray-800 font-['Pretendard'] leading-relaxed">
                  {gameData.content}
                </p>
              </div>

              {/* 선택지 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Noto_Sans_KR']">
                  🎯 선택하세요
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gameData.choices?.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleChoiceSelect(index)}
                      disabled={processingChoice !== null || loading}
                      className={`group p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-105 font-['Pretendard'] font-medium ${
                        processingChoice === index
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {processingChoice === index ? '🔄' : '💭'}
                        </span>
                        <span className="text-gray-800">{choice}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 게임 정보 */}
          <div className="lg:col-span-1">
            {gameInfo && (
              <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-orange-200 space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Noto_Sans_KR']">
                  📊 게임 정보
                </h3>

                {/* 진행률 */}
                <div className="group">
                  <p className="text-sm font-bold text-gray-600 mb-3 font-['Pretendard']">
                    진행률
                  </p>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">📈</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                          <span>진행률</span>
                          <span>{gameInfo.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${gameInfo.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 현재 위치 */}
                {gameInfo.current_location && (
                  <div className="group">
                    <p className="text-sm font-bold text-gray-600 mb-3 font-['Pretendard']">
                      현재 위치
                    </p>
                    <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                      <span className="text-3xl">🗺️</span>
                      <p className="text-lg font-bold text-gray-900 font-['Pretendard']">
                        {gameInfo.current_location}
                      </p>
                    </div>
                  </div>
                )}

                {/* 현재 기분 */}
                {gameInfo.current_mood && (
                  <div className="group">
                    <p className="text-sm font-bold text-gray-600 mb-3 font-['Pretendard']">
                      현재 기분
                    </p>
                    <div className="flex items-center space-x-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <span className="text-3xl">😊</span>
                      <p className="text-lg font-bold text-gray-900 font-['Pretendard']">
                        {gameInfo.current_mood}
                      </p>
                    </div>
                  </div>
                )}

                {/* 인벤토리 */}
                {gameInfo.items && gameInfo.items.trim() && (
                  <div className="group">
                    <p className="text-sm font-bold text-gray-600 mb-3 font-['Pretendard']">
                      인벤토리
                    </p>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-orange-200">
                      <div className="flex flex-wrap gap-2">
                        {gameInfo.items.split(',').map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-sm rounded-full border border-yellow-200 font-['Pretendard'] font-medium"
                          >
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 알림 */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}
