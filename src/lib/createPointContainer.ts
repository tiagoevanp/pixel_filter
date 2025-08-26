import { applyPaletteSync, buildPaletteSync, utils } from "image-q";

export const createPointContainer = (
  imgData: ImageData,
  colorPaletteSize: number
) => {
  const inPointContainer = utils.PointContainer.fromUint8Array(
    imgData.data,
    imgData.width,
    imgData.height
  );

  const palette = buildPaletteSync([inPointContainer], {
    colors: colorPaletteSize,
  });

  return applyPaletteSync(inPointContainer, palette, {
    imageQuantization: "nearest",
  });
};
