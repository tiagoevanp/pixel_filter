type LabelProps = {
  for: string;
};

export const Label = ({ for: htmlFor }: LabelProps) => {
  const element = document.createElement("label");
  element.setAttribute("for", htmlFor);
  element.textContent = "Pixel Size";

  return element;
};
