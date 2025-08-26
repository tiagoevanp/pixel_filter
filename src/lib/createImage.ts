import ImageSrc from "../images/maria.jpg";

export const createImage = () => {
  const image = new Image();
  image.src = ImageSrc;

  return image;
};
