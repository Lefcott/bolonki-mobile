type Point = { x: Number, y: Number };

export const areNumbersNear = (n1: Number, n2: Number, maxDistance: Number) =>
  Math.abs(n1 - n2) <= maxDistance;

export const arePointsNear = (p1: Point, p2: Point, maxDistance: Number) =>
  areNumbersNear(p1.x, p2.x, maxDistance) && areNumbersNear(p1.y, p2.y, maxDistance);
