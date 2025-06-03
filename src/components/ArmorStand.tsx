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

  // Load the actual Minecraft armor stand texture
  const armorStandTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/entity/armorstand/wood.png');
  armorStandTexture.magFilter = THREE.NearestFilter;
  armorStandTexture.minFilter = THREE.NearestFilter;

  const armorStandMaterial = new THREE.MeshStandardMaterial({
    map: armorStandTexture,
    roughness: 1,
    metalness: 0
  });

  return (
    <group ref={bodyRef} scale={[0.0625, 0.0625, 0.0625]}>
      {/* Base Plate (3x1x3 pixels) */}
      <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 1, 12]} />
        <meshStandardMaterial {...armorStandMaterial} />
      </mesh>

      {/* Center Rod (2x7.5x2 pixels) */}
      <mesh position={[0, 16, 0]} receiveShadow castShadow>
        <boxGeometry args={[2, 30, 2]} />
        <meshStandardMaterial {...armorStandMaterial} />
      </mesh>

      {/* Shoulder Bar (6x1x2 pixels) */}
      <mesh position={[0, 28, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 2, 2]} />
        <meshStandardMaterial {...armorStandMaterial} />
      </mesh>

      {/* Head (2x2x2 pixels) */}
      <group ref={headRef} position={[0, 32, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[8, 8, 8]} />
          <meshStandardMaterial {...armorStandMaterial} />
        </mesh>
      </group>

      {/* Arms (2x6x2 pixels each) */}
      <group ref={leftArmRef} position={[5, 28, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 12, 2]} />
          <meshStandardMaterial {...armorStandMaterial} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[-5, 28, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 12, 2]} />
          <meshStandardMaterial {...armorStandMaterial} />
        </mesh>
      </group>

      {/* Legs (2x5.5x2 pixels each) */}
      <group ref={leftLegRef} position={[2, 12, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 11, 2]} />
          <meshStandardMaterial {...armorStandMaterial} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[-2, 12, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 11, 2]} />
          <meshStandardMaterial {...armorStandMaterial} />
        </mesh>
      </group>
    </group>
  );
}