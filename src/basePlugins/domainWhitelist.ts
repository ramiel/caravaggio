import { PluginConstructor } from '../pluginLoader/pluginLoader';
import CError from '../errors/CError';

const buildRegex = (domains: Array<string>) =>
  domains &&
  domains.map(
    (domain) =>
      new RegExp(`^${domain.replace(/\./g, '\\.').replace(/\*/g, '.*')}`)
  );

interface DomainWhitelistOptions {
  whitelist?: Array<string>;
}

const domainWhitelistFactory = (
  pluginOptions: DomainWhitelistOptions
): PluginConstructor => () => {
  const { whitelist = [] } = pluginOptions || {};
  const validDomains = buildRegex(whitelist);
  return {
    getMiddlewares: () => {
      return [
        // First middleware
        (next) => (req, res) => {
          if (!validDomains || validDomains.length === 0 || !req.query.image) {
            return next(req, res);
          }
          let valid;
          try {
            const url = new URL(req.query.image);
            valid = validDomains.reduce(
              (acc, test) => acc || test.test(url.host),
              false
            );
          } catch (e) {
            return next(req, res);
          }
          if (!valid) {
            throw new CError(
              'The image url is not accessible due to domain restrictions',
              'configuration#domains-whitelist',
              403
            );
          }
          return next(req, res);
        },
      ];
    },
  };
};

export default domainWhitelistFactory;
