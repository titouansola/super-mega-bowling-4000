import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Canvas>
      <OrbitControls makeDefault />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={'red'} />
      </mesh>
    </Canvas>
  </React.StrictMode>
);
