export const changeIndexBy = (arr, index, newElem) => [
  ...arr.slice(0, index),
  newElem,
  ...arr.slice(index + 1)
];
