'use client'

/**
 * WebGLRibbon — shader-based flowing ribbon background.
 *
 * Architecture
 * ─────────────────────────────────────────────────────────────────────────────
 *  Three PlaneGeometry meshes, each deformed entirely inside a vertex shader
 *  into a flowing ribbon strip. No CPU vertex work per frame — only uniform
 *  updates. Fragment shader applies a 3-stop gradient + spine highlight
 *  matching the MENAMARK logo palette.
 *
 * Feature flag: set RIBBON_ENABLED = false to disable with zero runtime cost.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Feature flag ──────────────────────────────────────────────────────────────
const RIBBON_ENABLED = true

// ── Palette — sampled directly from the logo gradient ────────────────────────
const DEEP   = new THREE.Color('#3d0e6b') // darkest indigo-purple (inner shadow)
const MID    = new THREE.Color('#8230c8') // vivid purple          (core)
const BRIGHT = new THREE.Color('#c4389a') // hot magenta-pink      (highlight)

// ── Vertex shader ─────────────────────────────────────────────────────────────
// Each mesh is a flat PlaneGeometry(1,1, L, W).
// uv.x = 0..1 along ribbon length, uv.y = 0..1 across ribbon width.
// The shader maps the flat grid into a flowing 3-D ribbon using
// stacked sine waves (no external noise lib needed).
const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;     // per-ribbon phase shift
  uniform float uAmplitude;  // vertical swing ±
  uniform float uWidthScale; // ribbon half-width in world units
  uniform float uYOffset;    // vertical centering
  uniform float uZOffset;    // depth offset

  varying vec2  vUv;
  varying float vAlpha;

  // Multi-frequency sine stack — approximates smooth organic noise
  float sineNoise(float t, float time) {
    return
      sin(t *  2.10 + time * 0.55 + uOffset       ) * 0.50 +
      sin(t *  4.30 + time * 0.85 + uOffset * 1.30) * 0.22 +
      sin(t *  8.70 + time * 1.35 + uOffset * 0.70) * 0.09 +
      sin(t * 17.10 + time * 2.00 + uOffset * 1.10) * 0.04;
  }

  void main() {
    vUv = uv;

    float t  = uv.x;        // 0..1 along ribbon
    float hw = uv.y - 0.5;  // -0.5..0.5 across ribbon width

    // ── Spine path ────────────────────────────────────────────────────────
    const float xSpan = 9.0;
    float x = (t - 0.5) * xSpan;
    float y = sineNoise(t,        uTime) * uAmplitude + uYOffset;
    float z = sineNoise(t + 3.97, uTime * 0.55) * 0.35 + uZOffset;

    // ── Spine tangent (central difference) ───────────────────────────────
    float dt   = 0.004;
    float yFwd = sineNoise(t + dt, uTime) * uAmplitude;
    float yBwd = sineNoise(t - dt, uTime) * uAmplitude;
    vec2 tangent = normalize(vec2(xSpan * dt * 2.0, yFwd - yBwd));
    vec2 perp    = vec2(-tangent.y, tangent.x);

    // ── Width: taper smoothly at both ends ───────────────────────────────
    float taper = sin(t * 3.14159);
    float w     = hw * uWidthScale * (0.15 + taper * 0.85);

    // ── Silk twist: rotate ribbon slightly around its spine ──────────────
    float twist = sin(t * 6.28318 + uTime * 0.4 + uOffset) * 0.12;
    float cosT  = cos(twist);
    float sinT  = sin(twist);

    vec3 pos = vec3(
      x  + perp.x * w * cosT,
      y  + perp.y * w * cosT,
      z  + w       * sinT + abs(hw) * 0.12
    );

    // ── Edge feather — 12 % on each side ─────────────────────────────────
    vAlpha = smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.88, uv.y);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// ── Fragment shader ───────────────────────────────────────────────────────────
const FRAG = /* glsl */ `
  uniform vec3  uColorA;   // gradient stop 0  (t = 0.0)
  uniform vec3  uColorB;   // gradient stop 1  (t = 0.5)
  uniform vec3  uColorC;   // gradient stop 2  (t = 1.0)
  uniform float uOpacity;

  varying vec2  vUv;
  varying float vAlpha;

  void main() {
    float t = vUv.x;

    // 3-stop gradient along ribbon length
    vec3 color = t < 0.5
      ? mix(uColorA, uColorB, t * 2.0)
      : mix(uColorB, uColorC, (t - 0.5) * 2.0);

    // Spine highlight — gloss streak down the center (logo-accurate)
    float spine = 1.0 - abs(vUv.y - 0.5) * 2.0;
    float gloss = smoothstep(0.55, 1.0, spine);
    color = mix(color, color + vec3(0.18, 0.06, 0.10), gloss);

    float alpha = vAlpha * uOpacity;
    if (alpha < 0.005) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

// ── Ribbon descriptors ────────────────────────────────────────────────────────
const RIBBONS = [
  // Primary — wide, full palette, most prominent
  {
    lengthSeg: 160, widthSeg: 16,
    amplitude: 1.8, widthScale: 0.72,
    yOffset:  0.05, zOffset:  0.00, offset: 0.00,
    opacity: 0.28,
    ca: DEEP, cb: MID, cc: BRIGHT,
  },
  //Secondary — narrower, phase-shifted
  {
    lengthSeg: 120, widthSeg: 12,
    amplitude: 0.90, widthScale: 0.50,
    yOffset:  0.55, zOffset: -0.30, offset: 2.40,
    opacity: 0.32,
    ca: MID, cb: BRIGHT, cc: DEEP,
  },
  // // Accent — slimmest, adds depth
  // {
  //   lengthSeg: 90, widthSeg: 10,
  //   amplitude: 0.80, widthScale: 0.34,
  //   yOffset: -0.45, zOffset: -0.60, offset: 4.80,
  //   opacity: 0.18,
  //   ca: BRIGHT, cb: MID, cc: DEEP,
  // },
] as const

// ── Uniform type ─────────────────────────────────────────────────────────────
interface RibbonUniforms {
  uTime:       { value: number }
  uOffset:     { value: number }
  uAmplitude:  { value: number }
  uWidthScale: { value: number }
  uYOffset:    { value: number }
  uZOffset:    { value: number }
  uColorA:     { value: THREE.Color }
  uColorB:     { value: THREE.Color }
  uColorC:     { value: THREE.Color }
  uOpacity:    { value: number }
  [uniform: string]: { value: unknown }
}

// ── Component ─────────────────────────────────────────────────────────────────
export function WebGLRibbon() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!RIBBON_ENABLED) return

    const container = containerRef.current
    if (!container) return

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      alpha:           true,
      antialias:       false,
      powerPreference: 'low-power',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    const glCanvas = renderer.domElement
    Object.assign(glCanvas.style, {
      position:      'absolute',
      inset:         '0',
      width:         '100%',
      height:        '100%',
      pointerEvents: 'none',
      display:       'block',
    })
    container.appendChild(glCanvas)

    // ── Scene & camera ────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50)
    camera.position.z = 4

    const syncSize = () => {
      const w = container.offsetWidth  || window.innerWidth
      const h = container.offsetHeight || window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    // ── Build ribbon meshes ───────────────────────────────────────────────
    const allUniforms: RibbonUniforms[] = []
    const allMeshes:   THREE.Mesh[]     = []

    for (const cfg of RIBBONS) {
      const geo = new THREE.PlaneGeometry(1, 1, cfg.lengthSeg, cfg.widthSeg)

      const uniforms: RibbonUniforms = {
        uTime:       { value: 0 },
        uOffset:     { value: cfg.offset },
        uAmplitude:  { value: cfg.amplitude },
        uWidthScale: { value: cfg.widthScale },
        uYOffset:    { value: cfg.yOffset },
        uZOffset:    { value: cfg.zOffset },
        uColorA:     { value: cfg.ca.clone() },
        uColorB:     { value: cfg.cb.clone() },
        uColorC:     { value: cfg.cc.clone() },
        uOpacity:    { value: cfg.opacity },
      }

      const mat = new THREE.ShaderMaterial({
        vertexShader:   VERT,
        fragmentShader: FRAG,
        uniforms,
        transparent: true,
        depthWrite:  false,
        side:        THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)
      allMeshes.push(mesh)
      allUniforms.push(uniforms)
    }

    // ── Resize observer ───────────────────────────────────────────────────
    const ro = new ResizeObserver(syncSize)
    ro.observe(container)

    // ── Render loop ───────────────────────────────────────────────────────
    let raf: number

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = performance.now() / 1000
      for (const u of allUniforms) u.uTime.value = t
      renderer.render(scene, camera)
    }

    raf = requestAnimationFrame(() => { syncSize(); tick() })

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      for (const m of allMeshes) {
        m.geometry.dispose()
        ;(m.material as THREE.ShaderMaterial).dispose()
      }
      renderer.dispose()
      if (glCanvas.parentNode === container) container.removeChild(glCanvas)
    }
  }, [])

  if (!RIBBON_ENABLED) return null

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 -z-20"
      style={{ pointerEvents: 'none' }}
    />
  )
}
