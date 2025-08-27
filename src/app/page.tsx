'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import { AuthButtons } from '@/components/AuthButtons';
import { Notification } from '@/components/Notification';
import Image from 'next/image';

export default function Home() {
  const {
    loading,
    notification,
    startNewGame,
    loadGame,
    closeNotification,
    setNotification,
  } = useGame();

  const handleStartNewGame = async () => {
    try {
      const result = await startNewGame();
      if (result.success) {
        // 성공 알림 표시
        setNotification({
          message: '새 게임이 시작되었습니다!',
          type: 'success',
        });

        // 정적 버전에서는 페이지 이동 대신 알림만 표시
        console.log('게임이 시작되었습니다!');
      }
    } catch (error) {
      console.error('게임 시작 실패:', error);
      setNotification({
        message: '게임 시작에 실패했습니다.',
        type: 'error',
      });
    }
  };

  const handleLoadGame = async () => {
    try {
      const result = await loadGame();
      if (result.success) {
        setNotification({
          message: '게임을 불러왔습니다!',
          type: 'success',
        });
      }
    } catch (error) {
      console.error('게임 로드 실패:', error);
      setNotification({
        message: '게임 로드에 실패했습니다.',
        type: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 relative overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main/background.png"
          alt="배경"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🎮</div>
            <h1 className="text-3xl font-bold text-gray-800 font-['Noto_Sans_KR']">
              UDH-의성데몬헌터
            </h1>
          </div>
          <AuthButtons />
        </header>

        {/* 메인 섹션 */}
        <main className="text-center">
          {/* 히어로 섹션 */}
          <section className="mb-16">
            <h2 className="text-6xl font-black text-gray-900 mb-6 font-['Noto_Sans_KR'] tracking-wide">
              🚀 게임을 시작하세요!
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-['Pretendard'] font-medium">
              고운사를 장악한 요괴들을 퇴치하고 사찰을 정화하는 모험을 시작하세요!
            </p>
          </section>

          {/* 액션 버튼들 */}
          <section className="mb-16">
            <div className="flex justify-center space-x-8">
              <button
                onClick={handleStartNewGame}
                disabled={loading}
                className="group bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black text-2xl px-12 py-6 rounded-2xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 relative overflow-hidden font-['Noto_Sans_KR'] tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">
                  {loading ? '🔄 시작 중...' : '🎮 새 게임 시작'}
                </span>
              </button>

              <button
                onClick={handleLoadGame}
                disabled={loading}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-2xl px-12 py-6 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 relative overflow-hidden font-['Noto_Sans_KR'] tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">
                  {loading ? '🔄 로드 중...' : '📂 기존 게임 로드'}
                </span>
              </button>
            </div>
          </section>

          {/* 게임 설명 */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 font-['Noto_Sans_KR']">
                🎯 게임 특징
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🏯</span>
                    <div>
                      <h4 className="font-bold text-gray-800">고운사 탐험</h4>
                      <p className="text-gray-600">의성의 유서깊은 사찰을 탐험하며 요괴의 흔적을 찾아보세요.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">👻</span>
                    <div>
                      <h4 className="font-bold text-gray-800">요괴 퇴치</h4>
                      <p className="text-gray-600">다양한 요괴들을 만나고 퇴치하여 사찰을 정화하세요.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🧭</span>
                    <div>
                      <h4 className="font-bold text-gray-800">선택의 여정</h4>
                      <p className="text-gray-600">매 순간의 선택이 이야기를 만들어갑니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💎</span>
                    <div>
                      <h4 className="font-bold text-gray-800">아이템 수집</h4>
                      <p className="text-gray-600">여행 중 발견하는 특별한 아이템들을 수집하세요.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
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
