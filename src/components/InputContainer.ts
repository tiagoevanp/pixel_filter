type InputContainerProps = {
  classStyle: string;
};

export const InputContainer = ({ classStyle }: InputContainerProps) => {
  const element = document.createElement("div");
  element.className = `input-field ${classStyle}`;
  return element;
};
