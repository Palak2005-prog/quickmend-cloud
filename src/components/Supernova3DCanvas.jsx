import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Supernova3DCanvas() {
  const containerRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer, scene, camera, animId;
    let supernovaMesh, accretionDisk, particleSystem, energyRings = [];
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let clock = new THREE.Clock();

    try {
      // 1. Scene Setup
      scene = new THREE.Scene();
      
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 18;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // 2. Custom Supernova Core Shader
      const supernovaVertexShader = `
        uniform float uTime;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        // Simplex 3D noise helper
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 = v - i + dot(i, C.xxx) ;
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod(i, 289.0 );
          vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z.xxxx);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vUv = uv;
          vNormal = normal;
          
          // Dynamic vertex noise displacement
          float noise = snoise(position * 0.45 + vec3(uTime * 0.25));
          vec3 newPosition = position + normal * (noise * 0.55);
          
          vPosition = newPosition;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `;

      const supernovaFragmentShader = `
        uniform float uTime;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = 1.0 - dot(viewDirection, vNormal);
          fresnel = pow(fresnel, 2.2);

          // Deep cosmic core colors: Cyan, Electric Purple, Solar Orange
          vec3 colorCyan = vec3(0.22, 0.74, 0.97);    // #38bdf8
          vec3 colorPurple = vec3(0.65, 0.33, 0.97);  // #a855f7
          vec3 colorOrange = vec3(0.98, 0.45, 0.09);  // #f97316
          vec3 colorCore = vec3(0.07, 0.09, 0.25);    // Deep dark base

          // Plasma wave pulsing
          float wave = sin(vPosition.y * 3.0 + uTime * 1.5) * 0.5 + 0.5;
          float wave2 = cos(vPosition.x * 2.5 - uTime * 1.2) * 0.5 + 0.5;

          vec3 finalColor = mix(colorCore, colorPurple, wave * 0.7);
          finalColor = mix(finalColor, colorCyan, wave2 * 0.6);
          finalColor = mix(finalColor, colorOrange, pow(fresnel, 4.0) * 0.8);
          
          // Intense rim glow
          finalColor += colorCyan * (fresnel * 1.3);

          gl_FragColor = vec4(finalColor, 0.92);
        }
      `;

      const coreGeometry = new THREE.SphereGeometry(3.6, 64, 64);
      const coreMaterial = new THREE.ShaderMaterial({
        vertexShader: supernovaVertexShader,
        fragmentShader: supernovaFragmentShader,
        uniforms: {
          uTime: { value: 0 }
        },
        transparent: true,
        wireframe: false
      });

      supernovaMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      scene.add(supernovaMesh);

      // 3. Glowing Wireframe Shell
      const wireGeometry = new THREE.IcosahedronGeometry(4.3, 3);
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.12
      });
      const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
      supernovaMesh.add(wireMesh);

      // 4. Accretion Disk / Orbital Rings
      const ringGeometry = new THREE.RingGeometry(5.2, 7.8, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending
      });
      accretionDisk = new THREE.Mesh(ringGeometry, ringMaterial);
      accretionDisk.rotation.x = Math.PI / 2.5;
      accretionDisk.rotation.y = Math.PI / 8;
      scene.add(accretionDisk);

      // Secondary nested orbital ring
      const innerRingGeo = new THREE.RingGeometry(4.5, 4.7, 48);
      const innerRingMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
      innerRing.rotation.x = Math.PI / 2.2;
      scene.add(innerRing);
      energyRings.push(innerRing);

      // 5. 3D Cosmic Particle Swarm / Star Cluster
      const particleCount = 1200;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      const colorPalette = [
        new THREE.Color(0x38bdf8),
        new THREE.Color(0xa855f7),
        new THREE.Color(0xf97316),
        new THREE.Color(0xffffff),
      ];

      for (let i = 0; i < particleCount; i++) {
        const radius = THREE.MathUtils.randFloat(5.5, 24);
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        const phi = THREE.MathUtils.randFloatSpread(Math.PI * 0.8);

        positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i * 3 + 1] = radius * Math.sin(phi) * 0.6; // Flatten into disk
        positions[i * 3 + 2] = radius * Math.cos(theta) * Math.cos(phi);

        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = chosenColor.r;
        colors[i * 3 + 1] = chosenColor.g;
        colors[i * 3 + 2] = chosenColor.b;

        scales[i] = Math.random() * 2 + 0.5;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Particle shader or point material
      const particleMat = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });

      particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // 6. Ambient Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 50);
      pointLight1.position.set(10, 10, 10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xa855f7, 3, 50);
      pointLight2.position.set(-10, -10, -10);
      scene.add(pointLight2);

      // 7. Mouse and Parallax Listeners
      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        mouse.targetX = (e.clientX / innerWidth - 0.5) * 2;
        mouse.targetY = (e.clientY / innerHeight - 0.5) * 2;
      };

      const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          mouse.targetX = (touch.clientX / window.innerWidth - 0.5) * 1.5;
          mouse.targetY = (touch.clientY / window.innerHeight - 0.5) * 1.5;
        }
      };

      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('resize', handleResize);

      // 8. Animation Loop
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Update shaders
        if (coreMaterial.uniforms) {
          coreMaterial.uniforms.uTime.value = elapsedTime;
        }

        // Rotate core & meshes
        if (supernovaMesh) {
          supernovaMesh.rotation.y = elapsedTime * 0.15 + mouse.x * 0.4;
          supernovaMesh.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + mouse.y * 0.3;
          wireMesh.rotation.y = -elapsedTime * 0.1;
        }

        // Rotate accretion disk
        if (accretionDisk) {
          accretionDisk.rotation.z = elapsedTime * 0.08;
          accretionDisk.rotation.x = Math.PI / 2.5 + mouse.y * 0.15;
          accretionDisk.rotation.y = Math.PI / 8 + mouse.x * 0.15;
        }

        if (innerRing) {
          innerRing.rotation.z = -elapsedTime * 0.12;
        }

        // Rotate particle galaxy
        if (particleSystem) {
          particleSystem.rotation.y = elapsedTime * 0.03 + mouse.x * 0.1;
          particleSystem.rotation.x = mouse.y * 0.08;
        }

        // Subtle camera float
        camera.position.x = mouse.x * 1.2;
        camera.position.y = -mouse.y * 1.2;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      animate();

    } catch (err) {
      console.warn('WebGL init fallback:', err);
      setIsSupported(false);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Fallback CSS animated sphere if WebGL unsupported */}
      {!isSupported && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 blur-3xl opacity-40 animate-pulse-slow" />
        </div>
      )}

      {/* Atmospheric radial vignette */}
      <div className="absolute inset-0 bg-radial-gradient-hero pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030712] to-transparent pointer-events-none" />
    </div>
  );
}
