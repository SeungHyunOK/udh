'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const [hoveredYokai, setHoveredYokai] = useState<number | null>(null);

  // 요괴 이미지 데이터
  const yokaiImages = [
    { id: 1, name: '구미호', image: '/images/landing/gumiho.png' },
    { id: 2, name: '할아버지', image: '/images/landing/grandFather.webp' },
    { id: 3, name: '고양이', image: '/images/landing/cat.webp' },
    { id: 4, name: '도깨비', image: '/images/landing/Goblin2.png' },
    { id: 5, name: '요괴', image: '/images/landing/yogye.webp' },
    { id: 6, name: '호랑이', image: '/images/landing/tigher.webp' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-gray-900 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 맵 배경 이미지 */}
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/images/landing/map.png"
            alt="의성 지도 배경"
            fill
            className="object-cover"
            priority
          />
        </div>

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

      {/* 헤더 섹션 */}
      <header className="text-center py-16 relative">
        {/* 신비로운 오라 효과 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-['Noto_Sans_KR'] relative z-10 drop-shadow-lg tracking-wider">
          UDH-의성데몬헌터
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto font-['Pretendard'] relative z-10 font-medium leading-relaxed">
          의성의 신비로운 요괴들을 물리치고 고대 사찰들을 탐험하는 액션 어드벤처
          게임
        </p>

        {/* 모험의 상징 */}
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse animation-delay-500"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse animation-delay-1000"></div>
        </div>
      </header>

      {/* 게임 개요 섹션 */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 relative overflow-hidden">
          {/* 신비로운 테두리 효과 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

          <h2 className="text-3xl font-bold mb-6 text-center text-red-600 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
            🗺️ 게임 개요
          </h2>
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-600 flex items-center font-['Pretendard']">
                <span className="mr-2">⚔️</span>
                게임 특징
              </h3>
              <ul className="space-y-3 text-gray-700 font-['Pretendard'] font-medium">
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">•</span>
                  의성 지역의 실제 사찰들을 배경으로 한 몰입감 있는 게임플레이
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-orange-500">•</span>
                  한국 전통 요괴들과의 전투 시스템
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yellow-500">•</span>
                  아름다운 그래픽과 사운드로 구현된 한국 전통 문화
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">•</span>
                  다양한 무기와 스킬로 요괴들을 물리치는 액션
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-600 flex items-center font-['Pretendard']">
                <span className="mr-2">📖</span>
                스토리
              </h3>
              <p className="text-gray-700 leading-relaxed font-['Pretendard'] font-medium">
                의성 지역에 나타난 요괴들을 물리치고 고대 사찰들의 평화를 지키는
                데몬헌터가 되어 신비로운 모험을 떠나세요. 각 사찰마다 숨겨진
                비밀과 강력한 요괴들이 기다리고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 유튜브 영상 섹션 */}
      <section className="max-w-4xl mx-auto px-6 py-16 relative">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 relative overflow-hidden">
          {/* 신비로운 테두리 효과 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

          <h2 className="text-3xl font-bold mb-6 text-center text-red-600 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
            🎬 게임 트레일러
          </h2>
          <div className="aspect-video bg-black rounded-xl overflow-hidden relative z-10 shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/F6VVrFvDHO8"
              title="UDH-의성데몬헌터 트레일러"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 요괴 이미지 섹션 */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 relative overflow-hidden">
          {/* 신비로운 테두리 효과 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

          <h2 className="text-3xl font-bold mb-8 text-center text-red-600 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
            👹 물리쳐야 할 요괴들
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {yokaiImages.map(yokai => (
              <div
                key={yokai.id}
                className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
                onMouseEnter={() => setHoveredYokai(yokai.id)}
                onMouseLeave={() => setHoveredYokai(null)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-orange-500 p-1 shadow-lg">
                  <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={yokai.image}
                      alt={yokai.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                  <span className="text-sm font-bold text-white bg-red-600/90 px-2 py-1 rounded shadow-lg font-['Pretendard']">
                    {yokai.name}
                  </span>
                </div>
                {hoveredYokai === yokai.id && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse shadow-lg font-['Pretendard'] font-bold">
                    ⚔️ 물리치기!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 게임 시작 버튼 섹션 */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center relative">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200 relative overflow-hidden">
          {/* 신비로운 테두리 효과 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

          <h2 className="text-3xl font-bold mb-6 text-red-600 font-['Noto_Sans_KR'] relative z-10 tracking-wide">
            🚀 게임을 시작하세요!
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto relative z-10 font-['Pretendard'] font-medium">
            의성의 요괴들과의 전투에 참여하고 고대 사찰들의 비밀을 탐험해보세요.
          </p>

          <div className="flex justify-center relative z-10">
            <Link
              href="/"
              className="group inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white font-black text-xl px-12 py-4 rounded-full hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/50 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2 relative overflow-hidden font-['Noto_Sans_KR'] tracking-wide"
            >
              {/* 버튼 내부 빛 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">⚔️ 게임하러가기</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="text-center py-8 text-gray-600 border-t border-orange-200 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4 font-['Pretendard']">
              📱 SNS에서 더 많은 정보를 확인하세요
            </h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/uiseong2077/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 font-['Pretendard'] font-bold"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@uiseong2077"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded-full hover:from-gray-800 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gray-500/50 font-['Pretendard'] font-bold"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 4 15.74a6.33 6.33 0 0 0 10.48-4.96v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>
          <p className="font-['Pretendard'] font-medium">
            &copy; 2025 UDH-의성데몬헌터. 모든 권리 보유.
          </p>
        </div>
      </footer>

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
