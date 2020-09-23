import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { Text, View, ImageBackground, Animated, TextInput } from 'react-native';

import background from './img/background.jpg';
import style from './style';

export default function Menu() {
  return (
    <ImageBackground source={background} style={style.container} blurRadius={3}>
      {/* <View style={style.overlay}></View> */}
      <Text style={style.title}>Bolonki</Text>

      <View style={[style.button, style.createMatchButton]}>
        <Text style={style.buttonText}>Crear Mapa</Text>
      </View>
      <View style={[style.button, style.joinMatchButton]}>
        <Text style={style.buttonText}>Crear Partida</Text>
      </View>
      <View style={[style.button, style.joinMatchButton]}>
        <Text style={style.buttonText}>Buscar Partida</Text>
      </View>
      <Svg height="50%" width="50%" viewBox="0 0 100 100" style={style.polygon}>
        <Polygon points="40,5 70,80 25,95" fill="lime"></Polygon>
      </Svg>
      {/* <TextInput style={{backgroundColor: 'white', width: '100%'}}>sdf</TextInput> */}
    </ImageBackground>
  );
}
