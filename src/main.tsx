import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Core } from './Core/Core.tsx';
import { OrbitControls } from '@react-three/drei';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Canvas>
      <OrbitControls makeDefault />
      <Core />
    </Canvas>
  </React.StrictMode>
);
