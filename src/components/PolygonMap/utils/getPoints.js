import { getAngle } from './getAngle';
import type { Point } from '../types';
import { sideLen } from '../constants';

export const getPoints = (sides: Number, initialPoint: Point, initialAngle: Number) => {
  const points = [initialPoint];
  const externalAngleSum = Math.PI - getAngle(sides);

  Array(sides)
    .fill()
    .forEach((_, side) => {
      if (side === 0) return;
      const lastPoint = points[points.length - 1];
      const currentExternalAngle = (side - 1) * externalAngleSum - initialAngle;

      points.push({
        x: +(lastPoint.x + sideLen * Math.cos(currentExternalAngle)).toFixed(14),
        y: +(lastPoint.y - sideLen * Math.sin(currentExternalAngle)).toFixed(14)
      });
    });

  return points;
};
