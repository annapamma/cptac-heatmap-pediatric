import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

import landingData from './landingData';

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
    'Last Known Clinical Status': landingData['Last Known Clinical Status'],
    'HGG_H3FA status': landingData['HGG_H3FA status'],
    'CTNNB1 status': landingData['CTNNB1 status'],
    'LGG_BRAF status': landingData['LGG_BRAF status'],
    'Ependymoma_RELA status': landingData['Ependymoma_RELA status'],
    'rna cl': landingData['rna cl'],
    'phospho cl': landingData['phospho cl'],
    'cl col': landingData['cl col'],
    proteo: landingData.proteo,
    grade: landingData.grade,
    diagnosis: landingData.diagnosis,
    selectedDisease: 'all',
    selectedSeries: '',
    selectedSample: '',
    selectedValue: '',
    sortOrder: ['X7316.872', 'X7316.2151', 'X7316.2170', 'X7316.2146', 'X7316.3319', 'X7316.130', 'X7316.2648', 'X7316.2144', 'X7316.384', 'X7316.443', 'X7316.889', 'X7316.160', 'X7316.394', 'X7316.1886', 'X7316.892', 'X7316.3069', 'X7316.873', 'X7316.176', 'X7316.198', 'X7316.3', 'X7316.2757', 'X7316.1784', 'X7316.111', 'X7316.3299', 'X7316.2959', 'X7316.306', 'X7316.407', 'X7316.38', 'X7316.897', 'X7316.109', 'X7316.2986', 'X7316.347', 'X7316.937', 'X7316.2155', 'X7316.304', 'X7316.302', 'X7316.3025', 'X7316.1772', 'X7316.883', 'X7316.3023', 'X7316.6', 'X7316.931', 'X7316.178', 'X7316.278', 'X7316.333', 'X7316.2156', 'X7316.3300', 'X7316.2181', 'X7316.2187', 'X7316.913', 'X7316.99', 'X7316.153', 'X7316.878', 'X7316.2140', 'X7316.1790', 'X7316.2141', 'X7316.2933', 'X7316.1746', 'X7316.1781', 'X7316.1771', 'X7316.490', 'X7316.376', 'X7316.189', 'X7316.451', 'X7316.47', 'X7316.2899', 'X7316.124', 'X7316.918', 'X7316.3571', 'X7316.1773', 'X7316.3316', 'X7316.2671', 'X7316.3773', 'X7316.341', 'X7316.380', 'X7316.387', 'X7316.949', 'X7316.499', 'X7316.2154', 'X7316.2664', 'X7316.2901', 'X7316.2581', 'X7316.1760', 'X7316.884', 'X7316.350', 'X7316.496', 'X7316.454', 'X7316.3292', 'X7316.3022', 'X7316.2751', 'X7316.371', 'X7316.942', 'X7316.3303', 'X7316.24', 'X7316.114', 'X7316.195', 'X7316.1455', 'X7316.2152', 'X7316.466', 'X7316.2594', 'X7316.388', 'X7316.1763', 'X7316.1769', 'X7316.914', 'X7316.487', 'X7316.194', 'X7316.479', 'X7316.1789', 'X7316.370', 'X7316.2758', 'X7316.3556', 'X7316.183', 'X7316.193', 'X7316.3765', 'X7316.1854', 'X7316.2760', 'X7316.359', 'X7316.1793', 'X7316.319', 'X7316.3045', 'X7316.321', 'X7316.101', 'X7316.217', 'X7316.893', 'X7316.120', 'X7316.2174', 'X7316.37', 'X7316.196', 'X7316.452', 'X7316.3570', 'X7316.91', 'X7316.905', 'X7316.167', 'X7316.3572', 'X7316.875', 'X7316.2195', 'X7316.173', 'X7316.442', 'X7316.3575', 'X7316.3068', 'X7316.119', 'X7316.944', 'X7316.1751', 'X7316.362', 'X7316.936', 'X7316.230', 'X7316.946', 'X7316.445', 'X7316.162', 'X7316.2723', 'X7316.3561', 'X7316.925', 'X7316.84', 'X7316.397', 'X7316.2157', 'X7316.880', 'X7316.470', 'X7316.2167', 'X7316.449', 'X7316.186', 'X7316.226', 'X7316.175', 'X7316.882', 'X7316.166', 'X7316.2183', 'X7316.1775', 'X7316.459', 'X7316.1851', 'X7316.2900', 'X7316.148', 'X7316.32', 'X7316.89', 'X7316.1767', 'X7316.222', 'X7316.324', 'X7316.934', 'X7316.332', 'X7316.2669', 'X7316.20', 'X7316.77', 'X7316.2667', 'X7316.938', 'X7316.3055', 'X7316.207', 'X7316.2729', 'X7316.329', 'X7316.2193', 'X7316.267', 'X7316.400', 'X7316.3062', 'X7316.391', 'X7316.3555', 'X7316.345', 'X7316.127', 'X7316.891', 'X7316.2755', 'X7316.344', 'X7316.2184', 'X7316.2172', 'X7316.495', 'X7316.121', 'X7316.472', 'X7316.869', 'X7316.206', 'X7316.134', 'X7316.393', 'X7316.168', 'X7316.485', 'X7316.117', 'X7316.957', 'X7316.156', 'X7316.154', 'X7316.932', 'X7316.368', 'X7316.146', 'X7316.475', 'X7316.488', 'X7316.954', 'X7316.2663'],
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
    UPDATE_SELECTED_DISEASE(state, disease) {
      state.selectedDisease = disease;
    },
    UPDATE_PROTEO(state, proteo) {
      state.proteo = proteo;
    },
  },
  actions: {
    sortSamples(store, { ascending, series }) {
      store.commit('SORT_SAMPLES', { ascending, series });
      store.commit('REORDER_SAMPLES');
    },
    updateSelectedDataPoint(store, selectedDataPoint) {
      store.commit('UPDATE_SELECTED_DATA_POINT', selectedDataPoint);
    },
    selectDisease(store, disease) {
      store.commit('UPDATE_SELECTED_DISEASE', disease);
    },
    submitGenes(store, genes) {
      axios.get(
        `http://127.0.0.1:5000/api/proteo/${genes}`,
      ).then(
        res => (res.data.proteins_found
          ? store.commit('UPDATE_PROTEO', res.data.proteo)
          : store.commit('ALERT_NO_PROTEINS')),
      );
    },
  },
});
