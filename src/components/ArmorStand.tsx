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

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19.3/assets/minecraft/textures/entity/armorstand/wood.png', (texture) => {
      texture.flipY = false;
    });
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

  const createMinecraftBox = (width: number, height: number, depth: number, uOffset: number, vOffset: number) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const positions = geometry.attributes.position;
    const uvs = new Float32Array(positions.count * 2);

    // UV mapping for each face (front, back, top, bottom, right, left)
    const faces = [
      { u: uOffset, v: vOffset }, // front
      { u: uOffset + width + depth, v: vOffset }, // back
      { u: uOffset + width, v: vOffset }, // top
      { u: uOffset + width + width, v: vOffset }, // bottom
      { u: uOffset + width + width + depth, v: vOffset }, // right
      { u: uOffset + depth, v: vOffset } // left
    ];

    for (let i = 0; i < positions.count; i++) {
      const faceIndex = Math.floor(i / 4);
      const vertexIndex = i % 4;
      const face = faces[Math.floor(faceIndex / 2)];

      const u = face.u / 64;
      const v = face.v / 32;
      const w = (vertexIndex === 0 || vertexIndex === 3) ? width / 64 : 0;
      const h = (vertexIndex === 0 || vertexIndex === 1) ? height / 32 : 0;

      uvs[i * 2] = u + w;
      uvs[i * 2 + 1] = 1 - (v + h);
    }

    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    return geometry;
  };

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.95,
      metalness: 0.05,
    });
  }, [texture]);

  return (
    <group ref={bodyRef} scale={[0.0625, 0.0625, 0.0625]}>
      {/* Base */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 1, 12]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Stand */}
      <mesh position={[0, 15.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[2, 31, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Shoulder */}
      <mesh position={[0, 28, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 2, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 32, 0]}>
        <mesh receiveShadow castShadow geometry={createMinecraftBox(8, 8, 8, 0, 0)} material={material} />
      </group>

      {/* Arms */}
      <group ref={leftArmRef} position={[5, 28, 0]}>
        <mesh receiveShadow castShadow geometry={createMinecraftBox(2, 12, 2, 24, 0)} material={material} />
      </group>

      <group ref={rightArmRef} position={[-5, 28, 0]}>
        <mesh receiveShadow castShadow geometry={createMinecraftBox(2, 12, 2, 16, 0)} material={material} />
      </group>

      {/* Legs */}
      <group ref={leftLegRef} position={[2, 12, 0]}>
        <mesh receiveShadow castShadow geometry={createMinecraftBox(2, 11, 2, 8, 0)} material={material} />
      </group>

      <group ref={rightLegRef} position={[-2, 12, 0]}>
        <mesh receiveShadow castShadow geometry={createMinecraftBox(2, 11, 2, 40, 16)} material={material} />
      </group>
    </group>
  );
}