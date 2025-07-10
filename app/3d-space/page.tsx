import { Metadata } from "next";
import dynamic from "next/dynamic";

// Three.js 컴포넌트를 클라이언트 사이드에서만 렌더링하도록 동적 임포트
const ThreeDModel = dynamic(() => import("@domains/3d/components/ThreeDModel"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">3D 모델을 로딩 중입니다...</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "3D Space - Jung's Tech Blog",
  description: "Three.js를 사용한 3D 모델 체험 공간입니다.",
  openGraph: {
    title: "3D Space - Jung's Tech Blog",
    description: "Three.js를 사용한 3D 모델 체험 공간입니다.",
  },
};

export default function ThreeDSpacePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">3D Space</h1>
        <div className="w-full h-[80vh] bg-black rounded-lg overflow-hidden">
          <ThreeDModel />
        </div>
        <div className="mt-8 text-center text-gray-300">
          <p>마우스로 드래그하여 모델을 회전시킬 수 있습니다.</p>
          <p>스크롤로 확대/축소가 가능합니다.</p>
        </div>
      </div>
    </div>
  );
}
