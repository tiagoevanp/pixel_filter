import { onClickButtonFilter } from "../handlers/onClickButtonFilter";

export const createListeners = () => {
  const hitEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onClickButtonFilter();
    }
  };

  document.getElementById("pixel-size").addEventListener("keydown", hitEnter);
  document
    .getElementById("color-palette-size")
    .addEventListener("keydown", hitEnter);
};
