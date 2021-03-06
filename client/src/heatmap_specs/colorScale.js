// import rnaColorScale from './rnaColorScale.js';


function colorRange([val, hex]) {
  return {
    from: val,
    to: val,
    color: hex,
  };
}

const zscoreRanges = [{
  from: 0,
  to: 0.1,
  color: '#E8E8E8',
},
{
  from: -30,
  to: -4,
  color: '#00004d',
},
{
  from: -4,
  to: -3.5,
  color: '#003366',
},
{
  from: -3.5,
  to: -3.0,
  color: '#004c99',
},
{
  from: -3.0,
  to: -2.5,
  color: '#0066cc',
},
{
  from: -2.5,
  to: -2.0,
  color: '#0080ff',
},
{
  from: -2.0,
  to: -1.5,
  color: '#3399ff',
},
{
  from: -1.5,
  to: -1.0,
  color: '#66b2ff',
},
{
  from: -1.0,
  to: -0.5,
  color: '#82b6ff',
},
{
  from: -0.5,
  to: 0,
  color: '#99ccff',
},
{
  from: 0,
  to: 0.1,
  color: '#CCE5FF',
},
{
  from: 0.1,
  to: 0.5,
  color: '#ffcccc',
},
{
  from: 0.5,
  to: 1,
  color: '#ff9999',
},
{
  from: 1,
  to: 1.5,
  color: '#ff6666',
},
{
  from: 1.5,
  to: 2,
  color: '#ff3333',
},
{
  from: 2,
  to: 2.5,
  color: '#ff0000',
},
{
  from: 2.5,
  to: 3,
  color: '#ff0000',
},
{
  from: 3,
  to: 3.5,
  color: '#E50000',
},
{
  from: 4,
  to: 30,
  color: '#990000',
},
];

const colorsRanges = {
  1000: '#ffffff', // Not applicable
  1001: '#7FC97F', // Last Known Clinical Status: Alive
  1002: '#BEAED4', // Last Known Clinical Status: Deceased-causes unavailable
  1003: '#F0027F', // Last Known Clinical Status: Deceased-due to disease
  1004: '#386CB0', // Last Known Clinical Status: Deceased-due to other causes
  1005: '#FFFF99', // Last Known Clinical Status: Deceased-due to unknown causes
  1006: '#33a02c', // HGG_H3FA status: H3F3A K27M
  1007: '#b2df8a', // HGG_H3FA status: H3F3A WT
  1008: '#1f78b4', // CTNNB1 status: CTNNB1 Mutant
  1009: '#a6cee3', // CTNNB1 status: CTNNB1 WT
  1010: '#FFA500', // LGG_BRAF status: BRAF fusion
  1011: '#800080', // LGG_BRAF status: BRAFp.V600E
  1012: '#00ff00', // LGG_BRAF status: BRAF Wild Type
  1013: '#003366', // Ependymoma_RELA status: RELA Fusion
  1014: '#c71585', // Ependymoma_RELA status: RELA Wild Type
  1015: '#A6CEE3', // grade: WHO Grade I
  1016: '#1F78B4', // grade: WHO Grade I/II
  1017: '#B2DF8A', // grade: WHO Grade II
  1018: '#33A02C', // grade: WHO Grade III
  1019: '#FB9A99', // grade: WHO Grade III/IV
  1020: '#E31A1C', // grade: WHO Grade IV
  1021: '#00FFFF', // diagnosis: Ganglioglioma
  1022: '#00FF40', // diagnosis: Ependymoma
  1023: '#FFBF00', // diagnosis: Craniopharyngioma
  1024: '#9F72FF', // diagnosis: Low-grade glioma/astrocytoma
  1025: '#3249DC', // diagnosis: High-grade glioma/astrocytoma
  1026: '#B30303', // diagnosis: Atypical Teratoid Rhabdoid Tumor (ATRT)
  1027: '#FF7ECF', // diagnosis: Medulloblastoma
  1028: '#FFFFFF', // Not Applicable
  1029: '#FF89B0', // rna cl 1
  1030: '#7CA4E8', // rna cl 2
  1031: '#DBCBF1', // rna cl 3
  1032: '#FFD9BB', // rna cl 4
  1033: '#FA8F61', // rna cl 5
  1034: '#FFFFC3', // rna cl 6
  1035: '#9CE59C', // rna cl 7
  1036: '#A0A0A0', // rna cl 8
  1037: '#FFFFAD', // phospho cl 1
  1038: '#828282', // phospho cl 2
  1039: '#FFCCA1', // phospho cl 3
  1040: '#FF5597', // phospho cl 4
  1041: '#5C88CB', // phospho cl 5
  1042: '#CCBDE3', // phospho cl 6
  1043: '#DC7541', // phospho cl 7
  1044: '#7cff7a', // phospho cl 8
  1045: '#75f961', // proteo cl: Ependy
  1046: '#ef87cc', // proteo cl:Medullo
  1047: '#732512', // proteo cl:Aggressive
  1048: '#fffea6', // proteo cl:Cranio/LGG-BRAF-V600E
  1049: '#304ed4', // proteo cl:HGG-rich
  1050: '#74cfeb', // proteo cl:Ganglio-rich
  1051: '#493d8c', // proteo cl:LGG-BRAF-WT-rich
  1052: '#b3a3f3', // proteo cl:LGG-BRAF-Fusion-rich
  1053: '#379634', // 'Supratentorial',
  1054: '#E2B6CF', // 'Cerebellar/Posterior fossa',
  1055: '#E6AF2E', // 'Suprasellar',
  1056: '#434ed0', // 'PF>SPINE',
  1057: '#77AF9C', // 'Spine',
  1058: '#CAFFB9', // 'Cortical',
  1059: '#F7D002', // 'Midline',
  1060: '#468189', // 'Brain stem',
  1061: '#8EF9F3', // 'Ventricles',
  1062: '#BF1A2F', // 'Thalamic/Cortical',
  1063: '#755B69', // 'Optic pathway',
  1064: '#FFFFFF', // 'Not available',
  1073: '#FFFFFF', // 'Not available',
  1074: '#d6dfe6', // Wild Type
  1075: '#0006a1', // Mutation
  1080: '#42F4EE', // 'Cold - mixed',
  1081: '#F45C42', // 'Hot Tumor',
  1082: '#d4af37', // 'Epithelial',
  1083: '#43cd80', // 'Neuronal',
  1084: '#5042F4', // 'Cold - medullo',
  1085: '#FFFFFF', // 'NaN'

};

export default {
  ranges: Object.entries(colorsRanges).map(colorRange).concat(zscoreRanges),
};
