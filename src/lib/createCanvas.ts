export const createCanvas = (id: string) => {
  const container = document.getElementById("canvas-container");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", `${localStorage.getItem("canvasWidth")}`);
  canvas.setAttribute("height", `${localStorage.getItem("canvasHeight")}`);
  canvas.setAttribute("style", "margin: 10px");
  canvas.setAttribute("id", id);

  container.appendChild(canvas);

  return canvas.getContext("2d");
};
