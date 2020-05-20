
function colorRange([val, hex]) {
  return {
    from: val,
    to: val,
    color: hex,
  };
}

const zscoreRanges = [
{
  from: -30,
  to: -2.75,
  color: '#00004d',
},
{
  from: -2.75,
  to: -2.5,
  color: '#003366',
},
{
  from: -2.5,
  to: -2.25,
  color: '#004c99',
},
{
  from: -2.25,
  to: -2,
  color: '#0066cc',
},
{
  from: -2,
  to: -1.75,
  color: '#0080ff',
},
{
  from: -1.75,
  to: -1.5,
  color: '#3399ff',
},
{
  from: -1.5,
  to: -1.25,
  color: '#66b2ff',
},
{
  from: -1.25,
  to: -1,
  color: '#82b6ff',
},
{
  from: -1,
  to: -0.75,
  color: '#99ccff',
},
{
  from: -0.75,
  to: -0.1,
  color: '#CCE5FF',
},
  {
  from: -0.1,
  to: 0.1,
  color: '#E8E8E8',
},
{
  from: 0.1,
  to: 0.75,
  color: '#ffcccc',
},
{
  from: 0.75,
  to: 1,
  color: '#ff9999',
},
{
  from: 1,
  to: 1.25,
  color: '#ff7777',
},

{
  from: 1.25,
  to: 1.5,
  color: '#ff6666',
},
  {
  from: 1.5,
  to: 1.75,
  color: '#ff5555',
},
{
  from: 1.75,
  to: 2,
  color: '#ff3333',
},
  {
  from: 2,
  to: 2.25,
  color: '#ff1111',
},
{
  from: 2.25,
  to: 2.5,
  color: '#ff0000',
},
{
  from: 2.5,
  to: 2.75,
  color: '#ff0000',
},
{
  from: 2.75,
  to: 3,
  color: '#E50000',
},
{
  from: 3,
  to: 30,
  color: '#990000',
},
];

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
  ranges: Object.entries(colorsRanges).map(colorRange).concat(zscoreRanges),
};
