import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import { utils, writeFile } from 'xlsx';

import landingData from './landingData.js';
import initialSortOrder from '@/initialSortOrder';

Vue.use(Vuex);

const apiRoot = 'http://127.0.0.1:5000';

export default new Vuex.Store({
  state: {
    excelData: {},
    genes: [],
    series: landingData.series,
    selectedDisease: 'all',
    selectedSeries: '',
    selectedSample: '',
    selectedValue: '',
    sortOrder: initialSortOrder
  },
  mutations: {
    ASSIGN_EXCEL_DATA(state, excelData) {
      state.excelData = excelData;
    },
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
  },
  actions: {
    getExcelData(store, { genes }) {
      axios.get(
        `${apiRoot}/api/table/${genes}/`,
      ).then(
        ( { data } ) => {
          const ws = utils.json_to_sheet(
            data.excelData,
            {
              header: ['idx', 'Data type', 'Gene symbol', ...store.state.sortOrder]
            }
          );
          const wb = utils.book_new();
          utils.book_append_sheet(wb, ws);
          writeFile(wb, 'CPTAC3-pbt.xls');
        }
      );
    },
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
    submitGenes(store, { genes} ) {
      store.commit('ASSIGN_GENE_LIST', genes.split('%20'));
      axios.get(
        `${apiRoot}/api/color/${genes}/`,
      ).then(
        ( { data } ) => {
          store.commit('ASSIGN_SERIES', data.series)
        }
      );
    },
  },
});
