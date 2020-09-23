import React from 'react';
import { useSelector } from 'react-redux';

import { SECTIONS } from './store/constants';
import Menu from './components/Menu/index';
import { View } from 'react-native';

export default function SectionSwitcher() {
  const section = useSelector(({ section }) => section);
  return section === SECTIONS.MENU && <Menu />;
}
