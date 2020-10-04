import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  polygonExample: {
    position: 'absolute',
    right: '8%',
    bottom: 47
  },
  slider: {
    position: 'absolute',
    transform: [{ rotateZ: '-90deg' }, { translateX: 160 }],
    right: -120,
    width: 300,
    height: 40
  }
});
