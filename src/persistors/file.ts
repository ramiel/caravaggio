import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { getMainLogger } from '../logger';
import { FileCacheOptions } from '../config/default';
import { Persistor, CacheArtifact } from '.';

const DEFAULT_TEMP_DIR = os.tmpdir();

const filePersistor: (opt: FileCacheOptions) => Persistor = (
  { basePath = DEFAULT_TEMP_DIR } = { basePath: DEFAULT_TEMP_DIR }
) => {
  const logger = getMainLogger();
  const subdir = 'caravaggioCache';
  const baseDir = path.join(basePath, subdir);
  const getCompleteFilename = (filename: string) =>
    path.join(baseDir, filename);

  const cache: Persistor = {
    flush: () => fs.emptyDir(baseDir),

    has: (filename) =>
      fs
        .access(getCompleteFilename(filename), fs.constants.R_OK)
        .then(() => true)
        .catch(() => false),

    read: (filename) =>
      fs
        .readFile(getCompleteFilename(filename))
        .then(
          (buffer) =>
            ({
              type: 'buffer',
              data: buffer,
            } as CacheArtifact)
        )
        .catch((err) => {
          if (err.code === 'ENOENT') return null;
          throw err;
        }),

    save: async (filename, buffer) => {
      const completeFilename = getCompleteFilename(filename);
      try {
        await fs.outputFile(completeFilename, buffer, {
          // Due to an error in definition of this property
          // @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44637
          encoding: (null as unknown) as string,
        });
      } catch (e) {
        logger.error(
          e,
          `File persistor failed to save file ${completeFilename}`
        );
      }
      return {
        type: 'buffer',
        data: buffer,
      };
    },
  };

  return cache;
};

export default filePersistor;
