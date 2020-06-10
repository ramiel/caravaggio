import PersistorFactory from './index';

describe('Persistor Factory', () => {
  test('it has a crate method', () => {
    expect(PersistorFactory).toHaveProperty('create', expect.any(Function));
  });

  test('return an existing persistor', () => {
    expect(() =>
      PersistorFactory.create({ type: 'none', options: {} })
    ).not.toThrow();
  });
});
