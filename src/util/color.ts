export const hexToRgbA = (hex: string, a: number = 0.7) => {
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
      `,${a})`
    );
  }
  throw new Error("Bad Hex");
};
