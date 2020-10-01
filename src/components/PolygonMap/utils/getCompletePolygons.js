import { getAngle } from './getAngle';
import { getPoints } from './getPoints';
import { getAdjacents } from './getAdjacents';
import type { Point, Polygon } from '../types';

export const getCompletePolygons = (polygons: Polygon[], initialPoint: Point) => {
  const completePolygonsByIndex = {};

  const _mapPolygonsToPoints = (initialPolygonIndex, currentAngle, currentPoint: Point) => {
    const initialPolygon = polygons[initialPolygonIndex];
    if (initialPolygon.initialAngle !== undefined) currentAngle = initialPolygon.initialAngle;
    const externalAngleSum = Math.PI - getAngle(initialPolygon.Sides);

    const currentPoints =
      initialPolygon.points || getPoints(initialPolygon.Sides, currentPoint, currentAngle);
    completePolygonsByIndex[initialPolygonIndex] = {
      ...initialPolygon,
      points: currentPoints,
      externalAngleSum,
      initialAngle: currentAngle
    };

    initialPolygon.AdjacentPolygons.forEach((pIndex, sideIndex) => {
      if (pIndex === -1) return; // If there is no adjacent polygon
      if (completePolygonsByIndex[pIndex]) return; // If already calculated
      const nextPolygon = polygons[pIndex];
      const nextInternalAngleSum = getAngle(nextPolygon.Sides);
      const angle = currentAngle + nextInternalAngleSum - externalAngleSum * sideIndex;
      const point = currentPoints[sideIndex];

      _mapPolygonsToPoints(pIndex, angle, point);
    });
  };

  if (polygons.length) _mapPolygonsToPoints(0, 0, initialPoint);
  const completePolygons = Object.keys(completePolygonsByIndex).map(i => completePolygonsByIndex[i]);
  const adjacents = getAdjacents(completePolygons);
  completePolygons.forEach((polygon, i) => (polygon.AdjacentPolygons = adjacents[i]));

  return completePolygons;
};
