import type { PolygonData } from '../types';
import { arePointsNear } from '../../../utils/number';

const getLastPoint = (points, index) => (index === 0 ? points[points.length - 1] : points[index - 1]);

export const getAdjacents = (polygons: PolygonData[]) => {
  log('getAdjacents');
  const adjacentsByPolygon = {};
  polygons.forEach((polygon, polygonIndex) => {
    adjacentsByPolygon[polygonIndex] = Array(polygon.Sides).fill(-1);
    polygon.points.forEach((point, pointIndex) => {
      const lastPoint = getLastPoint(polygon.points, pointIndex);

      polygons.forEach((otherPolygon, otherPolygonIndex) => {
        if (polygonIndex === otherPolygonIndex) return;
        otherPolygon.points.forEach((otherPoint, otherPointIndex) => {
          const otherLastPoint = getLastPoint(otherPolygon.points, otherPointIndex);
          if (!arePointsNear(lastPoint, otherLastPoint, 5) && !arePointsNear(lastPoint, otherPoint, 5))
            return;
          if (!arePointsNear(point, otherPoint, 5) && !arePointsNear(point, otherLastPoint, 5)) return;
          adjacentsByPolygon[polygonIndex][
            (pointIndex + polygon.points.length - 1) % polygon.points.length
          ] = otherPolygonIndex;
        });
      });
    });
  });
  return adjacentsByPolygon;
};
