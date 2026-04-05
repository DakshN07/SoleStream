import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress, useGLTF } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return <Html center><div className="text-primary font-bold text-xl tracking-widest">{progress.toFixed()} % LOADED</div></Html>;
}

// Loads the real Nike Air Zoom Pegasus 36 model from the public folder
function ShoeModel() {
  const ref = useRef();
  // Using the local glTF model we just extracted
  const { scene } = useGLTF('/models/nike_pegasus/scene.gltf');

  // Floating effect
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t / 4) / 4;
    ref.current.position.y = (Math.sin(t / 1.5)) / 10;
  });

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      scale={2.5} 
      position={[0, -0.5, 0]} 
      rotation={[0, -Math.PI / 4, 0]} 
    />
  );
}

const ThreeScene = () => {
  return (
    <div className="w-full h-full relative z-0">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <ShoeModel />
          
          <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          <Environment preset="city" />
          <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
