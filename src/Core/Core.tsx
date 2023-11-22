import { GameLoop } from '../GameLoop/GameLoop.tsx';
import { KeyboardControls } from '@react-three/drei';
import { KeyboardNameEnum } from '@common/enums/keyboard-name.enum.ts';

export function Core() {
  return (
    <KeyboardControls
      map={[
        { name: KeyboardNameEnum.PUSH, keys: ['Space'] },
        { name: KeyboardNameEnum.RESET, keys: ['Enter'] },
        { name: KeyboardNameEnum.FORWARD, keys: ['ArrowUp'] },
        { name: KeyboardNameEnum.RIGHTWARD, keys: ['ArrowRight'] },
        { name: KeyboardNameEnum.BACKWARD, keys: ['ArrowDown'] },
        { name: KeyboardNameEnum.LEFTWARD, keys: ['ArrowLeft'] },
      ]}
    >
      <GameLoop />
    </KeyboardControls>
  );
}
