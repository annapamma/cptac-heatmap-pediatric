import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios'

import fakeData from './fakeData';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clinicalTracks: [
      'Last Known Clinical Status',
      'HGG_H3FA status',
      'CTNNB1 status',
      'LGG_BRAF status',
      'Ependymoma_RELA status',
      'grade',
      'diagnosis',
      'rna cl',
      'phospho cl',
      'cl col',
    ],
    'Last Known Clinical Status': fakeData['Last Known Clinical Status'],
    'HGG_H3FA status': fakeData['HGG_H3FA status'],
    'CTNNB1 status': fakeData['CTNNB1 status'],
    'LGG_BRAF status': fakeData['LGG_BRAF status'],
    'Ependymoma_RELA status': fakeData['Ependymoma_RELA status'],
    'rna cl': fakeData['rna cl'],
    'phospho cl': fakeData['phospho cl'],
    'cl col': fakeData['cl col'],
    proteo: fakeData.proteo,
    grade: fakeData.grade,
    diagnosis: fakeData.diagnosis,
    selectedDisease: 'all',
    selectedSeries: '',
    selectedSample: '',
    selectedValue: '',
    sortOrder: [],
  },
  mutations: {
    UPDATE_SELECTED_DATA_POINT(state, { selectedSeries, selectedSample, selectedValue }) {
      state.selectedSeries = selectedSeries;
      state.selectedSample = selectedSample;
      state.selectedValue = selectedValue;
    },
    REORDER_SAMPLES(state) {
      const sortOrder = state.sortOrder.slice();

      const sortByIndex = (a, b) => (sortOrder.indexOf(a.x) > sortOrder.indexOf(b.x) ? 1 : -1);

      // TODO: show real value for clinical tracks
      state.diagnosis = state.diagnosis.slice().sort(sortByIndex);
      state['Last Known Clinical Status'] = state['Last Known Clinical Status'].slice().sort(sortByIndex);
      state['HGG_H3FA status'] = state['HGG_H3FA status'].slice().sort(sortByIndex);
      state['CTNNB1 status'] = state['CTNNB1 status'].slice().sort(sortByIndex);
      state['LGG_BRAF status'] = state['LGG_BRAF status'].slice().sort(sortByIndex);
      state['Ependymoma_RELA status'] = state['Ependymoma_RELA status'].slice().sort(sortByIndex);
      state['rna cl'] = state['rna cl'].slice().sort(sortByIndex);
      state['phospho cl'] = state['phospho cl'].slice().sort(sortByIndex);
      state['cl col'] = state['cl col'].slice().sort(sortByIndex);
      state.grade = state.grade.slice().sort(sortByIndex);
      state.diagnosis = state.diagnosis.slice().sort(sortByIndex);

      for (const gene in state.proteo) {
        if (state.proteo.hasOwnProperty(gene)) {
          state.proteo[gene] = state.proteo[gene].slice().sort(sortByIndex);
        }
      }
    },
    SORT_SAMPLES(state, { ascending, series }) {
      const sortAscendingByY = (a, b) => {
        if (ascending) {
          return a.y > b.y ? 1 : -1;
        }
        return a.y > b.y ? -1 : 1;
      };

      let sorted = [];
      if (state.clinicalTracks.includes(series)) {
        sorted = state[series].slice().sort(sortAscendingByY);
      } else {
        sorted = state.proteo[series].slice().sort(sortAscendingByY);
      }
      state.sortOrder = sorted.map(el => el.x);
    },
    UPDATE_SELECTED_DISEASE (state, disease) {
      state.selectedDisease = disease;
    },
    UPDATE_PROTEO (state, proteo) {
      state.proteo = proteo
    }
  },
  actions: {
    sortSamples(store, { ascending, series }) {
      store.commit('SORT_SAMPLES', { ascending, series });
      store.commit('REORDER_SAMPLES', series);
    },
    updateSelectedDataPoint(store, selectedDataPoint) {
      store.commit('UPDATE_SELECTED_DATA_POINT', selectedDataPoint);
    },
    selectDisease(store, disease) {
      store.commit('UPDATE_SELECTED_DISEASE', disease);
    },
    submitGenes: function (store, genes) {
      axios.get(
        `http://127.0.0.1:5000/api/proteo/${genes}`
      ).then(
        (res) => res.data['proteins_found']
          ? store.commit('UPDATE_PROTEO', res.data['proteo'])
          : store.commit('ALERT_NO_PROTEINS')
      )
    },
  },
});
