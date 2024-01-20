import { ResizeModeOperator } from '.';
// import { Color } from '../../utils/colors';

// const fallbackColor: Color = {
//   r: 0,
//   g: 0,
//   b: 0,
//   alpha: 1,
// };

const embed: ResizeModeOperator =
  ({ image }) =>
  async ({ width, height, gravity, background }) => {
    return image.resize(width, height, {
      fit: 'contain',
      position: gravity,
      background,
    });
  };

export default embed;
