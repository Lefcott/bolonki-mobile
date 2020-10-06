import { poly } from 'react-native/Libraries/Animated/src/Easing';
import type { PolygonData } from '../types';

export const getCenteredOffsets = (width: Number, height: Number, polygons: PolygonData[]) => {
  if (!polygons.length) return { x: 0, y: 0 };
  const minX = Math.min(...polygons.map(polygon => Math.min(...polygon.points.map(p => p.x))));
  const minY = Math.min(...polygons.map(polygon => Math.min(...polygon.points.map(p => p.y))));
  const maxX = Math.max(...polygons.map(polygon => Math.min(...polygon.points.map(p => p.x))));
  const maxY = Math.max(...polygons.map(polygon => Math.min(...polygon.points.map(p => p.y))));
  return {
    x: minX + (maxX - minX) / 2,
    y: minY + (maxY - minY) / 2
  };
};
