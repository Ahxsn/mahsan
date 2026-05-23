import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Environment } from "@react-three/drei";
import type { Mesh } from "three";

function Orb() {
  const ref = useRef<Mesh>(null);
  useFrame(({ pointer, clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = pointer.y * 0.35 + Math.sin(t * 0.3) * 0.1;
    ref.current.rotation.y = pointer.x * 0.5 + t * 0.15;
  });
  return (
    <Float speed={1.3} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.6, 6]}>
        <MeshDistortMaterial
          color="#ff2a2a"
          emissive="#7a0000"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.85}
          distort={0.42}
          speed={1.6}
        />
      </Icosahedron>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ff6a6a" />
      <pointLight position={[-4, -2, -4]} intensity={1.2} color="#ffffff" />
      <Suspense fallback={null}>
        <Orb />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}