import { useMemo, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatMotion({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(clock.elapsedTime * .7) * .09
    ref.current.rotation.y += .0008
  })
  return <group ref={ref}>{children}</group>
}

function SparkField() {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const positions = new Float32Array(38 * 3)
    for (let i = 0; i < 38; i++) {
      positions[i * 3] = (Math.random() - .5) * 4.4
      positions[i * 3 + 1] = (Math.random() - .5) * 4.4
      positions[i * 3 + 2] = (Math.random() - .5) * 2.2
    }
    const result = new THREE.BufferGeometry()
    result.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return result
  }, [])
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.elapsedTime * .012 })
  return <points ref={ref} geometry={geometry}><pointsMaterial color="#e8ca83" size={.018} transparent opacity={.56} sizeAttenuation /></points>
}

function Ribbon({ points, radius, color, metalness = 0.82, roughness = 0.18 }: { points: [number, number, number][]; radius: number; color: string; metalness?: number; roughness?: number }) {
  const geometry = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), 96, radius, 10, false), [points, radius])
  return <mesh geometry={geometry} castShadow><meshPhysicalMaterial color={color} metalness={metalness} roughness={roughness} clearcoat={1} clearcoatRoughness={0.12} /></mesh>
}

function AurexSculpture() {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime
    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.18 + Math.sin(t * 0.24) * 0.1 - group.current.rotation.y) * 0.018
      group.current.rotation.x += (-pointer.y * 0.13 + Math.sin(t * 0.31) * 0.04 - group.current.rotation.x) * 0.018
      group.current.rotation.z = Math.sin(t * 0.18) * 0.025
    }
    if (core.current) { const scale = 1 + Math.sin(t * 1.3) * 0.055; core.current.scale.setScalar(scale) }
  })
  return <group ref={group} scale={1.02}>
    <Ribbon points={[[-1.15,-1.45,0],[0,-.85,.12],[1.05,-1.4,0],[.82,-.05,.08],[.18,1.38,0],[0,1.62,0],[-.22,1.35,-.03],[-.82,-.05,0],[-1.15,-1.45,0]]} radius={.105} color="#f1e7d0" />
    <Ribbon points={[[-.82,-.52,.34],[-.35,-.34,.46],[.22,-.48,.34],[.62,-.28,.2],[.32,-.08,.38],[-.12,.02,.43],[-.48,.26,.24],[-.12,.48,.1],[.45,.42,.03],[.78,.64,-.04]]} radius={.065} color="#faf7ef" />
    <Ribbon points={[[.48,-1.12,-.25],[.18,-.55,-.34],[-.2,.06,-.36],[-.58,.58,-.25],[-.36,.88,-.2],[.2,.8,-.18],[.62,.52,-.2],[.4,.22,-.26],[-.02,.26,-.34],[-.3,.48,-.31]]} radius={.045} color="#d1a64f" metalness={.45} roughness={.23} />
    <mesh ref={core} position={[0, .05, .28]}><icosahedronGeometry args={[.24, 2]} /><meshPhysicalMaterial color="#e8ca83" emissive="#886322" emissiveIntensity={1.9} roughness={.12} metalness={.32} clearcoat={1} /></mesh>
    <mesh rotation={[.25,.3,.45]}><torusGeometry args={[1.17,.012,8,128]} /><meshBasicMaterial color="#f1d9a6" transparent opacity={.34} /></mesh>
    <pointLight color="#d1a64f" intensity={3.4} distance={5} position={[0,0,1.2]} />
  </group>
}

export default function HeroScene() {
  return <Canvas dpr={[1, 1.55]} camera={{ position: [0, 0, 5.2], fov: 38 }} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} fallback={<div className="scene-fallback"><div className="fallback-a">A</div><span /></div>}>
    <ambientLight intensity={.7} /><directionalLight position={[3,4,4]} intensity={2.2} color="#fff4da" /><pointLight position={[-3,-2,2]} intensity={2.4} color="#ae8538" />
    <FloatMotion><AurexSculpture /></FloatMotion>
    <SparkField />
  </Canvas>
}
