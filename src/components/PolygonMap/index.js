import Svg, { Polygon } from 'react-native-svg';

import { mapPolygonsToPoints } from './utils/mapPolygonsToPoints';

export default function PolygonMap(props) {
  const map = { Polygons: [{ Sides: 4, AdjacentPolygons: [-1, -1, -1, -1] }] };
  const polygonPoints = mapPolygonsToPoints(map.Polygons);

  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" style={style.polygon}>
      {polygonPoints.map(points => (
        <Polygon points={points} fill="lime" />
      ))}
    </Svg>
  );
}
