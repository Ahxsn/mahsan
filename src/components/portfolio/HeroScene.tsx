import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, RoundedBox, Text } from "@react-three/drei";
import type { Group } from "three";

/**
 * Stylized 3D developer workstation — laptop with live "code" lines,
 * a floating monitor with a browser window, and orbiting tech glyphs.
 * Designed to read instantly as: "This person builds websites."
 */
function CodeLine({ y, w, color = "#ff5a5a" }: { y: number; w: number; color?: string }) {
  return (
    <RoundedBox args={[w, 0.05, 0.01]} radius={0.02} position={[-1.1 + w / 2, y, 0.02]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </RoundedBox>
  );
}

function Laptop() {
  const group = useRef<Group>(null);
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = pointer.x * 0.25 + Math.sin(t * 0.25) * 0.08;
    group.current.rotation.x = -0.08 + pointer.y * 0.08;
  });

  // Procedural code lines — gives a real "IDE" feel
  const lines = [
    { y: 0.85, w: 1.6, c: "#ff7a7a" },
    { y: 0.7, w: 1.0, c: "#ffffff" },
    { y: 0.55, w: 1.85, c: "#ffb199" },
    { y: 0.4, w: 1.3, c: "#ffffff" },
    { y: 0.25, w: 1.7, c: "#ff5a5a" },
    { y: 0.1, w: 0.9, c: "#ffffff" },
    { y: -0.05, w: 1.45, c: "#ffa07a" },
    { y: -0.2, w: 1.1, c: "#ffffff" },
    { y: -0.35, w: 1.8, c: "#ff5a5a" },
    { y: -0.5, w: 0.7, c: "#ffffff" },
    { y: -0.65, w: 1.55, c: "#ffb199" },
  ];

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* Base / keyboard */}
      <RoundedBox args={[3.2, 0.12, 2.2]} radius={0.06} position={[0, -0.45, 0.3]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.25} />
      </RoundedBox>
      {/* Trackpad hint */}
      <RoundedBox args={[1.1, 0.005, 0.7]} radius={0.02} position={[0, -0.38, 0.9]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.4} />
      </RoundedBox>

      {/* Screen back */}
      <group rotation={[-0.18, 0, 0]} position={[0, 0.45, -0.55]}>
        <RoundedBox args={[3.2, 2, 0.08]} radius={0.06} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0e0e10" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        {/* Screen face (glow) */}
        <RoundedBox args={[3.05, 1.85, 0.02]} radius={0.04} position={[0, 0, 0.05]}>
          <meshStandardMaterial
            color="#120608"
            emissive="#3a0a0a"
            emissiveIntensity={0.9}
            roughness={0.35}
          />
        </RoundedBox>
        {/* Window chrome dots */}
        {[-1.4, -1.3, -1.2].map((x, i) => (
          <mesh key={i} position={[x, 0.85, 0.07]}>
            <circleGeometry args={[0.035, 16]} />
            <meshBasicMaterial color={["#ff5f57", "#febc2e", "#28c840"][i]} />
          </mesh>
        ))}
        {/* Code lines */}
        <group position={[0, 0, 0.07]}>
          {lines.map((l, i) => (
            <CodeLine key={i} y={l.y} w={l.w} color={l.c} />
          ))}
        </group>
        {/* Cursor blink */}
        <BlinkingCursor />
      </group>

      {/* Floating side monitor with browser window */}
      <FloatingMonitor />
    </group>
  );
}

function BlinkingCursor() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.scale.x = Math.sin(clock.getElapsedTime() * 3) > 0 ? 1 : 0;
  });
  return (
    <group ref={ref} position={[0.45, -0.5, 0.08]}>
      <RoundedBox args={[0.04, 0.12, 0.01]} radius={0.005}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
      </RoundedBox>
    </group>
  );
}

function FloatingMonitor() {
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.8}>
      <group position={[2.4, 0.8, -0.3]} rotation={[0, -0.45, 0]}>
        <RoundedBox args={[1.8, 1.25, 0.06]} radius={0.05}>
          <meshStandardMaterial color="#0c0c0e" metalness={0.85} roughness={0.25} />
        </RoundedBox>
        <RoundedBox args={[1.7, 1.15, 0.02]} radius={0.03} position={[0, 0, 0.04]}>
          <meshStandardMaterial color="#fafafa" emissive="#ffffff" emissiveIntensity={0.35} />
        </RoundedBox>
        {/* address bar */}
        <RoundedBox args={[1.55, 0.08, 0.005]} radius={0.02} position={[0, 0.45, 0.06]}>
          <meshStandardMaterial color="#ececec" />
        </RoundedBox>
        {/* hero block */}
        <RoundedBox args={[1.55, 0.42, 0.005]} radius={0.03} position={[0, 0.12, 0.06]}>
          <meshStandardMaterial color="#111" />
        </RoundedBox>
        <RoundedBox args={[0.45, 0.1, 0.005]} radius={0.02} position={[-0.5, 0.15, 0.07]}>
          <meshStandardMaterial color="#ff5a5a" emissive="#ff5a5a" emissiveIntensity={0.7} />
        </RoundedBox>
        {/* content rows */}
        {[-0.18, -0.32, -0.46].map((y, i) => (
          <RoundedBox key={i} args={[1.3 - i * 0.2, 0.05, 0.005]} radius={0.01} position={[-0.1, y, 0.06]}>
            <meshStandardMaterial color="#d4d4d4" />
          </RoundedBox>
        ))}
      </group>
    </Float>
  );
}

function OrbitingTag({ label, color, radius, speed, offset }: { label: string; color: string; radius: number; speed: number; offset: number }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius * 0.6;
    ref.current.position.y = Math.sin(t * 1.3) * 0.3 + 0.3;
    ref.current.rotation.y = -t;
  });
  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <RoundedBox args={[label.length * 0.18 + 0.2, 0.32, 0.08]} radius={0.05}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.4} roughness={0.3} />
        </RoundedBox>
        <Text position={[0, 0, 0.05]} fontSize={0.14} color="#fff" anchorX="center" anchorY="middle">
          {label}
        </Text>
      </Float>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0.5, 1.1, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} color="#ffd6c8" />
      <pointLight position={[-5, -2, -4]} intensity={1.2} color="#ff4a4a" />
      <pointLight position={[3, 3, 2]} intensity={0.7} color="#ffffff" />
      <Suspense fallback={null}>
        <Laptop />
        <OrbitingTag label="< / >" color="#ef4444" radius={3.2} speed={0.45} offset={0} />
        <OrbitingTag label="WP" color="#1f1f1f" radius={3.4} speed={0.35} offset={2.1} />
        <OrbitingTag label="JS" color="#f7df1e" radius={3.0} speed={0.5} offset={4.2} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}