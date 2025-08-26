type LabelProps = {
  for: string;
  text: string;
};

export const Label = ({ for: htmlFor, text }: LabelProps) => {
  const element = document.createElement("label");
  element.setAttribute("for", htmlFor);
  element.classList.add("active");
  element.textContent = text;

  return element;
};
