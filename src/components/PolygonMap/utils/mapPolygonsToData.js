import { getAngle } from './getAngle';
import { getPoints } from './getPoints';
import type { Point, Polygon } from '../types';

export const mapPolygonsToData = (polygons: Polygon[], initialPoint: Point) => {
  const points = {};
  const angles = {};
  const initialAngles = {};

  const _mapPolygonsToPoints = (initialPolygonIndex, currentAngle, currentPoint: Point) => {
    points[initialPolygonIndex] = true; // Indicate it's taken
    const initialPolygon = polygons[initialPolygonIndex];
    const externalAngleSum = Math.PI - getAngle(initialPolygon.Sides);

    const currentPoints = getPoints(initialPolygon.Sides, currentPoint, currentAngle);
    points[initialPolygonIndex] = currentPoints;
    angles[initialPolygonIndex] = externalAngleSum;
    initialAngles[initialPolygonIndex] = currentAngle;

    initialPolygon.AdjacentPolygons.forEach((pIndex, sideIndex) => {
      if (pIndex === -1) return; // If there is no adjacent polygon
      const nextPolygon = polygons[pIndex];
      const nextInternalAngleSum = getAngle(nextPolygon.Sides);
      const angle = currentAngle + nextInternalAngleSum - externalAngleSum * sideIndex;
      const point = currentPoints[sideIndex];

      if (points[pIndex]) return;
      _mapPolygonsToPoints(pIndex, angle, point);
    });
  };

  if (polygons.length) _mapPolygonsToPoints(0, 0, initialPoint);

  return Object.keys(points).map(i => ({
    points: points[i],
    externalAngleSum: angles[i],
    initialAngle: initialAngles[i]
  }));
};
