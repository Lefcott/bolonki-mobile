import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { mapPolygonsToData } from './utils/mapPolygonsToData';
import { getPointsToAdd } from './utils/getPointsToAdd';
import style from './style';

export default function PolygonMap(props) {
  const dispatch = useDispatch();
  const polygons = useSelector(({ polygons }) => polygons);
  log('Getting points.........');
  const polygonData = mapPolygonsToData(polygons, { x: 0, y: 50 });

  const handleMapPress = ({ nativeEvent }) => {
    const { locationX: x, locationY: y } = nativeEvent;
    const pointsToAdd = getPointsToAdd(polygonData, 4, { x, y });
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
      {polygonData.map((polygon, i) => {
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
