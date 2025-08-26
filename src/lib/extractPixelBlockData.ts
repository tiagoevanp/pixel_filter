const averageRGB = (data: Uint8ClampedArray[], squareSize: number) => {
  const r: number[] = [];
  const g: number[] = [];
  const b: number[] = [];
  const reducer = (acc: number, cur: number) => {
    return acc + cur;
  };

  data.map((rgb) => {
    r.push(rgb[0]);
    g.push(rgb[1]);
    b.push(rgb[2]);
  });

  const averageR = r.reduce(reducer) / squareSize;
  const averageG = g.reduce(reducer) / squareSize;
  const averageB = b.reduce(reducer) / squareSize;

  return { r: averageR, g: averageG, b: averageB };
};

export const extractPixelBlockData = (
  c: CanvasRenderingContext2D,
  i: number,
  j: number,
  s: number
) => {
  const imgData = c.getImageData(i, j, s, s);
  const pixelsData = [];

  for (let l = 0; l < imgData.data.length; l += 4) {
    pixelsData.push(imgData.data.slice(l, l + 4));
  }

  const av = averageRGB(pixelsData, Math.pow(s, 2));

  const rgb = ["r", "g", "b", "a"] as const;

  const newData = imgData.data.map((value, idx) => {
    if (rgb[idx % 4] === "r") {
      return av.r;
    }
    if (rgb[idx % 4] === "g") {
      return av.g;
    }
    if (rgb[idx % 4] === "b") {
      return av.b;
    }
    return value;
  });

  return new ImageData(newData, imgData.width, imgData.height);
};
