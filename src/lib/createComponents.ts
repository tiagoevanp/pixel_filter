import { Button } from "../components/Button";
import { CanvasContainer } from "../components/CanvasContainer";
import { InputContainer } from "../components/InputContainer";
import { InputNumber } from "../components/InputNumber";
import { Label } from "../components/Label";
import { Row } from "../components/Row";
import { TitleHeader } from "../components/TitleHeader";
import { createCanvas } from "./createCanvas";
import { createImage } from "./createImage";
import {
  drawGrid,
  drawImageFilteredOnCanvas,
  drawImageOnCanvas,
} from "./drawImageOnCanvas";
import { onClickButtonFilter } from "../handlers/onClickButtonFilter";

export const createComponents = () => {
  const pixelSizeDefault = 8;
  const colorPaletteSizeDefault = 32;

  document.getElementById("app").appendChild(TitleHeader());
  document.getElementById("app").appendChild(CanvasContainer());

  const image = createImage();

  image.onload = () => {
    image;
    const canvasOriginalImageContext = createCanvas("canvasO", 600);
    const canvasFilterImageContext = createCanvas("canvasF", 600);
    drawImageOnCanvas(canvasOriginalImageContext, image);
    drawImageFilteredOnCanvas(
      canvasOriginalImageContext,
      canvasFilterImageContext,
      pixelSizeDefault,
      colorPaletteSizeDefault
    );
    drawGrid(canvasFilterImageContext, pixelSizeDefault);
  };

  const row = Row();

  const inputContainer = InputContainer({ classStyle: "col s2" });
  inputContainer.appendChild(Label({ for: "pixel-size", text: "Pixel Size" }));

  const input = InputNumber({
    defaultValue: pixelSizeDefault,
    id: "pixel-size",
    min: 4,
    max: 32,
  });
  inputContainer.appendChild(input);

  const inputContainer2 = InputContainer({ classStyle: "col s2" });
  inputContainer2.appendChild(
    Label({ for: "color-palette-size", text: "Color Palette Size" })
  );

  const input2 = InputNumber({
    defaultValue: colorPaletteSizeDefault,
    id: "color-palette-size",
    min: 2,
    max: 512,
  });
  inputContainer2.appendChild(input2);

  row.appendChild(inputContainer);
  row.appendChild(inputContainer2);
  row.appendChild(
    Button({
      onClick: onClickButtonFilter,
      classStyle: "col s2",
    })
  );

  document.getElementById("app").appendChild(row);

  input.focus();
};
