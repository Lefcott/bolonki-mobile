import { getAngle } from './getAngle';
import type { Point } from '../types';
import { sideLen } from '../constants';

export const getPoints = (sides: Number, initialPoint: Point, initialAngle: Number, size?: Number) => {
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
  if (size) {
    const yValues = points.map(p => p.y);
    const height = Math.max(...yValues) - Math.min(...yValues);
    const relation = sideLen / height;
    const expectedSideLen = relation * size;
    const sizeCoef = expectedSideLen / sideLen;
    points.forEach(point => {
      point.x = point.x * sizeCoef;
      point.y = point.y * sizeCoef;
    });
  }

  return points;
};

export const getStrPoints = points => points.map(point => `${point.x},${point.y}`).join(' ');
