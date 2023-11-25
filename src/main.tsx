import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { KeyboardNameEnum } from '@common/enums/keyboard-name.enum.ts';
import { GameLoop } from './GameLoop/GameLoop.tsx';
import { UserInterface } from './UserInterface/UserInterface.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KeyboardControls
      map={[
        { name: KeyboardNameEnum.BOOST, keys: ['Space'] },
        { name: KeyboardNameEnum.FORWARD, keys: ['ArrowUp'] },
        { name: KeyboardNameEnum.RIGHTWARD, keys: ['ArrowRight'] },
        { name: KeyboardNameEnum.BACKWARD, keys: ['ArrowDown'] },
        { name: KeyboardNameEnum.LEFTWARD, keys: ['ArrowLeft'] },
      ]}
    >
      <Canvas>
        <GameLoop />
      </Canvas>
      <UserInterface />
    </KeyboardControls>
  </React.StrictMode>
);
