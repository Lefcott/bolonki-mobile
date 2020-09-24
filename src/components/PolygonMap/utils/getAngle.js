export const getAngle = (sides: Number) => ((sides - 2) * Math.PI) / sides;

log('TEST ANGLE', (getAngle(6) / Math.PI) * 180);
