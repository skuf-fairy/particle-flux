export function hexToRgb(hexColor: string) {
  // Delete the '#' character if there is one.
  const hex = hexColor.replace(/^#/, '');
  // Convert HEX to RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return {r, g, b};
}
``;
