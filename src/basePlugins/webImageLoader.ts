import fetch from 'node-fetch';
import { PluginConstructor } from '../pluginLoader/pluginLoader';

const webImageLoaderFactory =
  (): PluginConstructor =>
  ({ PLUGIN_IGNORE_RESULT }) => {
    return {
      inputImageLoader: async (url) => {
        if (url.indexOf('http') !== 0) {
          return PLUGIN_IGNORE_RESULT;
        }
        return fetch(url).then((body) => body.buffer());
      },
    };
  };

export default webImageLoaderFactory;
