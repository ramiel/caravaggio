import { ResizeModeOperator } from '.';

const fill: ResizeModeOperator =
  ({ image }) =>
  async ({ width, height, gravity }) => {
    return image.resize(width, height, { fit: 'cover', position: gravity });
  };

export default fill;
