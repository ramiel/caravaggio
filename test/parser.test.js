const config = require('config');

const mockNormalizer = jest.fn(opt => opt);
const { parseOptions } = require('../src/parser')(config);

jest.mock('../src/normalizers', () => () => mockNormalizer);

describe('Parser', () => {
  beforeEach(() => {
    mockNormalizer.mockClear();
  });

  describe('option parser', () => {
    test('parse a single options', () => {
      const rawOption = 'rotate_90';
      parseOptions(rawOption);
      expect(mockNormalizer).toHaveBeenCalledTimes(1);
      expect(mockNormalizer).toHaveBeenCalledWith({
        o: 'original',
        operations: [['rotate', '90']],
        rawNormalizedOptions: rawOption,
      });
    });

    test('parse "o"', () => {
      const rawOption = 'o_jpg';
      parseOptions(rawOption);
      expect(mockNormalizer).toHaveBeenCalledTimes(1);
      expect(mockNormalizer).toHaveBeenCalledWith({
        o: 'original',
        operations: [['o', 'jpg']],
        rawNormalizedOptions: rawOption,
      });
    });

    test('two options, "o" and "rotate"', () => {
      const rawOption = 'o_jpg,rotate_90';
      parseOptions(rawOption);
      expect(mockNormalizer).toHaveBeenCalledTimes(1);
      expect(mockNormalizer).toHaveBeenCalledWith({
        o: 'original',
        operations: [['o', 'jpg'], ['rotate', '90']],
        rawNormalizedOptions: rawOption,
      });
    });

    test('parameter among quotes', () => {
      const rawOption = 'overlay_"http://website"';
      parseOptions(rawOption);
      expect(mockNormalizer).toHaveBeenCalledTimes(1);
      expect(mockNormalizer).toHaveBeenCalledWith({
        o: 'original',
        operations: [['overlay', 'http://website']],
        rawNormalizedOptions: rawOption,
      });
    });

    test('parameter among quotes with an underscore inside', () => {
      const rawOption = 'overlay_"http://a_b"';
      parseOptions(rawOption);
      expect(mockNormalizer).toHaveBeenCalledTimes(1);
      expect(mockNormalizer).toHaveBeenCalledWith({
        o: 'original',
        operations: [['overlay', 'http://a_b']],
        rawNormalizedOptions: rawOption,
      });
    });

    test('parameter among quotes with multiple underscores inside (last is underscore)', () => {
      const rawOption = 'overlay_"http://a_b/c_"';
      parseOptions(rawOption);
      expect(mockNormalizer).toHaveBeenCalledTimes(1);
      expect(mockNormalizer).toHaveBeenCalledWith({
        o: 'original',
        operations: [['overlay', 'http://a_b/c_']],
        rawNormalizedOptions: rawOption,
      });
    });

    test('parameter among quotes with multiple underscores inside', () => {
      const rawOption = 'overlay_"http://a_b/c_D_e"';
      parseOptions(rawOption);
      expect(mockNormalizer).toHaveBeenCalledTimes(1);
      expect(mockNormalizer).toHaveBeenCalledWith({
        o: 'original',
        operations: [['overlay', 'http://a_b/c_D_e']],
        rawNormalizedOptions: rawOption,
      });
    });

    test('same as before multiple times', () => {
      const rawOption = 'overlay_"http://a_b/c_D_e"_b_"op_3"_"g_n"_"_q_w_e_r_t_y_"';
      parseOptions(rawOption);
      expect(mockNormalizer).toHaveBeenCalledTimes(1);
      expect(mockNormalizer).toHaveBeenCalledWith({
        o: 'original',
        operations: [['overlay', 'http://a_b/c_D_e', 'b', 'op_3', 'g_n', '_q_w_e_r_t_y_']],
        rawNormalizedOptions: rawOption,
      });
    });
  });
});
