const PersistorFactory = require('persistors');

describe('Persistor Factory', () => {
  test('it has a crate method', () => {
    expect(PersistorFactory).toHaveProperty('create', expect.any(Function));
  });

  test('return an existing persistor', () => {
    expect(() => PersistorFactory.create({ type: 'none' })).not.toThrow();
  });

  test('throw if the persistor doesn\'t exist', () => {
    expect(() => PersistorFactory.create({ type: 'invalid' })).toThrow();
  });
});

