const pluginsLoader = require('pluginsLoader');

const mockPlugin = jest.fn(() => ({}));
jest.mock('./fixtures/dummyplugin', () => mockPlugin);
jest.mock('../src/logger');

const pluginPaths = [`${__dirname}/fixtures`];

describe('Plugins loader', () => {
  test('return an object with various lifecycle functions', () => {
    const plugins = pluginsLoader({});
    expect(plugins).toHaveProperty('onRouteEntry');
  });

  test('plugins are loaded once and then cached', () => {
    const plugins = pluginsLoader({});
    const pluginsReloaded = pluginsLoader({});
    expect(plugins).toBe(pluginsReloaded);
  });

  test('fails if cannot find a plugin', () => {
    expect(() => pluginsLoader({ plugins: { fake: {} } }, true)).toThrowError();
  });

  test('load a plugin if exists', () => {
    expect(
      () => pluginsLoader({ pluginPaths, plugins: { dummyplugin: {} } }, true),
    ).not.toThrowError();
  });

  test('the functionality returned by the plugin is available', async () => {
    const fn = () => { };
    mockPlugin.mockImplementationOnce(() => ({
      onRouteEntry: fn,
    }));
    const plugins = pluginsLoader({ pluginPaths, plugins: { dummyplugin: {} } }, true);
    expect(plugins.onRouteEntry).toHaveLength(1);
    expect(plugins.onRouteEntry).toContain(fn);
  });

  test('plugins can be disabled all in once', () => {
    const fn = () => { };
    mockPlugin.mockImplementationOnce(() => ({
      onRouteEntry: fn,
    }));
    const plugins = pluginsLoader({
      pluginPaths,
      pluginsDisabled: true,
      plugins: { dummyplugin: {} },
    }, true);
    expect(plugins.onRouteEntry).toHaveLength(0);
  });
});
