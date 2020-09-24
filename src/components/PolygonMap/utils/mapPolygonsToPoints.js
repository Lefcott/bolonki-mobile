import { getAngle } from './getAngle';

const sideLen = 50;
type Point = { x: Number, y: Number };
type Polygon = { Sides: Number, AdjacentPolygons: [Number] };

export const mapPolygonToPoints = (polygon: Polygon, initialPoint: Point) => {
  const points = [initialPoint];
  const angleSum = getAngle(polygon.Sides);

  let lastAngle;
  Array(polygon.Sides)
    .fill()
    .forEach((_, side) => {
      if (side === 0) return;
      const lastPoint = points[side - 1];
      const currentAngle = /*(lastAngle ? -Math.PI + lastAngle : 0)*/ +(side - 1) * angleSum;
      lastAngle = currentAngle;

      points.push({
        x: +(lastPoint.x + sideLen * Math.cos(currentAngle)).toFixed(14),
        y: +(lastPoint.y - sideLen * Math.sin(currentAngle)).toFixed(14)
      });
    });

  return points;
};

export const mapPolygonsToPoints = (polygons: [Polygon], initialPoint: Point) => {
  const points = {};
  const angles = {};

  const _mapPolygonsToPoints = (initialPolygonIndex, currentAngle, currentPoint: Point) => {
    points[initialPolygonIndex] = true; // Indicate it's taken
    const initialPolygon = polygons[initialPolygonIndex];
    const angleSum = getAngle(initialPolygon.Sides);

    const currentPoints = mapPolygonToPoints(initialPolygon, currentPoint);
    points[initialPolygonIndex] = currentPoints;
    angles[initialPolygonIndex] = currentAngle;

    initialPolygon.AdjacentPolygons.forEach((pIndex, sideIndex) => {
      if (pIndex === -1) return;
      const nextPolygon = polygons[pIndex];
      const nextAngleSum = getAngle(nextPolygon.Sides);
      const angle = currentAngle + angleSum * sideIndex - nextAngleSum;
      const point = currentPoints[sideIndex];

      if (points[pIndex]) return;
      _mapPolygonsToPoints(pIndex, angle, point);
    });
  };

  _mapPolygonsToPoints(0, 0, initialPoint);

  return Object.keys(points).map(i => ({ angle: (-angles[i] / Math.PI) * 180, points: points[i] }));
};
