import type { Point, PolygonData } from '../types';

export const getNearPolygon = (polygonData: PolygonData[], mousePoint: Point) => {
  let minDistance: Number;
  let minDistanceSideIndex: Number;
  let minDistancePolygonIndex: Number;
  const distances = [];
  polygonData.forEach((polygon, polygonIndex) => {
    polygon.points.forEach((point, i) => {
      const lastPoint = i === 0 ? polygon.points[polygon.points.length - 1] : polygon.points[i - 1];
      const middlePoint = { x: (point.x + lastPoint.x) / 2, y: (point.y + lastPoint.y) / 2 };
      const distance = ((mousePoint.x - middlePoint.x) ** 2 + (mousePoint.y - middlePoint.y) ** 2) ** 0.5;

      distances.push(distance);
      if (!minDistance || distance < minDistance) {
        minDistance = distance;
        minDistanceSideIndex = (i + polygon.points.length - 1) % polygon.points.length;
        minDistancePolygonIndex = polygonIndex;
      }
    });
  });

  return { polygonIndex: minDistancePolygonIndex, sideIndex: minDistanceSideIndex };
};
