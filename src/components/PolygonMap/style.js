import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  polygon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 32
  },
  polygonExample: {
    position: 'absolute',
    right: '8%',
    bottom: 47
  },
  sidesText: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    fontSize: 30,
    color: 'white'
  },
  slider: {
    position: 'absolute',
    transform: [{ rotateZ: '-90deg' }, { translateX: 160 }],
    right: '-28%',
    width: 300,
    height: 40
  }
});
