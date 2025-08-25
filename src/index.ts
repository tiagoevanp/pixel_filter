import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import M from "materialize-css";

import { Button } from "./components/Button";
import { CanvasContainer } from "./components/CanvasContainer";
import { InputNumber } from "./components/InputNumber";
import { Label } from "./components/Label";
import { Row } from "./components/Row";
import { TitleHeader } from "./components/TitleHeader";

import Jesus from "./images/jesus.avif";
import { InputContainer } from "./components/InputContainer";

const drawImageFilterOnCanvas = (
  canvasO: CanvasRenderingContext2D,
  canvasF: CanvasRenderingContext2D,
  size: number
) => {
  let imgData: ImageData;
  for (var j = 0; j < 400; j += size) {
    for (let i = 0; i < 400; i += size) {
      imgData = makeNewData(canvasO, i, j, size);
      canvasF.putImageData(imgData, i, j);
    }
  }
};

const onClickButtonFilter = () => {
  const inputValue = parseInt(
    (document.getElementById("qnt") as HTMLInputElement).value
  );

  if (!inputValue) {
    throw new Error("You must inform how many pixels you want to group!");
  }

  if (inputValue < 1) {
    throw new Error("The value must be greater than 1!");
  }

  const image = createImage();
  const pixelSize = inputValue * 1;

  image.onload = () => {
    const canvasOriginalEl = document.getElementById(
      "canvasO"
    ) as HTMLCanvasElement;
    const canvasOriginalImageContext = canvasOriginalEl.getContext("2d");

    const canvasFilteredEl = document.getElementById(
      "canvasF"
    ) as HTMLCanvasElement;
    const canvasFilterImageContext = canvasFilteredEl.getContext("2d");

    drawImageFilterOnCanvas(
      canvasOriginalImageContext,
      canvasFilterImageContext,
      pixelSize
    );
  };
};

const createComponents = () => {
  document.getElementById("app").appendChild(TitleHeader());
  document.getElementById("app").appendChild(CanvasContainer());

  const row = Row();
  const inputContainer = InputContainer({ classStyle: "col s4" });

  inputContainer.appendChild(Label({ for: "qnt" }));
  inputContainer.appendChild(InputNumber());
  row.appendChild(inputContainer);
  row.appendChild(
    Button({
      onClick: onClickButtonFilter,
      classStyle: "col s4",
    })
  );

  document.getElementById("app").appendChild(row);
};

const createListeners = () => {
  const hitEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onClickButtonFilter();
    }
  };

  document.getElementById("qnt").addEventListener("keydown", hitEnter);
};

const createImage = () => {
  const image = new Image();
  image.src = Jesus;

  return image;
};

const createCanvas = (id: string) => {
  const container = document.getElementById("canvas-container");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", "400");
  canvas.setAttribute("height", "400");
  canvas.setAttribute("style", "margin: 10px");
  canvas.setAttribute("id", id);

  container.appendChild(canvas);

  return canvas.getContext("2d");
};

const drawImageOnCanvas = (
  canvas: CanvasRenderingContext2D,
  image: HTMLImageElement
) => {
  canvas.drawImage(image, 0, 0, 400, 400);
};

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

const makeNewData = (
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

  let red = true;
  let green = true;
  let blue = true;

  for (let m = 0; m < imgData.data.length; m++) {
    if (red) {
      red = false;
      imgData.data[m] = av.r;
    } else if (green) {
      green = false;
      imgData.data[m] = av.g;
    } else if (blue) {
      blue = false;
      imgData.data[m] = av.b;
    } else {
      red = true;
      green = true;
      blue = true;
    }
  }

  return imgData;
};

window.onload = () => {
  M.AutoInit();
  createComponents();
  createListeners();

  const image = createImage();
  const pixelSizeDefault = 8;
  image.onload = () => {
    image;
    const canvasOriginalImageContext = createCanvas("canvasO");
    const canvasFilterImageContext = createCanvas("canvasF");
    drawImageOnCanvas(canvasOriginalImageContext, image);
    drawImageFilterOnCanvas(
      canvasOriginalImageContext,
      canvasFilterImageContext,
      pixelSizeDefault
    );
  };
};
