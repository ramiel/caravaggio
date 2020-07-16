import { Config } from '../config/default';
import sharp from 'sharp';
import { ServerRequest, ServerResponse } from 'microrouter';
import { send } from 'micro';
import { CacheArtifact, CacheArtifactType } from '../persistors';
import { PipelineResult } from '../pipeline';
import compressor from './compressor';

interface SendArtifact extends Omit<CacheArtifact, 'type'>, PipelineResult {
  type?: CacheArtifactType;
}

const senderCreator = (config: Config) => {
  const { browserCache } = config;
  const sendFactory = compressor(config);
  const cacheControlHeader =
    typeof browserCache === 'string'
      ? browserCache
      : browserCache && browserCache.maxAge
      ? `max-age=${browserCache.maxAge}`
      : false;

  const getTypeByMetadata = async (buffer: Buffer) =>
    sharp(buffer)
      .metadata()
      .then(({ format }) => format);

  const getMimeType = async (resource: SendArtifact) => {
    if (resource.format) {
      return `image/${resource.format}`;
    }
    return `image/${await getTypeByMetadata(resource.data)}`;
  };

  return {
    sendImage: async (
      resource: SendArtifact,
      req: ServerRequest,
      res: ServerResponse,
      skipCache = false
    ) => {
      const send = sendFactory(req);
      switch (resource.type || 'buffer') {
        case 'buffer': {
          if (!skipCache && cacheControlHeader) {
            res.setHeader('cache-control', cacheControlHeader);
          }
          res.setHeader('Content-Type', await getMimeType(resource));
          return send(res, 200, resource.data);
        }
        // case 'location':
        //   return redirect(res, 301, resource.location);
        default:
          throw new Error(`Invalid type of resource ${resource.type}`);
      }
    },
  };
};

export default senderCreator;
