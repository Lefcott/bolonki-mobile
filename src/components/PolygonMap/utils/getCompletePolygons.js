import { getAngle } from './getAngle';
import { getPoints } from './getPoints';
import { getAdjacents } from './getAdjacents';
import type { Point, Polygon } from '../types';

export const getCompletePolygons = (polygons: Polygon[], initialPoint: Point) => {
  const completePolygonsByIndex = {};

  const _mapPolygonsToPoints = (initialPolygonIndex, currentAngle, currentPoint: Point) => {
    completePolygonsByIndex[initialPolygonIndex] = true; // Indicate it's taken
    const initialPolygon = polygons[initialPolygonIndex];
    const externalAngleSum = Math.PI - getAngle(initialPolygon.Sides);

    const currentPoints = getPoints(initialPolygon.Sides, currentPoint, currentAngle);
    completePolygonsByIndex[initialPolygonIndex] = {
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

      if (completePolygonsByIndex[pIndex]) return;
      _mapPolygonsToPoints(pIndex, angle, point);
    });
  };

  if (polygons.length) _mapPolygonsToPoints(0, 0, initialPoint);
  const completePolygons = Object.keys(completePolygonsByIndex).map(i => completePolygonsByIndex[i]);
  const adjacents = getAdjacents(completePolygons);
  completePolygons.forEach((polygon, i) => (polygon.AdjacentPolygons = adjacents[i]));

  return completePolygons;
};
