import { ResizeModeOperator } from '.';

const upfit: ResizeModeOperator =
  ({ image }) =>
  async ({ width, height }) => {
    const { width: iw, height: ih } = await image.metadata();
    if (
      (iw as number) < (width as number) &&
      (ih as number) < (height as number)
    ) {
      return image.resize(width, height, { fit: 'inside' });
    }
    return image;
  };

export default upfit;
