'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import { AuthButtons } from '@/components/AuthButtons';
import { Notification } from '@/components/Notification';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-gray-900 relative overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/main/background.png"
          alt="메인 페이지 배경"
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        {/* 알림 표시 */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}

        {/* 헤더 */}
        <div className="text-center mb-16 relative">
          {/* 신비로운 오라 효과 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="mb-8 relative z-10">
            <div className="text-8xl mb-6 transform hover:scale-110 transition-transform duration-500">
              🏛️
            </div>
            <h1 className="text-6xl font-black mb-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-['Noto_Sans_KR'] drop-shadow-lg tracking-wider">
              UDH-의성데몬헌터
            </h1>
            <p className="text-2xl text-gray-700 mb-8 font-['Pretendard'] font-medium leading-relaxed max-w-4xl mx-auto">
              고운사를 장악한 요괴들을 퇴치하고 사찰을 정화하라!
            </p>
          </div>

          {/* 로그인 버튼 */}
          <div className="flex justify-end mb-8 relative z-10">
            <AuthButtons />
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  mb-20">
          {/* 왼쪽: 게임 소개 */}
          <div className="space-y-8">
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 relative overflow-hidden group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h2 className="text-3xl font-bold text-red-600 mb-6 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
                🎮 게임 소개
              </h2>

              <div className="space-y-4 text-lg text-gray-700 relative z-10">
                <p className="font-['Pretendard'] font-medium">
                  <span className="font-bold text-red-600">고운사</span>에
                  <span className="font-bold text-purple-600">
                    요괴들이 침입
                  </span>
                  했습니다!
                </p>
                <p className="font-['Pretendard'] font-medium">
                  <span className="font-bold text-blue-600">산신 분노</span>,
                  <span className="font-bold text-green-600">구미호</span>,
                  <span className="font-bold text-yellow-600">달걀귀신</span> 등
                  다양한 요괴들이 사찰을 장악하고 있습니다.
                </p>
                <p className="font-['Pretendard'] font-medium">
                  당신의 <span className="font-bold text-red-600">체력</span>과
                  <span className="font-bold text-purple-600">정신력</span>을
                  관리하며 요괴들을 퇴치해 나가세요!
                </p>
              </div>
            </div>

            {/* 게임 특징 */}
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 relative overflow-hidden group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-2xl font-bold text-red-600 mb-6 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
                ✨ 게임 특징
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-xl border border-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-lg">
                    🗺️
                  </div>
                  <span className="text-gray-700 font-['Pretendard'] font-medium">
                    30개 위치 탐험
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                    🐉
                  </div>
                  <span className="text-gray-700 font-['Pretendard'] font-medium">
                    9종 요괴 퇴치
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                    📖
                  </div>
                  <span className="text-gray-700 font-['Pretendard'] font-medium">
                    풍부한 스토리
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-lg">
                    🎯
                  </div>
                  <span className="text-gray-700 font-['Pretendard'] font-medium">
                    전략적 선택
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center relative">
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-orange-200 relative overflow-hidden group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="text-gray-400 text-8xl mb-8 transform hover:scale-110 transition-transform duration-500 relative z-10">
                🏛️
              </div>
              <h3 className="text-3xl font-bold text-red-600 mb-6 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
                UDH-의성데몬헌터에 오신 것을 환영합니다
              </h3>
              <p className="text-xl text-gray-700 mb-8 font-['Pretendard'] font-medium leading-relaxed relative z-10">
                "새 게임 시작" 버튼을 클릭하여 요괴 퇴치 모험을 시작하거나
                <br />
                "기존 게임 로드"로 이전 모험을 이어가세요
              </p>
              <div className="space-y-4 relative z-10">
                <button
                  onClick={handleStartNewGame}
                  disabled={loading}
                  className="group w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-black rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 relative overflow-hidden font-['Noto_Sans_KR'] tracking-wide"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10">
                    {loading ? '🔄 시작 중...' : '🔥 새 게임 시작'}
                  </span>
                </button>
                <button
                  onClick={handleLoadGame}
                  disabled={loading}
                  className="group w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xl font-black rounded-xl hover:from-amber-600 hover:to-orange-700 focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 relative overflow-hidden font-['Noto_Sans_KR'] tracking-wide"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10">
                    {loading ? '🔄 로딩 중...' : '📂 기존 게임 로드'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center mt-20 pt-8 border-t border-orange-200 relative z-10">
          <p className="text-gray-600 font-['Pretendard'] font-medium">
            🏛️ UDH-의성데몬헌터 - 전통과 판타지의 만남 🐉
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
