/* eslint-env jest */

import { ServerRequest, ServerResponse } from 'microrouter';
import { Config } from '../config/default';
import CError from '../errors/CError';
import { PLUGIN_IGNORE_RESULT } from '../pluginLoader/pluginLoader';
import domainWhitelistFactory from './domainWhitelist';

const config = {} as Config;

describe('Domain Whitelist plugin', () => {
  describe('plugin behavior', () => {
    test('the factory returns a plugin', () => {
      const plugin = domainWhitelistFactory({})({
        PLUGIN_IGNORE_RESULT: PLUGIN_IGNORE_RESULT,
        config,
      });
      expect(plugin).toHaveProperty('getMiddlewares');
      expect(plugin.getMiddlewares?.()).toHaveLength(1);
    });
  });

  describe('middleware', () => {
    const spy = jest.fn();
    const req = {
      query: {
        image: 'http://image.com/image.jpg',
      },
    } as unknown as ServerRequest;
    const res = {} as ServerResponse;

    beforeEach(() => {
      spy.mockClear();
    });

    test('if no whitelist is provide, next is called', () => {
      const plugin = domainWhitelistFactory({})({
        PLUGIN_IGNORE_RESULT: PLUGIN_IGNORE_RESULT,
        config,
      });
      const middleware = plugin.getMiddlewares?.()[0];
      middleware?.(spy)(req, res);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('if whitelist is empty, next is called', () => {
      const plugin = domainWhitelistFactory({
        whitelist: [],
      })({
        PLUGIN_IGNORE_RESULT: PLUGIN_IGNORE_RESULT,
        config,
      });
      const middleware = plugin.getMiddlewares?.()[0];
      middleware?.(spy)(req, res);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('if no image is provided, next is called', () => {
      const plugin = domainWhitelistFactory({
        whitelist: ['anything.com'],
      })({
        PLUGIN_IGNORE_RESULT: PLUGIN_IGNORE_RESULT,
        config,
      });
      const middleware = plugin.getMiddlewares?.()[0];
      const req = { query: {} } as unknown as ServerRequest;
      middleware?.(spy)(req, res);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('if image is not in domain, an error is thrown', () => {
      const plugin = domainWhitelistFactory({
        whitelist: ['anything.com'],
      })({
        PLUGIN_IGNORE_RESULT: PLUGIN_IGNORE_RESULT,
        config,
      });
      const middleware = plugin.getMiddlewares?.()[0];
      const req = {
        query: { image: 'https://somethingelse.com' },
      } as unknown as ServerRequest;
      expect(() => middleware?.(spy)(req, res)).toThrow(CError);
      expect(spy).not.toHaveBeenCalled();
    });

    test('if image is not in a valid url, next is called', () => {
      const plugin = domainWhitelistFactory({
        whitelist: ['anything.com'],
      })({
        PLUGIN_IGNORE_RESULT: PLUGIN_IGNORE_RESULT,
        config,
      });
      const middleware = plugin.getMiddlewares?.()[0];
      const req = {
        query: { image: 'notanurl' },
      } as unknown as ServerRequest;
      middleware?.(spy)(req, res);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('if image is in a valid url, next is called', () => {
      const plugin = domainWhitelistFactory({
        whitelist: ['anything.com'],
      })({
        PLUGIN_IGNORE_RESULT: PLUGIN_IGNORE_RESULT,
        config,
      });
      const middleware = plugin.getMiddlewares?.()[0];
      const req = {
        query: { image: 'https://anything.com/image.jpg' },
      } as unknown as ServerRequest;
      expect(() => middleware?.(spy)(req, res)).not.toThrow(CError);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
