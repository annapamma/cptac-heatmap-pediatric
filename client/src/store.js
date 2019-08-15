import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

import landingData from './landingData.js';
import landingDataProteo from './landingDataProteo.js';
// const landingData = {}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clinicalTracks: [
      'Last Known Clinical Status',
      'HGG_H3F3A status',
      'CTNNB1 status',
      'LGG_BRAF status',
      'Ependymoma_RELA status',
      'grade',
      'diagnosis',
      'Tumor location',
      'rna cl',
      'phospho cl',
      'cl col',
    ],
    // 'Last Known Clinical Status': landingData['Last Known Clinical Status'],
    // 'HGG_H3F3A status': landingData['HGG_H3F3A status'],
    // 'CTNNB1 status': landingData['CTNNB1 status'],
    // 'LGG_BRAF status': landingData['LGG_BRAF status'],
    // 'Ependymoma_RELA status': landingData['Ependymoma_RELA status'],
    // 'rna cl': landingData['rna cl'],
    // 'phospho cl': landingData['phospho cl'],
    // 'cl col': landingData['cl col'],
    // 'Tumor location': landingData['Tumor location'],
    // phospho: landingData.phospho,
    // proteo: landingData.proteo,
    // grade: landingData.grade,
    // diagnosis: landingData.diagnosis,
    // phospho: {},
    // proteo: landingDataProteo,
    // grade: {},
    // diagnosis: {},
    genes: [],
    series: [],
    selectedDisease: 'all',
    selectedSeries: '',
    selectedSample: '',
    selectedValue: '',
    sortOrder: []
  },
  mutations: {
    ASSIGN_GENE_LIST(state, genes) {
      state.genes = genes;
    },
    ASSIGN_SERIES(state, series) {
      state.series = series;
    },
    UPDATE_SELECTED_DATA_POINT(state, { selectedSeries, selectedSample, selectedValue }) {
      state.selectedSeries = selectedSeries;
      state.selectedSample = selectedSample;
      state.selectedValue = selectedValue;
    },
    REORDER_SAMPLES(state) {
      const sortOrder = state.sortOrder.slice();

      const sortByIndex = (a, b) => (sortOrder.indexOf(a.x) > sortOrder.indexOf(b.x) ? 1 : -1);

      state.series = state.series.map((el) => {
        return {
          name: el.name,
          data: el.data.sort(sortByIndex)
        }
      });
    },
    SORT_SAMPLES(state, { ascending, series }) {
      const sortAscendingByY = (a, b) => {
        if (ascending) {
          return a.y > b.y ? 1 : -1;
        }
        return a.y > b.y ? -1 : 1;
      };
      const seriesToSortBy = state.series.find(function(s) {
        return s.name === series;
      });
      let sorted = seriesToSortBy.data.slice().sort(sortAscendingByY);

      state.sortOrder = sorted.map(el => el.x);
    },
    UPDATE_SELECTED_DISEASE(state, disease) {
      state.selectedDisease = disease;
    },
    UPDATE_PROTEO(state, proteo) {
      state.proteo = proteo;
    },
  },
  actions: {
    sortSamples(store, { ascending, series }) {
      console.log('in the action: ', ascending)
      console.log('in the action: ', series)
      store.commit('SORT_SAMPLES', { ascending, series });
      store.commit('REORDER_SAMPLES');
    },
    updateSelectedDataPoint(store, selectedDataPoint) {
      store.commit('UPDATE_SELECTED_DATA_POINT', selectedDataPoint);
    },
    selectDisease(store, disease) {
      store.commit('UPDATE_SELECTED_DISEASE', disease);
    },
    submitGenes(store, { genes, sort_category, ascending } ) {
      store.commit('ASSIGN_GENE_LIST', genes.split('%20'));
      // @app.route("/api/color/<genes_input>/<sort_category>/<ascending>")
      axios.get(
        `http://127.0.0.1:5000/api/color/${genes}/${sort_category}/${ascending}`,
      ).then(
        ( { data } ) => {
          console.log('in axios call: ', data.series);
          store.commit('ASSIGN_SERIES', data.series)
        }
      );
    },
  },
});
