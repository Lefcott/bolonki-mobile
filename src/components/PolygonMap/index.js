import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

import { mapPolygonsToPoints } from './utils/mapPolygonsToPoints';
import style from './style';

export default function PolygonMap(props) {
  const map = {
    Polygons: [
      {
        Sides: 4,
        AdjacentPolygons: [-1, -1, -1, 1]
      },
      {
        Sides: 3,
        AdjacentPolygons: [0, 2, -1]
      },
      {
        Sides: 3,
        AdjacentPolygons: [1, 3, -1]
      },
      {
        Sides: 3,
        AdjacentPolygons: [2, 4, -1]
      },
      {
        Sides: 4,
        AdjacentPolygons: [3, -1, -1, -1]
      }
    ]
  };
  log('Getting points.........');
  const polygonPoints = mapPolygonsToPoints(map.Polygons, { x: 150, y: 150 });

  return (
    <Svg height="100%" width="100%" viewBox="0 0 400 400" originX={0} originY={0} style={style.polygon}>
      {polygonPoints.map((polygon, i) => {
        const { angle, points } = polygon;
        const strPoints = points.map(point => `${point.x},${point.y}`).join(' ');

        return (
          <Polygon
            points={strPoints}
            fill="lime"
            rotation={angle*0}
            originX={points[0].x}
            originY={points[0].y}
            stroke="#fed"
            strokeWidth={5}
            key={i}
          />
        );
      })}
    </Svg>
  );
}
