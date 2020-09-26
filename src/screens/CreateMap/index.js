import React, { useEffect, useState } from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { Text, View, ImageBackground, TouchableOpacity, BackHandler } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { changeIndexBy } from '../../utils/array';
import background from './img/background.jpg';
import style from './style';
import { useDispatch } from 'react-redux';
import { sectionActions } from '../../store/actions';
import { SECTIONS } from '../../store/constants';
import PolygonMap from '../../components/PolygonMap';
import { polygonActions } from '../../store/actions';

const initialPoint = { x: 0, y: 50 };

export default function CreateMap() {
  const dispatch = useDispatch();
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    setPolygons(
      PolygonMap.getCompletePolygons(
        [
          {
            Sides: 4,
            AdjacentPolygons: [-1, -1, -1, -1]
          }
          // {
          //   Sides: 3,
          //   AdjacentPolygons: [2, 3, 0]
          // },
          // {
          //   Sides: 3,
          //   AdjacentPolygons: [1, -1, -1]
          // },
          // {
          //   Sides: 3,
          //   AdjacentPolygons: [1, -1, -1]
          // }
        ],
        initialPoint
      )
    );
    const goBack = () => dispatch(sectionActions.setSection(SECTIONS.MENU));
    BackHandler.addEventListener('hardwareBackPress', goBack);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  }, []);

  const handleAddPolygon = (nearPolygon, sides: Number) => {
    const _polygons = [...polygons];
    const oldPolygon = _polygons[nearPolygon.polygonIndex];

    const newAdjacentPolygons = Array(sides).fill(-1);
    newAdjacentPolygons[newAdjacentPolygons.length - 1] = nearPolygon.polygonIndex;
    const newPolygons = [
      ...changeIndexBy(polygons, nearPolygon.polygonIndex, {
        ...oldPolygon,
        AdjacentPolygons: changeIndexBy(oldPolygon.AdjacentPolygons, nearPolygon.sideIndex, polygons.length)
      }),
      { Sides: sides, AdjacentPolygons: newAdjacentPolygons }
    ];
    setPolygons(PolygonMap.getCompletePolygons(newPolygons, initialPoint));
  };

  return (
    <>
      <View style={style.navbar}>
        <TouchableOpacity
          onPress={() => dispatch(sectionActions.setSection(SECTIONS.MENU))}
          style={style.backIcon}
        >
          <AntDesign name="leftcircle" size={40} color="black" />
        </TouchableOpacity>
        <Text style={style.title}>Crear Mapa</Text>
      </View>
      <ImageBackground source={background} style={style.container}>
        <View style={style.overlay}></View>
        <PolygonMap polygons={polygons} onPolygonAdded={handleAddPolygon} />
      </ImageBackground>
    </>
  );
}
