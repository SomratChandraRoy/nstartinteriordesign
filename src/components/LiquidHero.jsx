import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGL liquid distortion canvas using a custom fragment shader.
 * Applies ripple displacement to a texture based on pointer position + time.
 */
export default function LiquidHero({ imageUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageUrl) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseTarget: { value: new THREE.Vector2(0.5, 0.5) },
      uTexture: { value: null },
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageRes: { value: new THREE.Vector2(1, 1) },
      uHover: { value: 0 },
      uHoverTarget: { value: 0 },
    };

    loader.load(
      imageUrl,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        uniforms.uTexture.value = tex;
        uniforms.uImageRes.value.set(tex.image.width, tex.image.height);
      },
      undefined,
      () => {},
    );

    const vertexShader = /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      uniform vec2 uImageRes;
      uniform float uHover;

      // simplex-ish smooth noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      // cover-fit uv mapping (like background-size: cover)
      vec2 coverUV(vec2 uv, vec2 res, vec2 imgRes) {
        float screenA = res.x / res.y;
        float imageA = imgRes.x / imgRes.y;
        vec2 newUV = uv;
        if (screenA < imageA) {
          // image wider than screen
          float scale = screenA / imageA;
          newUV.x = (uv.x - 0.5) * scale + 0.5;
        } else {
          float scale = imageA / screenA;
          newUV.y = (uv.y - 0.5) * scale + 0.5;
        }
        return newUV;
      }

      void main() {
        vec2 uv = coverUV(vUv, uResolution, uImageRes);

        // Pointer ripple
        vec2 toMouse = uv - uMouse;
        float dist = length(toMouse);
        float ripple = sin(dist * 26.0 - uTime * 1.8) * exp(-dist * 6.0);
        vec2 dir = normalize(toMouse + 0.0001);

        // Ambient liquid noise drift
        float n = noise(uv * 3.0 + uTime * 0.08);
        float n2 = noise(uv * 5.0 - uTime * 0.05);
        vec2 drift = vec2(n - 0.5, n2 - 0.5) * 0.012;

        vec2 displaced = uv + dir * ripple * (0.018 + uHover * 0.03) + drift;

        // Chromatic aberration on RGB samples
        float aberration = 0.004 + uHover * 0.006;
        float r = texture2D(uTexture, displaced + dir * aberration).r;
        float g = texture2D(uTexture, displaced).g;
        float b = texture2D(uTexture, displaced - dir * aberration).b;
        vec3 col = vec3(r, g, b);

        // Vignette
        float v = smoothstep(1.4, 0.4, length(vUv - 0.5));
        col *= mix(0.4, 1.0, v);

        // Tint slightly toward indigo/teal in shadows
        float lum = dot(col, vec3(0.299, 0.587, 0.114));
        vec3 tint = mix(vec3(0.04, 0.05, 0.12), col, smoothstep(0.0, 0.6, lum));
        col = mix(col, tint, 0.45);

        // Darken overall for hero readability
        col *= 0.85;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let raf;
    const clock = new THREE.Clock();

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uMouseTarget.value.set(x, y);
      uniforms.uHoverTarget.value = 1.0;
    };
    const onPointerLeave = () => {
      uniforms.uHoverTarget.value = 0.0;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      // ease mouse + hover
      uniforms.uMouse.value.lerp(uniforms.uMouseTarget.value, 0.08);
      uniforms.uHover.value +=
        (uniforms.uHoverTarget.value - uniforms.uHover.value) * 0.06;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      material.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}
