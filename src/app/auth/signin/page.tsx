'use client';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
          <p className="text-gray-600">
            UDH-의성데몬헌터에 오신 것을 환영합니다
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-lg">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔐</div>
            <p className="text-gray-600 mb-4">
              정적 배포 버전에서는 로그인 기능을 사용할 수 없습니다.
            </p>
            <p className="text-sm text-gray-500">
              게임을 바로 시작하려면 메인 페이지로 돌아가세요.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              🏠 메인 페이지로 돌아가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

