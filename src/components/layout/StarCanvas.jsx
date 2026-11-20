import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;

    const starCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 3200;
      positions[i3 + 1] = (Math.random() - 0.5) * 3200;
      positions[i3 + 2] = (Math.random() - 0.5) * 2500;

      // Clean cosmic starfield: fine crystalline white with subtle celestial blue/violet accents
      const mix = Math.random();
      if (mix < 0.15) {
        colors[i3] = 0.55;
        colors[i3 + 1] = 0.82;
        colors[i3 + 2] = 1.0; // Soft celestial blue
      } else if (mix < 0.3) {
        colors[i3] = 0.78;
        colors[i3 + 1] = 0.65;
        colors[i3 + 2] = 1.0; // Soft lavender
      } else {
        colors[i3] = 0.98;
        colors[i3 + 1] = 0.98;
        colors[i3 + 2] = 1.0; // Crystal white
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouse.x = Math.max(-1, Math.min(1, e.gamma / 30));
        mouse.y = Math.max(-1, Math.min(1, (e.beta - 40) / 30));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      stars.rotation.y += 0.0004;
      stars.rotation.x += 0.0002;

      camera.position.x += (mouse.x * 90 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 60 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      id="starCanvas"
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  );
}
