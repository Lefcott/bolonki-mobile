import React from 'react';
import { StatusBar } from 'react-native';

import Menu from './components/Menu/index';

export default function App() {
  console.log('app running');
  StatusBar.setBackgroundColor('dodgerblue');
  return <Menu />;
}
