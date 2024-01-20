import { ResizeModeOperator } from '.';

const fit: ResizeModeOperator =
  ({ image }) =>
  async ({ width, height }) =>
    image.resize(width, height, { fit: 'inside' });

export default fit;
