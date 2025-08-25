type ButtonProps = {
  onClick: () => void;
  classStyle?: string;
};

export const Button = ({ onClick, classStyle }: ButtonProps) => {
  const element = document.createElement("button");
  element.className = `waves-effect waves-light btn ${classStyle}`;
  element.textContent = "Filter";
  element.onclick = onClick;

  return element;
};
