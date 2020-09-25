import { getAngle } from './getAngle';

const sideLen = 50;
type Point = { x: Number, y: Number };
type Polygon = { Sides: Number, AdjacentPolygons: [Number] };

export const mapPolygonToPoints = (polygon: Polygon, initialPoint: Point, initialAngle: Number) => {
  const points = [initialPoint];
  const externalAngleSum = Math.PI - getAngle(polygon.Sides);

  Array(polygon.Sides)
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

export const mapPolygonsToPoints = (polygons: [Polygon], initialPoint: Point) => {
  const points = {};

  const _mapPolygonsToPoints = (initialPolygonIndex, currentAngle, currentPoint: Point) => {
    points[initialPolygonIndex] = true; // Indicate it's taken
    const initialPolygon = (polygons[initialPolygonIndex]);
    const externalAngleSum = Math.PI - getAngle(initialPolygon.Sides);

    const currentPoints = mapPolygonToPoints(initialPolygon, currentPoint, currentAngle);
    points[initialPolygonIndex] = currentPoints;

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

  return Object.keys(points).map(i => ({ points: points[i] }));
};
