import { getAngle } from './getAngle';
import { getPoints } from './getPoints';
import { getAdjacents } from './getAdjacents';
import type { Point, Polygon } from '../types';

export const getCompletePolygons = (polygons: Polygon[], initialPoint: Point) => {
  log('getCompletePolygons', polygons[12]);
  const completePolygonsByIndex = {};

  const _mapPolygonsToPoints = (initialPolygonIndex, currentAngle, currentPoint: Point) => {
    completePolygonsByIndex[initialPolygonIndex] = true; // Indicate it's taken
    const initialPolygon = polygons[initialPolygonIndex];
    const externalAngleSum = Math.PI - getAngle(initialPolygon.Sides);

    const currentPoints = getPoints(initialPolygon.Sides, currentPoint, currentAngle);
    // TODO remove
    if (initialPolygonIndex === 8) {
      log('complete 8 points', currentPoints);
    }
    // if (initialPolygonIndex === 7) {
    //   log('7 from point', currentPoint, 'angle', currentAngle);
    // }
    completePolygonsByIndex[initialPolygonIndex] = {
      ...initialPolygon,
      points: currentPoints,
      externalAngleSum,
      initialAngle: currentAngle
    };

    initialPolygon.AdjacentPolygons.forEach((pIndex, sideIndex) => {
      if (pIndex === -1) return; // If there is no adjacent polygon
      if (completePolygonsByIndex[pIndex]) return; // If already calculated
      log(`map ${pIndex} from ${initialPolygonIndex}`);
      const nextPolygon = polygons[pIndex];
      const nextInternalAngleSum = getAngle(nextPolygon.Sides);
      const angle = currentAngle + nextInternalAngleSum - externalAngleSum * sideIndex;
      const point = currentPoints[sideIndex];

      // TODO remove
      // if (pIndex === 8) {
      //   log('attaching at point', point, 'from', initialPolygonIndex, 'with points', currentPoints);
      // }
      _mapPolygonsToPoints(pIndex, angle, point);
    });
  };

  if (polygons.length) _mapPolygonsToPoints(0, 0, initialPoint);
  const completePolygons = Object.keys(completePolygonsByIndex).map(i => completePolygonsByIndex[i]);
  const adjacents = getAdjacents(completePolygons);
  completePolygons.forEach((polygon, i) => (polygon.AdjacentPolygons = adjacents[i]));
  // TODO remove
  // completePolygons.forEach((polygon, i) => {
  //   polygon.AdjacentPolygons.forEach((adj, ii) => {
  //     if (adj === -1) return;
  //     log('Assoc', i, `--${ii}-->`, adj);
  //   });
  // });
  log('len', completePolygons.length);
  log('returning polygon 8', completePolygons[8]);

  return completePolygons;
};
