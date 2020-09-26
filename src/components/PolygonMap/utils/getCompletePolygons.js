import { getAngle } from './getAngle';
import { getPoints } from './getPoints';
import type { Point, Polygon } from '../types';

export const getCompletePolygons = (polygons: Polygon[], initialPoint: Point) => {
  const completePolygons = {};

  const _mapPolygonsToPoints = (initialPolygonIndex, currentAngle, currentPoint: Point) => {
    completePolygons[initialPolygonIndex] = true; // Indicate it's taken
    const initialPolygon = polygons[initialPolygonIndex];
    const externalAngleSum = Math.PI - getAngle(initialPolygon.Sides);

    const currentPoints = getPoints(initialPolygon.Sides, currentPoint, currentAngle);
    completePolygons[initialPolygonIndex] = {
      points: currentPoints,
      externalAngleSum,
      initialAngle: currentAngle,
      ...initialPolygon
    };

    initialPolygon.AdjacentPolygons.forEach((pIndex, sideIndex) => {
      if (pIndex === -1) return; // If there is no adjacent polygon
      const nextPolygon = polygons[pIndex];
      const nextInternalAngleSum = getAngle(nextPolygon.Sides);
      const angle = currentAngle + nextInternalAngleSum - externalAngleSum * sideIndex;
      const point = currentPoints[sideIndex];

      if (completePolygons[pIndex]) return;
      _mapPolygonsToPoints(pIndex, angle, point);
    });
  };

  if (polygons.length) _mapPolygonsToPoints(0, 0, initialPoint);

  return Object.keys(completePolygons).map(i => completePolygons[i]);
};
