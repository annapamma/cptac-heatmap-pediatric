<template>
    <div class="the-legend-container">
      <ul id="legend-categories" class="legend-categories">
        <li v-for="(elements, category) in categories">
          <legend-category :category="category" :elements="elements"/>
        </li>
      </ul>
      <ul id="legend-categories-horizontal" class="legend-categories">
        <li v-for="(elements, category) in categoriesHorizontal">
          <legend-category-horizontal :category="category" :elements="elements"/>
        </li>
      </ul>
    </div>
</template>

<script>
import LegendCategory from './LegendCategory.vue';
import LegendCategoryHorizontal from './LegendCategoryHorizontal.vue';

export default {
  name: 'the-legend-container',
  components: {
    LegendCategory,
    LegendCategoryHorizontal,
  },
  data() {
    return {
      categoriesHorizontal: {
        'Proteo/Phospho/RNA Z-Score': [
          ['3', '#990000'],
          ['2', '#ff4d4d'],
          ['1', '#ff8080'],
          ['0', '#E8E8E8'],
          ['-1', '#b3ccff'],
          ['-2', '#4d88ff'],
          ['-3', '#003366'],
        ],
        Missing: [
          ['', '#ffffff'],
        ],
      },
      categories: {
        'Tumor location': [
          ['Supratentorial', '#379634'],
          ['Cerebellar/Posterior fossa', '#E2B6CF'],
          ['Suprasellar', '#E6AF2E'],
          ['PF>SPINE', '#434ed0'],
          ['Spine', '#77AF9C'],
          ['Cortical', '#CAFFB9'],
          ['Midline', '#F7D002'],
          ['Brain stem', '#468189'],
          ['Ventricles', '#8EF9F3'],
          ['Thalamic/Cortical', '#BF1A2F'],
          ['Optic pathway', '#755B69'],
        ],
        'Survival Status': [
          ['Alive', '#7FC97F'],
          // ['Deceased-causes unavailable', '#BEAED4'],
          ['Deceased-due to disease', '#F0027F'],
          ['Deceased-due to other causes', '#386CB0'],
          ['Deceased-due to unknown causes', '#FFFF99'],
        ],
        'HGG_H3FA status': [
          ['H3F3A K27M', '#33a02c'],
          ['H3F3A WT', '#b2df8a'],
        ],
        'CTNNB1 status': [
          ['CTNNB1 Mutant', '#1f78b4'],
          ['CTNNB1 WT', '#a6cee3'],
        ],
        'LGG_BRAF status': [
          ['BRAF fusion', '#FFA500'],
          ['BRAFp.V600E', '#800080'],
          ['BRAF Wild Type', '#00ff00 '],
        ],
        'Immune Group': [
          ['CD8- inflamed', '#9ecae3'],
          ['CD8+ inflamed', '#cc0000'],
          ['Metabolic immune-desert', '#98f367'],
          ['VEGF immune-desert', '#fff871'],
        ],
        'Ependymoma_RELA status': [
          ['RELA Fusion', '#003366'],
          ['RELA Wild Type', '#c71585'],
        ],
        Grade: [
          ['WHO Grade I', '#A6CEE3'],
          ['WHO Grade I/II', '#1F78B4'],
          ['WHO Grade II', '#B2DF8A'],
          ['WHO Grade III', '#33A02C'],
          ['WHO Grade III/IV', '#FB9A99'],
          ['WHO Grade IV', '#E31A1C'],
        ],
        diagnosis: [
          ['Ganglioglioma', '#00FFFF'],
          ['Ependymoma', '#00FF40'],
          ['Craniopharyngioma', '#FFBF00'],
          ['LGG', '#9F72FF'],
          ['HGG', '#3249DC'],
          ['ATRT', '#B30303'],
          ['Medulloblastoma', '#FF7ECF'],
        ],
        'rna cl': [
          ['1', '#FF89B0'],
          ['2', '#7CA4E8'],
          ['3', '#DBCBF1'],
          ['4', '#FFD9BB'],
          ['5', '#FA8F61'],
          ['6', '#FFFFC3'],
          ['7', '#9CE59C'],
          ['8', '#A0A0A0'],
        ],
        'phospho cl': [
          ['1', '#FFFFAD'],
          ['2', '#828282'],
          ['3', '#FFCCA1'],
          ['4', '#FF5597'],
          ['5', '#5C88CB'],
          ['6', '#CCBDE3'],
          ['7', '#DC7541'],
          ['8', '#7cff7a'],
        ],
        'proteo cl': [
          ['Ependy', '#75f961'],
          ['Medullo', '#ef87cc'],
          ['Aggressive', '#732512'],
          ['Cranio/LGG-BRAF-V600E', '#FF5597'],
          ['HGG-rich', '#304ed4'],
          ['Ganglio-rich', '#74cfeb'],
          ['LGG-BRAF-WT-rich', '#493d8c'],
          ['LGG-BRAF-Fusion-rich', '#b3a3f3'],
        ],
        '3p/5q/7p/9p/14q-CNV': [
          ['Loss', '#003366'],
          ['Neutral LOH', '#c2e2ec'],
          ['Neutral', '#E8E8E8'],
          ['Amplification', '#d94040'],
        ],
      },
    };
  },
  computed: {
    // loaded () {
    //     return this.$store.state.loaded;
    // },
    // loading () {
    //     return this.$store.state.loading;
    // },
  },
};
</script>

<style scoped>
.the-legend-container {
    width: 20%;
    height: 100%;
    /*background-color: pink;*/
    /*display: flex;*/
    /*flex-direction: column;*/
}
</style>
