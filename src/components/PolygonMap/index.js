import React, { useState } from 'react';
import Svg, { Polygon } from 'react-native-svg';
import PropTypes from 'prop-types';

import { getCompletePolygons } from './utils/getCompletePolygons';
import { getNearPolygon } from './utils/getNearPolyon';
import style from './style';

export default function PolygonMap(props) {
  const { polygons } = props;
  const [sides, setSides] = useState(4);
  log('Getting points.........');

  const handleMapPress = ({ nativeEvent }) => {
    const { locationX: x, locationY: y } = nativeEvent;
    const nearPolygon = getNearPolygon(polygons, sides, { x, y });
    props.onPolygonAdded(nearPolygon, sides);
  };

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMin meet"
      style={style.polygon}
      onPress={handleMapPress}
    >
      {polygons.map((polygon, i) => {
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
PolygonMap.getCompletePolygons = getCompletePolygons;
