import { createPointContainer } from "./createPointContainer";
import { extractPixelBlockData } from "./extractPixelBlockData";

export const drawImageOnCanvas = (
  canvas: CanvasRenderingContext2D,
  image: HTMLImageElement
) => {
  canvas.drawImage(image, 0, 0, 600, 600);
};

export const drawImageFilteredOnCanvas = (
  canvasO: CanvasRenderingContext2D,
  canvasF: CanvasRenderingContext2D,
  size: number,
  colorPaletteSize: number
) => {
  let blockData: ImageData;
  for (var j = 0; j < 600; j += size) {
    for (let i = 0; i < 600; i += size) {
      blockData = extractPixelBlockData(canvasO, i, j, size);
      canvasF.putImageData(blockData, i, j);
    }
  }

  const filteredImageData = canvasF.getImageData(0, 0, 600, 600);

  const imageData = createPointContainer(filteredImageData, colorPaletteSize);

  const uint8Arr = imageData.toUint8Array();
  const imgData = new ImageData(new Uint8ClampedArray(uint8Arr), 600, 600);
  canvasF.putImageData(imgData, 0, 0);
};

export const drawGrid = (canvas: CanvasRenderingContext2D, size: number) => {
  canvas.strokeStyle = "black";
  canvas.lineWidth = 0.5;

  for (let i = 0; i <= 600; i += size) {
    canvas.beginPath();
    canvas.moveTo(i, 0);
    canvas.lineTo(i, 600);
    canvas.stroke();
  }

  for (let j = 0; j <= 600; j += size) {
    canvas.beginPath();
    canvas.moveTo(0, j);
    canvas.lineTo(600, j);
    canvas.stroke();
  }
};
