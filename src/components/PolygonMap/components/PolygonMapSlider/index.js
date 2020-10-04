import React from 'react';
import Svg, { Polygon, Text as SvgText } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';

import { getPoints, getStrPoints } from '../../utils/getPoints';
import style from './style';

export default function PolygonMapSlider({ examplePolygonSides, examplePolygonSize, onValueChange }) {
  const examplePolygonPoints = getPoints(examplePolygonSides, { x: 0, y: 0 }, 0, examplePolygonSize);
  examplePolygonPoints.forEach(
    point => (point.y += examplePolygonSize) & (point.x += examplePolygonSides * 1.2)
  );
  const examplePolygonStrPoints = getStrPoints(examplePolygonPoints);

  return (
    <>
      <Svg
        height={examplePolygonSize}
        width={examplePolygonSize}
        viewBox={`${-examplePolygonSize / 2} ${-examplePolygonSize / 2} ${examplePolygonSize * 2} ${
          examplePolygonSize * 2
        }`}
        preserveAspectRatio="xMidYMin meet"
        style={style.polygonExample}
      >
        <Polygon points={examplePolygonStrPoints} fill="darkviolet" stroke="violet" strokeWidth={3}></Polygon>
        <SvgText
          fill="black"
          stroke="white"
          fontSize={40}
          fontWeight="bold"
          x={examplePolygonSize / 2}
          y={examplePolygonSize * 0.85}
          textAnchor="middle"
        >
          {examplePolygonSides}
        </SvgText>
      </Svg>
      <Slider
        style={style.slider}
        minimumValue={3}
        maximumValue={10}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#dddddd"
        key={1}
        value={examplePolygonSides}
        onValueChange={onValueChange}
      />
    </>
  );
}
PolygonMapSlider.propTypes = {
  examplePolygonSides: PropTypes.number.isRequired,
  examplePolygonSize: PropTypes.number.isRequired,
  onValueChange: PropTypes.func
};
PolygonMapSlider.defaultProps = {
  onValueChange: () => {}
};
