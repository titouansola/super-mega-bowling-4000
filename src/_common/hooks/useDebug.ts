import { useControls } from 'leva';

export function useDebug() {
  return useControls({
    cameraIsFree: false,
    showPerf: false,
    debugPhysics: false,
  });
}
