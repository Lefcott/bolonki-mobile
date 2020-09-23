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
  navbar: {
    width: '100%',
    height: 80,
    backgroundColor: 'dodgerblue',
    paddingTop: StatusBar.currentHeight
  },
  backIcon: {
    position: 'absolute',
    marginLeft: 8,
    paddingTop: StatusBar.currentHeight + 5
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'dodgerblue',
    opacity: 0.15,
    width: '100%',
    height: '100%'
  },
  title: {
    marginTop: 4,
    marginLeft: 55,
    fontSize: 30,
    color: '#fff'
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
  }
});
