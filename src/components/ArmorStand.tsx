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

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: '#8B4513',
    roughness: 0.8,
    metalness: 0.1,
  });

  return (
    <group ref={bodyRef}>
      {/* Base Plate */}
      <mesh position={[0, 0.05, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial {...woodMaterial} />
      </mesh>

      {/* Center Rod */}
      <mesh position={[0, 0.85, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 1.6, 0.2]} />
        <meshStandardMaterial {...woodMaterial} />
      </mesh>

      {/* Shoulders Bar */}
      <mesh position={[0, 1.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.6, 0.2, 0.2]} />
        <meshStandardMaterial {...woodMaterial} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 1.7, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>

      {/* Arms */}
      <group ref={leftArmRef} position={[0.3, 1.4, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.125, 0.75, 0.125]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[-0.3, 1.4, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.125, 0.75, 0.125]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>

      {/* Legs */}
      <group ref={leftLegRef} position={[0.125, 0.4, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.125, 0.75, 0.125]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[-0.125, 0.4, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.125, 0.75, 0.125]} />
          <meshStandardMaterial {...woodMaterial} />
        </mesh>
      </group>
    </group>
  );
}