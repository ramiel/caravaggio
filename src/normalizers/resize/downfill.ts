import { ResizeModeOperator } from '.';

const downfill: ResizeModeOperator = ({ image }) => async ({
  width,
  height,
  gravity,
}) => {
  return image.resize(width, height, {
    position: gravity,
    withoutEnlargement: true,
  });
};

export default downfill;
