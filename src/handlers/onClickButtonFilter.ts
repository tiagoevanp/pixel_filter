import { createImage } from "../lib/createImage";
import { drawGrid, drawImageFilteredOnCanvas } from "../lib/drawImageOnCanvas";

export const onClickButtonFilter = () => {
  const inputValue = parseInt(
    (document.getElementById("pixel-size") as HTMLInputElement).value
  );
  const minInputValue = parseInt(
    document.getElementById("pixel-size").getAttribute("min")
  );
  const maxInputValue = parseInt(
    document.getElementById("pixel-size").getAttribute("max")
  );

  const inputValue2 = parseInt(
    (document.getElementById("color-palette-size") as HTMLInputElement).value
  );

  const minInputValue2 = parseInt(
    document.getElementById("color-palette-size").getAttribute("min")
  );
  const maxInputValue2 = parseInt(
    document.getElementById("color-palette-size").getAttribute("max")
  );

  if (!inputValue) {
    throw new Error("You must inform how many pixels you want to group!");
  }

  if (!inputValue2) {
    throw new Error("You must inform the color palette size!");
  }

  if (inputValue < minInputValue || inputValue > maxInputValue) {
    throw new Error(
      `The value must be between ${minInputValue} and ${maxInputValue}!`
    );
  }

  if (inputValue2 < minInputValue2 || inputValue2 > maxInputValue2) {
    throw new Error(
      `The color palette size must be between ${minInputValue2} and ${maxInputValue2}!`
    );
  }

  const image = createImage();
  const pixelSize = inputValue;
  const colorPaletteSize = inputValue2;

  image.onload = () => {
    const canvasOriginalEl = document.getElementById(
      "canvasO"
    ) as HTMLCanvasElement;
    const canvasOriginalImageContext = canvasOriginalEl.getContext("2d");

    const canvasFilteredEl = document.getElementById(
      "canvasF"
    ) as HTMLCanvasElement;
    const canvasFilterImageContext = canvasFilteredEl.getContext("2d");

    drawImageFilteredOnCanvas(
      canvasOriginalImageContext,
      canvasFilterImageContext,
      pixelSize,
      colorPaletteSize
    );
    drawGrid(canvasFilterImageContext, pixelSize);
  };
};
