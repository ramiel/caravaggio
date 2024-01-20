/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import cohercer from './cohercer';

const GRAVITY_PARAM_REGEX =
  /^g?(c|n|ne|nw|e|w|s|se|sw|center|centre|north|northeast|northwest|east|west|south|southeast|southwest)$/;
const EXTENDED_GRAVITY_PARAM_REGEX =
  /^g?(c|n|ne|nw|e|w|s|se|sw|center|centre|north|northeast|northwest|east|west|south|southeast|southwest|auto)$/;
export enum GRAVITY {
  c = 'center',
  n = 'north',
  ne = 'northeast',
  nw = 'northwest',
  e = 'east',
  w = 'west',
  s = 'south',
  se = 'southeast',
  sw = 'southwest',
  center = 'center',
  centre = 'centre',
  north = 'north',
  northeast = 'northeast',
  northwest = 'northwest',
  east = 'east',
  west = 'west',
  south = 'south',
  southeast = 'southeast',
  southwest = 'southwest',
  auto = 'attention',
  // With g-prefix
  gc = 'center',
  gn = 'north',
  gne = 'northeast',
  gnw = 'northwest',
  ge = 'east',
  gw = 'west',
  gs = 'south',
  gse = 'southeast',
  gsw = 'southwest',
  gcenter = 'center',
  gcentre = 'centre',
  gnorth = 'north',
  gnortheast = 'northeast',
  gnorthwest = 'northwest',
  geast = 'east',
  gwest = 'west',
  gsouth = 'south',
  gsoutheast = 'southeast',
  gsouthwest = 'southwest',
  gauto = 'attention',
}

export type GRAVITY_KEYS = keyof typeof GRAVITY;

interface GravityOps {
  acceptAuto?: boolean;
  error?: string;
}

export const getGravityFromParameter = (
  gravity: string | undefined,
  opt?: GravityOps
) => {
  if (!gravity) return;
  const { acceptAuto, error } = {
    acceptAuto: false,
    error: `Invalid gravity parameter "${gravity}".`,
    ...opt,
  };
  let value: GRAVITY_KEYS = cohercer(gravity, error, 'resize.html#gravity')
    .toString()
    .match(acceptAuto ? EXTENDED_GRAVITY_PARAM_REGEX : GRAVITY_PARAM_REGEX)
    .value() as GRAVITY_KEYS;
  value = value[0] === 'g' ? (value.slice(1) as GRAVITY_KEYS) : value;
  return GRAVITY[value];
};
