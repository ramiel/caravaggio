const { buildDocumentationLink } = require('../../utils');
const cohercer = require('../../cohercer');

const GRAVITY_PARAM_REGEX = /^g?(c|n|ne|nw|e|w|se|sw|center|centre|north|northeast|northwest|east|west|south|southeast|southwest)$/;
const EXTENDED_GRAVITY_PARAM_REGEX = /^g?(c|n|ne|nw|e|w|se|sw|center|centre|north|northeast|northwest|east|west|south|southeast|southwest|auto)$/;
const GRAVITY_VALUES = {
  c: 'center',
  n: 'north',
  ne: 'northeast',
  nw: 'northwest',
  e: 'east',
  w: 'west',
  s: 'south',
  se: 'southeast',
  sw: 'southwest',
  center: 'center',
  centre: 'centre',
  north: 'north',
  northeast: 'northeast',
  northwest: 'northwest',
  east: 'east',
  west: 'west',
  south: 'south',
  southeast: 'southeast',
  southwest: 'southwest',
  auto: 'attention',
};

module.exports = {
  getGravityFromParameter: (
    gravity,
    { acceptAuto, error } = { acceptAuto: false, error: null },
  ) => {
    let value = gravity && cohercer(gravity, error || `Invalid gravity parameter "${gravity}".
See ${buildDocumentationLink('resize.html#gravity')}
`)
      .toString()
      .match(acceptAuto ? EXTENDED_GRAVITY_PARAM_REGEX : GRAVITY_PARAM_REGEX)
      .value();
    value = value && value[0] === 'g' ? value.slice(1) : value;
    return value && GRAVITY_VALUES[value];
  },
};
