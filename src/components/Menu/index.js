import React from 'react';
import { Text, View, ImageBackground, Animated, TextInput } from 'react-native';
import background from './img/background.jpg';

import style from './style';

export default function Menu() {
  return (
    <ImageBackground source={background} style={style.container} blurRadius={3}>
      {/* <View style={style.overlay}></View> */}
      <Text style={style.title}>Bolonki</Text>
      <View style={[style.button, style.createMatchButton]}>
        <Text style={style.buttonText}>Crear Partida</Text>
      </View>
      <View style={[style.button, style.joinMatchButton]}>
        <Text style={style.buttonText}>Buscar Partida</Text>
      </View>
      {/* <TextInput style={{backgroundColor: 'white', width: '100%'}}>sdf</TextInput> */}
    </ImageBackground>
  );
}
