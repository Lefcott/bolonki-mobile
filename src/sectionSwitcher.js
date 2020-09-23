import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { SECTIONS } from './store/constants';
import Menu from './components/Menu';
import CreateMap from './components/CreateMap';

export default function SectionSwitcher() {
  const section = useSelector(({ section }) => section);

  if (section === SECTIONS.MENU) return <Menu />;
  if (section === SECTIONS.CREATE_MAP) return <CreateMap />;
  return <View />;
}
