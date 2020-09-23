import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';

import background from './img/background.jpg';
import style from './style';
import { useDispatch } from 'react-redux';
import { sectionActions } from '../../store/actions';
import { SECTIONS } from '../../store/constants';

export default function Menu() {
  const dispatch = useDispatch();

  return (
    <ImageBackground source={background} style={style.container} blurRadius={3}>
      <View style={style.overlay}></View>
      <Text style={style.title}>Bolonki</Text>
      <TouchableOpacity
        style={[style.button, style.createMapButton]}
        onPress={() => dispatch(sectionActions.setSection(SECTIONS.CREATE_MAP))}
      >
        <Text style={style.buttonText}>Crear Mapa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[style.button, style.createMatchButton]}>
        <Text style={style.buttonText}>Crear Partida</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[style.button, style.joinMatchButton]}>
        <Text style={style.buttonText}>Buscar Partida</Text>
      </TouchableOpacity>
      <Svg height="50%" width="50%" viewBox="0 0 100 100" style={style.polygon}>
        <Polygon points="40,5 70,80 25,95" fill="lime"></Polygon>
      </Svg>
    </ImageBackground>
  );
}
