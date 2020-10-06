import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';

import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import PropTypes from 'prop-types';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import PolygonMapSlider from './components/PolygonMapSlider';
import { getCompletePolygons } from './utils/getCompletePolygons';
import { getCenteredOffsets } from './utils/getCenteredOffsets';
import { getNearPolygon } from './utils/getNearPolyon';
import { getPoints, getStrPoints } from './utils/getPoints';
import { examplePolygonSize } from './constants';
import { areNumbersNear } from '../../utils/number';
import style from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let lastX = null;
let lastY = null;
let initialDiffX = null;
let initialDiffY = null;
let moved = false;

export default function PolygonMap(props) {
  const { polygons } = props;
  const [sides, setSides] = useState(4);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    const offsets = getCenteredOffsets(windowWidth, windowHeight, polygons);
    setXOffset(offsets.x);
    setYOffset(offsets.y);
  }, []);

  const handleMapPress = ({ nativeEvent }) => {
    if (moved) return;
    const x = nativeEvent.locationX - xOffset;
    const y = nativeEvent.locationY - yOffset;
    const nearPolygon = getNearPolygon(polygons, { x, y });
    props.onPolygonAdded(nearPolygon, sides);
  };
  const handleSlide = e => {
    const { locationX: x, locationY: y } = e.nativeEvent;
    if (lastX === null && lastY === null) {
      lastX = x;
      lastY = y;
      initialDiffX = x - xOffset;
      initialDiffY = y - yOffset;
      return;
    }
    const diffX = x - lastX;
    const diffY = y - lastY;
    if (!moved) moved = !areNumbersNear(diffX, 0, 10) || !areNumbersNear(diffY, 0, 10);
    setXOffset(x - initialDiffX);
    setYOffset(y - initialDiffY);
  };
  const handleEndSlide = () => {
    lastX = null;
    lastY = null;
    initialDiffX = null;
    initialDiffY = null;
    moved = false;
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
        viewBox={`${-xOffset} ${-yOffset} 400 400`}
        // viewBox={`-20 -10 400 400`}
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
