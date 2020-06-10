import { Persistor } from '.';
import { NoneCacheOptions } from '../config/default';

const none: (opt: NoneCacheOptions) => Persistor = () => ({
  has: async () => false,

  read: async () => null,

  save: async (filename, buffer) => ({
    type: 'buffer',
    data: buffer,
  }),
});

export default none;
