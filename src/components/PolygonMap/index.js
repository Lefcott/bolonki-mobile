import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { mapPolygonsToPoints } from './utils/mapPolygonsToPoints';
import style from './style';

export default function PolygonMap(props) {
  const dispatch = useDispatch();
  const polygons = useSelector(({ polygons }) => polygons);
  log('Getting points.........');
  const polygonPoints = mapPolygonsToPoints(polygons, { x: 150, y: 150 });

  const handleMapPress = ({ nativeEvent }) => {
    const { locationX: x, locationY: y } = nativeEvent;
    log('Coordinates', x, y);
  };

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 400 400"
      originX={0}
      originY={0}
      style={style.polygon}
      onPress={handleMapPress}
    >
      {polygonPoints.map((polygon, i) => {
        const { points } = polygon;
        const strPoints = points.map(point => `${point.x},${point.y}`).join(' ');

        return <Polygon points={strPoints} fill="lime" stroke="#fed" strokeWidth={3} key={i} />;
      })}
    </Svg>
  );
}
PolygonMap.propTypes = {
  editable: PropTypes.bool,
  onPolygonAdded: PropTypes.func
};
PolygonMap.defaultProps = {
  editable: false,
  onPolygonAdded: () => {}
};
