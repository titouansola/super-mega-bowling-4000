// Track
export const TRACK_WIDTH = 5;
export const TRACK_HEIGHT = 2;
export const TRACK_THICKNESS = 0.2;
export const TRACK_LENGTH = 200;
export const TRACK_END_LENGTH = 25;
// Player
export const BALL_RADIUS = 0.5;
export const PLAYER_BOOST_STRENGTH = -100 * Math.pow(BALL_RADIUS, 3);
export const PLAYER_IMPULSE_STRENGTH = 100 * Math.pow(BALL_RADIUS, 3);
export const PLAYER_TORQUE_STRENGTH = 10 * Math.pow(BALL_RADIUS, 3);
export const PLAYER_POSITION: [number, number, number] = [
  0,
  BALL_RADIUS + 0.01,
  TRACK_LENGTH / 2 - 1,
];
export const PLAYER_BOOST_COOLDOWN = 3000; // ms
// Pins
export const PIN_RADIUS = (TRACK_WIDTH / 5 - 0.5) / 2;
export const PIN_HEIGHT = (3 * TRACK_HEIGHT) / 4;
export const PINS_POSITION: [number, number, number] = [
  0,
  (PIN_HEIGHT + TRACK_THICKNESS) / 2 + 0.01,
  -TRACK_LENGTH / 2 + 4 * (PIN_RADIUS * 2),
];
