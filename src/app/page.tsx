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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-4">
      <div className="relative w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 flex flex-col items-center text-center space-y-8">
        <Image
          src="./images/main/background.png"
          alt="UDH Logo"
          width={150}
          height={150}
          className="mb-6 animate-pulse"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg">
          UDH - 의성데몬헌터
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
          요괴가 창궐하는 의성, 당신의 선택이 세상을 구원합니다.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full max-w-md">
          <button
            onClick={handleStartNewGame}
            disabled={loading}
            className="w-full flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75 text-lg md:text-xl"
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              '새 게임 시작'
            )}
          </button>
          <button
            onClick={handleLoadGame}
            disabled={loading}
            className="w-full flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-75 text-lg md:text-xl"
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              '게임 불러오기'
            )}
          </button>
        </div>
        <AuthButtons />
      </div>
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
