"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ThreeDModel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene 설정 (밤 숲 느낌)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a1026"); // 어두운 남색
    scene.fog = new THREE.Fog("#0a1026", 6, 16); // 안개 추가
    sceneRef.current = scene;

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(15, 10, 15);

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 컨테이너에 renderer 추가
    mountRef.current.appendChild(renderer.domElement);

    // AmbientLight (밤 숲의 은은한 푸른빛)
    const ambientLight = new THREE.AmbientLight(0x223344, 1.2); // 푸른빛, 강도 높임
    scene.add(ambientLight);

    // DirectionalLight (달빛 느낌, 약간 푸른빛)
    const moonLight = new THREE.DirectionalLight(0x99ccff, 1.1);
    moonLight.position.set(5, 10, 8);
    moonLight.castShadow = true;
    scene.add(moonLight);

    // 바닥(흙 느낌의 어두운 갈색)
    const groundGeo = new THREE.PlaneGeometry(50, 50);
    const groundMat = new THREE.MeshPhongMaterial({
      color: 0x2d1b0e, // 어두운 갈색 (흙색)
      shininess: 5, // 반사도 낮춤
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // 컨트롤 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // GLTF 모델 로드 (고양이)
    const loader = new GLTFLoader();
    loader.load(
      "/api/3d-model/witch_cat.glb",
      (gltf) => {
        const cat = gltf.scene;
        cat.scale.setScalar(2);
        // 중앙 배치
        const box = new THREE.Box3().setFromObject(cat);
        const center = box.getCenter(new THREE.Vector3());
        cat.position.sub(center);
        cat.position.y = 0.1; // 살짝 위로
        cat.position.x = 0; // 중앙
        cat.position.z = 0; // 중앙
        scene.add(cat);
        console.log("고양이 모델 로드 완료");
      },
      undefined,
      (error) => {
        console.error("고양이 모델 로딩 에러:", error);
      }
    );

    // GLTF 모델 로드 (집)
    loader.load(
      "/api/3d-model/witch_cat_house.glb",
      (gltf) => {
        const house = gltf.scene;
        house.scale.setScalar(2);
        // 중앙 배치 후 대각선 뒤쪽(x: 2, z: -3)
        const box = new THREE.Box3().setFromObject(house);
        const center = box.getCenter(new THREE.Vector3());
        house.position.sub(center);
        house.position.x = 2; // 오른쪽
        house.position.z = -3; // 뒤쪽
        house.position.y = -0.2; // 바닥에 맞춤
        house.rotation.y = Math.PI; // 180도 회전
        scene.add(house);
        console.log("집 모델 로드 완료");
      },
      undefined,
      (error) => {
        console.error("집 모델 로딩 에러:", error);
      }
    );

    // GLTF 모델 로드 (나무들)
    const treePositions = [
      { x: -5.5, z: -1.5, rotation: 0.3 }, // 왼쪽 뒤
      { x: 5.5, z: -0.8, rotation: -0.2 }, // 오른쪽 뒤
      { x: -4.8, z: 2.2, rotation: 0.8 }, // 왼쪽 앞
      { x: 4.5, z: 2.8, rotation: -0.5 }, // 오른쪽 앞
    ];

    treePositions.forEach((pos, index) => {
      loader.load(
        "/api/3d-model/shaped_tree.glb",
        (gltf) => {
          const tree = gltf.scene;
          tree.scale.setScalar(1.5);
          // 중앙 배치 후 위치 조정
          const box = new THREE.Box3().setFromObject(tree);
          const center = box.getCenter(new THREE.Vector3());
          tree.position.sub(center);
          tree.position.x = pos.x;
          tree.position.z = pos.z;
          tree.position.y = -0.2; // 바닥에 맞춤
          tree.rotation.y = pos.rotation; // 각각 다른 각도로 회전
          scene.add(tree);
          console.log(`나무 ${index + 1} 로드 완료`);
        },
        undefined,
        (error) => {
          console.error(`나무 ${index + 1} 로딩 에러:`, error);
        }
      );
    });

    // 리사이즈 핸들러
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 애니메이션 루프
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 정리 함수
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ background: "linear-gradient(135deg, #0a1026 0%, #1a2e1a 100%)" }}
    />
  );
}
