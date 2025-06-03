import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ArmorStandProps {
  frame: {
    head: { x: number; y: number; z: number };
    left_arm: { x: number; y: number; z: number };
    right_arm: { x: number; y: number; z: number };
    left_leg: { x: number; y: number; z: number };
    right_leg: { x: number; y: number; z: number };
  };
}

export default function ArmorStand({ frame }: ArmorStandProps) {
  const bodyRef = React.useRef<THREE.Group>();
  const headRef = React.useRef<THREE.Mesh>();
  const leftArmRef = React.useRef<THREE.Mesh>();
  const rightArmRef = React.useRef<THREE.Mesh>();
  const leftLegRef = React.useRef<THREE.Mesh>();
  const rightLegRef = React.useRef<THREE.Mesh>();

  useFrame(() => {
    if (!headRef.current || !leftArmRef.current || !rightArmRef.current || !leftLegRef.current || !rightLegRef.current) return;

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    headRef.current.rotation.set(toRad(frame.head.x), toRad(frame.head.y), toRad(frame.head.z));
    leftArmRef.current.rotation.set(toRad(frame.left_arm.x), toRad(frame.left_arm.y), toRad(frame.left_arm.z));
    rightArmRef.current.rotation.set(toRad(frame.right_arm.x), toRad(frame.right_arm.y), toRad(frame.right_arm.z));
    leftLegRef.current.rotation.set(toRad(frame.left_leg.x), toRad(frame.left_leg.y), toRad(frame.left_leg.z));
    rightLegRef.current.rotation.set(toRad(frame.right_leg.x), toRad(frame.right_leg.y), toRad(frame.right_leg.z));
  });

  // Minecraft oak wood texture
  const woodTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/minecraft/assets/master/textures/block/oak_planks.png');
  woodTexture.magFilter = THREE.NearestFilter;
  woodTexture.minFilter = THREE.NearestFilter;

  const woodMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 1,
    metalness: 0
  });

  return (
    <group ref={bodyRef} scale={[0.0625, 0.0625, 0.0625]}>
      {/* Base Plate */}
      <mesh position={[0, 1, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 1, 12]} />
        <meshStandardMaterial {...woodMaterial} />
      </mesh>

      {/* Center Pole */}
      <mesh position={[0, 16, 0]} receiveShadow castShadow>
        <boxGeometry args={[2, 30, 2]} />
        <meshStandardMaterial {...woodMaterial} />
      </mesh>

      {/* Shoulder Bar */}
      <mesh position={[0, 28, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 2, 2]} />
        <meshStandardMaterial {...woodMaterial} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 32, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[8, 8, 8]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>

      {/* Arms */}
      <group ref={leftArmRef} position={[5, 28, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 12, 2]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[-5, 28, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 12, 2]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>

      {/* Legs */}
      <group ref={leftLegRef} position={[2, 12, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 11, 2]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[-2, 12, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 11, 2]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>
    </group>
  );
}