import React, { useState } from 'react';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import PropTypes from 'prop-types';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import PolygonMapSlider from './components/PolygonMapSlider';
import { getCompletePolygons } from './utils/getCompletePolygons';
import { getNearPolygon } from './utils/getNearPolyon';
import { getPoints, getStrPoints } from './utils/getPoints';
import { examplePolygonSize } from './constants';
import style from './style';
import { View } from 'react-native';

let lastX = null;
let lastY = null;

export default function PolygonMap(props) {
  const { polygons } = props;
  const [sides, setSides] = useState(4);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  log('Getting points.........');

  const handleMapPress = ({ nativeEvent }) => {
    log('Hande Map Press');
    if (lastX !== null && lastY !== null) return;
    const { locationX: x, locationY: y } = nativeEvent;
    const nearPolygon = getNearPolygon(polygons, { x, y });
    props.onPolygonAdded(nearPolygon, sides);
  };
  const handleSlide = e => {
    const { locationX: x, locationY: y } = e.nativeEvent;
    if (lastX === null && lastY === null) {
      lastX = x;
      lastY = y;
      return;
    }
  };
  const handleEndSlide = () => {
    lastX = null;
    lastY = null;
    log('End Slide');
  };

  return (
    <>
      {/* <ReactNativeZoomableView
        zoomEnabled
        bindToBorders
        maxZoom={5}
        minZoom={1}
        zoomStep={0.25}
        initialZoom={1}
      > */}
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMin meet"
        style={style.polygon}
        onTouchMove={handleSlide}
        onTouchEnd={handleEndSlide}
        onPress={handleMapPress}
        key={1}
      >
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="darkcyan" stopOpacity="1" />
            <Stop offset="1" stopColor="darkblue" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>
        {polygons.map((polygon, i) => {
          const { points } = polygon;
          const strPoints = getStrPoints(points);
          const isSelected = selectedPolygon === i;

          return (
            <>
              <Polygon
                points={strPoints}
                fill={isSelected ? 'url(#gradient)' : 'lime'}
                stroke={isSelected ? 'url(#gradient)' : '#fed'}
                strokeWidth={isSelected ? 12 : 3}
                key={i}
                onPress={() => setSelectedPolygon(isSelected ? null : i)}
              />
            </>
          );
        })}
      </Svg>
      {/* </ReactNativeZoomableView> */}
      <PolygonMapSlider
        key={2}
        examplePolygonSides={sides}
        examplePolygonSize={examplePolygonSize}
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
