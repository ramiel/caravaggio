import CError from '../errors/CError';
import { PluginConstructor } from '../pluginLoader/pluginLoader';

const buildRegex = (domains: Array<string>) =>
  domains?.map(
    (domain) =>
      new RegExp(`^${domain.replace(/\./g, '\\.').replace(/\*/g, '.*')}`),
  );

interface DomainWhitelistOptions {
  whitelist?: Array<string>;
}

const domainWhitelistFactory =
  (pluginOptions: DomainWhitelistOptions): PluginConstructor =>
  () => {
    const { whitelist = [] } = pluginOptions || {};
    const validDomains = buildRegex(whitelist);
    return {
      getMiddlewares: () => {
        return [
          (next) => (req, res) => {
            if (
              !validDomains ||
              validDomains.length === 0 ||
              !req.query.image
            ) {
              return next(req, res);
            }
            let valid: boolean;
            try {
              const url = new URL(req.query.image);
              valid = validDomains.reduce(
                (acc, test) => acc || test.test(url.host),
                false,
              );
            } catch (e) {
              return next(req, res);
            }
            if (!valid) {
              throw new CError(
                `The image url (${req.query.image}) is not accessible due to domain restrictions`,
                'configuration#domains-whitelist',
                403,
              );
            }
            return next(req, res);
          },
        ];
      },
    };
  };

export default domainWhitelistFactory;
