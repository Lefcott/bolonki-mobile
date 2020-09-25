import React, { useEffect } from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { Text, View, ImageBackground, TouchableOpacity, BackHandler } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import background from './img/background.jpg';
import style from './style';
import { useDispatch } from 'react-redux';
import { sectionActions } from '../../store/actions';
import { SECTIONS } from '../../store/constants';
import PolygonMap from '../../components/PolygonMap';
import { polygonActions } from '../../store/actions';

export default function CreateMap() {
  const dispatch = useDispatch();
  dispatch(
    polygonActions.setPolygons([
      {
        Sides: 4,
        AdjacentPolygons: [-1, -1, -1, -1]
      },
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
    ])
  );

  useEffect(() => {
    const goBack = () => dispatch(sectionActions.setSection(SECTIONS.MENU));
    BackHandler.addEventListener('hardwareBackPress', goBack);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  }, []);

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
        <PolygonMap></PolygonMap>
      </ImageBackground>
    </>
  );
}
