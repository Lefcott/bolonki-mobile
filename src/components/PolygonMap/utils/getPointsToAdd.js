import { getPoints } from './getPoints';
import { getAngle } from './getAngle';
import type { Point, PolygonData } from '../types';

export const getPointsToAdd = (polygonData: PolygonData[], sides, mousePoint: Point) => {
  let minDistance: Number;
  let minDistancePoint: Point;
  let minDistanceSides: Number;
  let minDistanceExternalAngle: Number;
  let minDistanceInitialAngle: Number;
  let minDistanceSideIndex: Number;
  const distances = [];
  polygonData.forEach(polygon => {
    polygon.points.forEach((point, i) => {
      const lastPoint = i === 0 ? polygon.points[polygon.points.length - 1] : polygon.points[i - 1];
      const middlePoint = { x: (point.x + lastPoint.x) / 2, y: (point.y + lastPoint.y) / 2 };
      const distance = ((mousePoint.x - middlePoint.x) ** 2 + (mousePoint.y - middlePoint.y) ** 2) ** 0.5;

      distances.push(distance);
      if (!minDistance || distance < minDistance) {
        minDistance = distance;
        minDistancePoint = lastPoint;
        minDistanceSides = polygon.points.length;
        minDistanceExternalAngle = polygon.externalAngleSum;
        minDistanceInitialAngle = polygon.initialAngle;
        minDistanceSideIndex = (i + polygon.points.length - 1) % polygon.points.length;
      }
    });
  });

  const externalAngleSum = Math.PI - getAngle(minDistanceSides);
  const nextInternalAngleSum = getAngle(sides);
  const angle =
    minDistanceInitialAngle + nextInternalAngleSum - minDistanceExternalAngle * minDistanceSideIndex;
  const pointsToAdd = getPoints(sides, minDistancePoint, angle);

  return pointsToAdd;
};
