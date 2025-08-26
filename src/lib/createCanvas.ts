export const createCanvas = (id: string, size: number) => {
  const container = document.getElementById("canvas-container");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", `${size}`);
  canvas.setAttribute("height", `${size}`);
  canvas.setAttribute("style", "margin: 10px");
  canvas.setAttribute("id", id);

  container.appendChild(canvas);

  return canvas.getContext("2d");
};
