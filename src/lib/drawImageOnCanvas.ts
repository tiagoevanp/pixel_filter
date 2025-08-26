import { createPointContainer } from "./createPointContainer";
import { extractPixelBlockData } from "./extractPixelBlockData";

const getCanvasDimensions = () => {
  const canvasWidth = parseInt(localStorage.getItem("canvasWidth"));
  const canvasHeight = parseInt(localStorage.getItem("canvasHeight"));
  return { canvasWidth, canvasHeight };
};

export const drawImageOnCanvas = (
  canvas: CanvasRenderingContext2D,
  image: HTMLImageElement
) => {
  const { canvasWidth, canvasHeight } = getCanvasDimensions();

  canvas.drawImage(image, 0, 0, canvasWidth, canvasHeight);
};

export const drawImageFilteredOnCanvas = (
  canvasO: CanvasRenderingContext2D,
  canvasF: CanvasRenderingContext2D,
  size: number,
  colorPaletteSize: number
) => {
  const { canvasWidth, canvasHeight } = getCanvasDimensions();
  let blockData: ImageData;
  for (var j = 0; j < canvasHeight; j += size) {
    for (let i = 0; i < canvasWidth; i += size) {
      blockData = extractPixelBlockData(canvasO, i, j, size);
      canvasF.putImageData(blockData, i, j);
    }
  }

  const filteredImageData = canvasF.getImageData(
    0,
    0,
    canvasWidth,
    canvasHeight
  );

  const imageData = createPointContainer(filteredImageData, colorPaletteSize);

  const uint8Arr = imageData.toUint8Array();
  const imgData = new ImageData(
    new Uint8ClampedArray(uint8Arr),
    canvasWidth,
    canvasHeight
  );
  canvasF.putImageData(imgData, 0, 0);
};

export const drawGrid = (canvas: CanvasRenderingContext2D, size: number) => {
  const { canvasWidth, canvasHeight } = getCanvasDimensions();
  canvas.strokeStyle = "white";
  canvas.lineWidth = 0.5;

  for (let i = 0; i <= canvasWidth; i += size) {
    canvas.beginPath();
    canvas.moveTo(i, 0);
    canvas.lineTo(i, canvasHeight);
    canvas.stroke();
  }

  for (let j = 0; j <= canvasHeight; j += size) {
    canvas.beginPath();
    canvas.moveTo(0, j);
    canvas.lineTo(canvasWidth, j);
    canvas.stroke();
  }
};
