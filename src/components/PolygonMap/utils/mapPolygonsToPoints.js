import { getAngle } from './getAngle';

const sideLen = 50;
type Point = { x: Number, y: Number };
type Polygon = { Sides: Number, AdjacentPolygons: [Number] };

export const mapPolygonToPoints = (polygon: Polygon, initialAngle = 0, initialPoint: Point) => {
  const points = [initialPoint];
  const angleSum = getAngle(polygon.Sides);

  Array(polygon.Sides)
    .fill()
    .forEach((_, side) => {
      if (side === 0) return;
      const lastPoint = points[side - 1];
      const currentAngle = initialAngle + (side - 1) * angleSum;

      points.push({
        x: +(lastPoint.x + sideLen * Math.cos(currentAngle)).toFixed(14),
        y: +(lastPoint.y - sideLen * Math.sin(currentAngle)).toFixed(14)
      });
    });

  return points;
};

export const mapPolygonsToPoints = (polygons: [Polygon], initialPoint: Point) => {
  const points = {};

  const _mapPolygonsToPoints = (initialPolygonIndex, currentAngle, currentPoint: Point) => {
    if (points[initialPolygonIndex]) return;
    points[initialPolygonIndex] = true; // Indicate it's taken
    const initialPolygon = polygons[initialPolygonIndex];

    const currentPoints = mapPolygonToPoints(initialPolygon, currentAngle, currentPoint);
    points[initialPolygonIndex] = currentPoints;
    initialPolygon.AdjacentPolygons.forEach((pIndex, sideIndex) => {
      if (pIndex === -1) return;
      const nextPolygon = polygons[pIndex];
      const angle = currentAngle + getAngle(initialPolygon.Sides) * sideIndex - Math.PI / 2;
      const point = currentPoints[sideIndex];

      if (points[pIndex]) return;
      _mapPolygonsToPoints(pIndex, angle, point);
    });
  };

  _mapPolygonsToPoints(0, 0, initialPoint);

  const indexes = Object.keys(points);
  return indexes.map(i => points[i].map(point => `${point.x},${point.y}`).join(' '));
};
