import React, { useState } from 'react';
import Slider from '@react-native-community/slider';

import Svg, { Polygon, Text } from 'react-native-svg';
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
    const nearPolygon = getNearPolygon(polygons, { x, y });
    props.onPolygonAdded(nearPolygon, sides);
  };

  return (
    <>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMin meet"
        style={style.polygon}
        onPress={handleMapPress}
        key={2}
      >
        {polygons.map((polygon, i) => {
          const { points } = polygon;
          const strPoints = points.map(point => `${point.x},${point.y}`).join(' ');

          return (
            <>
              <Polygon points={strPoints} fill="lime" stroke="#fed" strokeWidth={3} key={i}></Polygon>
              <Text
                x={Math.min(...points.map(p => p.x)) + 15}
                y={Math.min(...points.map(p => p.y)) + 25}
                text="middle"
                fill="white"
                fontSize="30"
                key={i + polygons.length + 1}
              >
                {i}
              </Text>
            </>
          );
        })}
      </Svg>
      <Slider
        style={style.slider}
        minimumValue={3}
        maximumValue={10}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        key={1}
        value={sides}
        onValueChange={value => setSides(value)}
      />
    </>
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
