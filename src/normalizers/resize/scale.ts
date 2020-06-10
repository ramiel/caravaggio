import { ResizeModeOperator } from '.';
import { ResizeOptions } from 'sharp';

const scale: ResizeModeOperator = ({ image }) => async ({
  width,
  height,
  iar,
}) => {
  const params: [number | null, number | null, ResizeOptions?] = [
    width,
    height,
  ];
  if (iar) {
    params.push({ fit: 'fill' });
  }
  return image.resize(...params);
};

export default scale;
