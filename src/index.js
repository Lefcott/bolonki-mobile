import React from 'react';
import { Provider } from 'react-redux';

import SectionSwitcher from './sectionSwitcher';
import store from './store';

export default function Bolonki() {
  return (
    <Provider store={store}>
      <SectionSwitcher />
    </Provider>
  );
}
