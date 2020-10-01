import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  polygon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 32
  },
  slider: {
    position: 'absolute',
    transform: [{ rotateZ: '-90deg' }, { translateX: 160 }],
    right: '-30%',
    width: 300,
    height: 40,
  }
});
