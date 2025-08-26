'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import { AuthButtons } from '@/components/AuthButtons';
import { Notification } from '@/components/Notification';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    loading,
    notification,
    startNewGame,
    loadGame,
    closeNotification,
    setNotification,
  } = useGame();

  const handleStartNewGame = async () => {
    // 로그인 상태 체크
    if (!session) {
      setNotification({
        message: '로그인이 필요합니다!',
        type: 'warning',
      });
      return;
    }

    try {
      const result = await startNewGame();
      if (result.success) {
        // 성공 알림 표시
        setNotification({
          message: '새 게임이 시작되었습니다!',
          type: 'success',
        });

        // 잠시 후 /game 페이지로 이동 (사용자가 알림을 볼 수 있도록)
        setTimeout(() => {
          router.push('/game');
        }, 1000);
      } else {
        // 실패 시 에러 알림 표시
        setNotification({
          message: result.error || '새 게임을 시작하는데 실패했습니다.',
          type: 'error',
        });
      }
    } catch (error) {
      // 예외 발생 시 에러 알림 표시
      console.error('새 게임 시작 중 예외 발생:', error);
      setNotification({
        message: '예상치 못한 오류가 발생했습니다.',
        type: 'error',
      });
    }
  };

  const handleLoadGame = async () => {
    // 로그인 상태 체크
    if (!session) {
      setNotification({
        message: '로그인이 필요합니다!',
        type: 'warning',
      });
      return;
    }

    try {
      const result = await loadGame();
      if (result.success) {
        // 성공 알림 표시
        setNotification({
          message: '게임을 불러왔습니다!',
          type: 'success',
        });

        // 잠시 후 /game 페이지로 이동 (사용자가 알림을 볼 수 있도록)
        setTimeout(() => {
          router.push('/game');
        }, 1000);
      } else {
        // 실패 시 에러 알림 표시
        setNotification({
          message: result.error || '게임을 불러오는데 실패했습니다.',
          type: 'error',
        });
      }
    } catch (error) {
      // 예외 발생 시 에러 알림 표시
      console.error('게임 로드 중 예외 발생:', error);
      setNotification({
        message: '예상치 못한 오류가 발생했습니다.',
        type: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 알림 표시 */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="text-8xl mb-4">🏛️</div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 font-serif">
              고운사 요괴 퇴치기
            </h1>
            <p className="text-2xl text-gray-700 mb-8 font-serif">
              고운사를 장악한 요괴들을 퇴치하고 사찰을 정화하라!
            </p>
          </div>

          {/* 로그인 버튼 */}
          <div className="flex justify-end mb-8">
            <AuthButtons />
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* 왼쪽: 게임 소개 */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
                🎮 게임 소개
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  <span className="font-semibold text-red-600">고운사</span>에
                  <span className="font-semibold text-purple-600">
                    요괴들이 침입
                  </span>
                  했습니다!
                </p>
                <p>
                  <span className="font-semibold text-blue-600">산신 분노</span>
                  ,<span className="font-semibold text-green-600">구미호</span>,
                  <span className="font-semibold text-yellow-600">
                    달걀귀신
                  </span>{' '}
                  등 다양한 요괴들이 사찰을 장악하고 있습니다.
                </p>
                <p>
                  당신의{' '}
                  <span className="font-semibold text-red-600">체력</span>과
                  <span className="font-semibold text-purple-600">정신력</span>
                  을 관리하며 요괴들을 퇴치해 나가세요!
                </p>
              </div>
            </div>

            {/* 게임 특징 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">
                ✨ 게임 특징
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    🗺️
                  </div>
                  <span className="text-gray-700">30개 위치 탐험</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    🐉
                  </div>
                  <span className="text-gray-700">9종 요괴 퇴치</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    📖
                  </div>
                  <span className="text-gray-700">풍부한 스토리</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    🎯
                  </div>
                  <span className="text-gray-700">전략적 선택</span>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 게임 컨트롤 */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">
                🎮 게임 시작
              </h3>
              <div className="space-y-4">
                <button
                  onClick={handleStartNewGame}
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xl font-bold rounded-xl hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-300 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? '🔄 시작 중...' : '🔥 새 게임 시작'}
                </button>
                <button
                  onClick={handleLoadGame}
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? '🔄 로딩 중...' : '📂 기존 게임 로드'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-16">
          <div className="text-gray-400 text-8xl mb-6">🏛️</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
            고운사에 오신 것을 환영합니다
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            "새 게임 시작" 버튼을 클릭하여 요괴 퇴치 모험을 시작하거나
            <br />
            "기존 게임 로드"로 이전 모험을 이어가세요
          </p>
        </div>

        {/* 푸터 */}
        <div className="text-center mt-16 pt-8 border-t border-orange-200">
          <p className="text-gray-600">
            🏛️ 고운사 요괴 퇴치기 - 전통과 판타지의 만남 🐉
          </p>
        </div>
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
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
