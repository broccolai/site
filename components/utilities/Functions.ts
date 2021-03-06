export const hexToRGBA = (hex: string, opacity: number) => {
  const tempHex = hex.replace('#', '');
  const r = parseInt(tempHex.substring(0, 2), 16);
  const g = parseInt(tempHex.substring(2, 4), 16);
  const b = parseInt(tempHex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

export const fadeGradient = (color: string, end: number) => {
  return `linear-gradient(to bottom, ${hexToRGBA(color, 0)} ${100 - end + '%'}, ${hexToRGBA(color, 100)} 100%)`;
};
