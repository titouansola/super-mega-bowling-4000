import * as THREE from 'three';
import * as options from '@common/options.ts';

export const pinGeometry = new THREE.CylinderGeometry(
  options.PIN_RADIUS,
  options.PIN_RADIUS,
  options.PIN_HEIGHT
);
