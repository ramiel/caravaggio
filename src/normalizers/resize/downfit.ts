import { ResizeModeOperator } from '.';

const downfit: ResizeModeOperator = ({ image }) => async ({ width, height }) =>
  image.resize(width, height, { fit: 'inside', withoutEnlargement: true });

export default downfit;
