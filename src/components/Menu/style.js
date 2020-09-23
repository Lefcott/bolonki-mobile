import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'dodgerblue',
    opacity: 0.5,
    width: '100%',
    height: '100%'
  },
  title: {
    position: 'absolute',
    left: 20,
    top: 0,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 60,
    color: '#008',
    paddingTop: StatusBar.currentHeight
  },
  polygon: {
    position: 'absolute',
    right: 0,
    top: 20,
    opacity: 0.77
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    flex: 1,
    top: -25
  },
  button: {
    backgroundColor: 'dodgerblue',
    flex: 1,
    aspectRatio: 1,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  createMatchButton: {},
  joinMatchButton: {
    backgroundColor: 'gold'
  }
});
