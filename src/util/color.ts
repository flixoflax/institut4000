export const hexToRgbA = (hex: string) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    const num = parseInt(c, 16); // Now c is treated as a hexadecimal number
    return (
      "rgba(" +
      [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(",") +
      ",0.8)"
    );
  }
  throw new Error("Bad Hex");
};
