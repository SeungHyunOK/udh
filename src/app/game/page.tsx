'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import { AuthButtons } from '@/components/AuthButtons';
import { Notification } from '@/components/Notification';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GamePage() {
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

  // 로딩 중일 때
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center relative overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/game/background.png"
            alt="게임 페이지 배경"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-40 animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-50 animation-delay-2000"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-orange-600 mb-6"></div>
          <p className="text-gray-700 text-lg font-medium font-['Pretendard']">
            게임을 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우
  if (!gameData) {
    // gameData가 없으면 로그인 페이지로 리다이렉트
    router.push('/auth/signin');
    return null;
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-gray-900 relative overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/game/background.png"
          alt="게임 페이지 배경"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 신비로운 입자 효과 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-40 animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-50 animation-delay-2000"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-amber-400 rounded-full animate-ping opacity-30 animation-delay-3000"></div>
        </div>

        {/* 블롭 애니메이션 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* 신비로운 빛줄 효과 */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-yellow-300 to-transparent opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30 animate-pulse animation-delay-1000"></div>
      </div>

      {/* 알림 표시 */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* 상단 네비게이션 */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleBackToHome}
            className="group px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gray-500/50 font-['Pretendard'] font-bold"
          >
            <span className="flex items-center space-x-2">
              <span>←</span>
              <span>메인으로 돌아가기</span>
            </span>
          </button>
          <AuthButtons />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50/90 backdrop-blur-md border border-red-200 rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <p className="text-red-800 font-['Pretendard'] font-medium relative z-10">
              {error}
            </p>
          </div>
        )}

        {/* 게임 정보 */}
        {gameInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* 왼쪽: 스토리 및 선택지 */}
            <div className="lg:col-span-2">
              {/* 스토리 비트 */}
              {gameInfo.story_beats && gameInfo.story_beats.length > 0 && (
                <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="space-y-4 relative z-10">
                    {gameInfo.story_beats.map((beat, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-gray-50 to-orange-50 p-6 rounded-xl border border-orange-100 hover:border-orange-200 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {beat.speaker && (
                          <p className="text-sm font-bold text-blue-600 mb-2 font-['Pretendard']">
                            {beat.speaker}
                          </p>
                        )}
                        <span className="inline-block text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full mb-3 font-['Pretendard']">
                          {beat.type}
                        </span>
                        <p className="text-gray-800 font-['Pretendard'] font-medium leading-relaxed">
                          {beat.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 선택지 */}
              {gameInfo.choices && gameInfo.choices.length > 0 && (
                <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                  <h3 className="text-2xl font-bold mb-6 text-center text-red-600 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
                    🎯 선택지
                  </h3>

                  <div className="space-y-4 relative z-10">
                    {gameInfo.choices.map((choice, index) => (
                      <button
                        key={index}
                        onClick={() => handleChoiceSelect(index)}
                        disabled={processingChoice !== null}
                        className="group w-full text-left p-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 hover:border-green-300 rounded-xl transition-all duration-300 disabled:opacity-50 relative focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25"
                      >
                        {processingChoice === index ? (
                          <div className="flex items-center justify-between">
                            <span className="opacity-50 font-['Pretendard'] font-medium">
                              {choice}
                            </span>
                            <div className="flex items-center space-x-3">
                              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                              <span className="text-sm text-green-600 font-bold font-['Pretendard']">
                                처리 중...
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="font-['Pretendard'] font-medium text-gray-800 group-hover:text-green-800 transition-colors duration-300">
                            {choice}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 사용 가능한 선택지 */}
              {gameInfo.available_choices &&
                gameInfo.available_choices.length > 0 && (
                  <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 relative overflow-hidden">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                    <h3 className="text-2xl font-bold mb-6 text-center text-red-600 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
                      🎒 사용 가능한 선택지
                    </h3>

                    <ul className="list-none space-y-3 relative z-10">
                      {gameInfo.available_choices.map((choice, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-3 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-orange-100 hover:border-orange-200 transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          <span className="text-yellow-600 text-lg">✨</span>
                          <span className="text-gray-700 font-['Pretendard'] font-medium">
                            {choice}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* 오른쪽: 현재 상태 섹션 */}
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 relative overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-2xl font-bold text-center text-red-600 mb-8 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
                📊 현재 상태
              </h3>

              <div className="space-y-6 relative z-10">
                {/* 체력 */}
                <div className="group">
                  <p className="text-sm font-bold text-gray-600 mb-3 font-['Pretendard']">
                    체력
                  </p>
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-[1.02]">
                    <span className="text-3xl">❤️</span>
                    <p className="text-2xl font-bold text-gray-900 font-['Pretendard']">
                      {gameInfo.health || 0}
                    </p>
                  </div>
                </div>

                {/* 정신력 */}
                <div className="group">
                  <p className="text-sm font-bold text-gray-600 mb-3 font-['Pretendard']">
                    정신력
                  </p>
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-[1.02]">
                    <span className="text-3xl">🧠</span>
                    <p className="text-2xl font-bold text-gray-900 font-['Pretendard']">
                      {gameInfo.sanity || 0}
                    </p>
                  </div>
                </div>

                {/* 소지금 */}
                {gameInfo.money !== undefined && (
                  <div className="group">
                    <p className="text-sm font-bold text-gray-600 mb-3 font-['Pretendard']">
                      소지금
                    </p>
                    <div className="flex items-center space-x-4 bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200 hover:border-yellow-300 transition-all duration-300 transform hover:scale-[1.02]">
                      <span className="text-3xl">💰</span>
                      <p className="text-2xl font-bold text-gray-900 font-['Pretendard']">
                        {gameInfo.money}
                      </p>
                    </div>
                  </div>
                )}

                {/* 현재 위치 */}
                {gameInfo.current_location && (
                  <div className="group">
                    <p className="text-sm font-bold text-gray-600 mb-3 font-['Pretendard']">
                      현재 위치
                    </p>
                    <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.02]">
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
                    <div className="flex items-center space-x-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 transform hover:scale-[1.02]">
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
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 transform hover:scale-[1.02]">
                      <div className="flex flex-wrap gap-2">
                        {gameInfo.items.split(',').map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-sm rounded-full border border-yellow-200 hover:border-yellow-300 transition-all duration-300 font-['Pretendard'] font-medium"
                          >
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 게임이 시작되지 않은 경우 */}
        {!gameData && !loading && (
          <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-orange-200 text-center relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

            <h2 className="text-3xl font-bold mb-6 text-red-600 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
              🚀 게임을 시작하세요!
            </h2>

            <p className="text-gray-700 mb-8 max-w-2xl mx-auto relative z-10 font-['Pretendard'] font-medium text-lg">
              새로운 모험을 시작하거나 이전 게임을 이어서 플레이하세요.
            </p>

            <div className="flex justify-center space-x-6 relative z-10">
              <button
                onClick={handleStartNewGame}
                className="group inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black text-xl px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 relative overflow-hidden font-['Noto_Sans_KR'] tracking-wide"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">🎮 새 게임 시작</span>
              </button>

              <button
                onClick={handleLoadGame}
                className="group inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-xl px-8 py-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 relative overflow-hidden font-['Noto_Sans_KR'] tracking-wide"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">📂 기존 게임 로드</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
