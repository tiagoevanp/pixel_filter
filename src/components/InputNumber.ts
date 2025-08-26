type InputNumberProps = {
  id: string;
  defaultValue: number;
  min: number;
  max: number;
};

export const InputNumber = ({
  id,
  defaultValue,
  min,
  max,
}: InputNumberProps) => {
  const element = document.createElement("input");
  element.type = "number";
  element.id = id;
  element.value = defaultValue.toString();
  element.min = min.toString();
  element.max = max.toString();

  return element;
};
