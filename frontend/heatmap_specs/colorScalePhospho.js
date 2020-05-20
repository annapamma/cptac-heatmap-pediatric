
function colorRange([val, hex]) {
  return {
    from: val,
    to: val,
    color: hex,
  };
}

function intensityRange([val, hex]) {
    return {
        from: val,
        to: val + 1,
        color: hex,
  };
}

const intensityRanges = {
    13: '#d7f8d8',
    14: '#cdeece',
    15: '#c3e5c3',
    16: '#b9dbb9',
    17: '#afd2af',
    18: '#a5c9a5',
    19: '#9bbf9b',
    20: '#91b691',
    21: '#88ad87',
    22: '#7ea47e',
    23: '#759b74',
    24: '#6c926b',
    25: '#638a62',
    26: '#5a8158',
    27: '#51784f',
    28: '#487047',
    29: '#3f683e',
    30: '#365f35',
    31: '#2d572d',
    32: '#244f24',
    33: '#1b471c',
    34: '#123f14',
}

const colorsRanges = {
  1000: '#ffffff', // NaN
  1001: '#1fc600', // I
  1002: '#089000', // II
  1003: '#0a5d00', // III
  1004: '#063b00', // IV
  1005: '#E8E8E8', // No
  1006: '#003366', // Yes
  1007: '#ececec', // Negative
  1008: '#cc0000', // Positive
  1013: '#98f367', // Metabolic immune-desert
  1014: '#ffa500', // VEGF immune-desert
   1015: '#9ecae3', // CD8- inflamed
    1016: '#cc0000', // CD8+ inflamed
  1017: '#57d440', // Male
  1018: '#446c40', // Female
    1019: '#ececec', // Negative
    1020: '#cc0000', // Positive
    1021: '#003366', // Loss
    1022: '#c2e2ec', // LR neutral LOH
  1023: '#E8E8E8', // LR neutral
  1024: '#d94040', // LR amplification
  1025: '#00004d', // (-inf, -0.5]
  1026: '#82b6ff', // (-0.5, -0.2]
  1027: '#E8E8E8', // (-0.2, 0.2]
  1028: '#ff7777', // (0.2, 0.5]
  1029: '#990000', // (0.5, +inf)
  1030: '#ececec', // Mutation 0
  1031: '#FFA500', // Mutation 1
  1032: '#993F00', // Mutation 2
};

export default {
  ranges:
      Object
          .entries(colorsRanges)
          .map(colorRange)
          .concat(
              Object.entries(intensityRanges)
                  .map(intensityRange)
          ),
};
