import React, { useEffect, useMemo } from 'react';
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

  // Load texture once and reuse
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/entity/armorstand/wood.png');
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    return tex;
  }, []);

  useFrame(() => {
    if (!headRef.current || !leftArmRef.current || !rightArmRef.current || !leftLegRef.current || !rightLegRef.current) return;

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    headRef.current.rotation.set(toRad(frame.head.x), toRad(frame.head.y), toRad(frame.head.z));
    leftArmRef.current.rotation.set(toRad(frame.left_arm.x), toRad(frame.left_arm.y), toRad(frame.left_arm.z));
    rightArmRef.current.rotation.set(toRad(frame.right_arm.x), toRad(frame.right_arm.y), toRad(frame.right_arm.z));
    leftLegRef.current.rotation.set(toRad(frame.left_leg.x), toRad(frame.left_leg.y), toRad(frame.left_leg.z));
    rightLegRef.current.rotation.set(toRad(frame.right_leg.x), toRad(frame.right_leg.y), toRad(frame.right_leg.z));
  });

  // Create geometries with proper UV mapping
  const createBoxWithUVs = (width: number, height: number, depth: number, u: number, v: number) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const uvAttribute = geometry.attributes.uv;
    const uvs = uvAttribute.array;

    // UV mapping for Minecraft texture (64x32 texture)
    const x1 = u / 64;
    const x2 = (u + width) / 64;
    const y1 = v / 32;
    const y2 = (v + height) / 32;

    // Set UVs for each face
    for (let i = 0; i < uvs.length; i += 2) {
      uvs[i] = i % 4 < 2 ? x1 : x2;
      uvs[i + 1] = i % 4 === 0 || i % 4 === 3 ? y2 : y1;
    }

    uvAttribute.needsUpdate = true;
    return geometry;
  };

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 1,
      metalness: 0
    });
  }, [texture]);

  return (
    <group ref={bodyRef} scale={[0.0625, 0.0625, 0.0625]}>
      {/* Base Plate */}
      <mesh position={[0, 0.5, 0]} receiveShadow castShadow geometry={createBoxWithUVs(12, 1, 12, 0, 0)} material={material} />

      {/* Center Rod */}
      <mesh position={[0, 16, 0]} receiveShadow castShadow geometry={createBoxWithUVs(2, 30, 2, 0, 11)} material={material} />

      {/* Shoulder Bar */}
      <mesh position={[0, 28, 0]} receiveShadow castShadow geometry={createBoxWithUVs(12, 2, 2, 0, 26)} material={material} />

      {/* Head */}
      <group ref={headRef} position={[0, 32, 0]}>
        <mesh receiveShadow castShadow geometry={createBoxWithUVs(8, 8, 8, 0, 0)} material={material} />
      </group>

      {/* Arms */}
      <group ref={leftArmRef} position={[5, 28, 0]}>
        <mesh receiveShadow castShadow geometry={createBoxWithUVs(2, 12, 2, 24, 0)} material={material} />
      </group>

      <group ref={rightArmRef} position={[-5, 28, 0]}>
        <mesh receiveShadow castShadow geometry={createBoxWithUVs(2, 12, 2, 16, 0)} material={material} />
      </group>

      {/* Legs */}
      <group ref={leftLegRef} position={[2, 12, 0]}>
        <mesh receiveShadow castShadow geometry={createBoxWithUVs(2, 11, 2, 8, 0)} material={material} />
      </group>

      <group ref={rightLegRef} position={[-2, 12, 0]}>
        <mesh receiveShadow castShadow geometry={createBoxWithUVs(2, 11, 2, 40, 16)} material={material} />
      </group>
    </group>
  );
}