'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const [hoveredYokai, setHoveredYokai] = useState<number | null>(null);

  // 요괴 이미지 데이터
  const yokaiImages = [
    { id: 1, name: '구미호', image: '/images/landing/9mio.webp' },
    { id: 2, name: '할아버지', image: '/images/landing/grandFather.webp' },
    { id: 3, name: '고양이', image: '/images/landing/cat.webp' },
    { id: 4, name: '도깨비', image: '/images/landing/dokabi.webp' },
    { id: 5, name: '요괴', image: '/images/landing/yogye.webp' },
    { id: 6, name: '호랑이', image: '/images/landing/tigher.webp' },
  ];

  // 주요 맵 데이터
  const gameMaps = [
    { name: '나한전', description: '16나한이 거주하는 신성한 전각' },
    { name: '고운사삼층석탑', description: '고려시대의 아름다운 석탑' },
    { name: '용왕당', description: '용왕을 모시는 신비로운 당' },
    { name: '가운루', description: '중앙에 위치한 고대 누각' },
    { name: '대웅보전', description: '부처님을 모시는 본전' },
    { name: '명부전', description: '저승의 왕을 모시는 전각' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-gray-900">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* 헤더 섹션 */}
      <header className="text-center py-16 relative">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-serif">
          UDH-의성데몬헌터
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto font-serif">
          의성의 신비로운 요괴들을 물리치고 고대 사찰들을 탐험하는 액션 어드벤처
          게임
        </p>
      </header>

      {/* 게임 개요 섹션 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-600 font-serif">
            게임 개요
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-600">
                게임 특징
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  • 의성 지역의 실제 사찰들을 배경으로 한 몰입감 있는 게임플레이
                </li>
                <li>• 한국 전통 요괴들과의 전투 시스템</li>
                <li>• 아름다운 그래픽과 사운드로 구현된 한국 전통 문화</li>
                <li>• 다양한 무기와 스킬로 요괴들을 물리치는 액션</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-600">
                스토리
              </h3>
              <p className="text-gray-700 leading-relaxed">
                의성 지역에 나타난 요괴들을 물리치고 고대 사찰들의 평화를 지키는
                데몬헌터가 되어 신비로운 모험을 떠나세요. 각 사찰마다 숨겨진
                비밀과 강력한 요괴들이 기다리고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 유튜브 영상 섹션 */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-600 font-serif">
            게임 트레일러
          </h2>
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/F6VVrFvDHO8"
              title="UDH-의성데몬헌터 트레일러"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 요괴 이미지 섹션 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-200">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-600 font-serif">
            물리쳐야 할 요괴들
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {yokaiImages.map(yokai => (
              <div
                key={yokai.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredYokai(yokai.id)}
                onMouseLeave={() => setHoveredYokai(null)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-orange-500 p-1">
                  <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={yokai.image}
                      alt={yokai.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                  <span className="text-sm font-medium text-white bg-red-600/80 px-2 py-1 rounded">
                    {yokai.name}
                  </span>
                </div>
                {hoveredYokai === yokai.id && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    물리치기!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 맵 섹션 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-200">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-600 font-serif">
            주요 맵
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameMaps.map((map, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-100/80 to-red-100/80 rounded-xl p-6 border border-orange-300 hover:border-orange-400 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-600">{map.name}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-600">
                  {map.name}
                </h3>
                <p className="text-gray-700 text-sm">{map.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 게임 시작 버튼 섹션 */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-200">
          <h2 className="text-3xl font-bold mb-6 text-red-600 font-serif">
            게임을 시작하세요!
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            의성의 요괴들과의 전투에 참여하고 고대 사찰들의 비밀을 탐험해보세요.
          </p>
          <Link
            href="/auth/signin"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl px-12 py-4 rounded-full hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/50"
          >
            게임 시작하기
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="text-center py-8 text-gray-600 border-t border-orange-200">
        <p>&copy; 2025 UDH-의성데몬헌터. 모든 권리 보유.</p>
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
