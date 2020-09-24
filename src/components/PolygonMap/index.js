import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

import { mapPolygonsToPoints } from './utils/mapPolygonsToPoints';
import style from './style';

export default function PolygonMap(props) {
  const map = {
    Polygons: [
      {
        Sides: 4,
        AdjacentPolygons: [1, -1, -1, -1]
      },
      {
        Sides: 4,
        AdjacentPolygons: [1, -1, -1, -1]
      }
    ]
  };
  const polygonPoints = mapPolygonsToPoints(map.Polygons, {x: 50, y: 50});
  log('Points', JSON.stringify(polygonPoints));

  return (
    <Svg height="100%" width="100%" viewBox="0 0 400 400" originX={0} originY={0} style={style.polygon}>
      {polygonPoints.map((points, i) => (
        <Polygon points={points} fill="lime" stroke="#fed" strokeWidth={5} key={i} />
      ))}
    </Svg>
  );
}
